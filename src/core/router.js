import { setLanguage, getSupportedLanguages, getLanguage } from "./i18n.js";
import { renderLayout } from "../layouts/main-layout.js";

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
  let pageHtml = "";

  // Cari halaman yang cocok
  for (const route of routes) {
    const result = matchRoute(route.pattern, segments);
    if (result) {
      pageHtml = route.handler(result.params, ctx);
      break;
    }
  }

  // Kalau gak ada halaman yang cocok, render 404
  if (!pageHtml && notFoundHandler) {
    pageHtml = notFoundHandler(ctx);
  }

  // Bungkus dengan layout dan render ke DOM
  const app = document.querySelector("#app");
  app.innerHTML = renderLayout(pageHtml, ctx);
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
  render();
}