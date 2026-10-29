import { t } from "../core/i18n.js";

export function renderPrivacy(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-16); max-width: 800px;">
      <h1>${t("privacy.title")}</h1>
      <p class="text-muted" style="margin-top: var(--space-4); font-size: var(--text-lg);">${t("privacy.subtitle")}</p>
      
      <div style="margin-top: var(--space-8); font-size: var(--text-base); line-height: var(--leading-relaxed);">
        <p>${t("privacy.body")}</p>
      </div>
    </div>
  `;
}