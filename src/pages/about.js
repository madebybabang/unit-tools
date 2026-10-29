import { t } from "../core/i18n.js";

export function renderAbout(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-16); max-width: 800px;">
      <h1>${t("about.title")}</h1>
      <p class="text-muted" style="margin-top: var(--space-4); font-size: var(--text-lg);">${t("about.subtitle")}</p>
      
      <div style="margin-top: var(--space-8); font-size: var(--text-base); line-height: var(--leading-relaxed);">
        <p>${t("about.body")}</p>
        
        <h2 style="margin-top: var(--space-8); font-size: var(--text-2xl);">${t("about.principlesTitle")}</h2>
        <ul style="margin-top: var(--space-4); list-style: disc; padding-left: var(--space-6);">
          <li>${t("about.principles.noAccount")}</li>
          <li>${t("about.principles.privacy")}</li>
          <li>${t("about.principles.fast")}</li>
          <li>${t("about.principles.bilingual")}</li>
        </ul>
      </div>
    </div>
  `;
}