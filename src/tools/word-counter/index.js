import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderWordCounter(ctx) {
  return `
    <div class="tool-container">
      
      <div class="tool-header">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm); display: inline-block; margin-bottom: var(--space-4);">
          ← ${t("tools.backToList")}
        </a>
        <h1>${t("toolNames.wordCounter")}</h1>
        <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.wordCounter")}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-6); md:grid-template-columns: 2fr 1fr;">
        
        <!-- Input Area -->
        <div>
          <textarea 
            id="wc-input" 
            class="dev-textarea"
            style="height: 400px;"
            placeholder="${t("tools.howToUse")}..." 
          ></textarea>
          
          <div style="display: flex; justify-content: flex-end; gap: var(--space-2); margin-top: var(--space-3);">
            <button id="wc-clear" class="btn btn-outline">
              ${t("common.clear")}
            </button>
            <button id="wc-copy" class="btn btn-primary">
              ${t("common.copy")}
            </button>
          </div>
        </div>

        <!-- Statistics Panel -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${renderStatCard("words", ctx.lang === "id" ? "Kata" : "Words")}
          ${renderStatCard("chars", ctx.lang === "id" ? "Karakter" : "Characters")}
          ${renderStatCard("sentences", ctx.lang === "id" ? "Kalimat" : "Sentences")}
          ${renderStatCard("reading", ctx.lang === "id" ? "Estimasi Baca" : "Reading Time")}
        </div>

      </div>

    </div>
  `;
}

function renderStatCard(id, label) {
  return `
    <div class="card" style="padding: var(--space-4);">
      <p class="text-muted" style="font-size: var(--text-sm); font-weight: var(--font-medium);">${label}</p>
      <p id="stat-${id}" style="font-size: var(--text-3xl); font-weight: var(--font-bold); margin-top: var(--space-1); color: var(--color-brand-600);">0</p>
    </div>
  `;
}

export function initWordCounter() {
  const input = document.getElementById("wc-input");
  const btnClear = document.getElementById("wc-clear");
  const btnCopy = document.getElementById("wc-copy");
  
  const statWords = document.getElementById("stat-words");
  const statChars = document.getElementById("stat-chars");
  const statSentences = document.getElementById("stat-sentences");
  const statReading = document.getElementById("stat-reading");

  function updateStats() {
    const text = input.value;
    
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    statWords.textContent = words;
    
    statChars.textContent = text.length;
    
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    statSentences.textContent = sentences;
    
    const minutes = Math.ceil(words / 200);
    statReading.textContent = `${minutes} min`;
  }

  input.addEventListener("input", updateStats);
  
  btnClear.addEventListener("click", () => {
    input.value = "";
    updateStats();
    input.focus();
  });

  btnCopy.addEventListener("click", async () => {
    if (!input.value) return;
    try {
      await navigator.clipboard.writeText(input.value);
      const originalText = btnCopy.textContent;
      btnCopy.textContent = "✓ Copied!";
      setTimeout(() => { btnCopy.textContent = originalText; }, 2000);
    } catch (err) {
      alert("Gagal copy");
    }
  });

  updateStats();

  return () => {
    input.removeEventListener("input", updateStats);
  };
}