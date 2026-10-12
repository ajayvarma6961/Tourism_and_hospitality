// ============================================================================
// VIEW: HOME PAGE (MakeMyTrip-inspired modern hero, tabs & curated travel)
// ============================================================================

async function renderHomeView() {
  const destinations = await window.db.getDestinations();
  const hotels = await window.db.getHotels();
  const packages = await window.db.getPackages();
  const coupons = await window.db.getCoupons();

  const trendingDestinations = destinations.slice(0, 6);
  const featuredHotels = hotels.slice(0, 4);
  const featuredPackages = packages.slice(0, 4);

  return `
    <div class="wy-home-page">
      <!-- HERO & MEGA SEARCH PANEL -->
      <section class="wy-hero-section">
        <div class="wy-hero-overlay"></div>
        <div class="wy-hero-content">
          <div class="wy-hero-badge">
            <span class="badge-sparkle">✦</span>
            <span>India's Most Loved Travel & Hospitality Experience</span>
          </div>
          <h1 class="wy-hero-title">Discover Your Next Adventure</h1>
          <p class="wy-hero-subtitle">Book flights, luxury hotels, bespoke holiday packages, trains, buses, and extraordinary local experiences at guaranteed best prices.</p>
        </div>

        <!-- MEGA SEARCH PANEL (MakeMyTrip Inspired) -->
        <div class="wy-search-container">
          <!-- SEARCH TABS -->
          <div class="wy-search-tabs" role="tablist">
            <button class="search-tab active" data-tab="flights" onclick="switchSearchTab('flights')">
              <span class="tab-icon">✈️</span>
              <span class="tab-label">Flights</span>
            </button>
            <button class="search-tab" data-tab="hotels" onclick="switchSearchTab('hotels')">
              <span class="tab-icon">🏨</span>
              <span class="tab-label">Hotels</span>
            </button>
            <button class="search-tab" data-tab="packages" onclick="switchSearchTab('packages')">
              <span class="tab-icon">🌴</span>
              <span class="tab-label">Holidays</span>
            </button>
            <button class="search-tab" data-tab="trains" onclick="switchSearchTab('trains')">
              <span class="tab-icon">🚆</span>
              <span class="tab-label">Trains</span>
            </button>
            <button class="search-tab" data-tab="buses" onclick="switchSearchTab('buses')">
              <span class="tab-icon">🚌</span>
              <span class="tab-label">Buses</span>
            </button>
            <button class="search-tab" data-tab="cabs" onclick="switchSearchTab('cabs')">
              <span class="tab-icon">🚖</span>
              <span class="tab-label">Cabs</span>
            </button>
            <button class="search-tab" data-tab="activities" onclick="switchSearchTab('activities')">
              <span class="tab-icon">🏄</span>
              <span class="tab-label">Activities</span>
            </button>
          </div>

          <!-- TAB CONTENT: FLIGHTS -->
          <div class="wy-search-body active" id="tab-body-flights">
            <div class="trip-type-radios">
              <label class="radio-label">
                <input type="radio" name="flight_trip_type" value="oneway" checked>
                <span>One Way</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="flight_trip_type" value="roundtrip">
                <span>Round Trip</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="flight_trip_type" value="multicity">
                <span>Multi City</span>
              </label>
              <span class="special-fare-tag">🔥 Special Student & Senior Citizen Fares Available</span>
            </div>

            <div class="search-inputs-grid grid-flights">
              <div class="input-card">
                <span class="input-tag">FROM</span>
                <input type="text" id="flight-from" class="input-main" value="Delhi (DEL)" placeholder="Departure City">
                <span class="input-sub">Indira Gandhi International Airport</span>
              </div>

              <button class="swap-btn" title="Swap Cities" onclick="swapFlightCities()">⇄</button>

              <div class="input-card">
                <span class="input-tag">TO</span>
                <input type="text" id="flight-to" class="input-main" value="Goa (GOI)" placeholder="Arrival City">
                <span class="input-sub">Dabolim / Mopa International Airport</span>
              </div>

              <div class="input-card">
                <span class="input-tag">DEPARTURE</span>
                <input type="date" id="flight-date" class="input-main" value="${new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]}">
                <span class="input-sub">Select travel date</span>
              </div>

              <div class="input-card">
                <span class="input-tag">TRAVELLERS & CLASS</span>
                <select id="flight-class" class="input-main select-input">
                  <option value="1 Traveller, Economy">1 Traveller, Economy</option>
                  <option value="2 Travellers, Economy" selected>2 Travellers, Economy</option>
                  <option value="1 Traveller, Business">1 Traveller, Business</option>
                  <option value="Family (3+), Economy">Family (3+), Economy</option>
                </select>
                <span class="input-sub">Regular Fares</span>
              </div>
            </div>

            <div class="search-action-bar">
              <div class="fare-types-chips">
                <span class="chip-item active">Regular</span>
                <span class="chip-item">Armed Forces</span>
                <span class="chip-item">Senior Citizen</span>
                <span class="chip-item">Doctor & Nurses</span>
              </div>
              <button class="btn btn-search" onclick="submitFlightSearch()">
                <span>SEARCH FLIGHTS</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT: HOTELS -->
          <div class="wy-search-body" id="tab-body-hotels">
            <div class="search-inputs-grid grid-hotels">
              <div class="input-card">
                <span class="input-tag">CITY / PROPERTY / LOCATION</span>
                <input type="text" id="hotel-city" class="input-main" value="Goa" placeholder="e.g. Goa, Udaipur, Manali, Kerala">
                <span class="input-sub">India or International</span>
              </div>

              <div class="input-card">
                <span class="input-tag">CHECK-IN</span>
                <input type="date" id="hotel-checkin" class="input-main" value="${new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]}">
                <span class="input-sub">Standard 2:00 PM</span>
              </div>

              <div class="input-card">
                <span class="input-tag">CHECK-OUT</span>
                <input type="date" id="hotel-checkout" class="input-main" value="${new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0]}">
                <span class="input-sub">3 Nights stay</span>
              </div>

              <div class="input-card">
                <span class="input-tag">ROOMS & GUESTS</span>
                <select id="hotel-guests" class="input-main select-input">
                  <option value="1 Room, 2 Adults" selected>1 Room, 2 Adults</option>
                  <option value="1 Room, 1 Adult">1 Room, 1 Adult</option>
                  <option value="2 Rooms, 4 Adults">2 Rooms, 4 Adults</option>
                  <option value="Family Suite (3+ Guests)">Family Suite (3+ Guests)</option>
                </select>
                <span class="input-sub">Price per night</span>
              </div>
            </div>

            <!-- QUICK POPULAR DESTINATIONS CHIPS -->
            <div class="home-quick-cities">
              <span class="quick-city-label">Popular Places:</span>
              <button type="button" class="quick-city-chip" onclick="document.getElementById('hotel-city').value='Goa'">🏖️ Goa</button>
              <button type="button" class="quick-city-chip" onclick="document.getElementById('hotel-city').value='Udaipur'">🌊 Udaipur</button>
              <button type="button" class="quick-city-chip" onclick="document.getElementById('hotel-city').value='Jaipur'">🏰 Jaipur</button>
              <button type="button" class="quick-city-chip" onclick="document.getElementById('hotel-city').value='Kashmir'">🏔️ Kashmir</button>
              <button type="button" class="quick-city-chip" onclick="document.getElementById('hotel-city').value='Manali'">🌲 Manali</button>
              <button type="button" class="quick-city-chip" onclick="document.getElementById('hotel-city').value='Kerala'">🛶 Kerala</button>
              <button type="button" class="quick-city-chip" onclick="document.getElementById('hotel-city').value='Dubai'">✨ Dubai</button>
            </div>

            <div class="search-action-bar">
              <div class="fare-types-chips">
                <span class="chip-item active">All Stays</span>
                <span class="chip-item">5★ Luxury Resorts</span>
                <span class="chip-item">Heritage Palaces</span>
                <span class="chip-item">Homestays & Villas</span>
              </div>
              <button class="btn btn-search" onclick="submitHotelSearch()">
                <span>SEARCH HOTELS</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT: HOLIDAY PACKAGES -->
          <div class="wy-search-body" id="tab-body-packages">
            <div class="search-inputs-grid grid-packages">
              <div class="input-card">
                <span class="input-tag">DESTINATION</span>
                <input type="text" id="pkg-dest" class="input-main" value="Kashmir" placeholder="e.g. Kashmir, Kerala, Rajasthan">
                <span class="input-sub">All-inclusive tour packages</span>
              </div>
              <div class="input-card">
                <span class="input-tag">MONTH OF TRAVEL</span>
                <select id="pkg-month" class="input-main select-input">
                  <option value="Any Month">Any Month</option>
                  <option value="Nov 2026" selected>Nov 2026</option>
                  <option value="Dec 2026">Dec 2026</option>
                  <option value="Jan 2027">Jan 2027</option>
                </select>
                <span class="input-sub">Flexible Dates</span>
              </div>
              <div class="input-card">
                <span class="input-tag">THEME</span>
                <select id="pkg-theme" class="input-main select-input">
                  <option value="all">All Packages</option>
                  <option value="honeymoon" selected>Honeymoon Special</option>
                  <option value="family">Family & Friends</option>
                  <option value="adventure">Wildlife & Adventure</option>
                </select>
                <span class="input-sub">Curated Itineraries</span>
              </div>
            </div>
            <div class="search-action-bar">
              <span class="guarantee-text">🛡️ Handpicked verified hotels & private chauffeurs</span>
              <button class="btn btn-search" onclick="submitPackageSearch()">
                <span>EXPLORE PACKAGES</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT: TRAINS -->
          <div class="wy-search-body" id="tab-body-trains">
            <div class="search-inputs-grid grid-trains">
              <div class="input-card">
                <span class="input-tag">FROM STATION</span>
                <input type="text" id="train-from" class="input-main" value="NDLS - New Delhi" placeholder="Station name or code">
                <span class="input-sub">IRCTC Authorized Partner</span>
              </div>
              <div class="input-card">
                <span class="input-tag">TO STATION</span>
                <input type="text" id="train-to" class="input-main" value="BCT - Mumbai Central" placeholder="Destination station">
                <span class="input-sub">Direct Trains</span>
              </div>
              <div class="input-card">
                <span class="input-tag">DEPARTURE DATE</span>
                <input type="date" id="train-date" class="input-main" value="${new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}">
                <span class="input-sub">Vande Bharat / Rajdhani</span>
              </div>
              <div class="input-card">
                <span class="input-tag">CLASS & QUOTA</span>
                <select class="input-main select-input">
                  <option value="all" selected>All Classes (1A, 2A, 3A, CC)</option>
                  <option value="general">General Quota</option>
                  <option value="tatkal">Tatkal Quota</option>
                  <option value="ladies">Ladies Quota</option>
                </select>
                <span class="input-sub">Live seat availability</span>
              </div>
            </div>
            <div class="search-action-bar">
              <span class="guarantee-text">⚡ Zero IRCTC cancellation charge with Free Cancellation Guarantee</span>
              <button class="btn btn-search" onclick="window.router.navigate('/services?type=train')">
                <span>SEARCH TRAINS</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT: BUSES -->
          <div class="wy-search-body" id="tab-body-buses">
            <div class="search-inputs-grid grid-buses">
              <div class="input-card">
                <span class="input-tag">FROM</span>
                <input type="text" id="bus-from" class="input-main" value="Delhi" placeholder="Boarding city">
                <span class="input-sub">ISBT Kashmere Gate</span>
              </div>
              <div class="input-card">
                <span class="input-tag">TO</span>
                <input type="text" id="bus-to" class="input-main" value="Manali" placeholder="Dropping city">
                <span class="input-sub">Private Volvo & HRTC</span>
              </div>
              <div class="input-card">
                <span class="input-tag">DATE OF JOURNEY</span>
                <input type="date" id="bus-date" class="input-main" value="${new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}">
                <span class="input-sub">Overnight Sleeper</span>
              </div>
            </div>
            <div class="search-action-bar">
              <span class="guarantee-text">🚌 Live bus tracking & sanitized AC multi-axle buses</span>
              <button class="btn btn-search" onclick="window.router.navigate('/services?type=bus')">
                <span>SEARCH BUSES</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT: CABS -->
          <div class="wy-search-body" id="tab-body-cabs">
            <div class="search-inputs-grid grid-cabs">
              <div class="input-card">
                <span class="input-tag">PICKUP CITY</span>
                <input type="text" id="cab-pickup" class="input-main" value="Mumbai" placeholder="Enter city">
                <span class="input-sub">Outstation / Airport</span>
              </div>
              <div class="input-card">
                <span class="input-tag">DROP CITY</span>
                <input type="text" id="cab-drop" class="input-main" value="Pune" placeholder="Enter destination">
                <span class="input-sub">One-way / Round-trip</span>
              </div>
              <div class="input-card">
                <span class="input-tag">PICKUP TIME</span>
                <input type="datetime-local" class="input-main" value="${new Date(Date.now() + 86400000).toISOString().slice(0, 16)}">
                <span class="input-sub">Verified courteous chauffeurs</span>
              </div>
            </div>
            <div class="search-action-bar">
              <span class="guarantee-text">🚖 Clean Sedans, Innova Crysta & Electric Cabs</span>
              <button class="btn btn-search" onclick="window.router.navigate('/services?type=cab')">
                <span>SEARCH CABS</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT: ACTIVITIES -->
          <div class="wy-search-body" id="tab-body-activities">
            <div class="search-inputs-grid grid-activities">
              <div class="input-card">
                <span class="input-tag">DESTINATION / CITY</span>
                <input type="text" id="activity-dest" class="input-main" value="Goa" placeholder="Where are you going?">
                <span class="input-sub">Adventure & Sightseeing</span>
              </div>
              <div class="input-card">
                <span class="input-tag">ACTIVITY TYPE</span>
                <select class="input-main select-input">
                  <option value="all">All Experiences</option>
                  <option value="water">Scuba Diving & Watersports</option>
                  <option value="air">Paragliding & Skydiving</option>
                  <option value="safari">Desert & Wildlife Safari</option>
                  <option value="heritage">Heritage & Walking Tours</option>
                </select>
                <span class="input-sub">Certified instructors</span>
              </div>
            </div>
            <div class="search-action-bar">
              <span class="guarantee-text">🪂 Instant confirmation voucher on your phone</span>
              <button class="btn btn-search" onclick="window.router.navigate('/services?type=activity')">
                <span>FIND EXPERIENCES</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- OFFERS & DEALS STRIP -->
      <section class="wy-section wy-offers-strip">
        <div class="section-header">
          <div>
            <span class="section-tag">LIMITED TIME SAVINGS</span>
            <h2 class="section-title">Special Discounts & Travel Offers</h2>
          </div>
          <button class="btn btn-outline" onclick="window.router.navigate('/offers')">View All Offers →</button>
        </div>

        <div class="offers-carousel">
          ${coupons.map(cpn => `
            <div class="offer-card">
              <div class="offer-badge">${cpn.discount_percent}% OFF</div>
              <div class="offer-body">
                <span class="offer-service">${cpn.service_type.toUpperCase()}</span>
                <h3 class="offer-title">${cpn.title}</h3>
                <p class="offer-desc">${cpn.description}</p>
                <div class="offer-footer">
                  <div class="coupon-box" onclick="copyCouponCode('${cpn.code}')" title="Click to copy">
                    <span class="coupon-code">${cpn.code}</span>
                    <span class="copy-btn-text">Copy</span>
                  </div>
                  <button class="btn-apply-small" onclick="applyCouponAndSearch('${cpn.code}')">Apply Now</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- POPULAR DESTINATIONS IN INDIA & WORLDWIDE -->
      <section class="wy-section">
        <div class="section-header">
          <div>
            <span class="section-tag">CURATED WANDERLUST</span>
            <h2 class="section-title">Popular Destinations in India & Worldwide</h2>
            <p class="section-subtitle">From serene Himalayan hideaways to shimmering sun-kissed coastlines and royal palatial cities.</p>
          </div>
          <button class="btn btn-outline" onclick="window.router.navigate('/explore')">Explore All Destinations →</button>
        </div>

        <div class="destinations-grid">
          ${trendingDestinations.map(d => `
            <div class="destination-card" onclick="window.router.navigate('/destination/${d.id}')">
              <div class="dest-image-wrap">
                <img src="${d.cover_image}" alt="${d.name}" loading="lazy">
                <div class="dest-pill">${d.best_season}</div>
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
                  <span class="dest-explore-link">Explore Guide →</span>
                </div>
                <div class="dest-card-actions">
                  <button class="dest-hotels-btn" onclick="event.stopPropagation(); window.router.navigate('/hotels?city=${encodeURIComponent(d.name)}')">
                    🏨 View Hotels in ${d.name.split(' ')[0]}
                  </button>
                  <span style="font-size:0.75rem; color:#94a3b8; font-weight:600;">Best: ${d.best_season}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- HANDPICKED LUXURY STAYS & RESORTS -->
      <section class="wy-section bg-surface">
        <div class="section-header">
          <div>
            <span class="section-tag">PREMIUM HOSPITALITY</span>
            <h2 class="section-title">Recommended Hotels & Luxury Retreats</h2>
            <p class="section-subtitle">Heritage havelis, floating palaces, and five-star wellness resorts verified for supreme comfort.</p>
          </div>
          <button class="btn btn-outline" onclick="window.router.navigate('/hotels')">View All 150+ Hotels →</button>
        </div>

        <div class="hotels-grid">
          ${featuredHotels.map(h => `
            <div class="hotel-card" onclick="window.router.navigate('/hotel/${h.id}')">
              <div class="hotel-image-wrap">
                <img src="${h.cover_image}" alt="${h.name}" loading="lazy">
                <div class="hotel-star-badge">${'★'.repeat(h.star_rating)} Luxury</div>
                <button class="hotel-fav-btn" onclick="event.stopPropagation(); window.state.toggleFavorite('${h.id}', 'hotel', ${JSON.stringify(h).replace(/"/g, '&quot;')})">
                  ${window.state.isFavorite(h.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div class="hotel-body">
                <div class="hotel-city-badge">${h.city}, India</div>
                <h3 class="hotel-name">${h.name}</h3>
                <p class="hotel-location">📍 ${h.address}</p>
                <div class="hotel-amenities-pills">
                  ${(h.amenities || []).slice(0, 3).map(a => `<span class="amenity-chip">✓ ${a}</span>`).join('')}
                </div>
                <div class="hotel-pricing-row">
                  <div class="price-stack">
                    <span class="price-strikethrough">${window.state.formatPrice(h.original_price || h.price_per_night * 1.25)}</span>
                    <span class="price-current">${window.state.formatPrice(h.price_per_night)}</span>
                    <span class="price-unit">/ night + taxes</span>
                  </div>
                  <button class="btn btn-book-small" onclick="event.stopPropagation(); bookHotelDirect('${h.id}')">Book Room</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CURATED HOLIDAY PACKAGES -->
      <section class="wy-section">
        <div class="section-header">
          <div>
            <span class="section-tag">ALL-INCLUSIVE ESCAPES</span>
            <h2 class="section-title">Trending Holiday Packages</h2>
            <p class="section-subtitle">Complete customized vacation itineraries including luxury stays, private sightseeing, and daily meals.</p>
          </div>
          <button class="btn btn-outline" onclick="window.router.navigate('/packages')">Explore All Packages →</button>
        </div>

        <div class="packages-grid">
          ${featuredPackages.map(pkg => `
            <div class="pkg-card" onclick="window.router.navigate('/packages')">
              <div class="pkg-image-wrap">
                <img src="${pkg.cover_image}" alt="${pkg.title}" loading="lazy">
                <span class="pkg-duration-badge">${pkg.duration_nights}N / ${pkg.duration_days}D</span>
                <span class="pkg-category-tag">${pkg.category.toUpperCase()}</span>
              </div>
              <div class="pkg-content">
                <div class="pkg-rating">⭐ ${pkg.rating} (${pkg.reviews_count} reviews)</div>
                <h3 class="pkg-title">${pkg.title}</h3>
                <ul class="pkg-highlights-list">
                  ${(pkg.highlights || []).slice(0, 3).map(h => `<li>✦ ${h}</li>`).join('')}
                </ul>
                <div class="pkg-footer">
                  <div class="pkg-price-col">
                    <span class="pkg-price-label">Starting from</span>
                    <span class="pkg-price-val">${window.state.formatPrice(pkg.price)}</span>
                    <span class="pkg-person-label">per person</span>
                  </div>
                  <button class="btn btn-primary" onclick="event.stopPropagation(); bookPackageDirect('${pkg.id}')">View Details</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- WHY CHOOSE US & TRAVEL ASSURANCE -->
      <section class="wy-section wy-assurance-section">
        <div class="assurance-card">
          <div class="assurance-icon">🛡️</div>
          <h3>Guaranteed Best Prices</h3>
          <p>Direct tie-ups with 2,500+ luxury hotels and major domestic and international airlines with zero hidden markups.</p>
        </div>
        <div class="assurance-card">
          <div class="assurance-icon">⚡</div>
          <h3>Instant E-Tickets & Confirmation</h3>
          <p>Real-time booking confirmation with verifiable booking IDs, instant printable vouchers, and automatic SMS alerts.</p>
        </div>
        <div class="assurance-card">
          <div class="assurance-icon">📞</div>
          <h3>24/7 Dedicated Concierge</h3>
          <p>Round-the-clock priority customer support assistance from travel specialists before, during, and after your trip.</p>
        </div>
        <div class="assurance-card">
          <div class="assurance-icon">🔄</div>
          <h3>Hassle-Free Cancellations</h3>
          <p>Enjoy flexible travel policies with straightforward automated cancellation and swift refundable credit calculations.</p>
        </div>
      </section>

      <!-- CUSTOMER REVIEWS & TESTIMONIALS -->
      <section class="wy-section bg-surface">
        <div class="section-header text-center">
          <div>
            <span class="section-tag">TRAVELER EXPERIENCES</span>
            <h2 class="section-title">Loved by Over 500,000+ Happy Travelers</h2>
          </div>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">"Our honeymoon in Kashmir booked through this platform was pure perfection! The Dal Lake houseboat stay was mesmerizing, and our private chauffeur was so polite and punctual."</p>
            <div class="testi-user">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Priya & Ankit" class="testi-avatar">
              <div>
                <strong>Priya & Ankit Verma</strong>
                <span>Traveled to Kashmir Valley • Oct 2026</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">"The hotel booking interface is faster and significantly cleaner than traditional booking sites. Got an incredible deal on Taj Lake Palace with complimentary upgrade!"</p>
            <div class="testi-user">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Dr. Siddharth Rao" class="testi-avatar">
              <div>
                <strong>Dr. Siddharth Rao</strong>
                <span>Stayed at Taj Lake Palace Udaipur</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">"Booked flights from Delhi to Goa and rented an Innova Crysta through the platform. The transparent pricing without hidden surprise charges at checkout was so refreshing."</p>
            <div class="testi-user">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Meera Nair" class="testi-avatar">
              <div>
                <strong>Meera Nair</strong>
                <span>Traveled to Goa with Family</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- NEWSLETTER SUBSCRIPTION -->
      <section class="wy-newsletter-strip">
        <div class="newsletter-content">
          <span class="newsletter-badge">JOIN THE TRAVEL CIRCLE</span>
          <h2>Unlock Secret Fares & 30% Exclusive Discounts</h2>
          <p>Get curated travel stories, weekend getaway ideas, and flash deal alerts straight to your inbox.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); submitNewsletter();">
            <input type="email" id="nl-email" placeholder="Enter your email address..." required>
            <button type="submit" class="btn btn-subscribe">Subscribe Now</button>
          </form>
        </div>
      </section>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// HOME INTERACTION HANDLERS
// ----------------------------------------------------------------------------
window.switchSearchTab = function(tabName) {
  document.querySelectorAll('.search-tab').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabName);
  });
  document.querySelectorAll('.wy-search-body').forEach(b => {
    b.classList.toggle('active', b.id === `tab-body-${tabName}`);
  });
};

window.swapFlightCities = function() {
  const fromEl = document.getElementById('flight-from');
  const toEl = document.getElementById('flight-to');
  if (fromEl && toEl) {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
  }
};

window.submitFlightSearch = function() {
  const from = document.getElementById('flight-from')?.value || "Delhi (DEL)";
  const to = document.getElementById('flight-to')?.value || "Goa (GOI)";
  const date = document.getElementById('flight-date')?.value || "";
  window.router.navigate(`/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
};

window.submitHotelSearch = function() {
  const city = document.getElementById('hotel-city')?.value || "Goa";
  window.router.navigate(`/hotels?city=${encodeURIComponent(city)}`);
};

window.submitPackageSearch = function() {
  const dest = document.getElementById('pkg-dest')?.value || "";
  window.router.navigate(`/packages?dest=${encodeURIComponent(dest)}`);
};

window.copyCouponCode = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    window.state.showToast(`Coupon code ${code} copied to clipboard! 📋`, 'success');
  }).catch(() => {
    window.state.showToast(`Coupon: ${code}`, 'info');
  });
};

