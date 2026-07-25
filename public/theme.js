/* Shared theme rooms — dark-mode values mirror AppColors.swift / AppTheme.swatch. */
(function () {
  const ROOMS = [
    { id: "foolscap", name: "Foolscap", mood: "espresso & gold", bg: "#17130F", ink: "#EFE7D6", muted: "#8D8371", accent: "#E8C870", accentInk: "#2A2114" },
    { id: "inkwell", name: "Inkwell", mood: "graphite & indigo", bg: "#14161B", ink: "#E4E7ED", muted: "#7C8494", accent: "#96A8DC", accentInk: "#171B26" },
    { id: "verdant", name: "Verdant", mood: "spruce & copper", bg: "#111710", ink: "#E6EAD8", muted: "#7F8871", accent: "#D89A5E", accentInk: "#241A0F" },
    { id: "dusk", name: "Dusk", mood: "mulberry & rose", bg: "#181218", ink: "#F0E4E8", muted: "#8D7A81", accent: "#D6A08A", accentInk: "#2A1A18" },
    { id: "harbor", name: "Harbor", mood: "sea slate & foam", bg: "#0F1517", ink: "#E2ECEC", muted: "#7A8A8A", accent: "#7AB0A8", accentInk: "#12201F" },
  ];

  const STORAGE_KEY = "musing-theme";
  const VALID = new Set(ROOMS.map((r) => r.id));

  function setTheme(id) {
    if (!VALID.has(id)) id = "foolscap";
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (_) {}
    document.querySelectorAll(".swatch").forEach((s) => {
      s.classList.toggle("active", s.dataset.set === id);
      s.setAttribute("aria-pressed", s.dataset.set === id ? "true" : "false");
    });
    document.querySelectorAll(".mini").forEach((m) => {
      m.classList.toggle("active", m.dataset.set === id);
    });
  }

  function storedTheme() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v && VALID.has(v)) return v;
    } catch (_) {}
    return "foolscap";
  }

  function renderShelf(shelf) {
    if (!shelf) return;
    shelf.innerHTML = "";
    ROOMS.forEach((r) => {
      const el = document.createElement("div");
      el.className = "mini";
      el.dataset.set = r.id;
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", "Switch to " + r.name);
      el.style.background = r.bg;
      // Parenthesize the template before .repeat — string+repeat precedence bug.
      const dots = ('<i style="background:' + r.accent + '"></i>').repeat(8);
      el.innerHTML =
        '<div class="ms" style="background:' +
        r.bg +
        '">' +
        '<div class="m-mark" style="color:' +
        r.ink +
        '">Musing</div>' +
        '<div class="m-greet" style="color:' +
        r.ink +
        '">Good morning.</div>' +
        '<div class="m-ask"></div>' +
        '<div class="m-card">' +
        '<div class="m-n" style="color:' +
        r.accent +
        '">17</div>' +
        '<div class="m-dots">' +
        dots +
        "</div>" +
        "</div>" +
        '<div class="m-verbs"><span></span><span></span><span style="background:' +
        r.accent +
        '"></span></div>' +
        "</div>" +
        '<div class="m-name">' +
        r.name +
        "</div>" +
        '<div class="m-mood">' +
        r.mood +
        "</div>";
      shelf.appendChild(el);
    });
  }

  function bindPickers(root) {
    (root || document).querySelectorAll(".swatch").forEach((s) => {
      s.addEventListener("click", () => setTheme(s.dataset.set));
    });
    const shelf = document.getElementById("shelf");
    if (shelf) {
      shelf.addEventListener("click", (e) => {
        const m = e.target.closest(".mini");
        if (m) setTheme(m.dataset.set);
      });
      shelf.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const m = e.target.closest(".mini");
        if (!m) return;
        e.preventDefault();
        setTheme(m.dataset.set);
      });
    }
  }

  // Apply stored theme ASAP (html may already have data-theme from inline head script).
  document.documentElement.dataset.theme = storedTheme();

  function init() {
    renderShelf(document.getElementById("shelf"));
    bindPickers();
    setTheme(storedTheme());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.MusingTheme = { ROOMS: ROOMS, setTheme: setTheme, storedTheme: storedTheme };
})();
