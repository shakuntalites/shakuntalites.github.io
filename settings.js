/**
 * ╔══════════════════════════════════════════════╗
 * ║        SHAKUNTALITES — SETTINGS ENGINE       ║
 * ║   Shakuntalam School • Banasthali Vidyapith  ║
 * ╚══════════════════════════════════════════════╝
 *
 * Drop this file next to index.html and add at
 * the bottom of <body>:
 *   <script src="settings.js"></script>
 *
 * All settings are saved to localStorage and
 * applied instantly via CSS custom properties.
 */

(function () {
  "use strict";

  /* ─────────────────────────────────────────────
   * 1.  DEFAULT SETTINGS
   * ───────────────────────────────────────────── */
  const DEFAULTS = {
    /* ── Colour Palette ── */
    colorPrimary:      "#c9a84c",   // gold
    colorSecondary:    "#8b6914",   // deep gold
    colorAccent:       "#e8c97a",   // light gold
    colorBg:           "#fffdf5",   // warm cream
    colorSurface:      "#fff8e7",   // card surface
    colorText:         "#2c1a00",   // dark brown
    colorTextMuted:    "#7a6030",   // muted gold-brown
    colorBorder:       "#d4af5a",   // border gold
    colorOverlay:      "rgba(201,168,76,0.10)",

    /* ── Theme preset name (for display) ── */
    themePreset: "classic-gold",

    /* ── Typography ── */
    fontHeading:  "'Playfair Display', Georgia, serif",
    fontBody:     "'Lato', 'Segoe UI', sans-serif",
    fontMono:     "'Courier New', monospace",
    fontSizeBase:  16,   // px  — body copy
    fontSizeScale: 1.25, // major-third scale ratio
    lineHeight:    1.7,
    letterSpacing: "0.01em",
    fontWeightBold: 700,

    /* ── Spacing & Layout ── */
    spacingUnit:   8,    // px — multiplied for padding/gaps
    borderRadius:  8,    // px
    cardShadow:    "0 4px 24px rgba(139,105,20,0.12)",
    maxWidth:      1200, // px

    /* ── Animations ── */
    animSpeed:     "0.35",   // seconds
    animEasing:    "cubic-bezier(0.4,0,0.2,1)",
    enableAnimations: true,
    enableParallax:   true,

    /* ── Gallery ── */
    galleryColumns:  3,      // 1–4
    galleryGap:      16,     // px
    galleryRadius:   6,      // px

    /* ── Navbar ── */
    navbarBlur:     true,
    navbarShadow:   true,

    /* ── Misc ── */
    showScrollTop:  true,
    compactMode:    false,
    highContrast:   false,
  };

  /* ─────────────────────────────────────────────
   * 2.  COLOUR THEME PRESETS
   * ───────────────────────────────────────────── */
  const PRESETS = {
    "classic-gold": {
      label: "Classic Gold",
      colorPrimary:   "#c9a84c",
      colorSecondary: "#8b6914",
      colorAccent:    "#e8c97a",
      colorBg:        "#fffdf5",
      colorSurface:   "#fff8e7",
      colorText:      "#2c1a00",
      colorTextMuted: "#7a6030",
      colorBorder:    "#d4af5a",
      colorOverlay:   "rgba(201,168,76,0.10)",
    },
    "deep-maroon": {
      label: "Deep Maroon",
      colorPrimary:   "#8b1a2f",
      colorSecondary: "#5c0f1e",
      colorAccent:    "#d4556a",
      colorBg:        "#fff5f5",
      colorSurface:   "#fff0f0",
      colorText:      "#1a0005",
      colorTextMuted: "#7a303a",
      colorBorder:    "#c97080",
      colorOverlay:   "rgba(139,26,47,0.10)",
    },
    "forest-green": {
      label: "Forest Green",
      colorPrimary:   "#2e7d32",
      colorSecondary: "#1b5e20",
      colorAccent:    "#66bb6a",
      colorBg:        "#f5fff5",
      colorSurface:   "#f0fff0",
      colorText:      "#001a00",
      colorTextMuted: "#3a6b3a",
      colorBorder:    "#5dab61",
      colorOverlay:   "rgba(46,125,50,0.10)",
    },
    "midnight-blue": {
      label: "Midnight Blue",
      colorPrimary:   "#1a3a6b",
      colorSecondary: "#0d1f3c",
      colorAccent:    "#4a7fc1",
      colorBg:        "#f5f8ff",
      colorSurface:   "#eef2fc",
      colorText:      "#000d1a",
      colorTextMuted: "#3a5080",
      colorBorder:    "#4a6fa0",
      colorOverlay:   "rgba(26,58,107,0.10)",
    },
    "dark-mode": {
      label: "Dark Mode",
      colorPrimary:   "#c9a84c",
      colorSecondary: "#e8c97a",
      colorAccent:    "#f5dfa0",
      colorBg:        "#1a1200",
      colorSurface:   "#231800",
      colorText:      "#fff8e7",
      colorTextMuted: "#c9a84c",
      colorBorder:    "#5a440a",
      colorOverlay:   "rgba(201,168,76,0.08)",
    },
  };

  /* ─────────────────────────────────────────────
   * 3.  FONT PRESETS
   * ───────────────────────────────────────────── */
  const FONT_PRESETS = {
    "playfair-lato":   { label: "Playfair + Lato (Default)", heading: "'Playfair Display', Georgia, serif", body: "'Lato', 'Segoe UI', sans-serif" },
    "cormorant-jost":  { label: "Cormorant + Jost",          heading: "'Cormorant Garamond', Georgia, serif", body: "'Jost', sans-serif" },
    "merriweather":    { label: "Merriweather + Source Sans", heading: "'Merriweather', serif",              body: "'Source Sans Pro', sans-serif" },
    "cinzel":          { label: "Cinzel + Raleway",           heading: "'Cinzel', serif",                    body: "'Raleway', sans-serif" },
    "system":          { label: "System UI",                  heading: "Georgia, serif",                     body: "system-ui, sans-serif" },
  };

  /* ─────────────────────────────────────────────
   * 4.  STORAGE HELPERS
   * ───────────────────────────────────────────── */
  const STORAGE_KEY = "shakuntalites_settings";

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
    } catch (_) { return { ...DEFAULTS }; }
  }

  function saveSettings(s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (_) {}
  }

  /* ─────────────────────────────────────────────
   * 5.  APPLY SETTINGS → CSS CUSTOM PROPERTIES
   * ───────────────────────────────────────────── */
  function applySettings(s) {
    const r = document.documentElement;
    const sp = (n, v) => r.style.setProperty(n, v);

    /* Colours */
    sp("--color-primary",    s.colorPrimary);
    sp("--color-secondary",  s.colorSecondary);
    sp("--color-accent",     s.colorAccent);
    sp("--color-bg",         s.colorBg);
    sp("--color-surface",    s.colorSurface);
    sp("--color-text",       s.colorText);
    sp("--color-text-muted", s.colorTextMuted);
    sp("--color-border",     s.colorBorder);
    sp("--color-overlay",    s.colorOverlay);

    /* Typography */
    sp("--font-heading",      s.fontHeading);
    sp("--font-body",         s.fontBody);
    sp("--font-mono",         s.fontMono);
    sp("--font-size-base",    s.fontSizeBase + "px");
    sp("--line-height",       s.lineHeight);
    sp("--letter-spacing",    s.letterSpacing);

    // Derived scale sizes
    const sc = parseFloat(s.fontSizeScale) || 1.25;
    const base = parseInt(s.fontSizeBase) || 16;
    sp("--font-size-sm",   Math.round(base / sc)         + "px");
    sp("--font-size-md",   base                          + "px");
    sp("--font-size-lg",   Math.round(base * sc)         + "px");
    sp("--font-size-xl",   Math.round(base * sc * sc)    + "px");
    sp("--font-size-2xl",  Math.round(base * sc**3)      + "px");
    sp("--font-size-3xl",  Math.round(base * sc**4)      + "px");
    sp("--font-weight-bold", String(s.fontWeightBold));

    /* Spacing */
    const u = parseInt(s.spacingUnit) || 8;
    sp("--space-xs",  u / 2  + "px");
    sp("--space-sm",  u      + "px");
    sp("--space-md",  u * 2  + "px");
    sp("--space-lg",  u * 3  + "px");
    sp("--space-xl",  u * 4  + "px");
    sp("--space-2xl", u * 6  + "px");
    sp("--border-radius",    s.borderRadius  + "px");
    sp("--card-shadow",      s.cardShadow);
    sp("--max-width",        s.maxWidth      + "px");

    /* Animations */
    sp("--anim-speed",  s.animSpeed + "s");
    sp("--anim-easing", s.animEasing);

    /* Gallery */
    sp("--gallery-columns", String(s.galleryColumns));
    sp("--gallery-gap",     s.galleryGap + "px");
    sp("--gallery-radius",  s.galleryRadius + "px");

    /* Body-level classes */
    document.body.dataset.compact      = s.compactMode    ? "1" : "0";
    document.body.dataset.highContrast = s.highContrast   ? "1" : "0";
    document.body.dataset.noAnim       = s.enableAnimations ? "0" : "1";
    document.body.style.fontSize       = s.fontSizeBase   + "px";
    document.body.style.fontFamily     = s.fontBody;
    document.body.style.background     = s.colorBg;
    document.body.style.color          = s.colorText;

    /* Compact mode global rule */
    let cmStyle = document.getElementById("__skt-compact-style");
    if (!cmStyle) {
      cmStyle = document.createElement("style");
      cmStyle.id = "__skt-compact-style";
      document.head.appendChild(cmStyle);
    }
    cmStyle.textContent = s.compactMode
      ? "section, .section { padding-top: 24px !important; padding-bottom: 24px !important; } .card, .memory-card { margin-bottom: 12px !important; }"
      : "";

    /* Disable animations globally */
    let animStyle = document.getElementById("__skt-anim-style");
    if (!animStyle) {
      animStyle = document.createElement("style");
      animStyle.id = "__skt-anim-style";
      document.head.appendChild(animStyle);
    }
    animStyle.textContent = !s.enableAnimations
      ? "*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }"
      : "";
  }

  /* ─────────────────────────────────────────────
   * 6.  BUILD THE SETTINGS PANEL UI
   * ───────────────────────────────────────────── */
  function buildPanel(s, onChange) {

    /* ── Inject panel styles ── */
    const style = document.createElement("style");
    style.textContent = `
      #skt-settings-fab {
        position: fixed; bottom: 28px; right: 28px; z-index: 99999;
        width: 52px; height: 52px; border-radius: 50%;
        background: var(--color-primary, #c9a84c);
        border: 2px solid var(--color-secondary, #8b6914);
        color: var(--color-bg, #fffdf5);
        font-size: 22px; cursor: pointer;
        box-shadow: 0 4px 16px rgba(139,105,20,0.35);
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.3s, box-shadow 0.3s;
      }
      #skt-settings-fab:hover { transform: scale(1.1) rotate(30deg); box-shadow: 0 6px 24px rgba(139,105,20,0.5); }

      #skt-settings-panel {
        position: fixed; top: 0; right: 0; height: 100vh;
        width: 340px; max-width: 95vw;
        background: var(--color-surface, #fff8e7);
        border-left: 2px solid var(--color-border, #d4af5a);
        box-shadow: -4px 0 40px rgba(139,105,20,0.18);
        z-index: 99998; overflow-y: auto;
        transform: translateX(100%);
        transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
        font-family: var(--font-body, 'Lato', sans-serif);
        font-size: 14px; color: var(--color-text, #2c1a00);
      }
      #skt-settings-panel.open { transform: translateX(0); }

      .skt-panel-header {
        position: sticky; top: 0; z-index: 2;
        background: var(--color-primary, #c9a84c);
        color: var(--color-bg, #fffdf5);
        padding: 18px 20px 14px;
        display: flex; align-items: center; justify-content: space-between;
        border-bottom: 2px solid var(--color-secondary, #8b6914);
      }
      .skt-panel-header h2 { margin: 0; font-size: 16px; font-weight: 700; letter-spacing: 0.06em; }
      .skt-panel-header span { font-size: 11px; opacity: 0.8; }
      #skt-close-btn {
        background: none; border: none; color: inherit;
        font-size: 20px; cursor: pointer; line-height: 1; padding: 0 4px;
      }

      .skt-section {
        border-bottom: 1px solid var(--color-border, #d4af5a);
        padding: 16px 18px;
      }
      .skt-section-title {
        font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
        text-transform: uppercase; color: var(--color-secondary, #8b6914);
        margin: 0 0 12px;
      }
      .skt-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; gap: 8px; }
      .skt-row:last-child { margin-bottom: 0; }
      .skt-label { font-size: 13px; flex: 1; min-width: 0; }
      .skt-sublabel { font-size: 11px; color: var(--color-text-muted, #7a6030); display: block; }

      .skt-row input[type=range] {
        flex: 1; max-width: 120px; accent-color: var(--color-primary, #c9a84c);
      }
      .skt-range-val { font-size: 12px; min-width: 32px; text-align: right; color: var(--color-secondary, #8b6914); font-weight: 600; }
      .skt-row input[type=color] {
        width: 36px; height: 28px; border: 2px solid var(--color-border, #d4af5a);
        border-radius: 4px; padding: 2px; cursor: pointer; background: none;
      }
      .skt-row select {
        flex: 1; max-width: 160px; font-size: 12px;
        border: 1px solid var(--color-border, #d4af5a);
        border-radius: 4px; padding: 4px 6px;
        background: var(--color-bg, #fffdf5);
        color: var(--color-text, #2c1a00);
      }
      .skt-toggle {
        position: relative; width: 40px; height: 22px; flex-shrink: 0;
      }
      .skt-toggle input { opacity: 0; width: 0; height: 0; }
      .skt-toggle-track {
        position: absolute; inset: 0; border-radius: 11px;
        background: #ccc; cursor: pointer; transition: background 0.25s;
      }
      .skt-toggle-track::after {
        content: ''; position: absolute; left: 3px; top: 3px;
        width: 16px; height: 16px; border-radius: 50%;
        background: #fff; transition: transform 0.25s; box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      }
      .skt-toggle input:checked + .skt-toggle-track { background: var(--color-primary, #c9a84c); }
      .skt-toggle input:checked + .skt-toggle-track::after { transform: translateX(18px); }

      .skt-preset-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .skt-preset-btn {
        border: 2px solid transparent; border-radius: 6px; padding: 8px 6px;
        cursor: pointer; font-size: 12px; font-weight: 600;
        text-align: center; transition: border-color 0.2s, transform 0.15s;
        display: flex; align-items: center; gap: 6px;
      }
      .skt-preset-btn:hover { transform: scale(1.02); }
      .skt-preset-btn.active { border-color: var(--color-secondary, #8b6914) !important; }
      .skt-preset-swatch { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0,0,0,0.15); }

      .skt-action-row { display: flex; gap: 8px; margin-top: 4px; }
      .skt-btn {
        flex: 1; padding: 8px; border-radius: 6px; border: none;
        font-size: 12px; font-weight: 700; cursor: pointer; letter-spacing: 0.04em;
        transition: opacity 0.2s, transform 0.15s;
      }
      .skt-btn:hover { opacity: 0.85; transform: translateY(-1px); }
      .skt-btn-primary { background: var(--color-primary, #c9a84c); color: var(--color-bg, #fffdf5); }
      .skt-btn-ghost { background: none; border: 1.5px solid var(--color-border, #d4af5a); color: var(--color-text, #2c1a00); }
      .skt-btn-danger { background: #c0392b; color: #fff; }

      .skt-saved-toast {
        position: fixed; bottom: 90px; right: 28px; z-index: 99999;
        background: var(--color-primary, #c9a84c); color: var(--color-bg, #fffdf5);
        padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        opacity: 0; transform: translateY(8px);
        transition: opacity 0.3s, transform 0.3s; pointer-events: none;
      }
      .skt-saved-toast.show { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(style);

    /* ── FAB toggle button ── */
    const fab = document.createElement("button");
    fab.id = "skt-settings-fab";
    fab.title = "Site Settings";
    fab.innerHTML = "⚙";
    document.body.appendChild(fab);

    /* ── Toast ── */
    const toast = document.createElement("div");
    toast.className = "skt-saved-toast";
    toast.textContent = "✓ Settings saved";
    document.body.appendChild(toast);

    function showToast() {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    }

    /* ── Helper: make toggle ── */
    function makeToggle(key) {
      const wrap = document.createElement("label");
      wrap.className = "skt-toggle";
      const inp = document.createElement("input");
      inp.type = "checkbox"; inp.checked = !!s[key];
      inp.addEventListener("change", () => { s[key] = inp.checked; onChange(s); });
      const track = document.createElement("span");
      track.className = "skt-toggle-track";
      wrap.appendChild(inp); wrap.appendChild(track);
      return wrap;
    }

    /* ── Helper: make range ── */
    function makeRange(key, min, max, step, unit) {
      const wrap = document.createElement("div");
      wrap.style.cssText = "display:flex;align-items:center;gap:6px;flex:1;justify-content:flex-end";
      const inp = document.createElement("input");
      inp.type = "range"; inp.min = min; inp.max = max; inp.step = step; inp.value = s[key];
      const val = document.createElement("span");
      val.className = "skt-range-val";
      val.textContent = s[key] + (unit || "");
      inp.addEventListener("input", () => {
        s[key] = parseFloat(inp.value);
        val.textContent = inp.value + (unit || "");
        onChange(s);
      });
      wrap.appendChild(inp); wrap.appendChild(val);
      return wrap;
    }

    /* ── Helper: make colour picker ── */
    function makeColor(key) {
      const inp = document.createElement("input");
      inp.type = "color"; inp.value = s[key];
      inp.addEventListener("input", () => { s[key] = inp.value; onChange(s); });
      return inp;
    }

    /* ── Helper: row builder ── */
    function row(labelText, control, sublabel) {
      const r = document.createElement("div");
      r.className = "skt-row";
      const lbl = document.createElement("span");
      lbl.className = "skt-label";
      lbl.innerHTML = labelText + (sublabel ? `<span class="skt-sublabel">${sublabel}</span>` : "");
      r.appendChild(lbl); r.appendChild(control);
      return r;
    }

    /* ── Panel element ── */
    const panel = document.createElement("div");
    panel.id = "skt-settings-panel";
    panel.innerHTML = `
      <div class="skt-panel-header">
        <div>
          <h2>⚙ Settings</h2>
          <span>Shakuntalites • Shakuntalam School</span>
        </div>
        <button id="skt-close-btn" title="Close">✕</button>
      </div>
    `;

    /* ───── COLOUR THEME ───── */
    const colourSection = document.createElement("div");
    colourSection.className = "skt-section";
    colourSection.innerHTML = `<p class="skt-section-title">🎨 Colour Theme</p>`;

    const grid = document.createElement("div");
    grid.className = "skt-preset-grid";

    Object.entries(PRESETS).forEach(([key, preset]) => {
      const btn = document.createElement("button");
      btn.className = "skt-preset-btn" + (s.themePreset === key ? " active" : "");
      btn.style.cssText = `background:${preset.colorBg};color:${preset.colorText};border-color:${preset.colorBorder}`;
      btn.innerHTML = `<span class="skt-preset-swatch" style="background:${preset.colorPrimary}"></span>${preset.label}`;
      btn.addEventListener("click", () => {
        Object.assign(s, preset, { themePreset: key });
        panel.querySelectorAll(".skt-preset-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        // sync colour pickers
        panel.querySelectorAll("[data-color-key]").forEach(inp => {
          inp.value = s[inp.dataset.colorKey] || inp.value;
        });
        onChange(s);
      });
      grid.appendChild(btn);
    });
    colourSection.appendChild(grid);

    /* Individual colour pickers */
    colourSection.innerHTML += `<p class="skt-section-title" style="margin-top:14px">Custom Colours</p>`;
    [
      ["colorPrimary",   "Primary (Gold)"],
      ["colorSecondary", "Secondary"],
      ["colorAccent",    "Accent"],
      ["colorBg",        "Background"],
      ["colorSurface",   "Card Surface"],
      ["colorText",      "Body Text"],
      ["colorTextMuted", "Muted Text"],
      ["colorBorder",    "Border"],
    ].forEach(([key, label]) => {
      const inp = makeColor(key);
      inp.dataset.colorKey = key;
      colourSection.appendChild(row(label, inp));
    });

    panel.appendChild(colourSection);

    /* ───── TYPOGRAPHY ───── */
    const typoSection = document.createElement("div");
    typoSection.className = "skt-section";
    typoSection.innerHTML = `<p class="skt-section-title">✏️ Typography</p>`;

    /* Font preset select */
    const fontSel = document.createElement("select");
    Object.entries(FONT_PRESETS).forEach(([key, fp]) => {
      const opt = document.createElement("option"); opt.value = key; opt.textContent = fp.label;
      if (s.fontHeading === fp.heading) opt.selected = true;
      fontSel.appendChild(opt);
    });
    fontSel.addEventListener("change", () => {
      const fp = FONT_PRESETS[fontSel.value];
      if (fp) { s.fontHeading = fp.heading; s.fontBody = fp.body; onChange(s); }
    });
    typoSection.appendChild(row("Font Pair", fontSel));

    typoSection.appendChild(row("Base Size", makeRange("fontSizeBase", 12, 22, 1, "px"), "body text size"));
    typoSection.appendChild(row("Scale Ratio", makeRange("fontSizeScale", 1.1, 1.5, 0.05, "×"), "h1→h6 scaling"));
    typoSection.appendChild(row("Line Height", makeRange("lineHeight", 1.3, 2.2, 0.05, ""), "readability"));
    typoSection.appendChild(row("Bold Weight", makeRange("fontWeightBold", 400, 900, 100, ""), "heading weight"));

    panel.appendChild(typoSection);

    /* ───── SPACING & LAYOUT ───── */
    const spaceSection = document.createElement("div");
    spaceSection.className = "skt-section";
    spaceSection.innerHTML = `<p class="skt-section-title">📐 Spacing & Layout</p>`;

    spaceSection.appendChild(row("Spacing Unit",    makeRange("spacingUnit",   4, 16, 2, "px"), "base spacing block"));
    spaceSection.appendChild(row("Border Radius",   makeRange("borderRadius",  0, 24, 2, "px")));
    spaceSection.appendChild(row("Max Page Width",  makeRange("maxWidth",   900, 1600, 50, "px")));

    panel.appendChild(spaceSection);

    /* ───── GALLERY ───── */
    const gallerySection = document.createElement("div");
    gallerySection.className = "skt-section";
    gallerySection.innerHTML = `<p class="skt-section-title">🖼️ Gallery</p>`;

    gallerySection.appendChild(row("Columns",     makeRange("galleryColumns", 1, 4, 1, "")));
    gallerySection.appendChild(row("Gap",         makeRange("galleryGap",    8, 32, 4, "px")));
    gallerySection.appendChild(row("Card Radius", makeRange("galleryRadius", 0, 20, 2, "px")));

    panel.appendChild(gallerySection);

    /* ───── ANIMATIONS ───── */
    const animSection = document.createElement("div");
    animSection.className = "skt-section";
    animSection.innerHTML = `<p class="skt-section-title">✨ Animations</p>`;

    animSection.appendChild(row("Enable Animations", makeToggle("enableAnimations")));
    animSection.appendChild(row("Enable Parallax",   makeToggle("enableParallax")));
    animSection.appendChild(row("Speed",             makeRange("animSpeed", 0.1, 1.0, 0.05, "s"), "transition duration"));

    panel.appendChild(animSection);

    /* ───── NAVBAR & MISC ───── */
    const miscSection = document.createElement("div");
    miscSection.className = "skt-section";
    miscSection.innerHTML = `<p class="skt-section-title">🧩 Navbar & Misc</p>`;

    miscSection.appendChild(row("Navbar Blur",     makeToggle("navbarBlur")));
    miscSection.appendChild(row("Navbar Shadow",   makeToggle("navbarShadow")));
    miscSection.appendChild(row("Scroll-to-top",   makeToggle("showScrollTop")));
    miscSection.appendChild(row("Compact Mode",    makeToggle("compactMode"),   "reduce section padding"));
    miscSection.appendChild(row("High Contrast",   makeToggle("highContrast"),  "stronger contrast"));

    panel.appendChild(miscSection);

    /* ───── ACTIONS ───── */
    const actSection = document.createElement("div");
    actSection.className = "skt-section";
    actSection.innerHTML = `<p class="skt-section-title">💾 Save / Reset</p>`;

    const actRow = document.createElement("div");
    actRow.className = "skt-action-row";

    const saveBtn = document.createElement("button");
    saveBtn.className = "skt-btn skt-btn-primary"; saveBtn.textContent = "Save Settings";
    saveBtn.addEventListener("click", () => { saveSettings(s); showToast(); });

    const exportBtn = document.createElement("button");
    exportBtn.className = "skt-btn skt-btn-ghost"; exportBtn.textContent = "Export";
    exportBtn.title = "Copy settings JSON to clipboard";
    exportBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(JSON.stringify(s, null, 2))
        .then(() => { exportBtn.textContent = "Copied!"; setTimeout(() => exportBtn.textContent = "Export", 1500); })
        .catch(() => { exportBtn.textContent = "Error"; setTimeout(() => exportBtn.textContent = "Export", 1500); });
    });

    const resetBtn = document.createElement("button");
    resetBtn.className = "skt-btn skt-btn-danger"; resetBtn.textContent = "Reset";
    resetBtn.title = "Restore default settings";
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all settings to defaults?")) {
        Object.assign(s, DEFAULTS);
        localStorage.removeItem(STORAGE_KEY);
        applySettings(s);
        document.body.removeChild(panel);
        document.body.removeChild(fab);
        document.body.removeChild(toast);
        buildPanel(s, onChange);
        showToast();
      }
    });

    actRow.appendChild(saveBtn);
    actRow.appendChild(exportBtn);
    actRow.appendChild(resetBtn);
    actSection.appendChild(actRow);

    /* Import */
    const importBtn = document.createElement("button");
    importBtn.className = "skt-btn skt-btn-ghost"; importBtn.style.width = "100%"; importBtn.style.marginTop = "8px";
    importBtn.textContent = "Import from clipboard";
    importBtn.addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        const imported = JSON.parse(text);
        Object.assign(s, imported);
        saveSettings(s);
        applySettings(s);
        showToast();
        // Rebuild for fresh UI state
        document.body.removeChild(panel);
        document.body.removeChild(fab);
        document.body.removeChild(toast);
        buildPanel(s, onChange);
      } catch (_) { alert("Could not read valid settings JSON from clipboard."); }
    });
    actSection.appendChild(importBtn);

    panel.appendChild(actSection);
    document.body.appendChild(panel);

    /* ── Open/close ── */
    fab.addEventListener("click", () => panel.classList.toggle("open"));
    document.getElementById("skt-close-btn").addEventListener("click", () => panel.classList.remove("open"));

    /* Close on outside click */
    document.addEventListener("click", (e) => {
      if (panel.classList.contains("open") && !panel.contains(e.target) && e.target !== fab) {
        panel.classList.remove("open");
      }
    });
  }

  /* ─────────────────────────────────────────────
   * 7.  BOOT
   * ───────────────────────────────────────────── */
  function boot() {
    const s = loadSettings();
    applySettings(s);
    buildPanel(s, (updated) => {
      applySettings(updated);
    });
    // Auto-save on page unload
    window.addEventListener("beforeunload", () => saveSettings(s));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
