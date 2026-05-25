<?php
/**
 * FRŪT Cinematic Theme Functions
 */

function frut_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'frut_theme_setup');

function frut_enqueue_scripts() {
    // Theme CSS
    wp_enqueue_style('frut-style', get_stylesheet_uri(), array(), '1.0');

    // Config Script
    wp_enqueue_script('frut-config', get_template_directory_uri() . '/js/config.js', array(), '1.0', true);

    // Localize the theme directory URL to window.wpTheme for config.js
    wp_localize_script('frut-config', 'wpTheme', array(
        'themeUrl' => get_template_directory_uri()
    ));

    // Theme JS Scripts
    wp_enqueue_script('frut-theme-js', get_template_directory_uri() . '/js/theme.js', array(), '1.0', true);
    wp_enqueue_script('frut-frame-engine', get_template_directory_uri() . '/js/frame-engine.js', array(), '1.0', true);
    wp_enqueue_script('frut-app', get_template_directory_uri() . '/js/app.js', array('frut-config', 'frut-theme-js', 'frut-frame-engine'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'frut_enqueue_scripts');
