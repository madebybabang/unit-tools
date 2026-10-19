import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderWordCounter(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-8); max-width: 800px;">
      
      <!-- Breadcrumb -->
      <p style="margin-bottom: var(--space-4);">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm);">
          ← ${t("tools.backToList")}
        </a>
      </p>

      <!-- Header -->
      <h1>${t("toolNames.wordCounter")}</h1>
      <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.wordCounter")}</p>

      <!-- Tool Area -->
      <div style="margin-top: var(--space-8);">
        <textarea 
          id="wc-input" 
          placeholder="${t("tools.howToUse")}..." 
          style="width: 100%; height: 200px; padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-sans); font-size: var(--text-base); resize: vertical;"
        ></textarea>
        
        <div style="display: flex; justify-content: flex-end; gap: var(--space-2); margin-top: var(--space-3);">
          <button id="wc-clear" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
            ${t("common.clear")}
          </button>
          <button id="wc-copy" style="padding: var(--space-2) var(--space-4); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium);">
            ${t("common.copy")}
          </button>
        </div>
      </div>

      <!-- Statistics -->
      <div style="margin-top: var(--space-8); display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-4);">
        ${renderStatCard("words", t("common.success") ? "Kata" : "Words")}
        ${renderStatCard("chars", "Karakter / Characters")}
        ${renderStatCard("sentences", "Kalimat / Sentences")}
        ${renderStatCard("reading", "Estimasi Baca / Reading Time")}
      </div>

    </div>
  `;
}

function renderStatCard(id, label) {
  return `
    <div style="padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface);">
      <p class="text-muted" style="font-size: var(--text-sm); font-weight: var(--font-medium);">${label}</p>
      <p id="stat-${id}" style="font-size: var(--text-2xl); font-weight: var(--font-bold); margin-top: var(--space-2); color: var(--color-brand-600);">0</p>
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
    
    // Words
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    statWords.textContent = words;
    
    // Characters (with spaces)
    statChars.textContent = text.length;
    
    // Sentences (split by . ! ?)
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    statSentences.textContent = sentences;
    
    // Reading time (assuming 200 words per minute)
    const minutes = Math.ceil(words / 200);
    statReading.textContent = `${minutes} min`;
  }

  // Event Listeners
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

  // Initial calculation
  updateStats();

  // Return cleanup function (wajib buat router)
  return () => {
    input.removeEventListener("input", updateStats);
    btnClear.removeEventListener("click", () => {});
    btnCopy.removeEventListener("click", () => {});
  };
}