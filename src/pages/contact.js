import { t } from "../core/i18n.js";

export function renderContact(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-16); max-width: 800px;">
      <h1>${t("contact.title")}</h1>
      <p class="text-muted" style="margin-top: var(--space-4); font-size: var(--text-lg);">${t("contact.subtitle")}</p>
      
      <div style="margin-top: var(--space-8); font-size: var(--text-base); line-height: var(--leading-relaxed);">
        <p>${t("contact.body")}</p>
        <p style="margin-top: var(--space-4);">
          <a href="mailto:hello@unitstudio.dev" style="color: var(--color-brand-600); font-weight: var(--font-medium);">hello@unitstudio.dev</a>
        </p>
      </div>
    </div>
  `;
}