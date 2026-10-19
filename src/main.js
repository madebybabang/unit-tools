import "./styles/global.css";
import { registerRoute, setNotFound, initRouter } from "./core/router.js";
import { renderHome } from "./pages/home.js";
import { renderAllTools } from "./pages/all-tools.js";
import { renderNotFound } from "./pages/not-found.js";

// Routes
registerRoute("/", (params, ctx) => renderHome(ctx));
registerRoute("/tools", (params, ctx) => renderAllTools(ctx));

// 404
setNotFound((ctx) => renderNotFound(ctx));

// Init
initRouter();