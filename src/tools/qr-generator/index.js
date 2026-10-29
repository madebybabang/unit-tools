import QRCode from "qrcode";
import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderQrGenerator(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-8); max-width: 800px;">
      
      <p style="margin-bottom: var(--space-4);">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm);">
          ← ${t("tools.backToList")}
        </a>
      </p>

      <h1>${t("toolNames.qrGenerator")}</h1>
      <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.qrGenerator")}</p>

      <!-- Input Area -->
      <div style="margin-top: var(--space-6);">
        <input 
          type="text" 
          id="qr-input" 
          placeholder="https://example.com" 
          style="width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-base); margin-bottom: var(--space-4);"
        />
        
        <button id="qr-generate" style="padding: var(--space-2) var(--space-4); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium); width: 100%;">
          Generate QR
        </button>
      </div>

      <!-- Result Area -->
      <div id="qr-result-container" style="display: none; margin-top: var(--space-8); text-align: center;">
        <div style="padding: var(--space-6); background: var(--color-bg-subtle); border-radius: var(--radius-xl); display: inline-block;">
          <canvas id="qr-canvas"></canvas>
        </div>
        
        <div style="margin-top: var(--space-4);">
          <button id="qr-download" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
            ${t("common.download")} PNG
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div id="qr-error" style="display: none; margin-top: var(--space-4); padding: var(--space-3); background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-md); color: var(--color-error); font-size: var(--text-sm);"></div>

    </div>
  `;
}

export function initQrGenerator() {
  const input = document.getElementById("qr-input");
  const btnGenerate = document.getElementById("qr-generate");
  const resultContainer = document.getElementById("qr-result-container");
  const canvas = document.getElementById("qr-canvas");
  const btnDownload = document.getElementById("qr-download");
  const errorBox = document.getElementById("qr-error");

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
    resultContainer.style.display = "none";
  }

  function hideError() {
    errorBox.style.display = "none";
  }

  async function generateQr() {
    hideError();
    const text = input.value.trim();
    
    if (!text) {
      showError("Input cannot be empty.");
      return;
    }

    try {
      // Render QR ke canvas (ukuran 300x300)
      await QRCode.toCanvas(canvas, text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#111827",  // Warna gelap (teks)
          light: "#ffffff"  // Warna terang (background)
        }
      });
      resultContainer.style.display = "block";
    } catch (err) {
      showError("Failed to generate QR code.");
    }
  }

  // Event listener tombol Generate
  btnGenerate.addEventListener("click", generateQr);

  // Event listener kalau user tekan "Enter" di keyboard
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") generateQr();
  });

  // Event listener tombol Download
  btnDownload.addEventListener("click", () => {
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "unit-tools-qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}