window.applyCouponAndSearch = function(code) {
  window.copyCouponCode(code);
  window.router.navigate('/flights');
};

window.submitNewsletter = function() {
  const email = document.getElementById('nl-email')?.value;
  if (email) {
    window.state.showToast(`Thank you! You're subscribed to secret flight deals with ${email} 🎉`, 'success');
    document.getElementById('nl-email').value = '';
  }
};

window.bookHotelDirect = async function(hotelId) {
  const hotel = await window.db.getHotelById(hotelId);
  if (!hotel) return;
  const room = (hotel.rooms && hotel.rooms[0]) || { name: "Deluxe Room", price_per_night: hotel.price_per_night };
  
  const draft = {
    booking_type: 'hotel',
    item_id: hotel.id,
    item_title: hotel.name,
    item_subtitle: `${hotel.city} • 1 Room • 2 Nights`,
    booking_details: {
      hotel_id: hotel.id,
      hotel_name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      room_type: room.name,
      check_in: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      check_out: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      nights: 2,
      guests: 2
    },
    base_amount: room.price_per_night * 2,
    tax_amount: Math.round((room.price_per_night * 2) * 0.18),
    discount_amount: 0,
    total_amount: Math.round((room.price_per_night * 2) * 1.18)
  };
  window.state.setBookingDraft(draft);
  window.router.navigate('/checkout');
};

window.bookPackageDirect = async function(pkgId) {
  const pkg = await window.db.getPackageById(pkgId);
  if (!pkg) return;

  const draft = {
    booking_type: 'package',
    item_id: pkg.id,
    item_title: pkg.title,
    item_subtitle: `${pkg.destination} • ${pkg.duration_nights}N/${pkg.duration_days}D • 2 Travelers`,
    booking_details: {
      package_id: pkg.id,
      package_title: pkg.title,
      destination: pkg.destination,
      duration: `${pkg.duration_nights}N / ${pkg.duration_days}D`,
      travelers: 2,
      travel_date: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0]
    },
    base_amount: pkg.price * 2,
    tax_amount: Math.round((pkg.price * 2) * 0.05),
    discount_amount: 0,
    total_amount: Math.round((pkg.price * 2) * 1.05)
  };
  window.state.setBookingDraft(draft);
  window.router.navigate('/checkout');
};
