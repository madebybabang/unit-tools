import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderBase64(ctx) {
  return `
    <div class="tool-container">
      
      <div class="tool-header">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm); display: inline-block; margin-bottom: var(--space-4);">
          ← ${t("tools.backToList")}
        </a>
        <h1>${t("toolNames.base64")}</h1>
        <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.base64")}</p>
      </div>

      <div class="split-pane">
        <!-- Input -->
        <div>
          <textarea 
            id="b64-input" 
            class="dev-textarea"
            placeholder="Type text or Base64 here..." 
          ></textarea>
        </div>

        <!-- Output -->
        <div>
          <textarea 
            id="b64-output" 
            class="dev-textarea"
            readonly
            placeholder="Result will appear here..." 
            style="background: var(--color-bg-subtle);"
          ></textarea>
        </div>
      </div>

      <!-- Action Bar -->
      <div style="display: flex; gap: var(--space-2); margin-top: var(--space-4); flex-wrap: wrap; align-items: center;">
        <button id="b64-encode" class="btn btn-primary">
          Encode (Text → Base64)
        </button>
        <button id="b64-decode" class="btn btn-outline">
          Decode (Base64 → Text)
        </button>
        <button id="b64-clear" class="btn btn-outline">
          ${t("common.clear")}
        </button>
        
        <div style="flex-grow: 1;"></div>

        <button id="b64-copy" class="btn btn-outline">
          ${t("common.copy")}
        </button>
      </div>

      <!-- Error Message -->
      <div id="b64-error" style="display: none; margin-top: var(--space-4); padding: var(--space-3); background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-md); color: var(--color-error); font-size: var(--text-sm); font-family: var(--font-mono);"></div>

    </div>
  `;
}

export function initBase64() {
  const input = document.getElementById("b64-input");
  const output = document.getElementById("b64-output");
  const btnEncode = document.getElementById("b64-encode");
  const btnDecode = document.getElementById("b64-decode");
  const btnClear = document.getElementById("b64-clear");
  const btnCopy = document.getElementById("b64-copy");
  const errorBox = document.getElementById("b64-error");

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
    output.value = "";
  }

  function hideError() {
    errorBox.style.display = "none";
    errorBox.textContent = "";
  }

  function encodeBase64(str) {
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
    return btoa(binString);
  }

  function decodeBase64(str) {
    const binString = atob(str);
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
    return new TextDecoder().decode(bytes);
  }

  btnEncode.addEventListener("click", () => {
    hideError();
    const text = input.value;
    if (!text) return;
    try {
      output.value = encodeBase64(text);
    } catch (err) {
      showError("Failed to encode text.");
    }
  });

  btnDecode.addEventListener("click", () => {
    hideError();
    const text = input.value.trim();
    if (!text) return;
    try {
      output.value = decodeBase64(text);
    } catch (err) {
      showError("Invalid Base64 string.");
    }
  });

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