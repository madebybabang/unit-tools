import "./styles/global.css";
import { registerRoute, setNotFound, initRouter } from "./core/router.js";
import { renderHome } from "./pages/home.js";
import { renderAllTools } from "./pages/all-tools.js";
import { renderNotFound } from "./pages/not-found.js";

// Daftarkan halaman statis
registerRoute("/", (params, ctx) => renderHome(ctx));
registerRoute("/tools", (params, ctx) => renderAllTools(ctx));

// Daftarkan 404
setNotFound((ctx) => renderNotFound(ctx));

// Mulai router
initRouter();