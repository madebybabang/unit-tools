import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderImageCompressor(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-8); max-width: 800px;">
      
      <p style="margin-bottom: var(--space-4);">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm);">
          ← ${t("tools.backToList")}
        </a>
      </p>

      <h1>${t("toolNames.imageCompressor")}</h1>
      <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.imageCompressor")}</p>

      <!-- Upload Area -->
      <div style="margin-top: var(--space-6); padding: var(--space-6); border: 2px dashed var(--color-border); border-radius: var(--radius-lg); text-align: center;">
        <input type="file" id="comp-input" accept="image/jpeg, image/webp" style="display: none;" />
        <button id="comp-upload-btn" style="padding: var(--space-2) var(--space-4); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium);">
          Pilih Gambar (JPG/WebP)
        </button>
        <p class="text-muted" style="margin-top: var(--space-2); font-size: var(--text-sm);">Hanya JPG dan WebP yang bisa dikompresi</p>
      </div>

      <!-- Controls (Hidden) -->
      <div id="comp-controls" style="display: none; margin-top: var(--space-6);">
        <label style="display: flex; justify-content: space-between; font-size: var(--text-sm); font-weight: var(--font-medium); margin-bottom: var(--space-2);">
          <span>Kualitas Kompresi</span>
          <span id="comp-quality-val" style="color: var(--color-brand-600);">80%</span>
        </label>
        <input type="range" id="comp-quality" min="0.1" max="1.0" step="0.05" value="0.8" style="width: 100%;" />
      </div>

      <!-- Preview Area -->
      <div id="comp-preview-container" style="display: none; margin-top: var(--space-8); text-align: center;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div>
            <p class="text-muted" style="font-size: var(--text-sm); margin-bottom: var(--space-2);">Asli (<span id="comp-orig-size"></span>)</p>
            <img id="comp-orig-preview" style="max-width: 100%; border-radius: var(--radius-md); border: 1px solid var(--color-border);" />
          </div>
          <div>
            <p class="text-muted" style="font-size: var(--text-sm); margin-bottom: var(--space-2);">Hasil (<span id="comp-res-size"></span>)</p>
            <img id="comp-res-preview" style="max-width: 100%; border-radius: var(--radius-md); border: 1px solid var(--color-border); display: none;" />
          </div>
        </div>

        <div id="comp-stats" style="display: none; margin-top: var(--space-4); padding: var(--space-4); background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-md); color: #065f46; font-weight: var(--font-medium);">
          Ukuran berkurang <span id="comp-saved"></span>!
        </div>

        <div style="margin-top: var(--space-6); display: flex; justify-content: center; gap: var(--space-2);">
          <button id="comp-convert-btn" style="padding: var(--space-2) var(--space-6); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium);">
            Kompres Sekarang
          </button>
          <button id="comp-download-btn" style="display: none; padding: var(--space-2) var(--space-6); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
            ${t("common.download")} Hasil
          </button>
        </div>
      </div>

      <!-- Error -->
      <div id="comp-error" style="display: none; margin-top: var(--space-4); padding: var(--space-3); background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-md); color: var(--color-error); font-size: var(--text-sm);"></div>

    </div>
  `;
}

export function initImageCompressor() {
  const fileInput = document.getElementById("comp-input");
  const uploadBtn = document.getElementById("comp-upload-btn");
  const controls = document.getElementById("comp-controls");
  const qualityInput = document.getElementById("comp-quality");
  const qualityVal = document.getElementById("comp-quality-val");
  
  const previewContainer = document.getElementById("comp-preview-container");
  const origPreview = document.getElementById("comp-orig-preview");
  const resPreview = document.getElementById("comp-res-preview");
  const origSize = document.getElementById("comp-orig-size");
  const resSize = document.getElementById("comp-res-size");
  
  const stats = document.getElementById("comp-stats");
  const savedAmount = document.getElementById("comp-saved");
  
  const convertBtn = document.getElementById("comp-convert-btn");
  const downloadBtn = document.getElementById("comp-download-btn");
  const errorBox = document.getElementById("comp-error");

  let currentImage = null;
  let currentMime = "image/jpeg";
  let convertedBlob = null;
  let originalFileSize = 0;

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  }

  function hideError() {
    errorBox.style.display = "none";
  }

  uploadBtn.addEventListener("click", () => fileInput.click());

  // Update label kualitas
  qualityInput.addEventListener("input", (e) => {
    qualityVal.textContent = Math.round(e.target.value * 100) + "%";
  });

  fileInput.addEventListener("change", (e) => {
    hideError();
    const file = e.target.files[0];
    if (!file) return;

    // Cek format (hanya JPG/WebP yang masuk akal untuk "kompresi lossy")
    if (file.type !== "image/jpeg" && file.type !== "image/webp") {
      showError("Format tidak didukung. Gunakan JPG atau WebP untuk kompresi.");
      return;
    }

    currentMime = file.type;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        originalFileSize = file.size;
        currentImage = img;
        origPreview.src = event.target.result;
        origSize.textContent = formatBytes(file.size);
        
        controls.style.display = "block";
        previewContainer.style.display = "block";
        resPreview.style.display = "none";
        stats.style.display = "none";
        downloadBtn.style.display = "none";
        convertedBlob = null;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  convertBtn.addEventListener("click", () => {
    if (!currentImage) return;
    hideError();

    const canvas = document.createElement("canvas");
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext("2d");
    
    // JPG gak support transparansi
    if (currentMime === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.drawImage(currentImage, 0, 0);

    const quality = parseFloat(qualityInput.value);

        canvas.toBlob((blob) => {
      if (!blob) {
        showError("Gagal memproses gambar.");
        return;
      }

      convertedBlob = blob;
      resPreview.src = URL.createObjectURL(blob);
      resPreview.style.display = "block";
      resSize.textContent = formatBytes(blob.size);
      
      // Hitung penghematan (atau pembengkakan)
      const newBytes = blob.size;
      const diffBytes = originalFileSize - newBytes;
      
      stats.style.display = "block";
      
      if (diffBytes > 0) {
        // Berhasil hemat
        const percent = Math.round((diffBytes / originalFileSize) * 100);
        stats.style.background = "#ecfdf5"; // Hijau
        stats.style.borderColor = "#a7f3d0";
        stats.style.color = "#065f46";
        savedAmount.textContent = `berhasil! Hemat ${formatBytes(diffBytes)} (${percent}%)`;
      } else if (diffBytes < 0) {
        // Malah membesar
        stats.style.background = "#fef2f2"; // Merah
        stats.style.borderColor = "#fecaca";
        stats.style.color = "#991b1b";
        savedAmount.textContent = `membesar ${formatBytes(Math.abs(diffBytes))}. Coba turunkan slider kualitas.`;
      } else {
        // Ukuran sama persis
        stats.style.background = "#f3f4f6"; 
        stats.style.borderColor = "#e5e7eb";
        stats.style.color = "#374151";
        savedAmount.textContent = `ukuran tetap sama.`;
      }
      
      downloadBtn.style.display = "inline-block";
    }, currentMime, quality);
  });

  downloadBtn.addEventListener("click", () => {
    if (!convertedBlob) return;
    
    let ext = "jpg";
    if (currentMime === "image/webp") ext = "webp";

    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unit-tools-compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}