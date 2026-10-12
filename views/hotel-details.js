// ============================================================================
// VIEW: HOTEL DETAILS & ROOM SELECTION
// ============================================================================

async function renderHotelDetailsView(params) {
  const hotelId = params.id;
  const hotel = await window.db.getHotelById(hotelId);

  if (!hotel) {
    return `
      <div class="wy-error-view">
        <h2>Hotel Not Found</h2>
        <p>The requested hotel property does not exist in our database.</p>
        <button class="btn btn-primary" onclick="window.router.navigate('/hotels')">Back to Hotels</button>
      </div>
    `;
  }

  const rooms = hotel.rooms && hotel.rooms.length ? hotel.rooms : [
    { id: `${hotel.id}-r1`, name: "Deluxe Heritage Room", type: "deluxe", price_per_night: hotel.price_per_night, max_guests: 2, bed_type: "1 King Bed" },
    { id: `${hotel.id}-r2`, name: "Executive Suite with Balcony", type: "suite", price_per_night: Math.round(hotel.price_per_night * 1.5), max_guests: 3, bed_type: "1 Royal King Bed" }
  ];

  const gallery = hotel.gallery && hotel.gallery.length ? hotel.gallery : [hotel.cover_image];

  return `
    <div class="wy-details-page">
      <!-- TOP NAVIGATION BAR -->
      <div class="details-nav-bar">
        <button class="back-link-btn" onclick="window.history.back()">← Back to Hotels</button>
        <div class="details-action-tools">
          <button class="btn-tool" onclick="window.state.toggleFavorite('${hotel.id}', 'hotel', ${JSON.stringify(hotel).replace(/"/g, '&quot;')})">
            ${window.state.isFavorite(hotel.id) ? '❤️ Saved' : '🤍 Save to Wishlist'}
          </button>
          <button class="btn-tool" onclick="navigator.clipboard.writeText(window.location.href); window.state.showToast('Link copied to clipboard!');">🔗 Share</button>
        </div>
      </div>

      <!-- HOTEL TITLE STRIP -->
      <div class="details-header-card">
        <div>
          <div class="details-category-row">
            <span class="badge-star">${'★'.repeat(hotel.star_rating)} Luxury Property</span>
            <span class="badge-type">${(hotel.property_type || 'Hotel').toUpperCase()}</span>
          </div>
          <h1 class="details-title">${hotel.name}</h1>
          <p class="details-subtitle">📍 ${hotel.address}</p>
        </div>
        <div class="details-rating-badge">
          <span class="rating-num">${hotel.user_rating}</span>
          <span class="rating-outof">/ 5</span>
          <span class="rating-count">${hotel.reviews_count} verified ratings</span>
        </div>
      </div>

      <!-- PHOTO GALLERY GRID -->
      <div class="details-gallery-grid">
        <div class="gallery-main-img">
          <img src="${hotel.cover_image}" alt="${hotel.name}">
        </div>
        <div class="gallery-thumbnails">
          ${gallery.slice(0, 2).map((img, idx) => `
            <img src="${img}" alt="${hotel.name} photo ${idx + 1}">
          `).join('')}
          <div class="gallery-more-tile">
            <img src="${hotel.cover_image}" alt="More photos">
            <div class="more-overlay">View All Photos</div>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT SPLIT -->
      <div class="details-split-container">
        <!-- LEFT: DESCRIPTION, AMENITIES, ROOM TYPES -->
        <div class="details-main-column">
          <!-- Overview -->
          <section class="details-section-card">
            <h2 class="card-section-title">About the Property</h2>
            <p class="details-long-text">${hotel.description}</p>
          </section>

          <!-- Amenities -->
          <section class="details-section-card">
            <h2 class="card-section-title">Popular Amenities & Services</h2>
            <div class="amenities-full-grid">
              ${(hotel.amenities || []).map(a => `
                <div class="amenity-feature-item">
                  <span class="feature-icon">✓</span>
                  <span class="feature-text">${a}</span>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- ROOM TYPES SELECTION -->
          <section class="details-section-card" id="room-selection-section">
            <div class="section-title-wrap">
              <h2 class="card-section-title">Select Room Type</h2>
              <span class="safe-badge">🛡️ Free Cancellation Available</span>
            </div>

            <div class="rooms-selection-list">
              ${rooms.map(room => `
                <div class="room-card-item">
                  <div class="room-col-details">
                    <h3 class="room-name">${room.name}</h3>
                    <div class="room-spec-chips">
                      <span class="spec-chip">👥 Fits ${room.max_guests || 2} Adults</span>
                      <span class="spec-chip">🛏️ ${room.bed_type || 'King Bed'}</span>
                      <span class="spec-chip">📐 420 sq.ft</span>
                    </div>
                    <ul class="room-inclusions-list">
                      <li>✓ Complimentary High-Speed Wi-Fi</li>
                      <li>✓ Free Breakfast Included</li>
                      <li>✓ Express Check-in & Welcome Drink</li>
                    </ul>
                  </div>

                  <div class="room-col-pricing">
                    <span class="room-price-strike">${window.state.formatPrice(Math.round(room.price_per_night * 1.25))}</span>
                    <span class="room-price-val">${window.state.formatPrice(room.price_per_night)}</span>
                    <span class="room-tax-note">/ night + taxes</span>
                    <button class="btn btn-primary btn-select-room" onclick="bookRoomType('${hotel.id}', '${room.id}', '${room.name}', ${room.price_per_night})">
                      Select & Book
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- POLICIES -->
          <section class="details-section-card">
            <h2 class="card-section-title">House Rules & Hotel Policies</h2>
            <ul class="policies-list">
              <li>• Standard Check-in time is 2:00 PM and Check-out time is 12:00 PM.</li>
              <li>• Valid Government photo ID (Aadhaar / Passport / Driving License) required at registration.</li>
              <li>• Early check-in or late check-out is subject to room availability.</li>
              <li>• Free cancellation is permitted up to 48 hours prior to check-in.</li>
            </ul>
          </section>

          <!-- GUEST REVIEWS -->
          <section class="details-section-card">
            <div class="reviews-header">
              <h2 class="card-section-title">Guest Reviews & Ratings</h2>
              <button class="btn btn-outline" onclick="openReviewModal('${hotel.id}', 'hotel')">Write a Review</button>
            </div>
            <div class="reviews-list">
              <div class="review-item">
                <div class="review-meta">
                  <span class="reviewer-name">Vikram Mehta</span>
                  <span class="review-date">Verified Stay • October 2026</span>
                  <span class="review-star">★★★★★</span>
                </div>
                <p class="review-comment">"Exceptional hospitality from the moment we arrived. The staff went above and beyond to make our stay comfortable. Breakfast spread was royal!"</p>
              </div>
              <div class="review-item">
                <div class="review-meta">
                  <span class="reviewer-name">Aarti Kulkarni</span>
                  <span class="review-date">Verified Stay • September 2026</span>
                  <span class="review-star">★★★★★</span>
                </div>
                <p class="review-comment">"The architecture, gardens, and sunset view from the room were unforgettable. Worth every rupee."</p>
              </div>
            </div>
          </section>
        </div>

        <!-- RIGHT: STICKY BOOKING SUMMARY BOX -->
        <aside class="details-sidebar-column">
          <div class="sticky-booking-box">
            <div class="box-price-header">
              <div>
                <span class="box-from-label">Starting from</span>
                <span class="box-price-amount">${window.state.formatPrice(hotel.price_per_night)}</span>
                <span class="box-price-unit">/ night</span>
              </div>
              <span class="box-rating-pill">⭐ ${hotel.user_rating}</span>
            </div>

            <div class="box-dates-selector">
              <div class="box-date-input">
                <label>CHECK-IN</label>
                <input type="date" id="sb-checkin" value="${new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}">
              </div>
              <div class="box-date-input">
                <label>CHECK-OUT</label>
                <input type="date" id="sb-checkout" value="${new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]}">
              </div>
            </div>

            <div class="box-guests-selector">
              <label>GUESTS & ROOMS</label>
              <select id="sb-guests">
                <option value="2">2 Adults, 1 Room</option>
                <option value="1">1 Adult, 1 Room</option>
                <option value="4">4 Adults, 2 Rooms</option>
              </select>
            </div>

            <button class="btn btn-primary btn-block btn-reserve" onclick="document.getElementById('room-selection-section').scrollIntoView({ behavior: 'smooth' })">
              Choose Room Options
            </button>

            <div class="box-perks-list">
              <span>✓ Instant E-Voucher Confirmation</span>
              <span>✓ No cancellation fee up to 48h</span>
              <span>✓ Best Price Match Guarantee</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

window.bookRoomType = async function(hotelId, roomId, roomName, pricePerNight) {
  const hotel = await window.db.getHotelById(hotelId);
  if (!hotel) return;

  const checkinVal = document.getElementById('sb-checkin')?.value || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const checkoutVal = document.getElementById('sb-checkout')?.value || new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  const date1 = new Date(checkinVal);
  const date2 = new Date(checkoutVal);
  const diffTime = Math.abs(date2 - date1);
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseFare = pricePerNight * nights;
  const taxes = Math.round(baseFare * 0.18);
  const total = baseFare + taxes;

  const draft = {
    booking_type: 'hotel',
    item_id: hotel.id,
    item_title: hotel.name,
    item_subtitle: `${hotel.city} • ${roomName} • ${nights} Night(s)`,
    booking_details: {
      hotel_id: hotel.id,
      hotel_name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      room_name: roomName,
      check_in: checkinVal,
      check_out: checkoutVal,
      nights: nights,
      guests: 2
    },
    base_amount: baseFare,
    tax_amount: taxes,
    discount_amount: 0,
    total_amount: total
  };

  window.state.setBookingDraft(draft);
  window.router.navigate('/checkout');
};

window.openReviewModal = function(targetId, targetType) {
  const user = window.state.currentUser;
  if (!user) {
    window.state.showToast('Please login to submit a review', 'info');
    window.router.navigate('/login');
    return;
  }
  const comment = prompt("Please write your guest review for this property:");
  if (comment && comment.trim()) {
    window.state.showToast("Thank you! Your verified review has been submitted.", "success");
  }
};
