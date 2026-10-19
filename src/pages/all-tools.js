import { t } from "../core/i18n.js";
import { getAllTools } from "../core/tool-registry.js";
import { buildUrl } from "../core/router.js";

export function renderAllTools(ctx) {
  const { lang } = ctx;
  const all = getAllTools();

  return `
    <div class="container" style="padding-block: var(--space-16);">
      <h1>${t("tools.pageTitle")}</h1>
      <p class="text-muted" style="margin-top: var(--space-4); font-size: var(--text-lg);">
        ${t("tools.pageSubtitle")}
      </p>

      <div style="margin-top: var(--space-8); display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        ${all.map((tool) => renderToolCard(tool, lang)).join("")}
      </div>
    </div>
  `;
}

function renderToolCard(tool, lang) {
  return `
    <a data-link href="${buildUrl(lang, tool.route)}" style="display: block; padding: var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
      <strong style="font-size: var(--text-lg);">${t(tool.nameKey)}</strong>
      <p class="text-muted" style="font-size: var(--text-sm); margin-top: var(--space-2);">${t(tool.descriptionKey)}</p>
      <p style="margin-top: var(--space-4); color: var(--color-brand-600); font-size: var(--text-sm); font-weight: var(--font-medium);">
        ${t("common.openTool")} →
      </p>
    </a>
  `;
}