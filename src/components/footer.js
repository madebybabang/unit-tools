import { t } from "../core/i18n.js";

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <div class="container" style="padding-block: var(--space-8); border-top: 1px solid var(--color-border); margin-top: var(--space-16); display: flex; flex-direction: column; md:flex-row; align-items: center; justify-content: space-between; gap: var(--space-4);">
      <p class="text-muted" style="font-size: var(--text-sm);">
        © ${year} ${t("common.appName")}. ${t("footer.rights")}
      </p>
      <p class="text-muted" style="font-size: var(--text-sm);">
        ${t("footer.productBy")}
      </p>
    </div>
  `;
}