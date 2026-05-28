# FRŪT — Scroll-Driven Interactive Product Showcase

A high-fidelity, scroll-driven interactive product showcase website featuring a premium craft drink brand. It uses a custom-built, canvas-based progressive frame-by-frame animation engine that rotates/reveals a product bottle as the user scrolls, creating a premium cinematic experience.

---

## 🌟 Key Features

* **Scroll-Driven Animation Engine (`FrameEngine`):** A custom canvas-based sequence renderer that progressively preloads high-definition frame images in batches to prevent scroll lag. It handles high-DPI (Retina) displays by scaling logical viewport coordinates.
* **Fully Configurable (`js/config.js`):** The entire site's layout, copy, social links, navigation menu, and drink flavors/variants can be configured from a single configuration file.
* **Dynamic Accent Colors & Theme Toggling:** Integrates a custom `ThemeManager` that supports light/dark mode (saved in `localStorage`), transitions smoothly, and adapts the UI accent color on-the-fly when switching between product variants.
* **Modern CSS Aesthetics:** Built with custom CSS properties (variables), modern layouts (Flexbox, CSS Grid), responsive design for all screen widths, glassmorphism, and smooth scroll effects.
* **Intersection Observer Reveals:** Performance-optimized scroll triggers that reveal text blocks, ingredients, and call-to-actions as they enter the viewport.
* **WordPress Theme Ready:** Pre-configured dynamic asset path resolution hooks (`window.wpTheme` checks) that make it extremely easy to port the static site into a WordPress theme.

---

## 🛠️ Technology Stack

* **HTML5:** Semantic architecture to maximize accessibility (ARIA roles) and SEO.
* **CSS3 (Vanilla):** Modern styling featuring HSL dynamic colors, smooth CSS transitions, theme state-handling via `[data-theme="dark/light"]` selectors, and media queries for tablet/mobile devices.
* **JavaScript (Vanilla ES6+):** Object-Oriented modular JavaScript that orchestrates rendering, theme, and layouts with **zero external dependencies** (no jQuery, GSAP, React, etc.), keeping load times under a second.
* **Assets:** A sequence of 240 optimized PNG frames depicting the bottle animation.

---

## 📁 Directory Structure

```text
Animation_Web/
├── products/
│   └── passion/           # 240 frame images for the bottle animation
│       ├── frame_000_delay-0.033s.png
│       └── ...
├── js/
│   ├── config.js          # Core website content and behavior configuration
│   ├── frame-engine-v2.js # Canvas scroll animation controller
│   ├── theme.js           # Light/dark mode and variant styling orchestrator
│   └── app.js             # Main orchestrator initializing modules and handlers
├── css/
│   └── style.css          # Core stylesheet containing custom styles & animations
├── assets/                # Directory for static UI assets (images/logos)
├── index.html             # Website entrypoint
└── README.md              # Project documentation
```

---

## 🚀 How to Run Locally

Since this project relies on preloading image sequences asynchronously via JavaScript (`fetch`/`Image.src` requests), modern browsers will block these local assets due to **CORS policies** if you open `index.html` directly from your file system (using the `file://` protocol). 

You must serve the directory using a local web server:

### Option 1: Using Python (Simplest)
If you have Python installed, open your terminal inside the project root and run:

**Python 3.x:**
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

### Option 2: Using Node.js (npx)
If you have Node.js installed, run:
```bash
npx serve
```
Then open the local URL printed in your terminal (usually `http://localhost:3000` or `http://localhost:5000`).

---

### Option 3: Using PHP
If you have PHP installed, run:
```bash
php -S localhost:8000
```
Then open `http://localhost:8000` in your web browser.

---

### Option 4: VS Code Live Server
If you use VS Code, install the extension **Live Server**, right-click `index.html`, and select **Open with Live Server**.

---

## ⚙️ Configuration & Customization

The layout is designed to be modified without editing HTML structure. Open `js/config.js` to change:

### 1. Adding a New Product Variant
To add a new flavor (e.g., Mango Bliss):
1. Place your 240-frame sequence folder under `products/mango/` named `frame_{index}_delay-0.033s.png`.
2. Add the config object to the `variants` array:
```javascript
{
  id: "mango",
  name: "Mango Bliss",
  subtitle: "Golden Tropics",
  description: "Delicious cold-pressed mango juice.",
  themeColor: "#E8A838",
  themeColorRGB: "232, 168, 56",
  mode: null, // use default global theme mode or set "dark" / "light"
  framePath: "products/mango/",
  frameCount: 240,
  framePattern: "frame_{index}_delay-0.033s.png",
}
```

### 2. Tuning Performance
Modify the `performance` block inside `js/config.js` to match your performance target:
* `frameSkip`: Set to `2` to load only every alternate frame (greatly reduces download size and network payloads).
* `preloadBatchSize`: Determines how many frames are fetched simultaneously.
* `heroScrollMultiplier`: Adjusts the scrolling distance needed to complete the bottle rotation animation.
