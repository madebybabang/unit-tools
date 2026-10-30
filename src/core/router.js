import { t } from "./i18n.js";
import { setLanguage, getSupportedLanguages, getLanguage } from "./i18n.js";
import { renderLayout } from "../layouts/main-layout.js";
import { getToolById } from "./tool-registry.js";

const defaultTitle = "UNIT Studio";
const defaultDesc = "UNIT Studio — naungan untuk produk digital yang ringan, cepat, dan langsung bisa digunakan.";

function updateMeta(title, description) {
  document.title = title ? `${title} | UNIT Studio` : defaultTitle;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute("content", description || defaultDesc);
}
const supportedLangs = getSupportedLanguages();
const fallbackLang = "en";

let routes = [];
let notFoundHandler = null;
let currentCleanup = null;

export function registerRoute(pattern, handler) {
  routes.push({ pattern, handler });
}

export function setNotFound(handler) {
  notFoundHandler = handler;
}

function parseUrl(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  let lang = null;
  let segments = parts;

  if (parts.length > 0 && supportedLangs.includes(parts[0])) {
    lang = parts[0];
    segments = parts.slice(1);
  }

  return { lang, segments, path: pathname };
}

function matchRoute(pattern, segments) {
  const patternParts = pattern.split("/").filter(Boolean);
  if (patternParts.length !== segments.length) return null;

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const s = segments[i];

    if (p.startsWith(":")) {
      params[p.slice(1)] = decodeURIComponent(s);
    } else if (p !== s) {
      return null;
    }
  }

  return { params };
}

export function buildUrl(lang, path = "") {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  return cleanPath ? `/${lang}/${cleanPath}/` : `/${lang}/`;
}

export function navigate(path) {
  window.history.pushState({}, "", path);
  render();
}

export function render() {
  // Jalankan cleanup dari halaman sebelumnya (kalau ada)
  if (typeof currentCleanup === "function") {
    currentCleanup();
    currentCleanup = null;
  }

  const { lang, segments, path } = parseUrl(window.location.pathname);

  if (!lang) {
    if (segments.length === 0) {
      const detected = localStorage.getItem("unit-tools:lang") || fallbackLang;
      window.history.replaceState({}, "", `/${detected}/`);
      render();
      return;
    }
    window.history.replaceState({}, "", `/${fallbackLang}${path}`);
    render();
    return;
  }

  setLanguage(lang);

  const ctx = { lang, path };
    let result = null;
  let pageTitle = null;
  let pageDesc = null;

  // Cari halaman yang cocok
  for (const route of routes) {
    const match = matchRoute(route.pattern, segments);
    if (match) {
      result = route.handler(match.params, ctx);
      
      if (result && typeof result === "object") {
        pageTitle = result.title;
        pageDesc = result.description;
      }
      break;
    }
  }

  // Kalau gak ada yang cocok, panggil 404
  if (!result && notFoundHandler) {
    result = notFoundHandler(ctx);
  }

  // Ekstrak HTML dan fungsi init (kalau ada)
  let pageHtml = "";
  let initFn = null;

  if (typeof result === "string") {
    pageHtml = result;
  } else if (result && typeof result === "object") {
    pageHtml = result.html;
    initFn = result.init;
  }

  // Render ke DOM
  const app = document.querySelector("#app");
  app.innerHTML = renderLayout(pageHtml, ctx);
    updateMeta(pageTitle, pageDesc);
  window.scrollTo(0, 0);

  // Pasang event listener untuk tombol ganti bahasa
  const langBtn = document.getElementById("lang-switch");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const newLang = getLanguage() === "id" ? "en" : "id";
      const newPath = window.location.pathname.replace(/^\/(id|en)\//, `/${newLang}/`);
      navigate(newPath);
    });
  }

  // Jalankan fungsi init halaman (setelah HTML masuk ke DOM)
  if (typeof initFn === "function") {
    currentCleanup = initFn();
  }
}

export function initRouter() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) return;

    e.preventDefault();
    navigate(href);
  });

  window.addEventListener("popstate", render);

  // Daftarkan route dinamis untuk tool
    registerRoute("/tools/:id", (params, ctx) => {
    const tool = getToolById(params.id);
    
    if (!tool || tool.status !== "active" || !tool.render) {
      return notFoundHandler(ctx);
    }

    return {
      html: tool.render(ctx),
      init: tool.init,
      title: t(tool.nameKey), 
      description: t(tool.descriptionKey) 
    };
  });

  render();
}