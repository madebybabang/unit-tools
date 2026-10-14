import "./styles/global.css";
import { t, getLanguage } from "./core/i18n.js";
import { getAllTools, getFeaturedTools, getToolCount } from "./core/tool-registry.js";

const app = document.querySelector("#app");

const all = getAllTools();
const featured = getFeaturedTools();

app.innerHTML = `
  <main class="container" style="padding-block: var(--space-16);">
    <h1>${t("common.appName")}</h1>
    <p class="text-muted" style="margin-top: var(--space-4);">
      ${t("common.tagline")}
    </p>

    <hr style="margin: var(--space-8) 0; border: none; border-top: 1px solid var(--color-border);">

    <p><strong>Total tool:</strong> ${getToolCount()}</p>
    <p><strong>Featured:</strong> ${featured.length}</p>

    <h2 style="margin-top: var(--space-8);">${t("home.allToolsTitle")}</h2>
    <ul style="margin-top: var(--space-4); display: grid; gap: var(--space-3);">
      ${all
        .map(
          (tool) => `
        <li style="padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
          <strong>${t(tool.nameKey)}</strong>
          <span class="text-subtle" style="font-size: var(--text-sm); margin-left: var(--space-2);">[${tool.category}]</span>
          <p class="text-muted" style="font-size: var(--text-sm); margin-top: var(--space-1);">${t(tool.descriptionKey)}</p>
          <p class="text-subtle" style="font-size: var(--text-xs); margin-top: var(--space-2);">${tool.route}</p>
        </li>
      `
        )
        .join("")}
    </ul>
  </main>
`;
