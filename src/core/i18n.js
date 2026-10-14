import id from "../locales/id.js";
import en from "../locales/en.js";

const dictionaries = { id, en };
const supported = ["id", "en"];
const fallback = "en";
const storageKey = "unit-tools:lang";

let currentLang = detectLanguage();
const listeners = new Set();

function detectLanguage() {
  // 1. Cek prefix URL: /id/... atau /en/...
  const pathLang = window.location.pathname.split("/")[1];
  if (supported.includes(pathLang)) return pathLang;

  // 2. Cek localStorage
  const saved = localStorage.getItem(storageKey);
  if (saved && supported.includes(saved)) return saved;

  // 3. Cek bahasa browser
  const browserLang = (navigator.language || "").slice(0, 2);
  if (supported.includes(browserLang)) return browserLang;

  // 4. Fallback
  return fallback;
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

/**
 * Ambil teks berdasarkan key.
 * Contoh: t("common.download") → "Unduh" atau "Download"
 */
export function t(key) {
  const dict = dictionaries[currentLang] || dictionaries[fallback];
  const value = getNestedValue(dict, key);

  if (value === undefined) {
    console.warn(`[i18n] Missing key: ${key} (lang: ${currentLang})`);
    return key;
  }

  return value;
}

/**
 * Bahasa yang sedang aktif.
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Semua bahasa yang didukung.
 */
export function getSupportedLanguages() {
  return [...supported];
}

/**
 * Ganti bahasa aktif.
 * @param {string} lang - "id" atau "en"
 */
export function setLanguage(lang) {
  if (!supported.includes(lang)) {
    console.warn(`[i18n] Unsupported language: ${lang}`);
    return;
  }

  if (lang === currentLang) return;

  currentLang = lang;
  localStorage.setItem(storageKey, lang);
  document.documentElement.lang = lang;

  listeners.forEach((fn) => fn(lang));
}

/**
 * Daftarkan callback yang dipanggil saat bahasa berubah.
 * @param {(lang: string) => void} fn
 * @returns {() => void} fungsi unsubscribe
 */
export function onLanguageChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Set atribut lang di <html> saat pertama load
document.documentElement.lang = currentLang;
