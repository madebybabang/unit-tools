import "./styles/global.css";
import { registerRoute, setNotFound, initRouter } from "./core/router.js";
import { renderHome } from "./pages/home.js";
import { renderAllTools } from "./pages/all-tools.js";
import { renderNotFound } from "./pages/not-found.js";

const app = document.querySelector("#app");

function mount(html) {
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

// Routes
registerRoute("/", (params, ctx) => mount(renderHome(ctx)));
registerRoute("/tools", (params, ctx) => mount(renderAllTools(ctx)));

// 404
setNotFound(() => mount(renderNotFound()));

// Init
initRouter();