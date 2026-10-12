// ============================================================================
// VIEW: HOTELS & HOSPITALITY LISTING (MakeMyTrip-inspired luxury stays)
// ============================================================================

let allHotelsList = [];
let filteredHotelsList = [];
let currentSearchCity = '';

// Curated popular destinations with icons
const POPULAR_HOTEL_PLACES = [
  { name: 'Goa', icon: '🏖️' },
  { name: 'Udaipur', icon: '🌊' },
  { name: 'Jaipur', icon: '🏰' },
  { name: 'Kashmir', icon: '🏔️' },
  { name: 'Manali', icon: '🌲' },
  { name: 'Kerala', icon: '🛶' },
  { name: 'Varanasi', icon: '🛕' },
  { name: 'New Delhi', icon: '🏛️' },
  { name: 'Mumbai', icon: '🏙️' },
  { name: 'Dubai', icon: '✨' },
  { name: 'Bali', icon: '🌴' }
];

// Smart place matching engine
function matchesHotelPlace(h, searchKey) {
  if (!searchKey || !searchKey.trim()) return true;
  const raw = searchKey.trim().toLowerCase();

  const city = (h.city || '').toLowerCase();
  const stateCountry = (h.state_country || '').toLowerCase();
  const name = (h.name || '').toLowerCase();
  const address = (h.address || '').toLowerCase();

  // 1. Direct contains either direction (e.g. "Kashmir Valley" matches hotel city "Kashmir")
  if (city.includes(raw) || raw.includes(city)) return true;
  if (stateCountry.includes(raw) || raw.includes(stateCountry)) return true;
  if (name.includes(raw) || address.includes(raw)) return true;

  // 2. Tokenized word matching (split on spaces, commas, ampersands, dashes)
  const tokens = raw.split(/[\s,–—&/-]+/).map(t => t.trim()).filter(t => t.length >= 3);
  for (const token of tokens) {
    if (city.includes(token) || token.includes(city)) return true;
    if (stateCountry.includes(token)) return true;
    if (name.includes(token)) return true;
  }

  return false;
}

