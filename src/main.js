import "./styles/global.css";
import { registerRoute, setNotFound, initRouter } from "./core/router.js";
import { renderHome, initHome } from "./pages/home.js"; // <-- WAJIB ADA initHome
import { renderAllTools, initAllTools } from "./pages/all-tools.js";
import { renderNotFound } from "./pages/not-found.js";
import { renderAbout } from "./pages/about.js";
import { renderPrivacy } from "./pages/privacy.js";
import { renderContact } from "./pages/contact.js";

registerRoute("/", (params, ctx) => {
  return {
    html: renderHome(ctx),
    init: initHome, //
    title: "Home",
    description: "Alat praktis untuk kerja sehari-hari. Gratis, tanpa akun."
  };
});

registerRoute("/tools", (params, ctx) => {
  return {
    html: renderAllTools(ctx),
    init: initAllTools,
    title: "All Tools",
    description: "Jelajahi semua alat yang tersedia di UNIT Tools."
  };
});

// ... (route about, privacy, contact biarin aja) ...

setNotFound((ctx) => renderNotFound(ctx));

initRouter();