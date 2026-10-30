import { t, getLanguage } from "../core/i18n.js";
import { buildUrl } from "../core/router.js";

export function renderHeader(ctx) {
  const currentLang = getLanguage();
  const otherLang = currentLang === "id" ? "en" : "id";

  return `
    <nav class="container" style="display: flex; align-items: center; justify-content: space-between; height: 64px;">
      
      <!-- Logo -->
      <div style="display: flex; align-items: center; gap: 32px;">
        <a data-link href="${buildUrl(currentLang)}" style="font-size: 18px; font-weight: 700; color: var(--color-text); display: flex; align-items: center; gap: 8px; letter-spacing: -0.02em;">
          <span style="display: inline-block; width: 24px; height: 24px; background: var(--color-brand-500); border-radius: 6px;"></span>
          UNIT Studio
        </a>
        
        <div style="display: none; @media(min-width: 768px) { display: flex; } gap: 24px; font-size: 14px; font-weight: 500;">
          <a data-link href="${buildUrl(currentLang, 'tools')}" style="color: var(--color-text);">${t("nav.tools")}</a>
          <a data-link href="${buildUrl(currentLang, 'about')}" style="color: var(--color-text-muted);">${t("nav.about")}</a>
        </div>
      </div>

      <!-- Right Actions -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <a href="https://github.com/madebybabang/unit-tools" target="_blank" rel="noopener" class="btn btn-outline" style="border-radius: 999px; font-size: 13px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          Star on GitHub
        </a>
        
        <button id="lang-switch" class="btn btn-primary" style="border-radius: 50%; width: 36px; height: 36px; padding: 0;">
          <span style="font-size: 16px;">${otherLang.toUpperCase()}</span>
        </button>
      </div>
    </nav>
  `;
}