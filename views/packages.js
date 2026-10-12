// ============================================================================
// VIEW: HOLIDAY PACKAGES & TOUR ITINERARIES
// ============================================================================

let allPackagesList = [];
let filteredPackagesList = [];

let currentPkgDest = '';

const POPULAR_PKG_DESTS = [
  { name: 'Kashmir', icon: '🏔️' },
  { name: 'Kerala', icon: '🛶' },
  { name: 'Goa', icon: '🏖️' },
  { name: 'Rajasthan', icon: '🏰' },
  { name: 'Himachal', icon: '🌲' },
  { name: 'Dubai', icon: '✨' },
  { name: 'Bali', icon: '🌴' }
];

function matchesPackagePlace(p, searchKey) {
  if (!searchKey || !searchKey.trim()) return true;
  const raw = searchKey.trim().toLowerCase();
  const dest = (p.destination || '').toLowerCase();
  const title = (p.title || '').toLowerCase();

  if (dest.includes(raw) || raw.includes(dest)) return true;
  if (title.includes(raw)) return true;

  const tokens = raw.split(/[\s,–—&/-]+/).map(t => t.trim()).filter(t => t.length >= 3);
  return tokens.some(t => dest.includes(t) || t.includes(dest) || title.includes(t));
}

async function renderPackagesView() {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  currentPkgDest = (urlParams.get('dest') || '').trim();

  allPackagesList = await window.db.getPackages();

  if (currentPkgDest) {
    filteredPackagesList = allPackagesList.filter(p => matchesPackagePlace(p, currentPkgDest));
  } else {
    filteredPackagesList = [...allPackagesList];
  }

  return `
    <div class="wy-packages-page">
      <!-- HEADER -->
      <section class="wy-sub-header">
        <div class="sub-header-container">
          <div class="search-summary-wrap">
            <h2 class="hotels-header-title">All-Inclusive Holiday Packages</h2>
            <div class="summary-details">
              <span id="active-pkg-dest-display">📍 ${currentPkgDest ? currentPkgDest.toUpperCase() : 'All Curated Destinations'}</span>
              <span>•</span>
              <span>🚗 Private Cab & Verified Stays Included</span>
              <span>•</span>
              <span class="verified-badge">✓ 100% Customizable</span>
            </div>
          </div>
          <div class="header-search-box">
            <span>🔍</span>
            <input 
              type="text" 
              id="pkg-quick-search" 
              placeholder="Search destination (e.g. Kashmir, Kerala, Goa)..." 
              value="${currentPkgDest}" 
              oninput="liveFilterPackages(this.value)"
              onkeydown="if(event.key==='Enter') searchPackagesByInput()"
            >
            <button 
              id="pkg-clear-btn" 
              class="search-clear-btn" 
              onclick="selectPackagePlace('')" 
              style="display: ${currentPkgDest ? 'inline-flex' : 'none'};"
            >✕</button>
            <button class="btn btn-primary" onclick="searchPackagesByInput()">Search</button>
          </div>
        </div>

        <!-- 1-CLICK PACKAGE DESTINATION CHIPS -->
        <div class="hotel-places-strip">
          <span class="places-label">🌴 Destinations:</span>
          <div class="places-scroll-container">
            <button class="place-chip ${!currentPkgDest ? 'active' : ''}" onclick="selectPackagePlace('')">
              <span>🌟 All Packages</span>
              <span class="chip-count">${allPackagesList.length}</span>
            </button>
            ${POPULAR_PKG_DESTS.map(d => {
              const isActive = currentPkgDest && matchesPackagePlace({ destination: d.name, title: '' }, currentPkgDest);
              const count = allPackagesList.filter(p => matchesPackagePlace(p, d.name)).length;
              return `
                <button class="place-chip ${isActive ? 'active' : ''}" onclick="selectPackagePlace('${d.name}')">
                  <span>${d.icon} ${d.name}</span>
                  <span class="chip-count">${count}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- RESULTS CONTAINER -->
      <div class="wy-results-container">
        <!-- SIDEBAR FILTERS -->
        <aside class="wy-filters-sidebar">
          <div class="filter-card">
            <div class="filter-header">
              <h3>Filters</h3>
              <button class="reset-filter-btn" onclick="resetPkgFilters()">Reset</button>
            </div>

            <!-- Categories -->
            <div class="filter-group">
              <h4 class="filter-group-title">Theme / Occasion</h4>
              <label class="filter-checkbox">
                <input type="checkbox" name="pkg_cat" value="honeymoon" checked onchange="applyPkgFilters()">
                <span>Honeymoon Special</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="pkg_cat" value="family" checked onchange="applyPkgFilters()">
                <span>Family & Friends</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="pkg_cat" value="luxury" checked onchange="applyPkgFilters()">
                <span>Royal Luxury</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="pkg_cat" value="weekend" checked onchange="applyPkgFilters()">
                <span>Short Break / Weekend</span>
              </label>
            </div>

            <!-- Duration -->
            <div class="filter-group">
              <h4 class="filter-group-title">Duration</h4>
              <label class="filter-checkbox">
                <input type="checkbox" name="pkg_dur" value="short" checked onchange="applyPkgFilters()">
                <span>1 - 4 Days</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="pkg_dur" value="medium" checked onchange="applyPkgFilters()">
                <span>5 - 7 Days</span>
              </label>
            </div>

            <!-- Price Max Filter -->
            <div class="filter-group">
              <h4 class="filter-group-title">Max Budget / Person</h4>
              <input type="range" id="pkg-price-range" min="10000" max="50000" step="2500" value="50000" oninput="updatePkgPriceSlider(this.value); applyPkgFilters();">
              <div class="range-labels">
                <span>₹10,000</span>
                <span id="pkg-slider-val" class="font-bold">₹50,000</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- PACKAGES LIST COLUMN -->
        <main class="wy-listings-column">
          <div class="listings-sort-strip">
            <span class="results-count" id="pkg-count">${filteredPackagesList.length} Packages Available</span>
            <div class="sort-selector">
              <label for="pkg-sort">Sort by:</label>
              <select id="pkg-sort" class="sort-dropdown" onchange="sortPackages(this.value)">
                <option value="popular">Popularity & Rating</option>
                <option value="price_asc">Price: Lowest First</option>
                <option value="duration_desc">Longest Duration</option>
              </select>
            </div>
          </div>

          <div class="packages-list-grid" id="packages-list-grid">
            ${renderPackagesCardsList(filteredPackagesList)}
          </div>
        </main>
      </div>
    </div>
  `;
}

function renderPackagesCardsList(list) {
  if (!list.length) {
    return `
      <div class="no-results-card">
        <span class="empty-icon">🌴</span>
        <h3>No packages found matching your criteria</h3>
        <p>Try clearing filters to view all handcrafted vacations.</p>
        <button class="btn btn-outline" onclick="resetPkgFilters()">Reset Filters</button>
      </div>
    `;
  }

  return list.map(pkg => `
    <div class="pkg-horizontal-card">
      <div class="pkg-h-img">
        <img src="${pkg.cover_image}" alt="${pkg.title}" loading="lazy">
        <span class="pkg-nights-pill">${pkg.duration_nights} Nights / ${pkg.duration_days} Days</span>
        <span class="pkg-theme-pill">${pkg.category.toUpperCase()}</span>
      </div>

      <div class="pkg-h-info">
        <div class="pkg-meta-top">
          <span class="pkg-dest-tag">📍 ${pkg.destination}</span>
          <span class="pkg-stars">⭐ ${pkg.rating} (${pkg.reviews_count} reviews)</span>
        </div>
        <h3 class="pkg-h-title">${pkg.title}</h3>
        <div class="pkg-inclusions-chips">
          <span>✓ Private Cab</span>
          <span>✓ Daily Breakfast</span>
          <span>✓ Sightseeing</span>
          <span>✓ Verified Hotels</span>
        </div>

        <div class="pkg-itinerary-preview">
          <strong>Key Highlights:</strong>
          <ul>
            ${(pkg.highlights || []).slice(0, 3).map(h => `<li>✦ ${h}</li>`).join('')}
          </ul>
        </div>

        <button class="btn-itinerary-toggle" onclick="toggleItineraryModal('${pkg.id}')">
          🗺️ View Day-by-Day Itinerary (${pkg.duration_days} Days)
        </button>
      </div>

      <div class="pkg-h-pricing">
        <span class="pkg-deal-badge">Guaranteed Departure</span>
        <div class="pkg-price-stack">
          <span class="pkg-old-price">${window.state.formatPrice(pkg.original_price || pkg.price * 1.3)}</span>
          <span class="pkg-new-price">${window.state.formatPrice(pkg.price)}</span>
          <span class="pkg-pp-label">per person on twin sharing</span>
        </div>
        <button class="btn btn-primary btn-book-pkg" onclick="bookPackageFromList('${pkg.id}')">
          Book Package
        </button>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------------------
// INTERACTION LOGIC
// ----------------------------------------------------------------------------
window.selectPackagePlace = function(destName) {
  currentPkgDest = (destName || '').trim();
  const input = document.getElementById('pkg-quick-search');
  const clearBtn = document.getElementById('pkg-clear-btn');
  if (input) input.value = currentPkgDest;
  if (clearBtn) clearBtn.style.display = currentPkgDest ? 'inline-flex' : 'none';

  const display = document.getElementById('active-pkg-dest-display');
  if (display) display.textContent = `📍 ${currentPkgDest ? currentPkgDest.toUpperCase() : 'All Curated Destinations'}`;

  const allChips = document.querySelectorAll('.wy-packages-page .place-chip');
  allChips.forEach(chip => {
    chip.classList.remove('active');
  });

  const targetHash = currentPkgDest ? `#/packages?dest=${encodeURIComponent(currentPkgDest)}` : `#/packages`;
  if (window.location.hash !== targetHash) {
    window.history.replaceState(null, '', targetHash);
  }

  applyPkgFilters();
};

window.liveFilterPackages = function(val) {
  currentPkgDest = (val || '').trim();
  const clearBtn = document.getElementById('pkg-clear-btn');
  if (clearBtn) clearBtn.style.display = currentPkgDest ? 'inline-flex' : 'none';
  const display = document.getElementById('active-pkg-dest-display');
  if (display) display.textContent = `📍 ${currentPkgDest ? currentPkgDest.toUpperCase() : 'All Curated Destinations'}`;
  applyPkgFilters();
};

window.searchPackagesByInput = function() {
  const q = document.getElementById('pkg-quick-search')?.value.trim() || '';
  selectPackagePlace(q);
};

window.updatePkgPriceSlider = function(val) {
  const el = document.getElementById('pkg-slider-val');
  if (el) el.textContent = `₹${parseInt(val).toLocaleString('en-IN')}`;
};

window.applyPkgFilters = function() {
  const selectedCats = Array.from(document.querySelectorAll('input[name="pkg_cat"]:checked')).map(el => el.value);
  const selectedDurs = Array.from(document.querySelectorAll('input[name="pkg_dur"]:checked')).map(el => el.value);
  const maxPrice = parseInt(document.getElementById('pkg-price-range')?.value || '50000');

  filteredPackagesList = allPackagesList.filter(p => {
    if (currentPkgDest && !matchesPackagePlace(p, currentPkgDest)) return false;
    if (selectedCats.length && !selectedCats.includes(p.category)) return false;
    if (p.price > maxPrice) return false;
    if (selectedDurs.length) {
      const isShort = p.duration_days <= 4;
      const isMedium = p.duration_days >= 5;
      if (!selectedDurs.includes('short') && isShort) return false;
      if (!selectedDurs.includes('medium') && isMedium) return false;
    }
    return true;
  });

  const container = document.getElementById('packages-list-grid');
  const countEl = document.getElementById('pkg-count');
  if (container) container.innerHTML = renderPackagesCardsList(filteredPackagesList);
  if (countEl) countEl.textContent = `${filteredPackagesList.length} Packages Available`;
};

window.resetPkgFilters = function() {
  document.querySelectorAll('input[name="pkg_cat"]').forEach(c => c.checked = true);
  document.querySelectorAll('input[name="pkg_dur"]').forEach(c => c.checked = true);
  const slider = document.getElementById('pkg-price-range');
  if (slider) {
    slider.value = 50000;
    updatePkgPriceSlider(50000);
  }
  filteredPackagesList = [...allPackagesList];
  applyPkgFilters();
};

window.sortPackages = function(sortType) {
  if (sortType === 'price_asc') {
    filteredPackagesList.sort((a, b) => a.price - b.price);
  } else if (sortType === 'duration_desc') {
    filteredPackagesList.sort((a, b) => b.duration_days - a.duration_days);
  } else {
    filteredPackagesList.sort((a, b) => b.rating - a.rating);
  }
  const container = document.getElementById('packages-list-grid');
  if (container) container.innerHTML = renderPackagesCardsList(filteredPackagesList);
};

window.toggleItineraryModal = async function(pkgId) {
  const pkg = await window.db.getPackageById(pkgId);
  if (!pkg) return;

  const modalRoot = document.getElementById('modal-root') || document.body;
  const modal = document.createElement('div');
  modal.className = 'wy-modal-backdrop';
  modal.innerHTML = `
    <div class="wy-modal-card modal-lg">
      <div class="modal-header">
        <div>
          <span class="badge-type">${pkg.duration_nights}N / ${pkg.duration_days}D Itinerary</span>
          <h2 class="modal-title">${pkg.title}</h2>
        </div>
        <button class="modal-close-btn" onclick="this.closest('.wy-modal-backdrop').remove()">✕</button>
      </div>
      <div class="modal-body">
        <div class="itinerary-timeline">
          ${(pkg.itinerary || []).map(day => `
            <div class="timeline-node">
              <div class="node-badge">Day ${day.day}</div>
              <div class="node-content">
                <h4>${day.title}</h4>
                <p>${day.activities || day.details}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="inclusions-exclusions-grid">
          <div class="inc-box">
            <h4>✓ What's Included:</h4>
            <ul>${(pkg.inclusions || []).map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
          <div class="exc-box">
            <h4>✕ What's Excluded:</h4>
            <ul>${(pkg.exclusions || []).map(e => `<li>${e}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="modal-price-box">
          <span class="price-val">${window.state.formatPrice(pkg.price)}</span>
          <span class="price-sub">per person</span>
        </div>
        <button class="btn btn-primary" onclick="this.closest('.wy-modal-backdrop').remove(); bookPackageFromList('${pkg.id}');">Book This Tour</button>
      </div>
    </div>
  `;
  modalRoot.appendChild(modal);
};

window.bookPackageFromList = async function(pkgId) {
  const pkg = await window.db.getPackageById(pkgId);
  if (!pkg) return;

  const travelers = 2;
  const baseFare = pkg.price * travelers;
  const taxes = Math.round(baseFare * 0.05);
  const total = baseFare + taxes;

  const draft = {
    booking_type: 'package',
    item_id: pkg.id,
    item_title: pkg.title,
    item_subtitle: `${pkg.destination} • ${pkg.duration_nights}N/${pkg.duration_days}D • ${travelers} Travellers`,
    booking_details: {
      package_id: pkg.id,
      package_title: pkg.title,
      destination: pkg.destination,
      duration: `${pkg.duration_nights}N / ${pkg.duration_days}D`,
      travelers: travelers,
      travel_date: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]
    },
    base_amount: baseFare,
    tax_amount: taxes,
    discount_amount: 0,
    total_amount: total
  };

  window.state.setBookingDraft(draft);
  window.router.navigate('/checkout');
};
