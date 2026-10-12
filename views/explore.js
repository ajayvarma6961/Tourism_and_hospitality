// ============================================================================
// VIEW: EXPLORE DESTINATIONS (Dedicated destination discovery guide)
// ============================================================================

let allDestinations = [];
let filteredDestinations = [];
let activeDestCategory = 'all';

async function renderExploreView() {
  allDestinations = await window.db.getDestinations();
  filteredDestinations = [...allDestinations];

  return `
    <div class="wy-explore-page">
      <!-- HERO BANNER -->
      <section class="wy-explore-hero">
        <div class="explore-hero-content">
          <span class="badge-sparkle">✦ Curated Travel Guides</span>
          <h1>Explore Incredible Destinations</h1>
          <p>Handcrafted guides featuring iconic sights, local food secrets, estimated daily budgets, and handpicked hotels across India & the world.</p>
          
          <div class="explore-search-bar">
            <input type="text" id="dest-search-input" placeholder="Search by city, state, or interest (e.g. Goa, Kashmir, Beaches)..." oninput="filterDestinations()">
            <button class="btn btn-primary" onclick="filterDestinations()">Explore</button>
          </div>
        </div>
      </section>

      <!-- CATEGORY CHIPS BAR -->
      <div class="explore-categories-strip">
        <button class="dest-cat-btn active" data-cat="all" onclick="selectDestCategory('all', this)">All Escapes</button>
        <button class="dest-cat-btn" data-cat="beaches" onclick="selectDestCategory('beaches', this)">🏖️ Beaches & Coastlines</button>
        <button class="dest-cat-btn" data-cat="hill_stations" onclick="selectDestCategory('hill_stations', this)">⛰️ Hill Stations & Snow</button>
        <button class="dest-cat-btn" data-cat="heritage" onclick="selectDestCategory('heritage', this)">🏰 Royal Heritage & Forts</button>
        <button class="dest-cat-btn" data-cat="spiritual" onclick="selectDestCategory('spiritual', this)">🛕 Spiritual & Ghats</button>
        <button class="dest-cat-btn" data-cat="international" onclick="selectDestCategory('international', this)">✈️ International Escapes</button>
      </div>

      <!-- MAIN DESTINATIONS GRID -->
      <section class="wy-section">
        <div class="destinations-grid" id="explore-dest-grid">
          ${renderExploreGrid(filteredDestinations)}
        </div>
      </section>
    </div>
  `;
}

function renderExploreGrid(list) {
  if (!list.length) {
    return `
      <div class="no-results-card full-width">
        <span class="empty-icon">📍</span>
        <h3>No destinations found</h3>
        <p>Try searching for a different keyword or view all categories.</p>
        <button class="btn btn-outline" onclick="selectDestCategory('all')">View All Destinations</button>
      </div>
    `;
  }

  return list.map(d => `
    <div class="destination-card" onclick="window.router.navigate('/destination/${d.id}')">
      <div class="dest-image-wrap">
        <img src="${d.cover_image}" alt="${d.name}" loading="lazy">
        <div class="dest-pill">Best: ${d.best_season}</div>
        <button class="dest-fav-btn" onclick="event.stopPropagation(); window.state.toggleFavorite('${d.id}', 'destination', ${JSON.stringify(d).replace(/"/g, '&quot;')})">
          ${window.state.isFavorite(d.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="dest-content">
        <div class="dest-meta-row">
          <span class="dest-state">${d.state_country}</span>
          <span class="dest-rating">⭐ ${d.rating} (${d.reviews_count})</span>
        </div>
        <h3 class="dest-name">${d.name}</h3>
        <p class="dest-tagline">${d.tagline}</p>
        <div class="dest-footer">
          <div class="dest-budget">
            <span class="budget-label">Est. Daily Budget</span>
            <span class="budget-value">${window.state.formatPrice(d.avg_budget_per_day)}</span>
          </div>
          <span class="dest-explore-link">Complete Guide →</span>
        </div>
        <div class="dest-card-actions">
          <button class="dest-hotels-btn" onclick="event.stopPropagation(); window.router.navigate('/hotels?city=${encodeURIComponent(d.name)}')">
            🏨 View Hotels in ${d.name.split(' ')[0]}
          </button>
          <span style="font-size:0.75rem; color:#94a3b8; font-weight:600;">Best: ${d.best_season}</span>
        </div>
      </div>
    </div>
  `).join('');
}

window.selectDestCategory = function(cat, btn) {
  activeDestCategory = cat;
  document.querySelectorAll('.dest-cat-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === cat));
  filterDestinations();
};

window.filterDestinations = function() {
  const query = (document.getElementById('dest-search-input')?.value || '').toLowerCase().trim();

  filteredDestinations = allDestinations.filter(d => {
    const matchesCat = (activeDestCategory === 'all' || d.category === activeDestCategory);
    const matchesQuery = !query ||
      d.name.toLowerCase().includes(query) ||
      d.state_country.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      d.tagline.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const grid = document.getElementById('explore-dest-grid');
  if (grid) grid.innerHTML = renderExploreGrid(filteredDestinations);
};
