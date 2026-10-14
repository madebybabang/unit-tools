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
    <button id="toggle-lang" style="margin-top: var(--space-4); padding: var(--space-2) var(--space-4); background: var(--color-brand-500); color: white; border-radius: var(--radius-md);">
      Ganti Bahasa
    </button>
  </main>
`;

document.querySelector("#toggle-lang").addEventListener("click", async () => {
  const { setLanguage, getLanguage } = await import("./core/i18n.js");
  setLanguage(getLanguage() === "id" ? "en" : "id");
  window.location.reload(); // sementara, nanti diganti dengan re-render
});
