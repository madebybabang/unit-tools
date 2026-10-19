import { t, getLanguage } from "../core/i18n.js";
import { buildUrl } from "../core/router.js";

export function renderHeader(ctx) {
  const currentLang = getLanguage();
  const otherLang = currentLang === "id" ? "en" : "id";

  return `
    <nav class="container" style="display: flex; align-items: center; justify-content: space-between; height: 64px;">
      
      <!-- Logo & Utama -->
      <div style="display: flex; align-items: center; gap: var(--space-8);">
        <a data-link href="${buildUrl(currentLang)}" style="font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--color-text);">
          ${t("common.appName")}
        </a>
        
        <div style="display: flex; gap: var(--space-4); font-size: var(--text-sm); font-weight: var(--font-medium);">
          <a data-link href="${buildUrl(currentLang)}" class="text-muted">${t("nav.home")}</a>
          <a data-link href="${buildUrl(currentLang, 'tools')}" class="text-muted">${t("nav.tools")}</a>
        </div>
      </div>

      <!-- Language Switcher -->
      <button id="lang-switch" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium); display: flex; align-items: center; gap: var(--space-2);">
        <span>🌐</span>
        <span>${otherLang.toUpperCase()}</span>
      </button>
    </nav>
  `;
}