// ============================================================================
// VIEW: OTHER SERVICES (Interactive Trains, Buses, Cabs & Activities Booking)
// ============================================================================

async function renderOtherServicesView() {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const activeType = urlParams.get('type') || 'train';

  return `
    <div class="wy-services-page">
      <!-- TABS BAR -->
      <div class="services-nav-tabs">
        <button class="srv-tab ${activeType === 'train' ? 'active' : ''}" onclick="switchServiceType('train')">
          🚆 Trains (IRCTC Partner)
        </button>
        <button class="srv-tab ${activeType === 'bus' ? 'active' : ''}" onclick="switchServiceType('bus')">
          🚌 Buses & Volvo AC
        </button>
        <button class="srv-tab ${activeType === 'cab' ? 'active' : ''}" onclick="switchServiceType('cab')">
          🚖 Outstation & Airport Cabs
        </button>
        <button class="srv-tab ${activeType === 'activity' ? 'active' : ''}" onclick="switchServiceType('activity')">
          🏄 Sightseeing & Adventures
        </button>
      </div>

      <!-- SERVICE BODY: TRAINS -->
      <div class="service-content-panel ${activeType === 'train' ? 'active' : ''}" id="srv-panel-train">
        <div class="srv-hero-box">
          <h2>Book Indian Railways (IRCTC Authorized)</h2>
          <p>Instant confirmed tickets on Vande Bharat, Rajdhani, Shatabdi and Express trains with zero IRCTC cancellation charges.</p>
        </div>

        <div class="trains-demo-list">
          <div class="service-booking-card">
            <div class="srv-col-main">
              <span class="srv-badge">SUPERFAST EXPRESS</span>
              <h3>Vande Bharat Express (22436)</h3>
              <p>New Delhi (NDLS) → Varanasi Jn (BSB) • Departs: 06:00 AM • Arrives: 14:00 PM (8h 00m)</p>
              <div class="train-classes-row">
                <span class="seat-badge available">CC (Chair Car) • Available - 58 Seats • ₹1,750</span>
                <span class="seat-badge available">EC (Exec Chair) • Available - 12 Seats • ₹3,300</span>
              </div>
            </div>
            <div class="srv-col-action">
              <span class="price-val">${window.state.formatPrice(1750)}</span>
              <button class="btn btn-primary" onclick="bookTrainDirect('Vande Bharat Express (22436)', 'New Delhi to Varanasi', 1750)">Book Ticket</button>
            </div>
          </div>

          <div class="service-booking-card">
            <div class="srv-col-main">
              <span class="srv-badge">PREMIUM RAJDHANI</span>
              <h3>Mumbai Rajdhani Express (12952)</h3>
              <p>New Delhi (NDLS) → Mumbai Central (MMCT) • Departs: 16:55 PM • Arrives: 08:35 AM (15h 40m)</p>
              <div class="train-classes-row">
                <span class="seat-badge available">3A (Third AC) • Available - 32 Seats • ₹2,890</span>
                <span class="seat-badge available">2A (Second AC) • Available - 14 Seats • ₹4,150</span>
                <span class="seat-badge available">1A (First AC) • Available - 4 Seats • ₹5,800</span>
              </div>
            </div>
            <div class="srv-col-action">
              <span class="price-val">${window.state.formatPrice(2890)}</span>
              <button class="btn btn-primary" onclick="bookTrainDirect('Mumbai Rajdhani (12952)', 'New Delhi to Mumbai Central', 2890)">Book Ticket</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SERVICE BODY: BUSES -->
      <div class="service-content-panel ${activeType === 'bus' ? 'active' : ''}" id="srv-panel-bus">
        <div class="srv-hero-box">
          <h2>Luxury Multi-Axle Volvo & Sleeper Buses</h2>
          <p>Verified bus operators with live GPS tracking, charging points, blanket, and emergency medical kits.</p>
        </div>

        <div class="buses-demo-list">
          <div class="service-booking-card">
            <div class="srv-col-main">
              <span class="srv-badge">VOLVO MULTI-AXLE 9600</span>
              <h3>Zingbus Plus AC Sleeper (2+1)</h3>
              <p>Delhi (Kashmere Gate) → Manali Private Stand • Departs: 20:30 PM • 12h 30m duration</p>
              <div class="bus-amenities">
                <span>✓ Live Tracking</span>
                <span>✓ Water Bottle</span>
                <span>✓ Reading Light</span>
                <span>✓ Wi-Fi</span>
              </div>
            </div>
            <div class="srv-col-action">
              <span class="price-val">${window.state.formatPrice(1499)}</span>
              <button class="btn btn-primary" onclick="bookBusDirect('Zingbus Volvo Sleeper', 'Delhi to Manali', 1499)">Select Seat & Book</button>
            </div>
          </div>

          <div class="service-booking-card">
            <div class="srv-col-main">
              <span class="srv-badge">SCANIA MULTI-AXLE</span>
              <h3>IntrCity SmartBus Premium</h3>
              <p>Bangalore (Majestic) → Goa (Panjim) • Departs: 21:00 PM • 11h 00m duration</p>
              <div class="bus-amenities">
                <span>✓ Rest Stop at Clean Lounge</span>
                <span>✓ AC Temperature Control</span>
                <span>✓ CCTV Camera</span>
              </div>
            </div>
            <div class="srv-col-action">
              <span class="price-val">${window.state.formatPrice(1250)}</span>
              <button class="btn btn-primary" onclick="bookBusDirect('IntrCity SmartBus Scania', 'Bangalore to Goa', 1250)">Select Seat & Book</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SERVICE BODY: CABS -->
      <div class="service-content-panel ${activeType === 'cab' ? 'active' : ''}" id="srv-panel-cab">
        <div class="srv-hero-box">
          <h2>Intercity Outstation & Airport Chauffeur Cabs</h2>
          <p>Clean sanitised cabs with verified courteous drivers, toll charges included, and no surge pricing.</p>
        </div>

        <div class="cabs-demo-list">
          <div class="service-booking-card">
            <div class="srv-col-main">
              <span class="srv-badge">POPULAR COMFORT SEDAN</span>
              <h3>Maruti Suzuki Dzire / Toyota Etios</h3>
              <p>Mumbai ⇄ Pune (One-Way / Round-Trip) • 4 Seats • 2 Luggage Bags • AC</p>
              <p class="text-muted small">Free cancellation up to 6 hours before pickup. Professional uniformed chauffeur.</p>
            </div>
            <div class="srv-col-action">
              <span class="price-val">${window.state.formatPrice(2499)}</span>
              <button class="btn btn-primary" onclick="bookCabDirect('Sedan (Dzire / Etios)', 'Mumbai to Pune Outstation', 2499)">Book Cab</button>
            </div>
          </div>

          <div class="service-booking-card">
            <div class="srv-col-main">
              <span class="srv-badge">LUXURY SUV</span>
              <h3>Toyota Innova Crysta</h3>
              <p>Delhi Airport ⇄ Agra Taj Mahal (Full Day) • 6-7 Seats • 4 Luggage Bags • Premium AC</p>
              <p class="text-muted small">Includes state taxes, driver allowance, parking, and Yamuna Expressway toll.</p>
            </div>
            <div class="srv-col-action">
              <span class="price-val">${window.state.formatPrice(5499)}</span>
              <button class="btn btn-primary" onclick="bookCabDirect('Toyota Innova Crysta SUV', 'Delhi to Agra Same-Day Return', 5499)">Book Cab</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SERVICE BODY: ACTIVITIES -->
      <div class="service-content-panel ${activeType === 'activity' ? 'active' : ''}" id="srv-panel-activity">
        <div class="srv-hero-box">
          <h2>Top Adventure Sports & Local Sightseeing</h2>
          <p>Pre-book certified adventure slots, scuba dives, desert safaris, and heritage walks with instant voucher confirmation.</p>
        </div>

        <div class="activities-grid-cards">
          <div class="activity-booking-card">
            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80" alt="Scuba Diving">
            <div class="act-card-body">
              <span class="act-tag">GOA • WATER SPORTS</span>
              <h3>Grand Island Scuba Diving & 5 Watersports</h3>
              <p>Includes underwater video, dolphin sighting boat trip, parasailing, jet ski, banana ride, and lunch.</p>
              <div class="act-card-footer">
                <span class="price-val">${window.state.formatPrice(1999)} / person</span>
                <button class="btn btn-primary" onclick="bookActivityDirect('Goa Scuba Diving & Watersports Combo', 1999)">Book Experience</button>
              </div>
            </div>
          </div>

          <div class="activity-booking-card">
            <img src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80" alt="Gulmarg Gondola">
            <div class="act-card-body">
              <span class="act-tag">KASHMIR • ADVENTURE</span>
              <h3>Gulmarg Gondola Cable Car & Snow Skiing</h3>
              <p>Experience Asia's highest cable car soaring to 13,780 ft on Mt. Apharwat with gear & instructor.</p>
              <div class="act-card-footer">
                <span class="price-val">${window.state.formatPrice(2450)} / person</span>
                <button class="btn btn-primary" onclick="bookActivityDirect('Gulmarg Gondola & Snow Skiing', 2450)">Book Experience</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.switchServiceType = function(type) {
  window.router.navigate(`/services?type=${type}`);
};

window.bookTrainDirect = function(title, route, price) {
  const taxes = Math.round(price * 0.05);
  window.state.setBookingDraft({
    booking_type: 'train',
    item_title: title,
    item_subtitle: `${route} • 1 Passenger • Confirmed Berth`,
    booking_details: { train_name: title, route: route, date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] },
    base_amount: price,
    tax_amount: taxes,
    discount_amount: 0,
    total_amount: price + taxes
  });
  window.router.navigate('/checkout');
};

window.bookBusDirect = function(title, route, price) {
  const taxes = Math.round(price * 0.05);
  window.state.setBookingDraft({
    booking_type: 'bus',
    item_title: title,
    item_subtitle: `${route} • AC Sleeper Upper Deck Seat #12`,
    booking_details: { operator: title, route: route },
    base_amount: price,
    tax_amount: taxes,
    discount_amount: 0,
    total_amount: price + taxes
  });
  window.router.navigate('/checkout');
};

window.bookCabDirect = function(vehicle, route, price) {
  const taxes = Math.round(price * 0.05);
  window.state.setBookingDraft({
    booking_type: 'cab',
    item_title: `${vehicle}: ${route}`,
    item_subtitle: `Tolls Included • Uniformed Chauffeur • AC`,
    booking_details: { vehicle: vehicle, route: route },
    base_amount: price,
    tax_amount: taxes,
    discount_amount: 0,
    total_amount: price + taxes
  });
  window.router.navigate('/checkout');
};

window.bookActivityDirect = function(title, price) {
  const taxes = Math.round(price * 0.05);
  window.state.setBookingDraft({
    booking_type: 'activity',
    item_title: title,
    item_subtitle: `Instant Slot Confirmation • Guided Experience`,
    booking_details: { activity_name: title, travelers: 1 },
    base_amount: price,
    tax_amount: taxes,
    discount_amount: 0,
    total_amount: price + taxes
  });
  window.router.navigate('/checkout');
};
