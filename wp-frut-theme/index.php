<?php get_header(); ?>

  <!-- ════════════════════════════════════════════════════════════
       HERO SECTION
       ════════════════════════════════════════════════════════════ -->
  <section id="hero" class="hero">
    <!-- Canvas background -->
    <div class="hero-canvas-wrapper">
      <canvas id="hero-canvas"></canvas>
    </div>

    <!-- Overlaid text content -->
    <div class="hero-content">
      <div class="hero-text-block">
        <h1 class="hero-name" id="hero-name">Passion Fruit</h1>
        <p class="hero-subtitle" id="hero-subtitle">Tropical Intensity</p>
        <p class="hero-desc" id="hero-desc">Sun-ripened passion fruit, cold-pressed and bottled at peak flavor.</p>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <span class="scroll-indicator-text">Scroll</span>
      <svg class="scroll-indicator-arrow" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>

    <!-- Variant pills -->
    <div id="variant-pills" class="variant-pills">
      <!-- Populated by JS if multiple variants -->
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════
       ABOUT SECTION
       ════════════════════════════════════════════════════════════ -->
  <section id="about" class="section">
    <div class="section-inner">
      <span class="section-pretitle">Our Story</span>
      <h2 class="section-title">Crafted by Nature</h2>
      <div class="about-text">
        <!-- Populated by JS -->
      </div>
      <div class="about-divider"></div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════
       INGREDIENTS SECTION
       ════════════════════════════════════════════════════════════ -->
  <section id="ingredients" class="section">
    <div class="section-inner">
      <span class="section-pretitle">What's Inside</span>
      <h2 class="section-title">Nothing to Hide</h2>
      <div class="ingredients-grid">
        <!-- Populated by JS -->
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════
       EXPERIENCE SECTION
       ════════════════════════════════════════════════════════════ -->
  <section id="experience" class="section section--experience">
    <div class="section-inner">
      <span class="section-pretitle">The Experience</span>
      <h2 class="section-title">Feel the Difference</h2>
      <p class="experience-quote">"One sip and you'll taste what real fruit is supposed to taste like."</p>
      <a href="#" class="cta-button">Shop Now</a>
    </div>
  </section>

<?php get_footer(); ?>
