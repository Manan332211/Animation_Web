/**
 * ═══════════════════════════════════════════════════════════════
 *  APP — Main application orchestrator
 *  Wires together FrameEngine, ThemeManager, scroll logic,
 *  Intersection Observer animations, and variant switching.
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  "use strict";

  // ─── State ─────────────────────────────────────────────────
  let engine       = null;
  let theme        = null;
  let activeVariant = 0;
  let ticking      = false;

  // ─── DOM References ────────────────────────────────────────
  const canvas        = document.getElementById("hero-canvas");
  const heroSection   = document.getElementById("hero");
  const navbar        = document.getElementById("navbar");
  const loader        = document.getElementById("loader");
  const loaderBar     = document.getElementById("loader-bar");
  const loaderPercent = document.getElementById("loader-percent");
  const variantPills  = document.getElementById("variant-pills");

  // Hero text elements
  const heroName     = document.getElementById("hero-name");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const heroDesc     = document.getElementById("hero-desc");

  // ─── Initialise ────────────────────────────────────────────
  function init() {
    // Set hero section height for scroll-driven animation
    const multiplier = SITE_CONFIG.performance.heroScrollMultiplier || 4;
    heroSection.style.height = (multiplier * 100) + "vh";

    buildNav();
    buildSections();
    buildFooter();
    buildVariantPills();

    theme = new ThemeManager(SITE_CONFIG.defaultMode);
    setActiveVariant(0);

    setupScrollHandler();
    setupIntersectionObservers();
    setupSmoothScrolling();
    setupNavScroll();
  }

  // ─── Navigation ────────────────────────────────────────────
  function buildNav() {
    const brandEl = document.getElementById("brand-name");
    if (brandEl) brandEl.textContent = SITE_CONFIG.brand.name;

    const navLinks = document.getElementById("nav-links");
    if (navLinks) {
      navLinks.innerHTML = SITE_CONFIG.nav.map(link =>
        `<a href="${link.target}" class="nav-link">${link.label}</a>`
      ).join("");
    }

    const socialLinks = document.getElementById("social-links");
    if (socialLinks) {
      socialLinks.innerHTML = SITE_CONFIG.social.map(s =>
        `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="${s.name}">${s.icon}</a>`
      ).join("");
    }
  }

  function setupNavScroll() {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > 60) {
        navbar.classList.add("nav--scrolled");
      } else {
        navbar.classList.remove("nav--scrolled");
      }
      lastScroll = y;
    }, { passive: true });
  }

  // ─── Sections ──────────────────────────────────────────────
  function buildSections() {
    const cfg = SITE_CONFIG.sections;

    // About
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.querySelector(".section-pretitle").textContent = cfg.about.preTitle;
      aboutSection.querySelector(".section-title").innerHTML = cfg.about.title.replace(/\n/g, "<br>");
      const paras = aboutSection.querySelector(".about-text");
      if (paras) {
        paras.innerHTML = cfg.about.paragraphs.map(p =>
          `<p class="reveal-item">${p}</p>`
        ).join("");
      }
    }

    // Ingredients
    const ingredSection = document.getElementById("ingredients");
    if (ingredSection) {
      ingredSection.querySelector(".section-pretitle").textContent = cfg.ingredients.preTitle;
      ingredSection.querySelector(".section-title").textContent = cfg.ingredients.title;
      const grid = ingredSection.querySelector(".ingredients-grid");
      if (grid) {
        grid.innerHTML = cfg.ingredients.items.map((item, i) =>
          `<div class="ingredient-card reveal-item" style="--delay: ${i * 0.1}s">
            <div class="ingredient-icon">${item.icon}</div>
            <h3 class="ingredient-name">${item.name}</h3>
            <p class="ingredient-detail">${item.detail}</p>
          </div>`
        ).join("");
      }
    }

    // Experience
    const expSection = document.getElementById("experience");
    if (expSection) {
      expSection.querySelector(".section-pretitle").textContent = cfg.experience.preTitle;
      expSection.querySelector(".section-title").innerHTML = cfg.experience.title.replace(/\n/g, "<br>");
      expSection.querySelector(".experience-quote").textContent = `"${cfg.experience.quote}"`;
      const ctaBtn = expSection.querySelector(".cta-button");
      if (ctaBtn) {
        ctaBtn.textContent = cfg.experience.cta.label;
        ctaBtn.href = cfg.experience.cta.url;
      }
    }
  }

  function buildFooter() {
    const cfg = SITE_CONFIG.footer;
    const footerBrand = document.getElementById("footer-brand");
    if (footerBrand) footerBrand.textContent = SITE_CONFIG.brand.name;

    const footerCopy = document.getElementById("footer-copy");
    if (footerCopy) footerCopy.textContent = cfg.copyright;

    const footerLinks = document.getElementById("footer-links");
    if (footerLinks) {
      footerLinks.innerHTML = cfg.links.map(l =>
        `<a href="${l.url}" class="footer-link">${l.label}</a>`
      ).join("");
    }

    const footerSocial = document.getElementById("footer-social");
    if (footerSocial) {
      footerSocial.innerHTML = SITE_CONFIG.social.map(s =>
        `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="${s.name}">${s.icon}</a>`
      ).join("");
    }
  }

  // ─── Variant System ────────────────────────────────────────
  function buildVariantPills() {
    if (!variantPills) return;
    if (SITE_CONFIG.variants.length <= 1) {
      variantPills.style.display = "none";
      return;
    }

    variantPills.innerHTML = SITE_CONFIG.variants.map((v, i) =>
      `<button class="variant-pill ${i === 0 ? "active" : ""}" data-index="${i}" style="--pill-color: ${v.themeColor}">
        <span class="pill-dot"></span>
        <span class="pill-label">${v.name}</span>
      </button>`
    ).join("");

    variantPills.addEventListener("click", (e) => {
      const pill = e.target.closest(".variant-pill");
      if (!pill) return;
      const idx = parseInt(pill.dataset.index, 10);
      if (idx !== activeVariant) switchVariant(idx);
    });
  }

  function setActiveVariant(index) {
    const v = SITE_CONFIG.variants[index];
    if (!v) return;

    activeVariant = index;

    // Update text
    if (heroName)     heroName.textContent     = v.name;
    if (heroSubtitle) heroSubtitle.textContent = v.subtitle;
    if (heroDesc)     heroDesc.textContent     = v.description;

    // Update theme accent
    theme.setAccent(v.themeColor, v.themeColorRGB);
    if (v.mode) theme.setMode(v.mode);

    // Update pills
    document.querySelectorAll(".variant-pill").forEach((pill, i) => {
      pill.classList.toggle("active", i === index);
    });

    // Initialise frame engine
    const opts = {
      frameSkip:         SITE_CONFIG.performance.frameSkip,
      preloadBatchSize:  SITE_CONFIG.performance.preloadBatchSize,
    };

    if (engine) engine.destroy();
    engine = new FrameEngine(canvas, v, opts);

    engine.onProgress = (pct) => {
      if (loaderBar)     loaderBar.style.width    = pct + "%";
      if (loaderPercent) loaderPercent.textContent = pct + "%";
    };

    engine.onReady = () => {
      if (loader) {
        loader.classList.add("loader--done");
        setTimeout(() => { loader.style.display = "none"; }, 600);
      }
      // Draw correct frame for current scroll position
      updateFrameFromScroll();
    };

    engine.preload();
  }

  async function switchVariant(index) {
    const v = SITE_CONFIG.variants[index];
    if (!v) return;

    activeVariant = index;

    // Fade out hero text
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) heroContent.classList.add("fading");

    // Update pills
    document.querySelectorAll(".variant-pill").forEach((pill, i) => {
      pill.classList.toggle("active", i === index);
    });

    // Update accent
    theme.setAccent(v.themeColor, v.themeColorRGB);
    if (v.mode) theme.setMode(v.mode);

    // Show loader again
    if (loader) {
      loader.style.display = "flex";
      loader.classList.remove("loader--done");
    }

    // Switch engine
    const opts = {
      frameSkip:         SITE_CONFIG.performance.frameSkip,
      preloadBatchSize:  SITE_CONFIG.performance.preloadBatchSize,
    };

    engine.onProgress = (pct) => {
      if (loaderBar)     loaderBar.style.width    = pct + "%";
      if (loaderPercent) loaderPercent.textContent = pct + "%";
    };

    await engine.switchVariant(v);

    // Update text
    if (heroName)     heroName.textContent     = v.name;
    if (heroSubtitle) heroSubtitle.textContent = v.subtitle;
    if (heroDesc)     heroDesc.textContent     = v.description;

    // Fade in
    if (heroContent) heroContent.classList.remove("fading");

    // Hide loader
    if (loader) {
      loader.classList.add("loader--done");
      setTimeout(() => { loader.style.display = "none"; }, 600);
    }

    updateFrameFromScroll();
  }

  // ─── Scroll → Frame Mapping ────────────────────────────────
  function setupScrollHandler() {
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateFrameFromScroll();
        updateHeroParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateFrameFromScroll() {
    if (!engine || !heroSection) return;

    const rect       = heroSection.getBoundingClientRect();
    const sectionH   = heroSection.offsetHeight - window.innerHeight;
    const scrolled   = -rect.top;
    const progress   = Math.max(0, Math.min(1, scrolled / sectionH));

    engine.setProgress(progress);

    // Hide fixed elements once past hero
    const canvasWrapper = document.querySelector(".hero-canvas-wrapper");
    const heroContent   = document.querySelector(".hero-content");
    const pastHero      = rect.bottom <= 0;

    if (canvasWrapper) canvasWrapper.style.visibility = pastHero ? "hidden" : "visible";
    if (heroContent)   heroContent.style.visibility   = pastHero ? "hidden" : "visible";
  }

  function updateHeroParallax() {
    const heroContent = document.querySelector(".hero-content");
    if (!heroContent) return;

    const scrollY  = window.scrollY;
    const winH     = window.innerHeight;
    const progress = Math.min(scrollY / winH, 1);

    // Fade out and shift hero content as user scrolls
    heroContent.style.opacity   = 1 - progress * 1.5;
    heroContent.style.transform = `translateY(${progress * -60}px)`;

    // Scroll indicator fade
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.style.opacity = 1 - progress * 3;
    }
  }

  // ─── Intersection Observer ─────────────────────────────────
  function setupIntersectionObservers() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // Don't unobserve — keep watching for re-entry if desired
        }
      });
    }, observerOptions);

    // Observe all reveal items
    document.querySelectorAll(".reveal-item, .section-pretitle, .section-title, .ingredient-card, .experience-quote, .cta-button").forEach(el => {
      observer.observe(el);
    });
  }

  // ─── Smooth Scrolling ──────────────────────────────────────
  function setupSmoothScrolling() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ─── Boot ──────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
