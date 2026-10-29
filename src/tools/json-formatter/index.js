import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderJsonFormatter(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-8); max-width: 1000px;">
      
      <p style="margin-bottom: var(--space-4);">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm);">
          ← ${t("tools.backToList")}
        </a>
      </p>

      <h1>${t("toolNames.jsonFormatter")}</h1>
      <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.jsonFormatter")}</p>

      <div style="margin-top: var(--space-6); display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div>
          <textarea 
            id="json-input" 
            placeholder="Paste JSON here..." 
            style="width: 100%; height: 400px; padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: var(--text-sm); resize: vertical;"
          ></textarea>
        </div>

        <div>
          <textarea 
            id="json-output" 
            readonly
            placeholder="Result will appear here..." 
            style="width: 100%; height: 400px; padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: var(--text-sm); background: var(--color-bg-subtle); resize: vertical;"
          ></textarea>
        </div>
      </div>

      <div style="display: flex; gap: var(--space-2); margin-top: var(--space-4); flex-wrap: wrap;">
        <button id="json-format" style="padding: var(--space-2) var(--space-4); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium);">
          Format / Beautify
        </button>
        <button id="json-minify" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
          Minify
        </button>
        <button id="json-clear" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
          ${t("common.clear")}
        </button>
        <button id="json-copy" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm); margin-left: auto;">
          ${t("common.copy")}
        </button>
      </div>

      <div id="json-error" style="display: none; margin-top: var(--space-4); padding: var(--space-3); background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-md); color: var(--color-error); font-size: var(--text-sm); font-family: var(--font-mono);"></div>

    </div>
  `;
}

export function initJsonFormatter() {
  const input = document.getElementById("json-input");
  const output = document.getElementById("json-output");
  const btnFormat = document.getElementById("json-format");
  const btnMinify = document.getElementById("json-minify");
  const btnClear = document.getElementById("json-clear");
  const btnCopy = document.getElementById("json-copy");
  const errorBox = document.getElementById("json-error");

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
    output.value = "";
  }

  function hideError() {
    errorBox.style.display = "none";
    errorBox.textContent = "";
  }

  function processJson(action) {
    hideError();
    const text = input.value.trim();
    
    if (!text) {
      showError("Input is empty.");
      return;
    }

    try {
      const parsed = JSON.parse(text);
      if (action === "format") {
        output.value = JSON.stringify(parsed, null, 2);
      } else if (action === "minify") {
        output.value = JSON.stringify(parsed);
      }
    } catch (err) {
      showError(err.message);
    }
  }

  btnFormat.addEventListener("click", () => processJson("format"));
  btnMinify.addEventListener("click", () => processJson("minify"));
  
  btnClear.addEventListener("click", () => {
    input.value = "";
    output.value = "";
    hideError();
    input.focus();
  });

  btnCopy.addEventListener("click", async () => {
    if (!output.value) return;
    try {
      await navigator.clipboard.writeText(output.value);
      const originalText = btnCopy.textContent;
      btnCopy.textContent = "✓ Copied!";
      setTimeout(() => { btnCopy.textContent = originalText; }, 2000);
    } catch (err) {
      alert("Gagal copy");
    }
  });
}