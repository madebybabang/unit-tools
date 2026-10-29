import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderBase64(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-8); max-width: 1000px;">
      
      <p style="margin-bottom: var(--space-4);">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm);">
          ← ${t("tools.backToList")}
        </a>
      </p>

      <h1>${t("toolNames.base64")}</h1>
      <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.base64")}</p>

      <div style="margin-top: var(--space-6); display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        
        <!-- Input -->
        <div>
          <textarea 
            id="b64-input" 
            placeholder="Type text or Base64 here..." 
            style="width: 100%; height: 300px; padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: var(--text-sm); resize: vertical;"
          ></textarea>
        </div>

        <!-- Output -->
        <div>
          <textarea 
            id="b64-output" 
            readonly
            placeholder="Result will appear here..." 
            style="width: 100%; height: 300px; padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: var(--text-sm); background: var(--color-bg-subtle); resize: vertical;"
          ></textarea>
        </div>
      </div>

      <!-- Actions -->
      <div style="display: flex; gap: var(--space-2); margin-top: var(--space-4); flex-wrap: wrap;">
        <button id="b64-encode" style="padding: var(--space-2) var(--space-4); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium);">
          Encode (Text → Base64)
        </button>
        <button id="b64-decode" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
          Decode (Base64 → Text)
        </button>
        <button id="b64-clear" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
          ${t("common.clear")}
        </button>
        <button id="b64-copy" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm); margin-left: auto;">
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
    // Trik Unicode-safe untuk Base64
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
    return btoa(binString);
  }

  function decodeBase64(str) {
    // Trik Unicode-safe untuk Base64
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