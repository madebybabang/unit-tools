import { t } from "../core/i18n.js";
import { getAllTools, getFeaturedTools, searchTools, getCategories } from "../core/tool-registry.js";
import { buildUrl } from "../core/router.js";

// SVG Icons
const icons = {
  "image-compressor": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
  "image-converter": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
  "qr-generator": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`,
  "json-formatter": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>`,
  "base64": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
  "word-counter": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`
};

export function renderHome(ctx) {
  const { lang } = ctx;
  const featured = getFeaturedTools();
  const categories = getCategories();

  return `
    <section class="container" style="padding-block: 64px 96px;">
      
      <!-- Hero Section -->
      <div style="text-align: center; max-width: 800px; margin: 0 auto 48px; display: flex; flex-direction: column; align-items: center;">
        <span class="badge badge-brand" style="margin-bottom: 24px;">⚡ Lightweight & Offline First • Zero Tracking</span>
        <h1 style="margin-bottom: 16px;">
          Essential developer utilities,<br>crafted with precision.
        </h1>
        <p class="text-muted" style="font-size: 18px; line-height: 1.6; max-width: 600px;">
          Fast, client-side developer tools without bloated dependencies, tracking, or telemetry. Format, encode, inspect, and transform in milliseconds.
        </p>
      </div>

      <!-- Search Bar Raksasa -->
      <div class="search-wrapper" style="margin-bottom: 32px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" id="home-search" class="search-input" placeholder="Search tools (e.g. JSON, Base64, QR)..." />
      </div>

      <!-- Filter Pills -->
      <div id="home-filters" style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 64px;">
        ${categories.map(cat => `
          <button 
            class="filter-btn btn ${cat.id === 'all' ? 'btn-primary' : 'btn-outline'}" 
            data-category="${cat.id}"
            style="border-radius: 999px; padding: 6px 16px; font-size: 13px;"
          >
            ${t(cat.labelKey)}
          </button>
        `).join("")}
      </div>

      <!-- Section Featured -->
      <div id="featured-section" style="display: block;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <h2>${t("home.featuredTitle")}</h2>
            <span class="badge">${featured.length} available</span>
          </div>
        </div>
        <div class="tools-grid" style="margin-bottom: 64px;">
          ${featured.map((tool) => renderToolCard(tool, lang)).join("")}
        </div>
      </div>

      <!-- Section All Tools -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h2 id="all-tools-title">${t("home.allToolsTitle")}</h2>
      </div>
      
      <div id="home-tools-grid" class="tools-grid">
        <!-- Diisi JS -->
      </div>
      
      <div id="home-empty-state" style="display: none; text-align: center; padding-block: var(--space-12);">
        <p class="text-muted" style="font-size: var(--text-lg);">${t("tools.noResult")}</p>
      </div>

    </section>
  `;
}

export function initHome() {
  const searchInput = document.getElementById("home-search");
  const toolsGrid = document.getElementById("home-tools-grid");
  const featuredSection = document.getElementById("featured-section");
  const emptyState = document.getElementById("home-empty-state");
  const filterBtns = document.querySelectorAll("#home-filters .filter-btn");

  let activeCategory = "all";

  function renderToolsList() {
    const query = searchInput.value;
    let filtered = searchTools(query, t);
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }

    // Kalau user lagi nyari atau milih filter, sembunyiin section Featured
    if (query.trim() !== "" || activeCategory !== "all") {
      featuredSection.style.display = "none";
    } else {
      featuredSection.style.display = "block";
    }

    if (filtered.length === 0) {
      toolsGrid.innerHTML = "";
      emptyState.style.display = "block";
      return;
    }

    emptyState.style.display = "none";
    toolsGrid.innerHTML = filtered.map((tool) => {
      const lang = window.location.pathname.split("/")[1] || "id";
      const badgeText = tool.category.substring(0, 3).toUpperCase();
      const iconSvg = icons[tool.id] || icons["json-formatter"];
      const metaText = tool.id === "json-formatter" ? "v2.4 • Offline" : "v1.0 • Fast";

      return `
        <a data-link href="${buildUrl(lang, tool.route)}" class="card">
          <div class="card-tag">${badgeText}</div>
          <div class="card-icon-box">${iconSvg}</div>
          <strong class="card-title">${t(tool.nameKey)}</strong>
          <p class="card-desc">${t(tool.descriptionKey)}</p>
          <div class="card-footer">
            <span class="card-meta">${metaText}</span>
            <span class="card-action">${t("common.openTool")} <span>→</span></span>
          </div>
        </a>
      `;
    }).join("");
  }

  searchInput.addEventListener("input", renderToolsList);

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-category");
      filterBtns.forEach(b => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
      });
      btn.classList.remove("btn-outline");
      btn.classList.add("btn-primary");
      renderToolsList();
    });
  });

  // Render awal
  renderToolsList();
}

function renderToolCard(tool, lang) {
  const badgeText = tool.category.substring(0, 3).toUpperCase();
  const iconSvg = icons[tool.id] || icons["json-formatter"];
  const metaText = tool.id === "json-formatter" ? "v2.4 • Offline" : "v1.0 • Fast";

  return `
    <a data-link href="${buildUrl(lang, tool.route)}" class="card">
      <div class="card-tag">${badgeText}</div>
      <div class="card-icon-box">${iconSvg}</div>
      <strong class="card-title">${t(tool.nameKey)}</strong>
      <p class="card-desc">${t(tool.descriptionKey)}</p>
      <div class="card-footer">
        <span class="card-meta">${metaText}</span>
        <span class="card-action">${t("common.openTool")} <span>→</span></span>
      </div>
    </a>
  `;
}