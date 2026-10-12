// ============================================================================
// VIEW: HOTEL OWNER DASHBOARD (Add Properties, Manage Rooms, View Reservations)
// ============================================================================

async function renderHotelOwnerView() {
  const user = window.state.currentUser;

  // If not logged in or not owner, provide 1-click owner switch
  if (!user || user.role !== 'hotel_owner') {
    return `
      <div class="wy-auth-prompt-card">
        <span class="auth-icon">🏨</span>
        <h2>Hotel & Hospitality Partner Portal</h2>
        <p>List your luxury hotels, resorts, homestays, or heritage havelis to reach millions of travelers across India and abroad.</p>
        <div class="prompt-buttons">
          <button class="btn btn-primary" onclick="quickDemoLogin('owner@luxuryhotels.com', 'owner123')">
            Sign In as Demo Hotel Owner (Vikram)
          </button>
          <button class="btn btn-outline" onclick="window.router.navigate('/login')">
            Register New Property Owner Account
          </button>
        </div>
      </div>
    `;
  }

  const allHotels = await window.db.getHotels();
  const allBookings = await window.db.getBookings();
  const hotelBookings = allBookings.filter(b => b.booking_type === 'hotel');

  const totalRevenue = hotelBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);

  return `
    <div class="wy-owner-page">
      <!-- OWNER HEADER -->
      <div class="owner-header-strip">
        <div class="owner-header-info">
          <div class="owner-badge-row">
            <span class="partner-badge">👑 Premier Hospitality Partner</span>
            <span class="owner-role">HOTEL OWNER</span>
          </div>
          <h1>Welcome, ${user.full_name}</h1>
          <p>Manage your luxury accommodations, track live occupancy, update room tariffs, and review guest bookings.</p>
        </div>
        <div class="owner-header-actions">
          <button class="btn btn-primary" onclick="openAddHotelModal()">+ Add New Property</button>
          <button class="btn btn-outline" onclick="window.state.logout()">Sign Out</button>
        </div>
      </div>

      <!-- KPI METRIC CARDS -->
      <div class="stats-cards-grid">
        <div class="stat-kpi-card">
          <span class="kpi-icon">🏨</span>
          <div class="kpi-info">
            <span class="kpi-val">${allHotels.length}</span>
            <span class="kpi-label">Active Properties Listed</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">📑</span>
          <div class="kpi-info">
            <span class="kpi-val">${hotelBookings.length}</span>
            <span class="kpi-label">Guest Reservations</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">💰</span>
          <div class="kpi-info">
            <span class="kpi-val">${window.state.formatPrice(totalRevenue)}</span>
            <span class="kpi-label">Gross Room Revenue</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">📊</span>
          <div class="kpi-info">
            <span class="kpi-val">87.4%</span>
            <span class="kpi-label">Avg. Occupancy Rate</span>
          </div>
        </div>
      </div>

      <!-- TABS: MY PROPERTIES & RESERVATIONS -->
      <div class="owner-tabs-bar">
        <button class="owner-tab active" id="tab-btn-props" onclick="switchOwnerTab('props')">My Properties (${allHotels.length})</button>
        <button class="owner-tab" id="tab-btn-res" onclick="switchOwnerTab('res')">Reservations & Check-ins (${hotelBookings.length})</button>
      </div>

      <!-- TAB PANEL: PROPERTIES LIST -->
      <div class="owner-panel active" id="owner-panel-props">
        <div class="owner-card">
          <div class="dash-card-header">
            <h3>Managed Hotel Properties</h3>
            <button class="btn btn-primary btn-sm" onclick="openAddHotelModal()">+ Add Property</button>
          </div>

          <div class="table-responsive">
            <table class="wy-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Star Rating</th>
                  <th>Base Tariff / Night</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${allHotels.map(h => `
                  <tr>
                    <td>
                      <div class="table-prop-cell">
                        <img src="${h.cover_image}" alt="${h.name}" class="table-prop-thumb">
                        <div>
                          <strong>${h.name}</strong>
                          <span class="text-muted small">${(h.rooms || []).length} Room Types</span>
                        </div>
                      </div>
                    </td>
                    <td>${h.city}, ${h.state_country}</td>
                    <td><span class="badge-type">${(h.property_type || 'Hotel').toUpperCase()}</span></td>
                    <td>${'★'.repeat(h.star_rating)}</td>
                    <td><strong>${window.state.formatPrice(h.price_per_night)}</strong></td>
                    <td>⭐ ${h.user_rating} (${h.reviews_count})</td>
                    <td>
                      <div class="table-actions">
                        <button class="btn btn-sm btn-outline" onclick="window.router.navigate('/hotel/${h.id}')">View</button>
                        <button class="btn btn-sm btn-danger-outline" onclick="deleteHotelProperty('${h.id}')">Delete</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB PANEL: RESERVATIONS LIST -->
      <div class="owner-panel" id="owner-panel-res">
        <div class="owner-card">
          <div class="dash-card-header">
            <h3>Guest Bookings & Check-In Log</h3>
          </div>

          <div class="table-responsive">
            <table class="wy-table">
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>Hotel & Room</th>
                  <th>Primary Guest</th>
                  <th>Dates / Nights</th>
                  <th>Amount Paid</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${hotelBookings.map(b => `
                  <tr>
                    <td><strong>${b.booking_reference}</strong></td>
                    <td>${b.item_title}</td>
                    <td>
                      <div>${b.traveler_info?.name || 'Guest'}</div>
                      <small class="text-muted">${b.traveler_info?.phone || ''}</small>
                    </td>
                    <td>${b.booking_details?.check_in || '2026-11-15'} to ${b.booking_details?.check_out || '2026-11-18'}</td>
                    <td><strong class="text-green">${window.state.formatPrice(b.total_amount)}</strong></td>
                    <td><span class="status-pill status-${b.booking_status}">${b.booking_status.toUpperCase()}</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline" onclick="openETicketModal('${b.id}')">Voucher</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- MODAL ROOT -->
      <div id="owner-modal-root"></div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// HOTEL OWNER MODALS & LOGIC
// ----------------------------------------------------------------------------
window.switchOwnerTab = function(tab) {
  document.getElementById('tab-btn-props')?.classList.toggle('active', tab === 'props');
  document.getElementById('tab-btn-res')?.classList.toggle('active', tab === 'res');
  document.getElementById('owner-panel-props')?.classList.toggle('active', tab === 'props');
  document.getElementById('owner-panel-res')?.classList.toggle('active', tab === 'res');
};

window.openAddHotelModal = function() {
  const modalRoot = document.getElementById('owner-modal-root') || document.body;
  const modal = document.createElement('div');
  modal.className = 'wy-modal-backdrop';
  modal.innerHTML = `
    <div class="wy-modal-card modal-lg">
      <div class="modal-header">
        <div>
          <span class="badge-type">PARTNER PORTAL</span>
          <h2 class="modal-title">List New Hotel Property</h2>
        </div>
        <button class="modal-close-btn" onclick="this.closest('.wy-modal-backdrop').remove()">✕</button>
      </div>

      <form onsubmit="event.preventDefault(); submitNewHotelProperty(this);" class="modal-form">
        <div class="modal-body">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Property Name *</label>
              <input type="text" name="name" class="form-control" placeholder="e.g. The Oberoi Grand Palace" required>
            </div>
            <div class="form-group">
              <label>City *</label>
              <input type="text" name="city" class="form-control" placeholder="e.g. Udaipur, Goa, Jaipur" required>
            </div>
            <div class="form-group">
              <label>State & Country *</label>
              <input type="text" name="state_country" class="form-control" placeholder="e.g. Rajasthan, India" required>
            </div>
            <div class="form-group">
              <label>Property Type *</label>
              <select name="property_type" class="form-control select-input">
                <option value="hotel">Luxury Hotel</option>
                <option value="resort">Beach / Hill Resort</option>
                <option value="heritage">Heritage Haveli / Palace</option>
                <option value="villa">Private Luxury Villa</option>
                <option value="homestay">Boutique Homestay</option>
              </select>
            </div>
            <div class="form-group">
              <label>Star Rating (1-5)</label>
              <select name="star_rating" class="form-control select-input">
                <option value="5" selected>5 Star Luxury</option>
                <option value="4">4 Star Premium</option>
                <option value="3">3 Star Standard</option>
              </select>
            </div>
            <div class="form-group">
              <label>Base Price per Night (₹) *</label>
              <input type="number" name="price_per_night" class="form-control" placeholder="12500" required>
            </div>
            <div class="form-group full-width">
              <label>Full Physical Address *</label>
              <input type="text" name="address" class="form-control" placeholder="Full address with pincode" required>
            </div>
            <div class="form-group full-width">
              <label>Cover Photo URL (High Resolution)</label>
              <input type="url" name="cover_image" class="form-control" placeholder="https://images.unsplash.com/..." value="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80">
            </div>
            <div class="form-group full-width">
              <label>Amenities (Comma separated)</label>
              <input type="text" name="amenities" class="form-control" placeholder="Swimming Pool, Free WiFi, Spa, Lake View, Breakfast" value="Swimming Pool, Free High-Speed WiFi, Multi-Cuisine Dining, Airport Shuttle, Spa">
            </div>
            <div class="form-group full-width">
              <label>Property Description *</label>
              <textarea name="description" class="form-control" rows="3" placeholder="Describe the ambiance, views, and heritage of your property..." required>Experience world-class royal hospitality with opulent suites, tranquil courtyards, and scenic views.</textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline" onclick="this.closest('.wy-modal-backdrop').remove()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save & Publish Hotel</button>
        </div>
      </form>
    </div>
  `;
  modalRoot.appendChild(modal);
};

window.submitNewHotelProperty = async function(form) {
  const formData = new FormData(form);
  const amenitiesList = (formData.get('amenities') || '').split(',').map(s => s.trim()).filter(Boolean);

  const newHotel = {
    name: formData.get('name'),
    city: formData.get('city'),
    state_country: formData.get('state_country'),
    address: formData.get('address'),
    property_type: formData.get('property_type'),
    star_rating: parseInt(formData.get('star_rating') || '5', 10),
    user_rating: 4.8,
    reviews_count: 1,
    price_per_night: parseInt(formData.get('price_per_night') || '10000', 10),
    cover_image: formData.get('cover_image'),
    gallery: [formData.get('cover_image')],
    amenities: amenitiesList,
    description: formData.get('description'),
    is_recommended: true
  };

  await window.db.saveHotel(newHotel);
  window.state.showToast(`Property "${newHotel.name}" successfully published! 🎉`, 'success');
  form.closest('.wy-modal-backdrop').remove();
  renderHotelOwnerView().then(html => {
    const container = document.getElementById('main-content');
    if (container) container.innerHTML = html;
  });
};

window.deleteHotelProperty = async function(id) {
  if (confirm("Are you sure you want to remove this property listing from the platform?")) {
    await window.db.deleteHotel(id);
    window.state.showToast("Property removed successfully.", "info");
    renderHotelOwnerView().then(html => {
      const container = document.getElementById('main-content');
      if (container) container.innerHTML = html;
    });
  }
};
