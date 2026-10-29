import { t } from "../core/i18n.js";
import { getAllTools, searchTools, getCategories } from "../core/tool-registry.js";
import { buildUrl } from "../core/router.js";

export function renderAllTools(ctx) {
  const { lang } = ctx;
  const categories = getCategories();

  return `
    <div class="container" style="padding-block: var(--space-16);">
      <h1>${t("tools.pageTitle")}</h1>
      <p class="text-muted" style="margin-top: var(--space-4); font-size: var(--text-lg);">
        ${t("tools.pageSubtitle")}
      </p>

      <!-- Search & Filter -->
      <div style="margin-top: var(--space-8); display: flex; flex-direction: column; gap: var(--space-4); md:flex-row; align-items: flex-start; justify-content: space-between;">
        <input 
          type="text" 
          id="search-input" 
          placeholder="${t("tools.searchPlaceholder")}" 
          style="width: 100%; max-width: 400px; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-base);"
        />
        
        <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
          ${categories.map(cat => `
            <button 
              class="filter-btn" 
              data-category="${cat.id}"
              style="padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-full); font-size: var(--text-sm); background: ${cat.id === 'all' ? 'var(--color-brand-500)' : 'transparent'}; color: ${cat.id === 'all' ? 'white' : 'var(--color-text-muted)'};"
            >
              ${t(cat.labelKey)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Grid Tool -->
      <div id="tools-grid" style="margin-top: var(--space-8); display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        <!-- Akan diisi oleh JS -->
      </div>
      
      <!-- Empty State -->
      <div id="empty-state" style="display: none; text-align: center; padding-block: var(--space-12);">
        <p class="text-muted" style="font-size: var(--text-lg);">${t("tools.noResult")}</p>
      </div>
    </div>
  `;
}

export function initAllTools() {
  const searchInput = document.getElementById("search-input");
  const toolsGrid = document.getElementById("tools-grid");
  const emptyState = document.getElementById("empty-state");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let activeCategory = "all";

  function renderToolsList() {
    const query = searchInput.value;
    
    // Filter berdasarkan query dan kategori
    let filtered = searchTools(query, t);
    if (activeCategory !== "all") {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }

    // Tampilkan empty state kalau kosong
    if (filtered.length === 0) {
      toolsGrid.innerHTML = "";
      emptyState.style.display = "block";
      return;
    }

    emptyState.style.display = "none";
    toolsGrid.innerHTML = filtered.map((tool) => {
      // Dapatkan bahasa dari URL untuk link
      const lang = window.location.pathname.split("/")[1] || "id";
      return `
        <a data-link href="${buildUrl(lang, tool.route)}" style="display: block; padding: var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-lg); transition: border-color var(--transition-fast);">
          <strong style="font-size: var(--text-lg);">${t(tool.nameKey)}</strong>
          <p class="text-muted" style="font-size: var(--text-sm); margin-top: var(--space-2);">${t(tool.descriptionKey)}</p>
          <p style="margin-top: var(--space-4); color: var(--color-brand-600); font-size: var(--text-sm); font-weight: var(--font-medium);">
            ${t("common.openTool")} →
          </p>
        </a>
      `;
    }).join("");
  }

  // Event listener untuk search
  searchInput.addEventListener("input", renderToolsList);

  // Event listener untuk filter kategori
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-category");

      // Update gaya tombol (reset semua)
      filterBtns.forEach(b => {
        b.style.background = "transparent";
        b.style.color = "var(--color-text-muted)";
      });
      // Aktifkan tombol yang diklik
      btn.style.background = "var(--color-brand-500)";
      btn.style.color = "white";

      renderToolsList();
    });
  });

  // Render awal
  renderToolsList();
}