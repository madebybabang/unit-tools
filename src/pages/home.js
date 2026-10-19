import { t } from "../core/i18n.js";
import { getAllTools, getFeaturedTools } from "../core/tool-registry.js";
import { buildUrl } from "../core/router.js";

export function renderHome(ctx) {
  const { lang } = ctx;
  const featured = getFeaturedTools();
  const all = getAllTools();

  return `
    <div class="container" style="padding-block: var(--space-16);">
      <h1>${t("home.heroTitle")}</h1>
      <p class="text-muted" style="margin-top: var(--space-4); font-size: var(--text-lg); max-width: 60ch;">
        ${t("home.heroSubtitle")}
      </p>

      <h2 style="margin-top: var(--space-16);">${t("home.featuredTitle")}</h2>
      <div style="margin-top: var(--space-6); display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        ${featured.map((tool) => renderToolCard(tool, lang)).join("")}
      </div>

      <h2 style="margin-top: var(--space-16);">${t("home.allToolsTitle")}</h2>
      <div style="margin-top: var(--space-6); display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        ${all.map((tool) => renderToolCard(tool, lang)).join("")}
      </div>
    </div>
  `;
}

function renderToolCard(tool, lang) {
  return `
    <a data-link href="${buildUrl(lang, tool.route)}" style="display: block; padding: var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-lg); transition: border-color var(--transition-fast);">
      <strong style="font-size: var(--text-lg);">${t(tool.nameKey)}</strong>
      <p class="text-muted" style="font-size: var(--text-sm); margin-top: var(--space-2);">${t(tool.descriptionKey)}</p>
      <p style="margin-top: var(--space-4); color: var(--color-brand-600); font-size: var(--text-sm); font-weight: var(--font-medium);">
        ${t("common.openTool")} →
      </p>
    </a>
  `;
}