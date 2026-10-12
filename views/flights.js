// ============================================================================
// VIEW: FLIGHTS SEARCH & RESULTS (Interactive airline filters & booking flow)
// ============================================================================

let currentFlightList = [];
let filteredFlightList = [];

async function renderFlightsView() {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const fromCity = urlParams.get('from') || 'Delhi (DEL)';
  const toCity = urlParams.get('to') || 'Goa (GOI)';
  const travelDate = urlParams.get('date') || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  currentFlightList = await window.db.getFlights(fromCity, toCity, travelDate);
  filteredFlightList = [...currentFlightList];

  return `
    <div class="wy-flights-page">
      <!-- FLIGHTS SUB-HEADER / SEARCH MODIFIER -->
      <section class="wy-sub-header">
        <div class="sub-header-container">
          <div class="search-summary-wrap">
            <div class="summary-cities">
              <span class="city-badge">${fromCity}</span>
              <span class="route-arrow">✈️</span>
              <span class="city-badge">${toCity}</span>
            </div>
            <div class="summary-details">
              <span>📅 ${travelDate}</span>
              <span>•</span>
              <span>👤 1 Adult, Economy</span>
              <span>•</span>
              <span class="verified-badge">✓ Live Inventory</span>
            </div>
          </div>
          <button class="btn btn-outline-light" onclick="toggleSearchModifier()">Modify Flight Search</button>
        </div>

        <!-- Hidden expandable modifier panel -->
        <div id="flight-modifier-panel" class="modifier-panel hidden">
          <div class="modifier-grid">
            <input type="text" id="mod-from" value="${fromCity}" placeholder="From">
            <input type="text" id="mod-to" value="${toCity}" placeholder="To">
            <input type="date" id="mod-date" value="${travelDate}">
            <button class="btn btn-primary" onclick="applyModifiedFlightSearch()">Update Flights</button>
          </div>
        </div>
      </section>

      <!-- MAIN RESULTS CONTAINER WITH SIDEBAR -->
      <div class="wy-results-container">
        <!-- FILTERS SIDEBAR -->
        <aside class="wy-filters-sidebar">
          <div class="filter-card">
            <div class="filter-header">
              <h3>Filters</h3>
              <button class="reset-filter-btn" onclick="resetFlightFilters()">Reset All</button>
            </div>

            <!-- Stops Filter -->
            <div class="filter-group">
              <h4 class="filter-group-title">Stops</h4>
              <label class="filter-checkbox">
                <input type="checkbox" name="fl_stops" value="0" checked onchange="applyFlightFilters()">
                <span>Non-stop flights</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="fl_stops" value="1" checked onchange="applyFlightFilters()">
                <span>1 Stop flights</span>
              </label>
            </div>

            <!-- Airlines Filter -->
            <div class="filter-group">
              <h4 class="filter-group-title">Airlines</h4>
              <label class="filter-checkbox">
                <input type="checkbox" name="fl_airline" value="IndiGo" checked onchange="applyFlightFilters()">
                <span>IndiGo</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="fl_airline" value="Air India" checked onchange="applyFlightFilters()">
                <span>Air India</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="fl_airline" value="Vistara" checked onchange="applyFlightFilters()">
                <span>Vistara</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="fl_airline" value="Akasa Air" checked onchange="applyFlightFilters()">
                <span>Akasa Air</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" name="fl_airline" value="SpiceJet" checked onchange="applyFlightFilters()">
                <span>SpiceJet</span>
              </label>
            </div>

            <!-- Departure Time Filter -->
            <div class="filter-group">
              <h4 class="filter-group-title">Departure Time</h4>
              <div class="time-chips-grid">
                <button class="time-chip" data-time="morning" onclick="toggleTimeFilter(this, 'morning')">
                  <span class="chip-time">06:00 - 12:00</span>
                  <span class="chip-name">Morning</span>
                </button>
                <button class="time-chip" data-time="afternoon" onclick="toggleTimeFilter(this, 'afternoon')">
                  <span class="chip-time">12:00 - 18:00</span>
                  <span class="chip-name">Afternoon</span>
                </button>
                <button class="time-chip" data-time="evening" onclick="toggleTimeFilter(this, 'evening')">
                  <span class="chip-time">18:00 - 24:00</span>
                  <span class="chip-name">Evening</span>
                </button>
              </div>
            </div>

            <!-- Price Max Filter -->
            <div class="filter-group">
              <h4 class="filter-group-title">Max Price</h4>
              <input type="range" id="fl-price-range" min="4000" max="15000" step="500" value="15000" oninput="updatePriceSlider(this.value); applyFlightFilters();">
              <div class="range-labels">
                <span>₹4,000</span>
                <span id="price-slider-val" class="font-bold">₹15,000</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- FLIGHT LISTINGS COLUMN -->
        <main class="wy-listings-column">
          <!-- Sort & Count Strip -->
          <div class="listings-sort-strip">
            <span class="results-count" id="flight-results-count">${filteredFlightList.length} Flights Available</span>
            <div class="sort-selector">
              <label for="fl-sort">Sort by:</label>
              <select id="fl-sort" class="sort-dropdown" onchange="sortFlights(this.value)">
                <option value="price_asc">Price: Lowest First</option>
                <option value="duration">Fastest Duration</option>
                <option value="departure">Earliest Departure</option>
              </select>
            </div>
          </div>

          <!-- Dynamic Flights Cards Container -->
          <div class="flight-cards-list" id="flight-cards-list">
            ${renderFlightCards(filteredFlightList)}
          </div>
        </main>
      </div>
    </div>
  `;
}

