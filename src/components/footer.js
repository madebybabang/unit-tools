import { t, getLanguage } from "../core/i18n.js";
import { buildUrl } from "../core/router.js";

export function renderFooter() {
  const year = new Date().getFullYear();
  const lang = getLanguage();

  return `
    <div class="container" style="padding-block: var(--space-8); border-top: 1px solid var(--color-border); margin-top: var(--space-16); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-4); text-align: center;">
      
      <div style="display: flex; gap: var(--space-6); font-size: var(--text-sm);">
        <a data-link href="${buildUrl(lang, 'about')}" class="text-muted">${t("footer.links.about")}</a>
        <a data-link href="${buildUrl(lang, 'privacy')}" class="text-muted">${t("footer.links.privacy")}</a>
        <a data-link href="${buildUrl(lang, 'contact')}" class="text-muted">${t("footer.links.contact")}</a>
      </div>

      <div>
        <p class="text-muted" style="font-size: var(--text-sm);">
          © ${year} ${t("common.appName")}. ${t("footer.rights")}
        </p>
        <p class="text-subtle" style="font-size: var(--text-xs); margin-top: var(--space-1);">
          ${t("footer.productBy")}
        </p>
      </div>

    </div>
  `;
}