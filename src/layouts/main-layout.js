import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

export function renderLayout(contentHtml, ctx) {
    return `
        <div style="display: flex; flex-direction: column; min-height: 100vh;">
            <header id="main-header">
                ${renderHeader(ctx)}
            </header>

            <main style="flex: 1;">
                ${contentHtml}
            </main>

            <footer id="main-footer">
                ${renderFooter(ctx)}
            </footer>
        </div>
    `;
}