import "./styles/global.css";
import { registerRoute, setNotFound, initRouter } from "./core/router.js";
import { renderHome } from "./pages/home.js";
import { renderAllTools, initAllTools } from "./pages/all-tools.js";
import { renderNotFound } from "./pages/not-found.js";
import { renderAbout } from "./pages/about.js";
import { renderPrivacy } from "./pages/privacy.js";
import { renderContact } from "./pages/contact.js";

registerRoute("/", (params, ctx) => renderHome(ctx));

registerRoute("/tools", (params, ctx) => {
  return {
    html: renderAllTools(ctx),
    init: initAllTools
  };
});

registerRoute("/about", (params, ctx) => renderAbout(ctx));
registerRoute("/privacy", (params, ctx) => renderPrivacy(ctx));
registerRoute("/contact", (params, ctx) => renderContact(ctx));

setNotFound((ctx) => renderNotFound(ctx));

initRouter();