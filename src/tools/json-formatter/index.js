import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderJsonFormatter(ctx) {
  return `
    <div class="tool-container">
      
      <div class="tool-header">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm); display: inline-block; margin-bottom: var(--space-4);">
          ← ${t("tools.backToList")}
        </a>
        <h1>${t("toolNames.jsonFormatter")}</h1>
        <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.jsonFormatter")}</p>
      </div>

      <div class="split-pane">
        <!-- Input -->
        <div>
          <textarea 
            id="json-input" 
            class="dev-textarea"
            placeholder="Paste JSON here..." 
          ></textarea>
        </div>

        <!-- Output -->
        <div>
          <textarea 
            id="json-output" 
            class="dev-textarea"
            readonly
            placeholder="Result will appear here..." 
            style="background: var(--color-bg-subtle);"
          ></textarea>
        </div>
      </div>

      <!-- Action Bar -->
      <div style="display: flex; gap: var(--space-2); margin-top: var(--space-4); flex-wrap: wrap; align-items: center;">
        <button id="json-format" class="btn btn-primary">
          Format / Beautify
        </button>
        <button id="json-minify" class="btn btn-outline">
          Minify
        </button>
        <button id="json-clear" class="btn btn-outline">
          ${t("common.clear")}
        </button>
        
        <div style="flex-grow: 1;"></div> <!-- Spacer -->

        <button id="json-copy" class="btn btn-outline">
          ${t("common.copy")}
        </button>
      </div>

      <!-- Error Message -->
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