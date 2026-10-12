// ============================================================================
// VIEW: DESTINATION DETAILS & TRAVEL GUIDE
// ============================================================================

async function renderDestinationDetailsView(params) {
  const destId = params.id;
  const dest = await window.db.getDestinationById(destId);
  const allHotels = await window.db.getHotels();

  if (!dest) {
    return `
      <div class="wy-error-view">
        <h2>Destination Not Found</h2>
        <p>The travel guide you're looking for does not exist.</p>
        <button class="btn btn-primary" onclick="window.router.navigate('/explore')">Back to Explore</button>
      </div>
    `;
  }

  // Find nearby hotels with token and bidirectional place matching
  const nearbyHotels = allHotels.filter(h => {
    const dName = (dest.name || '').toLowerCase();
    const hCity = (h.city || '').toLowerCase();
    const hState = (h.state_country || '').toLowerCase();
    if (hCity.includes(dName) || dName.includes(hCity) || hState.includes(dName)) return true;
    const tokens = dName.split(/[\s,–—&/-]+/).map(t => t.trim()).filter(t => t.length >= 3);
    return tokens.some(t => hCity.includes(t) || t.includes(hCity) || hState.includes(t));
  }).slice(0, 3);

  return `
    <div class="wy-details-page">
      <!-- TOP NAVIGATION BAR -->
      <div class="details-nav-bar">
        <button class="back-link-btn" onclick="window.history.back()">← Back to Destinations</button>
        <div class="details-action-tools">
          <button class="btn-tool" onclick="window.state.toggleFavorite('${dest.id}', 'destination', ${JSON.stringify(dest).replace(/"/g, '&quot;')})">
            ${window.state.isFavorite(dest.id) ? '❤️ Saved' : '🤍 Save Destination'}
          </button>
          <button class="btn-tool" onclick="navigator.clipboard.writeText(window.location.href); window.state.showToast('Guide link copied!');">🔗 Share Guide</button>
        </div>
      </div>

      <!-- HERO BANNER -->
      <div class="dest-hero-card" style="background-image: linear-gradient(180deg, rgba(10, 25, 47, 0.4) 0%, rgba(10, 25, 47, 0.95) 100%), url('${dest.cover_image}');">
        <div class="dest-hero-text">
          <span class="dest-hero-cat">✦ ${dest.category.toUpperCase().replace('_', ' ')}</span>
          <h1 class="dest-hero-title">${dest.name}</h1>
          <p class="dest-hero-subtitle">📍 ${dest.state_country} • ⭐ ${dest.rating} (${dest.reviews_count} traveler reviews)</p>
          <p class="dest-hero-tagline">"${dest.tagline}"</p>
        </div>
      </div>

      <!-- QUICK STATS BAR -->
      <div class="dest-quick-stats">
        <div class="stat-box">
          <span class="stat-icon">🌤️</span>
          <span class="stat-title">Best Time to Visit</span>
          <span class="stat-val">${dest.best_season}</span>
        </div>
        <div class="stat-box">
          <span class="stat-icon">💰</span>
          <span class="stat-title">Est. Daily Budget</span>
          <span class="stat-val">${window.state.formatPrice(dest.avg_budget_per_day)} / day</span>
        </div>
        <div class="stat-box">
          <span class="stat-icon">⏱️</span>
          <span class="stat-title">Recommended Stay</span>
          <span class="stat-val">3 to 5 Days</span>
        </div>
        <div class="stat-box">
          <span class="stat-icon">✈️</span>
          <span class="stat-title">Connectivity</span>
          <span class="stat-val">Airport & Rail Linked</span>
        </div>
      </div>

      <!-- MAIN CONTENT & ITINERARY -->
      <div class="details-split-container">
        <div class="details-main-column">
          <!-- Overview -->
          <section class="details-section-card">
            <h2 class="card-section-title">About ${dest.name}</h2>
            <p class="details-long-text">${dest.description}</p>
          </section>

          <!-- Top Attractions -->
          <section class="details-section-card">
            <h2 class="card-section-title">Must-Visit Attractions & Sights</h2>
            <div class="attractions-grid">
              ${(dest.attractions || []).map(att => `
                <div class="attraction-card">
                  <div class="attraction-badge">${att.type}</div>
                  <h4>${att.name}</h4>
                  <p>${att.description}</p>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Suggested Itinerary -->
          <section class="details-section-card">
            <h2 class="card-section-title">Suggested 3-Day Itinerary</h2>
            <div class="itinerary-timeline">
              ${(dest.suggested_itinerary || []).map(it => `
                <div class="timeline-node">
                  <div class="node-badge">Day ${it.day}</div>
                  <div class="node-content">
                    <h4>${it.title}</h4>
                    <p>${it.details}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Travel Tips -->
          <section class="details-section-card">
            <h2 class="card-section-title">Insider Travel Tips</h2>
            <ul class="travel-tips-list">
              ${(dest.travel_tips || []).map(tip => `<li>💡 ${tip}</li>`).join('')}
            </ul>
          </section>

          <!-- Nearby Recommended Hotels -->
          ${nearbyHotels.length ? `
            <section class="details-section-card">
              <div class="section-title-wrap">
                <h2 class="card-section-title">Recommended Stays in ${dest.name}</h2>
                <button class="btn btn-outline" onclick="window.router.navigate('/hotels?city=${encodeURIComponent(dest.name)}')">View All Stays →</button>
              </div>
              <div class="hotels-compact-grid">
                ${nearbyHotels.map(h => `
                  <div class="compact-hotel-item" onclick="window.router.navigate('/hotel/${h.id}')">
                    <img src="${h.cover_image}" alt="${h.name}">
                    <div class="compact-hotel-info">
                      <h4>${h.name}</h4>
                      <p>📍 ${h.city} • ⭐ ${h.user_rating}</p>
                      <div class="compact-price">${window.state.formatPrice(h.price_per_night)} <small>/ night</small></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>

        <!-- STICKY ACTION PANEL -->
        <aside class="details-sidebar-column">
          <div class="sticky-booking-box">
            <h3 class="box-title">Plan Your Trip to ${dest.name}</h3>
            <p class="box-desc">Book your flights, stays, or all-inclusive tour packages with guaranteed best prices.</p>

            <button class="btn btn-primary btn-block mb-3" onclick="window.router.navigate('/flights?to=${encodeURIComponent(dest.name)}')">
              ✈️ Search Flights to ${dest.name}
            </button>

            <button class="btn btn-secondary btn-block mb-3" onclick="window.router.navigate('/hotels?city=${encodeURIComponent(dest.name)}')">
              🏨 Find Hotels in ${dest.name}
            </button>

            <button class="btn btn-outline btn-block" onclick="window.router.navigate('/packages?dest=${encodeURIComponent(dest.name)}')">
              🌴 Holiday Packages for ${dest.name}
            </button>
          </div>
        </aside>
      </div>
    </div>
  `;
}
