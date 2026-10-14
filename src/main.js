import "./styles/global.css";
import { t, getLanguage } from "./core/i18n.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="container" style="padding-block: var(--space-16);">
    <h1>${t("common.appName")}</h1>
    <p class="text-muted" style="margin-top: var(--space-4);">
      ${t("common.tagline")}
    </p>
    <p class="text-subtle" style="margin-top: var(--space-2); font-size: var(--text-sm);">
      Bahasa aktif: <code>${getLanguage()}</code>
    </p>
  </main>
`;
