import { t } from "../core/i18n.js";
import { getAllTools, searchTools, getCategories } from "../core/tool-registry.js";
import { buildUrl } from "../core/router.js";

export function renderAllTools(ctx) {
  const { lang } = ctx;
  const categories = getCategories();

  return `
    <div class="container" style="padding-block: var(--space-12);">
      <h1>${t("tools.pageTitle")}</h1>
      
      <!-- Search Bar Raksasa -->
      <div style="margin-top: var(--space-6); margin-bottom: var(--space-8); max-width: 600px;">
        <input 
          type="text" 
          id="search-input" 
          class="input"
          placeholder="Search tools..." 
          style="padding: var(--space-4); font-size: var(--text-lg);"
        />
      </div>
      
      <!-- Filter Pills -->
      <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-8);">
        ${categories.map(cat => `
          <button 
            class="filter-btn btn ${cat.id === 'all' ? 'btn-primary' : 'btn-outline'}" 
            data-category="${cat.id}"
            style="border-radius: var(--radius-full);"
          >
            ${t(cat.labelKey)}
          </button>
        `).join("")}
      </div>

      <!-- Grid Tool -->
      <div id="tools-grid" class="tools-grid">
        <!-- Diisi JS -->
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
    let filtered = searchTools(query, t);
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(tool => tool.category === activeCategory);
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
      
      return `
        <a data-link href="${buildUrl(lang, tool.route)}" class="card">
          <div class="card-badge">${badgeText}</div>
          <div class="card-icon">${getIcon(tool.id)}</div>
          <strong class="card-title">${t(tool.nameKey)}</strong>
          <p class="card-desc">${t(tool.descriptionKey)}</p>
          <div class="card-footer">
            <span class="text-subtle" style="font-size: var(--text-xs);">v1.0</span>
            <span class="card-action">${t("common.openTool")} <span>→</span></span>
          </div>
        </a>
      `;
    }).join("");
  }

  function getIcon(id) {
    const icons = { "image-compressor": "🖼️", "image-converter": "🔄", "qr-generator": "🔳", "json-formatter": "{}", "base64": "A-Z", "word-counter": "📝" };
    return icons[id] || "🛠️";
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

  renderToolsList();
}