function renderFlightCards(list) {
  if (!list.length) {
    return `
      <div class="no-results-card">
        <span class="empty-icon">🛫</span>
        <h3>No flights match your filter criteria</h3>
        <p>Try resetting some filters or modifying departure times to view more flights.</p>
        <button class="btn btn-outline" onclick="resetFlightFilters()">Clear All Filters</button>
      </div>
    `;
  }

  return list.map(fl => `
    <div class="flight-card">
      <div class="fl-col-airline">
        <div class="fl-airline-info">
          <div class="fl-airline-icon">✈️</div>
          <div>
            <h4 class="airline-name">${fl.airline}</h4>
            <span class="airline-code">${fl.airline_code}</span>
          </div>
        </div>
        <span class="cabin-badge">${fl.cabin_class}</span>
      </div>

      <div class="fl-col-schedule">
        <div class="schedule-point">
          <span class="fl-time">${fl.departure_time}</span>
          <span class="fl-code">${fl.from_code}</span>
        </div>
        <div class="schedule-duration">
          <span class="duration-text">${fl.duration}</span>
          <div class="duration-line">
            <span class="line-dot"></span>
            <span class="line-dot"></span>
          </div>
          <span class="stops-text ${fl.stops === 0 ? 'non-stop' : ''}">${fl.stops_text}</span>
        </div>
        <div class="schedule-point">
          <span class="fl-time">${fl.arrival_time}</span>
          <span class="fl-code">${fl.to_code}</span>
        </div>
      </div>

      <div class="fl-col-amenities">
        <span class="amenity-item">🧳 ${fl.baggage}</span>
        <span class="amenity-item">${fl.meal_included ? '🍽️ Free Meal' : '☕ Paid Meals'}</span>
        <span class="seats-left-text">${fl.seats_left} seats left at this price</span>
      </div>

      <div class="fl-col-action">
        <div class="fl-price-wrap">
          <span class="fl-original-price">${window.state.formatPrice(fl.original_price)}</span>
          <span class="fl-price">${window.state.formatPrice(fl.price)}</span>
          <span class="fl-per-adult">per traveller</span>
        </div>
        <button class="btn btn-primary btn-book-flight" onclick="bookFlightSelected('${fl.id}')">
          <span>Book Now</span>
        </button>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------------------
// INTERACTION LOGIC
// ----------------------------------------------------------------------------
window.toggleSearchModifier = function() {
  const panel = document.getElementById('flight-modifier-panel');
  panel.classList.toggle('hidden');
};

window.applyModifiedFlightSearch = function() {
  const from = document.getElementById('mod-from').value;
  const to = document.getElementById('mod-to').value;
  const date = document.getElementById('mod-date').value;
  window.router.navigate(`/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
};

window.updatePriceSlider = function(val) {
  const el = document.getElementById('price-slider-val');
  if (el) el.textContent = `₹${parseInt(val).toLocaleString('en-IN')}`;
};

let activeTimeFilter = null;
window.toggleTimeFilter = function(btn, timeCategory) {
  document.querySelectorAll('.time-chip').forEach(b => b.classList.remove('active'));
  if (activeTimeFilter === timeCategory) {
    activeTimeFilter = null;
  } else {
    activeTimeFilter = timeCategory;
    btn.classList.add('active');
  }
  applyFlightFilters();
};

window.applyFlightFilters = function() {
  const selectedStops = Array.from(document.querySelectorAll('input[name="fl_stops"]:checked')).map(el => parseInt(el.value));
  const selectedAirlines = Array.from(document.querySelectorAll('input[name="fl_airline"]:checked')).map(el => el.value);
  const maxPrice = parseInt(document.getElementById('fl-price-range')?.value || '15000');

  filteredFlightList = currentFlightList.filter(fl => {
    // Stops
    if (selectedStops.length && !selectedStops.includes(fl.stops)) return false;
    // Airlines
    if (selectedAirlines.length && !selectedAirlines.includes(fl.airline)) return false;
    // Max price
    if (fl.price > maxPrice) return false;
    // Time category
    if (activeTimeFilter) {
      const hour = parseInt(fl.departure_time.split(':')[0], 10);
      if (activeTimeFilter === 'morning' && (hour < 6 || hour >= 12)) return false;
      if (activeTimeFilter === 'afternoon' && (hour < 12 || hour >= 18)) return false;
      if (activeTimeFilter === 'evening' && (hour < 18 || hour >= 24)) return false;
    }
    return true;
  });

  const container = document.getElementById('flight-cards-list');
  const countEl = document.getElementById('flight-results-count');
  if (container) container.innerHTML = renderFlightCards(filteredFlightList);
  if (countEl) countEl.textContent = `${filteredFlightList.length} Flights Available`;
};

window.resetFlightFilters = function() {
  document.querySelectorAll('input[name="fl_stops"]').forEach(c => c.checked = true);
  document.querySelectorAll('input[name="fl_airline"]').forEach(c => c.checked = true);
  document.querySelectorAll('.time-chip').forEach(c => c.classList.remove('active'));
  activeTimeFilter = null;
  const slider = document.getElementById('fl-price-range');
  if (slider) {
    slider.value = 15000;
    updatePriceSlider(15000);
  }
  filteredFlightList = [...currentFlightList];
  applyFlightFilters();
};

window.sortFlights = function(sortType) {
  if (sortType === 'price_asc') {
    filteredFlightList.sort((a, b) => a.price - b.price);
  } else if (sortType === 'duration') {
    filteredFlightList.sort((a, b) => a.duration.localeCompare(b.duration));
  } else if (sortType === 'departure') {
    filteredFlightList.sort((a, b) => a.departure_time.localeCompare(b.departure_time));
  }
  const container = document.getElementById('flight-cards-list');
  if (container) container.innerHTML = renderFlightCards(filteredFlightList);
};

window.bookFlightSelected = function(flightId) {
  const flight = currentFlightList.find(f => f.id === flightId);
  if (!flight) return;

  const baseFare = flight.price;
  const taxes = Math.round(baseFare * 0.18);
  const total = baseFare + taxes;

  const draft = {
    booking_type: 'flight',
    item_id: flight.id,
    item_title: `${flight.airline} ${flight.airline_code}: ${flight.from} to ${flight.to}`,
    item_subtitle: `Depart: ${flight.departure_time} • ${flight.cabin_class} • 1 Traveller`,
    booking_details: {
      airline: flight.airline,
      flight_number: flight.airline_code,
      from: flight.from,
      to: flight.to,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      duration: flight.duration,
      cabin_class: flight.cabin_class,
      baggage: flight.baggage
    },
    base_amount: baseFare,
    tax_amount: taxes,
    discount_amount: 0,
    total_amount: total
  };

  window.state.setBookingDraft(draft);
  window.router.navigate('/checkout');
};