async function renderHotelsView() {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  currentSearchCity = (urlParams.get('city') || '').trim();

  allHotelsList = await window.db.getHotels();

  // Filter based on initial place/search
  if (currentSearchCity) {
    filteredHotelsList = allHotelsList.filter(h => matchesHotelPlace(h, currentSearchCity));
  } else {
    filteredHotelsList = [...allHotelsList];
  }

  // Pre-calculate hotel count for each place
  const placeCounts = {};
  POPULAR_HOTEL_PLACES.forEach(p => {
    placeCounts[p.name] = allHotelsList.filter(h => matchesHotelPlace(h, p.name)).length;
  });

  return `
    <div class="wy-hotels-page">
      <!-- SUB-HEADER / SEARCH BAR & PLACE CHIPS -->
      <section class="wy-sub-header">
        <div class="sub-header-container">
          <div class="search-summary-wrap">
            <h2 class="hotels-header-title">Hotels, Resorts & Luxury Stays</h2>
            <div class="summary-details">
              <span id="active-city-display">📍 ${currentSearchCity ? currentSearchCity.toUpperCase() : 'All Popular Destinations'}</span>
              <span>•</span>
              <span>📅 Standard Check-in 2:00 PM</span>
              <span>•</span>
              <span class="verified-badge">✓ 100% Verified Properties</span>
            </div>
          </div>
          <div class="header-search-box">
            <span>🔍</span>
            <input 
              type="text" 
              id="hotel-quick-search" 
              placeholder="Search city, palace, or hotel..." 
              value="${currentSearchCity}" 
              oninput="liveFilterHotels(this.value)" 
              onkeydown="if(event.key==='Enter') searchHotelsByInput()"
            >
            <button 
              id="hotel-search-clear-btn" 
              class="search-clear-btn" 
              onclick="clearHotelSearch()" 
              style="display: ${currentSearchCity ? 'inline-flex' : 'none'};"
              title="Clear search"
            >✕</button>
            <button class="btn btn-primary" onclick="searchHotelsByInput()">Search</button>
          </div>
        </div>

        <!-- 1-CLICK PLACE / DESTINATION FILTER BAR -->
        <div class="hotel-places-strip">
          <span class="places-label">📍 Destination:</span>
          <div class="places-scroll-container" id="hotel-place-chips-row">
            <button 
              class="place-chip ${!currentSearchCity ? 'active' : ''}" 
              data-city=""
              onclick="selectHotelPlace('', this)"
            >
              <span>🌟 All Places</span>
              <span class="chip-count">${allHotelsList.length}</span>
            </button>
            ${POPULAR_HOTEL_PLACES.map(p => {
              const isActive = currentSearchCity && matchesHotelPlace({ city: p.name, state_country: '', name: '', address: '' }, currentSearchCity);
              return `
                <button 
                  class="place-chip ${isActive ? 'active' : ''}" 
                  data-city="${p.name}"
                  onclick="selectHotelPlace('${p.name}', this)"
                >
                  <span>${p.icon} ${p.name}</span>
                  <span class="chip-count">${placeCounts[p.name] || 0}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- RESULTS CONTAINER -->
      <div class="wy-results-container">
        <!-- FILTERS SIDEBAR -->
        <aside class="wy-filters-sidebar">
          <div class="filter-card">
            <div class="filter-header">
              <h3>Filters</h3>
              <button class="reset-filter-btn" onclick="resetHotelFilters()">Reset</button>
            </div>

            <!-- Quick City Radio Filter -->
            <div class="filter-group">
              <h4 class="filter-group-title">Filter by Destination</h4>
              <div class="filter-city-options">
                <label class="filter-checkbox">
                  <input type="radio" name="ht_city_radio" value="" ${!currentSearchCity ? 'checked' : ''} onchange="selectHotelPlace('', null)">
                  <span>All Destinations</span>
                </label>
                ${POPULAR_HOTEL_PLACES.slice(0, 7).map(p => `
                  <label class="filter-checkbox">
                    <input type="radio" name="ht_city_radio" value="${p.name}" ${currentSearchCity.toLowerCase() === p.name.toLowerCase() ? 'checked' : ''} onchange="selectHotelPlace('${p.name}', null)">
                    <span>${p.icon} ${p.name} (${placeCounts[p.name] || 0})</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Star Category -->
            <div class="filter-group">
              <h4 class="filter-group-title">Star Rating</h4>
              <label class="filter-checkbox">
                <input type="checkbox" name="ht_star" value="5" checked onchange="applyHotelFilters()">
                <span>5 Star (Luxury & Palaces)</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="ht_star" value="4" checked onchange="applyHotelFilters()">
                <span>4 Star (Premium Comfort)</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="ht_star" value="3" checked onchange="applyHotelFilters()">
                <span>3 Star (Standard)</span>
              </label>
            </div>

            <!-- Property Type -->
            <div class="filter-group">
              <h4 class="filter-group-title">Property Type</h4>
              <label class="filter-checkbox">
                <input type="checkbox" name="ht_type" value="resort" checked onchange="applyHotelFilters()">
                <span>Resorts</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="ht_type" value="heritage" checked onchange="applyHotelFilters()">
                <span>Heritage Palaces</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="ht_type" value="hotel" checked onchange="applyHotelFilters()">
                <span>Hotels</span>
              </label>
            </div>

            <!-- Price Max Filter -->
            <div class="filter-group">
              <h4 class="filter-group-title">Max Price per Night</h4>
              <input type="range" id="ht-price-range" min="5000" max="60000" step="2000" value="60000" oninput="updateHotelPriceSlider(this.value); applyHotelFilters();">
              <div class="range-labels">
                <span>₹5,000</span>
                <span id="ht-slider-val" class="font-bold">₹60,000</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- HOTEL LISTINGS COLUMN -->
        <main class="wy-listings-column">
          <div class="listings-sort-strip">
            <span class="results-count" id="hotels-count">
              ${filteredHotelsList.length} Properties ${currentSearchCity ? 'in ' + currentSearchCity : 'Found'}
            </span>
            <div class="sort-selector">
              <label for="ht-sort">Sort by:</label>
              <select id="ht-sort" class="sort-dropdown" onchange="sortHotels(this.value)">
                <option value="popular">Popularity & Rating</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div class="hotel-listings-grid" id="hotel-listings-grid">
            ${renderHotelCardsList(filteredHotelsList)}
          </div>
        </main>
      </div>
    </div>
  `;
}

function renderHotelCardsList(list) {
  if (!list.length) {
    const searchedText = currentSearchCity || 'your filters';
    return `
      <div class="no-results-card">
        <span class="empty-icon">🏨</span>
        <h3>No hotels found matching "${searchedText}"</h3>
        <p>We couldn't find any stays matching this location or price criteria.</p>
        <div class="empty-suggestions">
          <span class="empty-suggestions-label">Explore hotels in popular destinations:</span>
          <div class="empty-suggestions-chips">
            <button class="empty-sug-chip" onclick="selectHotelPlace('Goa')">🏖️ Goa</button>
            <button class="empty-sug-chip" onclick="selectHotelPlace('Jaipur')">🏰 Jaipur</button>
            <button class="empty-sug-chip" onclick="selectHotelPlace('Udaipur')">🌊 Udaipur</button>
            <button class="empty-sug-chip" onclick="selectHotelPlace('Kashmir')">🏔️ Kashmir</button>
            <button class="empty-sug-chip" onclick="selectHotelPlace('Manali')">🌲 Manali</button>
            <button class="empty-sug-chip" onclick="selectHotelPlace('Kerala')">🛶 Kerala</button>
            <button class="empty-sug-chip" onclick="selectHotelPlace('Varanasi')">🛕 Varanasi</button>
            <button class="empty-sug-chip" onclick="selectHotelPlace('Dubai')">✨ Dubai</button>
          </div>
        </div>
        <div style="margin-top: 1.25rem;">
          <button class="btn btn-outline" onclick="selectHotelPlace('')">View All Destinations</button>
        </div>
      </div>
    `;
  }

  return list.map(h => `
    <div class="hotel-wide-card" onclick="window.router.navigate('/hotel/${h.id}')">
      <div class="ht-col-image">
        <img src="${h.cover_image}" alt="${h.name}" loading="lazy">
        <span class="ht-stars-tag">${'★'.repeat(h.star_rating)}</span>
        <button class="hotel-fav-btn" onclick="event.stopPropagation(); window.state.toggleFavorite('${h.id}', 'hotel', ${JSON.stringify(h).replace(/"/g, '&quot;')})">
          ${window.state.isFavorite(h.id) ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="ht-col-info">
        <div class="ht-top-meta">
          <span class="ht-type-tag">${(h.property_type || 'Hotel').toUpperCase()}</span>
          <span class="ht-user-rating">⭐ ${h.user_rating} (${h.reviews_count} reviews)</span>
        </div>
        <h3 class="ht-name">${h.name}</h3>
        <p class="ht-address">📍 ${h.address}</p>
        <p class="ht-desc-snippet">${h.description.slice(0, 110)}...</p>

        <div class="ht-amenities-row">
          ${(h.amenities || []).slice(0, 4).map(a => `<span class="ht-amenity-pill">✓ ${a}</span>`).join('')}
        </div>
      </div>

      <div class="ht-col-pricing">
        <span class="free-cancel-tag">Free Cancellation Available</span>
        <div class="ht-price-box">
          <span class="ht-strike-price">${window.state.formatPrice(h.original_price || h.price_per_night * 1.25)}</span>
          <span class="ht-final-price">${window.state.formatPrice(h.price_per_night)}</span>
          <span class="ht-tax-note">+ ₹${Math.round(h.price_per_night * 0.18)} taxes & fees / night</span>
        </div>
        <button class="btn btn-primary btn-view-hotel" onclick="event.stopPropagation(); window.router.navigate('/hotel/${h.id}')">
          View Room & Book
        </button>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------------------
// INTERACTION & FILTERING FUNCTIONS
// ----------------------------------------------------------------------------

// 1. One-click Place Chip Selection
window.selectHotelPlace = function(cityName, btnElement) {
  currentSearchCity = (cityName || '').trim();

  // Update Search Input & Clear button
  const input = document.getElementById('hotel-quick-search');
  const clearBtn = document.getElementById('hotel-search-clear-btn');
  if (input) input.value = currentSearchCity;
  if (clearBtn) clearBtn.style.display = currentSearchCity ? 'inline-flex' : 'none';

  // Update active status on place chips
  const allChips = document.querySelectorAll('.place-chip');
  allChips.forEach(chip => {
    const chipCity = chip.getAttribute('data-city') || '';
    if (!currentSearchCity && !chipCity) {
      chip.classList.add('active');
    } else if (currentSearchCity && chipCity && chipCity.toLowerCase() === currentSearchCity.toLowerCase()) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  // Update radio in sidebar if present
  const radios = document.querySelectorAll('input[name="ht_city_radio"]');
  radios.forEach(r => {
    r.checked = (r.value.toLowerCase() === currentSearchCity.toLowerCase());
  });

  // Update display header
  const displayEl = document.getElementById('active-city-display');
  if (displayEl) {
    displayEl.textContent = `📍 ${currentSearchCity ? currentSearchCity.toUpperCase() : 'All Popular Destinations'}`;
  }

  // Update URL hash smoothly without jitter
  const targetHash = currentSearchCity ? `#/hotels?city=${encodeURIComponent(currentSearchCity)}` : `#/hotels`;
  if (window.location.hash !== targetHash) {
    window.history.replaceState(null, '', targetHash);
  }

  // Apply filters immediately
  applyHotelFilters();
};

// 2. Real-time Live Search as user types
window.liveFilterHotels = function(query) {
  currentSearchCity = (query || '').trim();

  const clearBtn = document.getElementById('hotel-search-clear-btn');
  if (clearBtn) clearBtn.style.display = currentSearchCity ? 'inline-flex' : 'none';

  // Update active chips to match or clear
  const allChips = document.querySelectorAll('.place-chip');
  allChips.forEach(chip => {
    const chipCity = chip.getAttribute('data-city') || '';
    if (!currentSearchCity && !chipCity) {
      chip.classList.add('active');
    } else if (currentSearchCity && chipCity && currentSearchCity.toLowerCase().includes(chipCity.toLowerCase())) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  // Update header text
  const displayEl = document.getElementById('active-city-display');
  if (displayEl) {
    displayEl.textContent = `📍 ${currentSearchCity ? currentSearchCity.toUpperCase() : 'All Popular Destinations'}`;
  }

  applyHotelFilters();
};

// 3. Clear Search Input
window.clearHotelSearch = function() {
  selectHotelPlace('', null);
};

// 4. Triggered by Enter or Search Button
window.searchHotelsByInput = function() {
  const q = document.getElementById('hotel-quick-search')?.value.trim() || '';
  selectHotelPlace(q, null);
};

// 5. Price slider text update
window.updateHotelPriceSlider = function(val) {
  const el = document.getElementById('ht-slider-val');
  if (el) el.textContent = `₹${parseInt(val).toLocaleString('en-IN')}`;
};

// 6. Master Filter Applier
window.applyHotelFilters = function() {
  const selectedStars = Array.from(document.querySelectorAll('input[name="ht_star"]:checked')).map(el => parseInt(el.value));
  const selectedTypes = Array.from(document.querySelectorAll('input[name="ht_type"]:checked')).map(el => el.value);
  const maxPrice = parseInt(document.getElementById('ht-price-range')?.value || '60000');

  filteredHotelsList = allHotelsList.filter(h => {
    // City / Place filter
    if (currentSearchCity && !matchesHotelPlace(h, currentSearchCity)) {
      return false;
    }
    // Star rating filter
    if (selectedStars.length && !selectedStars.includes(h.star_rating)) {
      return false;
    }
    // Property type filter
    if (selectedTypes.length && !selectedTypes.includes(h.property_type)) {
      return false;
    }
    // Price filter
    if (h.price_per_night > maxPrice) {
      return false;
    }
    return true;
  });

  // Re-sort if sort dropdown selected
  const sortType = document.getElementById('ht-sort')?.value || 'popular';
  if (sortType === 'price_asc') {
    filteredHotelsList.sort((a, b) => a.price_per_night - b.price_per_night);
  } else if (sortType === 'price_desc') {
    filteredHotelsList.sort((a, b) => b.price_per_night - a.price_per_night);
  } else {
    filteredHotelsList.sort((a, b) => b.user_rating - a.user_rating);
  }

  const container = document.getElementById('hotel-listings-grid');
  const countEl = document.getElementById('hotels-count');
  if (container) container.innerHTML = renderHotelCardsList(filteredHotelsList);
  if (countEl) {
    countEl.textContent = `${filteredHotelsList.length} Properties ${currentSearchCity ? 'in ' + currentSearchCity : 'Found'}`;
  }
};

// 7. Reset all filters
window.resetHotelFilters = function() {
  document.querySelectorAll('input[name="ht_star"]').forEach(c => c.checked = true);
  document.querySelectorAll('input[name="ht_type"]').forEach(c => c.checked = true);
  const slider = document.getElementById('ht-price-range');
  if (slider) {
    slider.value = 60000;
    updateHotelPriceSlider(60000);
  }
  selectHotelPlace('', null);
};

// 8. Sorting
window.sortHotels = function(sortType) {
  if (sortType === 'price_asc') {
    filteredHotelsList.sort((a, b) => a.price_per_night - b.price_per_night);
  } else if (sortType === 'price_desc') {
    filteredHotelsList.sort((a, b) => b.price_per_night - a.price_per_night);
  } else {
    filteredHotelsList.sort((a, b) => b.user_rating - a.user_rating);
  }
  const container = document.getElementById('hotel-listings-grid');
  if (container) container.innerHTML = renderHotelCardsList(filteredHotelsList);
};
