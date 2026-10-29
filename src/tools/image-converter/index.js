import { t } from "../../core/i18n.js";
import { buildUrl } from "../../core/router.js";

export function renderImageConverter(ctx) {
  return `
    <div class="container" style="padding-block: var(--space-8); max-width: 800px;">
      
      <p style="margin-bottom: var(--space-4);">
        <a data-link href="${buildUrl(ctx.lang, 'tools')}" class="text-muted" style="font-size: var(--text-sm);">
          ← ${t("tools.backToList")}
        </a>
      </p>

      <h1>${t("toolNames.imageConverter")}</h1>
      <p class="text-muted" style="margin-top: var(--space-2);">${t("toolDescriptions.imageConverter")}</p>

      <!-- Upload Area -->
      <div style="margin-top: var(--space-6); padding: var(--space-6); border: 2px dashed var(--color-border); border-radius: var(--radius-lg); text-align: center;">
        <input type="file" id="img-input" accept="image/png, image/jpeg, image/webp" style="display: none;" />
        <button id="img-upload-btn" style="padding: var(--space-2) var(--space-4); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium);">
          Pilih Gambar
        </button>
        <p class="text-muted" style="margin-top: var(--space-2); font-size: var(--text-sm);">PNG, JPG, atau WebP</p>
      </div>

      <!-- Controls (Hidden by default) -->
      <div id="img-controls" style="display: none; margin-top: var(--space-6); display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div>
          <label style="display: block; font-size: var(--text-sm); font-weight: var(--font-medium); margin-bottom: var(--space-2);">Format Output</label>
          <select id="img-format" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>
        <div id="quality-container">
          <label style="display: block; font-size: var(--text-sm); font-weight: var(--font-medium); margin-bottom: var(--space-2);">Kualitas (0.1 - 1.0)</label>
          <input type="range" id="img-quality" min="0.1" max="1.0" step="0.1" value="0.8" style="width: 100%;" />
        </div>
      </div>

      <!-- Preview Area -->
      <div id="img-preview-container" style="display: none; margin-top: var(--space-8); text-align: center;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div>
            <p class="text-muted" style="font-size: var(--text-sm); margin-bottom: var(--space-2);">Asli (<span id="img-orig-size"></span>)</p>
            <img id="img-orig-preview" style="max-width: 100%; border-radius: var(--radius-md); border: 1px solid var(--color-border);" />
          </div>
          <div>
            <p class="text-muted" style="font-size: var(--text-sm); margin-bottom: var(--space-2);">Hasil (<span id="img-res-size"></span>)</p>
            <img id="img-res-preview" style="max-width: 100%; border-radius: var(--radius-md); border: 1px solid var(--color-border); display: none;" />
          </div>
        </div>

        <div style="margin-top: var(--space-6); display: flex; justify-content: center; gap: var(--space-2);">
          <button id="img-convert-btn" style="padding: var(--space-2) var(--space-6); background: var(--color-brand-500); color: white; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: var(--font-medium);">
            Convert
          </button>
          <button id="img-download-btn" style="display: none; padding: var(--space-2) var(--space-6); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm);">
            ${t("common.download")} Hasil
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div id="img-error" style="display: none; margin-top: var(--space-4); padding: var(--space-3); background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-md); color: var(--color-error); font-size: var(--text-sm);"></div>

    </div>
  `;
}

export function initImageConverter() {
  const fileInput = document.getElementById("img-input");
  const uploadBtn = document.getElementById("img-upload-btn");
  const controls = document.getElementById("img-controls");
  const formatSelect = document.getElementById("img-format");
  const qualityContainer = document.getElementById("quality-container");
  const qualityInput = document.getElementById("img-quality");
  
  const previewContainer = document.getElementById("img-preview-container");
  const origPreview = document.getElementById("img-orig-preview");
  const resPreview = document.getElementById("img-res-preview");
  const origSize = document.getElementById("img-orig-size");
  const resSize = document.getElementById("img-res-size");
  
  const convertBtn = document.getElementById("img-convert-btn");
  const downloadBtn = document.getElementById("img-download-btn");
  const errorBox = document.getElementById("img-error");

  let currentImage = null; // Menyimpan objek Image asli
  let convertedBlob = null;

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

  // Handle upload klik
  uploadBtn.addEventListener("click", () => fileInput.click());

  // Handle file dipilih
  fileInput.addEventListener("change", (e) => {
    hideError();
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("File must be an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        currentImage = img;
        origPreview.src = event.target.result;
        origSize.textContent = formatBytes(file.size);
        
        // Tampilkan UI lanjutan
        controls.style.display = "grid";
        previewContainer.style.display = "block";
        resPreview.style.display = "none";
        downloadBtn.style.display = "none";
        convertedBlob = null;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Sembunyikan slider kualitas kalau format PNG (karena PNG lossless)
  formatSelect.addEventListener("change", () => {
    if (formatSelect.value === "image/png") {
      qualityContainer.style.opacity = "0.5";
      qualityContainer.style.pointerEvents = "none";
    } else {
      qualityContainer.style.opacity = "1";
      qualityContainer.style.pointerEvents = "auto";
    }
  });

  // Proses Konversi
  convertBtn.addEventListener("click", () => {
    if (!currentImage) return;
    hideError();

    const canvas = document.createElement("canvas");
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext("2d");

    // Set background putih kalau konversi ke JPG (karena JPG gak support transparansi)
    if (formatSelect.value === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(currentImage, 0, 0);

    const quality = parseFloat(qualityInput.value);
    const mimeType = formatSelect.value;

    canvas.toBlob((blob) => {
      if (!blob) {
        showError("Failed to convert image.");
        return;
      }

      convertedBlob = blob;
      resPreview.src = URL.createObjectURL(blob);
      resPreview.style.display = "block";
      resSize.textContent = formatBytes(blob.size);
      
      downloadBtn.style.display = "inline-block";
    }, mimeType, quality);
  });

  // Download Hasil
  downloadBtn.addEventListener("click", () => {
    if (!convertedBlob) return;
    
    // Tentukan ekstensi file berdasarkan format
    let ext = "png";
    if (formatSelect.value === "image/jpeg") ext = "jpg";
    else if (formatSelect.value === "image/webp") ext = "webp";

    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unit-tools-converted.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}