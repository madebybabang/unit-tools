import "./styles/global.css";
import { registerRoute, setNotFound, initRouter } from "./core/router.js";
import { renderHome } from "./pages/home.js";
import { renderAllTools, initAllTools } from "./pages/all-tools.js";
import { renderNotFound } from "./pages/not-found.js";
import { renderAbout } from "./pages/about.js";
import { renderPrivacy } from "./pages/privacy.js";
import { renderContact } from "./pages/contact.js";

registerRoute("/", (params, ctx) => {
  return {
    html: renderHome(ctx),
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

registerRoute("/about", (params, ctx) => {
  return {
    html: renderAbout(ctx),
    title: "About",
    description: "Tentang UNIT Studio dan prinsip produk kami."
  };
});

registerRoute("/privacy", (params, ctx) => {
  return {
    html: renderPrivacy(ctx),
    title: "Privacy Policy",
    description: "Kebijakan privasi UNIT Studio."
  };
});

registerRoute("/contact", (params, ctx) => {
  return {
    html: renderContact(ctx),
    title: "Contact",
    description: "Hubungi UNIT Studio."
  };
});

setNotFound((ctx) => renderNotFound(ctx));

initRouter();