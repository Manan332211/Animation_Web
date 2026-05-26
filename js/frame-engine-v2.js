/**
 * ═══════════════════════════════════════════════════════════════
 *  FRAME ENGINE (V2)
 *  Canvas-based, scroll-driven image sequence renderer.
 *  Preloads frames progressively and draws to a <canvas> element.
 * ═══════════════════════════════════════════════════════════════
 */

class FrameEngine {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {object} variant - A variant config from SITE_CONFIG.variants
   * @param {object} options - { frameSkip, preloadBatchSize }
   */
  constructor(canvas, variant, options = {}) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext("2d");
    this.variant = variant;

    this.frameSkip       = options.frameSkip || 1;
    this.batchSize       = options.preloadBatchSize || 15;
    this.totalFrames     = Math.ceil(variant.frameCount / this.frameSkip);
    this.frames          = new Array(this.totalFrames).fill(null);
    this.loadedCount     = 0;
    this.currentIndex    = 0;
    this.lastDrawnIndex  = -1;
    this.isReady         = false;
    this.onProgress      = null;   // callback(percent)
    this.onReady         = null;   // callback()

    this._resizeCanvas();
    this._boundResize = this._resizeCanvas.bind(this);
    window.addEventListener("resize", this._boundResize);
  }

  // ─── Public ──────────────────────────────────────────────────

  /** Start preloading all frames. */
  async preload() {
    const totalBatches = Math.ceil(this.totalFrames / this.batchSize);

    // Prioritise first frame for instant display
    await this._loadFrame(0);
    this.draw(0);

    for (let b = 0; b < totalBatches; b++) {
      const start = b * this.batchSize;
      const end   = Math.min(start + this.batchSize, this.totalFrames);
      const batch = [];

      for (let i = start; i < end; i++) {
        if (!this.frames[i]) {
          batch.push(this._loadFrame(i));
        }
      }

      await Promise.all(batch);

      const pct = Math.round((this.loadedCount / this.totalFrames) * 100);
      if (this.onProgress) this.onProgress(pct);
    }

    this.isReady = true;
    if (this.onReady) this.onReady();
  }

  /** Draw a specific frame index to canvas. */
  draw(index) {
    const idx = Math.max(0, Math.min(index, this.totalFrames - 1));
    if (idx === this.lastDrawnIndex) return;

    const img = this.frames[idx];
    if (!img) return;

    this.currentIndex   = idx;
    this.lastDrawnIndex = idx;

    // Use logical viewport dimensions to calculate scale and offsets.
    // This avoids double-scaling when display has devicePixelRatio > 1.
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const { naturalWidth: iw, naturalHeight: ih } = img;

    // Cover-style draw
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    this.ctx.clearRect(0, 0, cw, ch);
    this.ctx.drawImage(img, dx, dy, dw, dh);
  }

  /** Set frame from scroll progress (0 → 1). */
  setProgress(progress) {
    const p   = Math.max(0, Math.min(1, progress));
    const idx = Math.round(p * (this.totalFrames - 1));
    this.draw(idx);
  }

  /** Switch to a new variant. Returns a promise. */
  async switchVariant(variant) {
    this.variant     = variant;
    this.totalFrames = Math.ceil(variant.frameCount / this.frameSkip);
    this.frames      = new Array(this.totalFrames).fill(null);
    this.loadedCount = 0;
    this.lastDrawnIndex = -1;
    this.isReady     = false;
    await this.preload();
  }

  /** Clean up. */
  destroy() {
    window.removeEventListener("resize", this._boundResize);
    this.frames = [];
  }

  // ─── Private ─────────────────────────────────────────────────

  _resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width  = window.innerWidth  * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
    // Re-draw current frame at new size
    if (this.frames[this.currentIndex]) {
      this.lastDrawnIndex = -1; // force redraw
      this.draw(this.currentIndex);
    }
  }

  _getFrameUrls(index) {
    const actualIndex = index * this.frameSkip;
    const padded = String(actualIndex).padStart(3, "0");
    const pattern = this.variant.framePattern;
    // Return primary URL plus fallback with alternate delay
    const primary = this.variant.framePath + pattern.replace("{index}", padded);
    // Generate alternate: swap 0.033s ↔ 0.034s
    const alt = primary.includes("0.033s")
      ? primary.replace("0.033s", "0.034s")
      : primary.replace("0.034s", "0.033s");
    return [primary, alt];
  }

  _loadFrame(index) {
    return new Promise((resolve) => {
      if (this.frames[index]) {
        resolve();
        return;
      }
      const [primaryUrl, fallbackUrl] = this._getFrameUrls(index);
      const img = new Image();
      img.onload = () => {
        this.frames[index] = img;
        this.loadedCount++;
        resolve();
      };
      img.onerror = () => {
        // Try fallback URL (alternate delay pattern)
        const img2 = new Image();
        img2.onload = () => {
          this.frames[index] = img2;
          this.loadedCount++;
          resolve();
        };
        img2.onerror = () => {
          // Silently skip broken frames
          this.loadedCount++;
          resolve();
        };
        img2.src = fallbackUrl;
      };
      img.src = primaryUrl;
    });
  }
}
