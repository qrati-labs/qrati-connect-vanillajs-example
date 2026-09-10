import './style.css';
import { initCookieConsent } from './cookieConsent.js';
import { ORGANIZATION_ID, EMBED_URL, GITHUB_ORG, REPO } from './config.js';

initCookieConsent();

const repoUrl = `https://github.com/${GITHUB_ORG}/${REPO}`;
const vscodeUrl = `https://vscode.dev/${'github'}/${GITHUB_ORG}/${REPO}`;
const year = new Date().getFullYear();

const state = {
  theme:
    localStorage.getItem('qc-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
};

const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>`;
const vscodeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M10.863 13.919a.8.8 0 0 1-.644.025a.8.8 0 0 1-.279-.183L4.816 9.063l-2.232 1.703a.54.54 0 0 1-.691-.031l-.716-.655a.546.546 0 0 1 0-.805L3.112 7.5L1.177 5.725a.546.546 0 0 1 0-.805l.716-.655a.54.54 0 0 1 .691-.031l2.232 1.703L9.94 1.239a.805.805 0 0 1 .923-.159l2.677 1.295c.281.136.46.422.46.736V8h-3.248V4.534L6.864 7.5l3.888 2.966V8H14v3.889c0 .314-.179.6-.46.736z"/></svg>`;

// Inject the embed script into a container. The embed mounts where the tag sits.
function mountEmbed(container) {
  container.innerHTML = '';
  const s = document.createElement('script');
  s.async = true;
  s.src = EMBED_URL;
  s.dataset.organizationId = ORGANIZATION_ID;
  s.dataset.router = 'hash';
  s.dataset.theme = state.theme;
  container.appendChild(s);
}

function render() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.classList.toggle('dark', state.theme === 'dark');

  const content = `<div class="widget-frame" id="qrati-embed"></div>`;
  const postDemo = `<section class="answer-section" aria-labelledby="answer-heading"><div class="answer-copy"><span class="seo-kicker">The short answer</span><h2 id="answer-heading">What does Qrati Connect add to a Vanilla JS site?</h2><p>Qrati Connect adds a complete hosted event-media experience: guests can discover galleries, upload photos and videos, search, react, rate, and join contests while your team controls access, branding, and moderation.</p></div><div class="answer-points"><span>✓ One script to embed</span><span>✓ No gallery backend to maintain</span><span>✓ Theme and hash or memory routing</span><span>✓ Organization-controlled feature gates</span></div></section><section class="seo-section feature-map-section" aria-labelledby="feature-map-heading"><div class="seo-section-header"><span class="seo-kicker">Complete capability map</span><h2 id="feature-map-heading">One embed. The full event experience.</h2><p>Start with the live gallery, then enable only the capabilities your Qrati organization needs.</p></div><div class="feature-map-grid"><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:integration-instructions" aria-hidden="true"></span><h3>Embed cleanly</h3></div><p>Classic script, Shadow DOM isolation, themes, and hash or memory routing.</p></article><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:event" aria-hidden="true"></span><h3>Run the event</h3></div><p>Landing pages, folders, breadcrumbs, search, sorting, stats, and maps.</p></article><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:photo-library" aria-hidden="true"></span><h3>Show every memory</h3></div><p>Image and video galleries, layouts, lazy loading, captions, downloads, and PhotoSwipe.</p></article><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:cloud-upload" aria-hidden="true"></span><h3>Collect uploads</h3></div><p>QR uploads, progress, retry, cancel, HEIC conversion, crop, trim, and post-processing.</p></article><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:celebration" aria-hidden="true"></span><h3>Make it social</h3></div><p>Face and keyword search, reactions, ratings, contests, points, and leaderboards.</p></article><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:shield-lock" aria-hidden="true"></span><h3>Keep people safe</h3></div><p>Authentication, roles, permissions, moderation, terms, and anonymous access.</p></article><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:palette" aria-hidden="true"></span><h3>Fit the brand</h3></div><p>Logos, covers, fonts, palettes, tokens, translations, and accessible states.</p></article><article class="feature-map-card"><div class="feature-map-heading"><span class="feature-map-icon iconify" data-icon="material-symbols:monitor-heart" aria-hidden="true"></span><h3>Operate confidently</h3></div><p>Admin review, analytics, error reporting, and reliable loading and error states.</p></article></div></section><section class="seo-section seo-cta-section" aria-labelledby="cta-heading"><div class="seo-cta-card"><div class="seo-cta-content"><span class="seo-kicker">Ready when your event is</span><h2 id="cta-heading">Bring every guest moment together.</h2><p class="seo-cta-copy">Qrati subscription required. Your organization ID connects this embed to the event space, branding, access rules, and enabled features in Qrati.</p><a class="btn-cta-primary" href="https://qrati.com/contact-us" target="_blank" rel="noopener noreferrer">Talk to Qrati →</a></div></div></section>`;

  document.querySelector('#app').innerHTML = `
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">${state.theme === 'dark' ? '☀ Light' : '🌙 Dark'}</button>
    <div class="page-shell">
      <div class="page-frame">
        <header class="hero">
          <p class="hero-kicker">Qrati Connect Demo</p>
          <h1><a href="https://qrati.com" target="_blank" rel="noopener noreferrer">Qrati</a> Connect inside a Vanilla JS host site</h1>
          <p class="hero-copy">This example shows how to embed <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">Qrati</a> Connect into a plain HTML/JS page using the no-code <strong>embed script</strong>, with a host-controlled theme and zero backend configuration.</p>
          <div class="action-pills" aria-label="Example links">
            <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">${githubIcon}<span>View on GitHub</span></a>
            <a href="${vscodeUrl}" target="_blank" rel="noopener noreferrer">${vscodeIcon}<span>Open in VS Code</span></a>
          </div>
        </header>
        <main class="content-shell">${content}${postDemo}</main>
        <footer class="footer">
          <div class="footer-brand">
            <img src="https://assets.qrati.com/images/qrati-connect-logo-square.png" alt="Qrati Connect logo" referrerpolicy="no-referrer" />
            <div>
              <span class="footer-title"><span>Qrati</span> Connect</span>
              <p>Elevate your event experience.</p>
            </div>
          </div>
          <div class="footer-meta">
            <nav aria-label="Footer navigation">
              <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">qrati.com</a>
              <a href="https://www.npmjs.com/package/@qratilabs/qrati-connect" target="_blank" rel="noopener noreferrer">npm</a>
              <a href="https://github.com/${GITHUB_ORG}" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://qrati.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a>
            </nav>
            <p class="footer-note">© ${year} Qrati Labs. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>`;

  document.querySelector('#theme-toggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('qc-theme', state.theme);
    render();
  });

  mountEmbed(document.querySelector('#qrati-embed'));
}

render();
