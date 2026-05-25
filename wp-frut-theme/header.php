<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="dark">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

  <!-- ════════════════════════════════════════════════════════════
       LOADER
       ════════════════════════════════════════════════════════════ -->
  <div id="loader" class="loader">
    <div class="loader-brand" id="loader-brand">FRŪT</div>
    <div class="loader-track">
      <div class="loader-bar" id="loader-bar"></div>
    </div>
    <div class="loader-percent" id="loader-percent">0%</div>
  </div>

  <!-- ════════════════════════════════════════════════════════════
       NAVIGATION
       ════════════════════════════════════════════════════════════ -->
  <nav id="navbar" class="navbar" aria-label="Main navigation">
    <!-- Brand -->
    <a href="#hero" class="nav-brand" id="brand-name">FRŪT</a>

    <!-- Center links -->
    <div class="nav-center" id="nav-links">
      <!-- Populated by JS -->
    </div>

    <!-- Right side: social + theme toggle -->
    <div class="nav-right">
      <div id="social-links" class="nav-social">
        <!-- Populated by JS -->
      </div>

      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark/light mode">
        <!-- Sun icon (shown in dark mode → click to go light) -->
        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <!-- Moon icon (shown in light mode → click to go dark) -->
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             style="opacity: 0; transform: rotate(-90deg);">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>
  </nav>
