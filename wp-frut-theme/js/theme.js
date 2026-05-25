/**
 * ═══════════════════════════════════════════════════════════════
 *  THEME MANAGER
 *  Handles dark / light mode toggling, persistence, and
 *  per-variant accent color updates.
 * ═══════════════════════════════════════════════════════════════
 */

class ThemeManager {
  constructor(defaultMode = "dark") {
    this.defaultMode = defaultMode;
    this.currentMode = this._getInitialMode();
    this.toggleBtn   = document.getElementById("theme-toggle");

    this._applyMode(this.currentMode, false);

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggle());
    }
  }

  // ─── Public ──────────────────────────────────────────────────

  toggle() {
    this.currentMode = this.currentMode === "dark" ? "light" : "dark";
    this._applyMode(this.currentMode, true);
    localStorage.setItem("frut-theme", this.currentMode);
  }

  setAccent(color, colorRGB) {
    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-rgb", colorRGB);
  }

  setMode(mode) {
    if (mode && (mode === "dark" || mode === "light")) {
      this.currentMode = mode;
      this._applyMode(mode, true);
    }
  }

  // ─── Private ─────────────────────────────────────────────────

  _getInitialMode() {
    const stored = localStorage.getItem("frut-theme");
    if (stored) return stored;

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }

    return this.defaultMode;
  }

  _applyMode(mode, animate) {
    const root = document.documentElement;

    if (animate) {
      root.classList.add("theme-transitioning");
      setTimeout(() => root.classList.remove("theme-transitioning"), 400);
    }

    root.setAttribute("data-theme", mode);
    this._updateToggleIcon(mode);
  }

  _updateToggleIcon(mode) {
    if (!this.toggleBtn) return;
    const sun  = this.toggleBtn.querySelector(".icon-sun");
    const moon = this.toggleBtn.querySelector(".icon-moon");
    if (sun && moon) {
      sun.style.opacity  = mode === "dark" ? "1" : "0";
      moon.style.opacity = mode === "dark" ? "0" : "1";
      sun.style.transform  = mode === "dark" ? "rotate(0deg)" : "rotate(90deg)";
      moon.style.transform = mode === "dark" ? "rotate(-90deg)" : "rotate(0deg)";
    }
  }
}
