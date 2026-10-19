import { t } from "../core/i18n.js";

export function renderNotFound() {
  return `
    <div class="container" style="padding-block: var(--space-20); text-align: center;">
      <h1 style="font-size: var(--text-5xl); color: var(--color-brand-500);">404</h1>
      <h2 style="margin-top: var(--space-4);">${t("notFound.title")}</h2>
      <p class="text-muted" style="margin-top: var(--space-4); font-size: var(--text-lg);">
        ${t("notFound.subtitle")}
      </p>
      <p style="margin-top: var(--space-8);">
        <a data-link href="/" style="display: inline-block; padding: var(--space-3) var(--space-6); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-weight: var(--font-medium);">
          ${t("notFound.cta")}
        </a>
      </p>
    </div>
  `;
}