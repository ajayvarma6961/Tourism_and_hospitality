// ============================================================================
// CLIENT-SIDE ROUTER & VIEW ORCHESTRATOR
// ============================================================================

class AppRouter {
  constructor() {
    this.routes = {};
    this.currentPath = '';
    
    window.addEventListener('hashchange', () => this.handleRoute());
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.handleRoute());
    } else {
      setTimeout(() => this.handleRoute(), 0);
    }
  }

  addRoute(pathPattern, viewHandler) {
    const cleanPattern = pathPattern.split('?')[0].replace(/\/+$/, '') || '/';
    this.routes[cleanPattern] = viewHandler;
  }

  navigate(path) {
    window.location.hash = path.startsWith('#') ? path : '#' + path;
  }

  async handleRoute() {
    let rawHash = window.location.hash.slice(1) || '/';
    if (!rawHash.startsWith('/')) rawHash = '/' + rawHash;

    // Split route path from query parameters (e.g. "/hotels?city=Goa" -> path: "/hotels", query: "city=Goa")
    const [pathOnly, queryString] = rawHash.split('?');
    const cleanPath = (pathOnly.replace(/\/+$/, '') || '/').toLowerCase();
    this.currentPath = cleanPath;

    const container = document.getElementById('main-content');
    if (!container) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active navbar links
    this.updateNavLinks(cleanPath);

    // Match exact or parameterized route
    let matchedHandler = null;
    let params = {};

    for (const [pattern, handler] of Object.entries(this.routes)) {
      const match = this.matchPattern(pattern, cleanPath);
      if (match) {
        matchedHandler = handler;
        params = match;
        break;
      }
    }

    if (matchedHandler) {
      container.innerHTML = `
        <div class="wy-loading-view">
          <div class="wy-spinner"></div>
          <p>Loading your travel experience...</p>
        </div>
      `;
      try {
        const html = await matchedHandler(params);
        container.innerHTML = html;
        if (typeof matchedHandler.onMount === 'function') {
          matchedHandler.onMount(params);
        }
      } catch (err) {
        console.error("Route error:", err);
        container.innerHTML = `
          <div class="wy-error-view">
            <h2>Something went wrong</h2>
            <p>${err.message}</p>
            <button class="btn btn-primary" onclick="window.router.navigate('/')">Return Home</button>
          </div>
        `;
      }
    } else {
      console.warn("Unmatched route:", cleanPath, "Registered routes:", Object.keys(this.routes));
      container.innerHTML = `
        <div class="wy-error-view">
          <h2>Page Not Found (404)</h2>
          <p>The travel route <code>${cleanPath}</code> does not exist.</p>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
            <button class="btn btn-primary" onclick="window.router.navigate('/')">Back to Home</button>
            <button class="btn btn-outline" onclick="window.router.navigate('/flights')">Search Flights</button>
            <button class="btn btn-outline" onclick="window.router.navigate('/hotels')">Explore Hotels</button>
          </div>
        </div>
      `;
    }
  }

  matchPattern(pattern, path) {
    const cleanPattern = (pattern.split('?')[0].replace(/\/+$/, '') || '/').toLowerCase();
    if (cleanPattern === path) return {};

    const patternParts = cleanPattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const key = patternParts[i].slice(1);
        params[key] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  }

  updateNavLinks(cleanPath) {
    const rootSegment = '/' + (cleanPath.split('/')[1] || '');
    document.querySelectorAll('.wy-nav-item').forEach(el => {
      const href = el.getAttribute('href') || '';
      const hrefPath = href.replace('#', '').split('?')[0].replace(/\/+$/, '') || '/';
      if (hrefPath === cleanPath || (rootSegment !== '/' && hrefPath === rootSegment)) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }
}

window.router = new AppRouter();
