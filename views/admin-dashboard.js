// ============================================================================
// VIEW: ADMIN DASHBOARD (Platform Analytics, CRUD for Destinations/Hotels/Packages, Coupons & Fees)
// ============================================================================

let currentAdminTab = 'overview';

async function renderAdminDashboardView() {
  const user = window.state.currentUser;

  // Protect route - if not admin, show 1-click admin login prompt
  if (!user || user.role !== 'admin') {
    return `
      <div class="wy-auth-prompt-card">
        <span class="auth-icon">🛡️</span>
        <h2>Tourism and Hospitality Administrator Center</h2>
        <p>Restricted access. Only authorized platform administrators may manage destinations, verify hotels, adjust commissions, and supervise transactions.</p>
        <div class="prompt-buttons">
          <button class="btn btn-primary" onclick="quickDemoLogin('admin@wanderyatra.com', 'admin123')">
            Sign In as Demo Admin (Aparna Sen)
          </button>
          <button class="btn btn-outline" onclick="window.router.navigate('/login')">
            Back to User Login
          </button>
        </div>
      </div>
    `;
  }

  const destinations = await window.db.getDestinations();
  const hotels = await window.db.getHotels();
  const packages = await window.db.getPackages();
  const bookings = await window.db.getBookings();
  const coupons = await window.db.getCoupons();
  const settings = await window.db.getSettings();

  const totalGMV = bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
  const platformRevenue = Math.round(totalGMV * ((settings.commission_percent || 10) / 100));

  return `
    <div class="wy-admin-page">
      <!-- ADMIN HEADER -->
      <div class="admin-header-strip">
        <div class="admin-header-info">
          <div class="admin-badge-row">
            <span class="admin-shield-badge">🛡️ Platform Superuser</span>
            <span class="admin-role-label">ADMINISTRATOR</span>
          </div>
          <h1>System Control Panel</h1>
          <p>Supervise bookings, publish tourist destinations, manage luxury hotel inventory, and configure platform commissions.</p>
        </div>
        <div class="admin-header-actions">
          <button class="btn btn-outline-light" onclick="window.state.showToast('All system services operating at 100% health.')">⚡ System Status: Normal</button>
          <button class="btn btn-outline" onclick="window.state.logout()">Sign Out</button>
        </div>
      </div>

      <!-- KPI METRIC CARDS -->
      <div class="stats-cards-grid">
        <div class="stat-kpi-card">
          <span class="kpi-icon">💰</span>
          <div class="kpi-info">
            <span class="kpi-val">${window.state.formatPrice(totalGMV)}</span>
            <span class="kpi-label">Gross Merchandise Value (GMV)</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">📈</span>
          <div class="kpi-info">
            <span class="kpi-val">${window.state.formatPrice(platformRevenue)}</span>
            <span class="kpi-label">Platform Net Commission (${settings.commission_percent || 10}%)</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">📑</span>
          <div class="kpi-info">
            <span class="kpi-val">${bookings.length}</span>
            <span class="kpi-label">Total Bookings Handled</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">🏨</span>
          <div class="kpi-info">
            <span class="kpi-val">${hotels.length} Stays / ${destinations.length} Places</span>
            <span class="kpi-label">Active Platform Inventory</span>
          </div>
        </div>
      </div>

      <!-- ADMIN NAVIGATION TABS -->
      <div class="admin-nav-tabs">
        <button class="adm-tab ${currentAdminTab === 'overview' ? 'active' : ''}" onclick="switchAdminTab('overview')">📊 All Bookings</button>
        <button class="adm-tab ${currentAdminTab === 'destinations' ? 'active' : ''}" onclick="switchAdminTab('destinations')">📍 Destinations (${destinations.length})</button>
        <button class="adm-tab ${currentAdminTab === 'hotels' ? 'active' : ''}" onclick="switchAdminTab('hotels')">🏨 Hotels & Stays (${hotels.length})</button>
        <button class="adm-tab ${currentAdminTab === 'packages' ? 'active' : ''}" onclick="switchAdminTab('packages')">🌴 Holiday Packages (${packages.length})</button>
        <button class="adm-tab ${currentAdminTab === 'coupons' ? 'active' : ''}" onclick="switchAdminTab('coupons')">🏷️ Coupons (${coupons.length})</button>
        <button class="adm-tab ${currentAdminTab === 'settings' ? 'active' : ''}" onclick="switchAdminTab('settings')">⚙️ Platform Settings</button>
      </div>

      <!-- TAB 1: ALL BOOKINGS -->
      <div class="adm-tab-panel ${currentAdminTab === 'overview' ? 'active' : ''}" id="adm-panel-overview">
        <div class="owner-card">
          <div class="dash-card-header">
            <h3>All Customer Bookings</h3>
            <span class="text-muted small">Real-time database records</span>
          </div>
          <div class="table-responsive">
            <table class="wy-table">
              <thead>
                <tr>
                  <th>Booking Reference</th>
                  <th>Service Type</th>
                  <th>Item Title</th>
                  <th>Traveler Name</th>
                  <th>Amount Paid</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${bookings.map(b => `
                  <tr>
                    <td><strong>${b.booking_reference}</strong></td>
                    <td><span class="badge-type">${(b.booking_type || 'trip').toUpperCase()}</span></td>
                    <td>${b.item_title}</td>
                    <td>${b.traveler_info?.name || 'Customer'}</td>
                    <td><strong class="text-green">${window.state.formatPrice(b.total_amount)}</strong></td>
                    <td>${b.payment_method?.toUpperCase()}</td>
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

      <!-- TAB 2: DESTINATIONS -->
      <div class="adm-tab-panel ${currentAdminTab === 'destinations' ? 'active' : ''}" id="adm-panel-destinations">
        <div class="owner-card">
          <div class="dash-card-header">
            <h3>Publish & Manage Tourist Destinations</h3>
            <button class="btn btn-primary btn-sm" onclick="openAddDestinationModal()">+ Add New Destination</button>
          </div>
          <div class="table-responsive">
            <table class="wy-table">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Region</th>
                  <th>Category</th>
                  <th>Best Season</th>
                  <th>Est. Daily Budget</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${destinations.map(d => `
                  <tr>
                    <td>
                      <div class="table-prop-cell">
                        <img src="${d.cover_image}" alt="${d.name}" class="table-prop-thumb">
                        <strong>${d.name}</strong>
                      </div>
                    </td>
                    <td>${d.state_country}</td>
                    <td><span class="badge-type">${d.category.toUpperCase()}</span></td>
                    <td>${d.best_season}</td>
                    <td>${window.state.formatPrice(d.avg_budget_per_day)}</td>
                    <td>⭐ ${d.rating}</td>
                    <td>
                      <div class="table-actions">
                        <button class="btn btn-sm btn-outline" onclick="window.router.navigate('/destination/${d.id}')">View</button>
                        <button class="btn btn-sm btn-danger-outline" onclick="deleteDestinationAdmin('${d.id}')">Delete</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 3: HOTELS -->
      <div class="adm-tab-panel ${currentAdminTab === 'hotels' ? 'active' : ''}" id="adm-panel-hotels">
        <div class="owner-card">
          <div class="dash-card-header">
            <h3>Platform Hotel & Resort Inventory</h3>
            <button class="btn btn-primary btn-sm" onclick="openAddHotelModal()">+ Add Hotel</button>
          </div>
          <div class="table-responsive">
            <table class="wy-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>City</th>
                  <th>Type</th>
                  <th>Price / Night</th>
                  <th>Stars</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${hotels.map(h => `
                  <tr>
                    <td>
                      <div class="table-prop-cell">
                        <img src="${h.cover_image}" alt="${h.name}" class="table-prop-thumb">
                        <strong>${h.name}</strong>
                      </div>
                    </td>
                    <td>${h.city}</td>
                    <td><span class="badge-type">${(h.property_type || 'Hotel').toUpperCase()}</span></td>
                    <td><strong>${window.state.formatPrice(h.price_per_night)}</strong></td>
                    <td>${'★'.repeat(h.star_rating)}</td>
                    <td>
                      <button class="btn btn-sm btn-danger-outline" onclick="deleteHotelProperty('${h.id}')">Remove</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 4: PACKAGES -->
      <div class="adm-tab-panel ${currentAdminTab === 'packages' ? 'active' : ''}" id="adm-panel-packages">
        <div class="owner-card">
          <div class="dash-card-header">
            <h3>Holiday Tour Packages</h3>
            <button class="btn btn-primary btn-sm" onclick="openAddPackageModal()">+ Add Tour Package</button>
          </div>
          <div class="table-responsive">
            <table class="wy-table">
              <thead>
                <tr>
                  <th>Package Title</th>
                  <th>Destination</th>
                  <th>Duration</th>
                  <th>Theme</th>
                  <th>Price / Person</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${packages.map(p => `
                  <tr>
                    <td><strong>${p.title}</strong></td>
                    <td>${p.destination}</td>
                    <td>${p.duration_nights}N / ${p.duration_days}D</td>
                    <td><span class="badge-type">${p.category.toUpperCase()}</span></td>
                    <td><strong class="text-green">${window.state.formatPrice(p.price)}</strong></td>
                    <td>
                      <button class="btn btn-sm btn-danger-outline" onclick="deletePackageAdmin('${p.id}')">Remove</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 5: COUPONS -->
      <div class="adm-tab-panel ${currentAdminTab === 'coupons' ? 'active' : ''}" id="adm-panel-coupons">
        <div class="owner-card">
          <div class="dash-card-header">
            <h3>Promotional Coupons & Discount Codes</h3>
            <button class="btn btn-primary btn-sm" onclick="openAddCouponModal()">+ Create New Coupon</button>
          </div>
          <div class="table-responsive">
            <table class="wy-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Discount %</th>
                  <th>Max Cap</th>
                  <th>Min Spend</th>
                  <th>Service Scope</th>
                  <th>Expiry</th>
                </tr>
              </thead>
              <tbody>
                ${coupons.map(c => `
                  <tr>
                    <td><span class="coupon-code-pill">${c.code}</span></td>
                    <td>${c.title}</td>
                    <td><strong>${c.discount_percent}% OFF</strong></td>
                    <td>${c.max_discount ? window.state.formatPrice(c.max_discount) : 'No cap'}</td>
                    <td>${window.state.formatPrice(c.min_spend || 0)}</td>
                    <td><span class="badge-type">${c.service_type.toUpperCase()}</span></td>
                    <td>${c.valid_until}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 6: SETTINGS -->
      <div class="adm-tab-panel ${currentAdminTab === 'settings' ? 'active' : ''}" id="adm-panel-settings">
        <div class="owner-card max-w-600">
          <div class="dash-card-header">
            <h3>Platform Financial & Tax Settings</h3>
          </div>
          <form onsubmit="event.preventDefault(); submitAdminSettings(this);">
            <div class="form-group mb-3">
              <label>GST / Government Tax (%)</label>
              <input type="number" step="0.1" name="gst_percent" class="form-control" value="${settings.gst_percent || 18.0}">
            </div>
            <div class="form-group mb-3">
              <label>Convenience Service Fee (%)</label>
              <input type="number" step="0.1" name="service_fee_percent" class="form-control" value="${settings.service_fee_percent || 2.5}">
            </div>
            <div class="form-group mb-3">
              <label>Platform Commission from Hotel Partners (%)</label>
              <input type="number" step="0.1" name="commission_percent" class="form-control" value="${settings.commission_percent || 10.0}">
            </div>
            <div class="form-group mb-3">
              <label>Primary Customer Support Email</label>
              <input type="email" name="support_email" class="form-control" value="${settings.support_email || 'support@wanderyatra.com'}">
            </div>
            <div class="form-group mb-3">
              <label>Primary Customer Support Helpline</label>
              <input type="text" name="support_phone" class="form-control" value="${settings.support_phone || '+91 1800 200 4567'}">
            </div>
            <button type="submit" class="btn btn-primary">Save Platform Settings</button>
          </form>
        </div>
      </div>

      <!-- MODAL ROOT -->
      <div id="admin-modal-root"></div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// ADMIN INTERACTION LOGIC
// ----------------------------------------------------------------------------
window.switchAdminTab = function(tab) {
  currentAdminTab = tab;
  renderAdminDashboardView().then(html => {
    const container = document.getElementById('main-content');
    if (container) container.innerHTML = html;
  });
};

window.openAddDestinationModal = function() {
  const modalRoot = document.getElementById('admin-modal-root') || document.body;
  const modal = document.createElement('div');
  modal.className = 'wy-modal-backdrop';
  modal.innerHTML = `
    <div class="wy-modal-card modal-lg">
      <div class="modal-header">
        <h2>Publish New Destination Guide</h2>
        <button class="modal-close-btn" onclick="this.closest('.wy-modal-backdrop').remove()">✕</button>
      </div>
      <form onsubmit="event.preventDefault(); submitNewDestination(this);">
        <div class="modal-body form-grid-2">
          <div class="form-group">
            <label>Destination Name *</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. Andaman Islands" required>
          </div>
          <div class="form-group">
            <label>State & Country *</label>
            <input type="text" name="state_country" class="form-control" placeholder="e.g. Andaman & Nicobar, India" required>
          </div>
          <div class="form-group">
            <label>Category *</label>
            <select name="category" class="form-control select-input">
              <option value="beaches">Beaches & Islands</option>
              <option value="hill_stations">Hill Stations & Mountains</option>
              <option value="heritage">Royal Heritage & Culture</option>
              <option value="spiritual">Spiritual & Ghats</option>
              <option value="international">International Escapes</option>
            </select>
          </div>
          <div class="form-group">
            <label>Best Season to Visit *</label>
            <input type="text" name="best_season" class="form-control" placeholder="e.g. Oct - May" required>
          </div>
          <div class="form-group">
            <label>Est. Daily Budget (₹) *</label>
            <input type="number" name="avg_budget_per_day" class="form-control" placeholder="4500" required>
          </div>
          <div class="form-group">
            <label>Tagline *</label>
            <input type="text" name="tagline" class="form-control" placeholder="Brief catchy quote" required>
          </div>
          <div class="form-group full-width">
            <label>Cover Photo URL *</label>
            <input type="url" name="cover_image" class="form-control" value="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80" required>
          </div>
          <div class="form-group full-width">
            <label>Full Description *</label>
            <textarea name="description" class="form-control" rows="3" required>Breathtaking landscapes with crystal-clear turquoise waters and rich biodiversity.</textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" onclick="this.closest('.wy-modal-backdrop').remove()">Cancel</button>
          <button type="submit" class="btn btn-primary">Publish Destination</button>
        </div>
      </form>
    </div>
  `;
  modalRoot.appendChild(modal);
};

window.submitNewDestination = async function(form) {
  const formData = new FormData(form);
  const newDest = {
    name: formData.get('name'),
    state_country: formData.get('state_country'),
    category: formData.get('category'),
    best_season: formData.get('best_season'),
    avg_budget_per_day: parseInt(formData.get('avg_budget_per_day') || '3500', 10),
    tagline: formData.get('tagline'),
    cover_image: formData.get('cover_image'),
    gallery: [formData.get('cover_image')],
    description: formData.get('description'),
    rating: 4.8,
    reviews_count: 50,
    attractions: [
      { name: "Scenic Viewpoint", type: "Sightseeing", description: "Iconic landmark for photography" }
    ],
    travel_tips: ["Book local transport in advance"],
    suggested_itinerary: [
      { day: 1, title: "Arrival & Sights", details: "Explore local spots and sunset point" }
    ]
  };

  await window.db.saveDestination(newDest);
  window.state.showToast(`Destination "${newDest.name}" published! ✓`, 'success');
  form.closest('.wy-modal-backdrop').remove();
  switchAdminTab('destinations');
};

window.deleteDestinationAdmin = async function(id) {
  if (confirm("Are you sure you want to delete this destination guide?")) {
    await window.db.deleteDestination(id);
    window.state.showToast("Destination deleted.", "info");
    switchAdminTab('destinations');
  }
};

window.openAddPackageModal = function() {
  const modalRoot = document.getElementById('admin-modal-root') || document.body;
  const modal = document.createElement('div');
  modal.className = 'wy-modal-backdrop';
  modal.innerHTML = `
    <div class="wy-modal-card modal-lg">
      <div class="modal-header">
        <h2>Create Holiday Package</h2>
        <button class="modal-close-btn" onclick="this.closest('.wy-modal-backdrop').remove()">✕</button>
      </div>
      <form onsubmit="event.preventDefault(); submitNewPackage(this);">
        <div class="modal-body form-grid-2">
          <div class="form-group full-width">
            <label>Package Title *</label>
            <input type="text" name="title" class="form-control" placeholder="e.g. Magical Ladakh: Pangong & Nubra Valley" required>
          </div>
          <div class="form-group">
            <label>Destination City *</label>
            <input type="text" name="destination" class="form-control" placeholder="e.g. Ladakh, Kashmir, Goa" required>
          </div>
          <div class="form-group">
            <label>Theme Category *</label>
            <select name="category" class="form-control select-input">
              <option value="honeymoon">Honeymoon</option>
              <option value="family">Family</option>
              <option value="luxury">Luxury</option>
              <option value="adventure">Adventure</option>
              <option value="weekend">Weekend Break</option>
            </select>
          </div>
          <div class="form-group">
            <label>Duration (Nights / Days) *</label>
            <div style="display: flex; gap: 0.5rem;">
              <input type="number" name="nights" class="form-control" placeholder="5 Nights" value="5" required>
              <input type="number" name="days" class="form-control" placeholder="6 Days" value="6" required>
            </div>
          </div>
          <div class="form-group">
            <label>Price per Person (₹) *</label>
            <input type="number" name="price" class="form-control" placeholder="22999" required>
          </div>
          <div class="form-group full-width">
            <label>Cover Photo URL *</label>
            <input type="url" name="cover_image" class="form-control" value="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" onclick="this.closest('.wy-modal-backdrop').remove()">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Package</button>
        </div>
      </form>
    </div>
  `;
  modalRoot.appendChild(modal);
};

window.submitNewPackage = async function(form) {
  const formData = new FormData(form);
  const newPkg = {
    title: formData.get('title'),
    destination: formData.get('destination'),
    category: formData.get('category'),
    duration_nights: parseInt(formData.get('nights') || '4', 10),
    duration_days: parseInt(formData.get('days') || '5', 10),
    price: parseInt(formData.get('price') || '20000', 10),
    cover_image: formData.get('cover_image'),
    rating: 4.8,
    reviews_count: 12,
    highlights: ["4-Star Hotel Stays", "Private AC Cab for Transfers", "Daily Breakfast & Dinner"],
    inclusions: ["Accommodation", "Meals", "Transfers"],
    exclusions: ["Airfare", "Personal Expenses"],
    itinerary: [
      { day: 1, title: "Arrival and Check-in", activities: "Welcome drink and leisure" },
      { day: 2, title: "Scenic Sightseeing", activities: "Guided tour to top attractions" }
    ]
  };

  await window.db.savePackage(newPkg);
  window.state.showToast(`Package "${newPkg.title}" created! ✓`, 'success');
  form.closest('.wy-modal-backdrop').remove();
  switchAdminTab('packages');
};

window.deletePackageAdmin = async function(id) {
  if (confirm("Delete this holiday package?")) {
    await window.db.deletePackage(id);
    window.state.showToast("Package removed.", "info");
    switchAdminTab('packages');
  }
};

window.openAddCouponModal = function() {
  const modalRoot = document.getElementById('admin-modal-root') || document.body;
  const modal = document.createElement('div');
  modal.className = 'wy-modal-backdrop';
  modal.innerHTML = `
    <div class="wy-modal-card">
      <div class="modal-header">
        <h2>Create Discount Promo Code</h2>
        <button class="modal-close-btn" onclick="this.closest('.wy-modal-backdrop').remove()">✕</button>
      </div>
      <form onsubmit="event.preventDefault(); submitNewCoupon(this);">
        <div class="modal-body">
          <div class="form-group mb-2">
            <label>Coupon Code (e.g. FESTIVE30) *</label>
            <input type="text" name="code" class="form-control" placeholder="FESTIVE30" required style="text-transform: uppercase;">
          </div>
          <div class="form-group mb-2">
            <label>Offer Title *</label>
            <input type="text" name="title" class="form-control" placeholder="Grand Festive Sale: 30% OFF" required>
          </div>
          <div class="form-group mb-2">
            <label>Discount Percentage (%) *</label>
            <input type="number" name="discount_percent" class="form-control" placeholder="30" min="1" max="90" required>
          </div>
          <div class="form-group mb-2">
            <label>Maximum Discount Cap (₹)</label>
            <input type="number" name="max_discount" class="form-control" placeholder="3500" value="3500">
          </div>
          <div class="form-group mb-2">
            <label>Minimum Spend (₹)</label>
            <input type="number" name="min_spend" class="form-control" placeholder="5000" value="5000">
          </div>
          <div class="form-group mb-2">
            <label>Valid Until *</label>
            <input type="date" name="valid_until" class="form-control" value="2027-12-31" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" onclick="this.closest('.wy-modal-backdrop').remove()">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Coupon</button>
        </div>
      </form>
    </div>
  `;
  modalRoot.appendChild(modal);
};

window.submitNewCoupon = async function(form) {
  const formData = new FormData(form);
  const code = formData.get('code').toUpperCase().trim();
  const newCpn = {
    code: code,
    title: formData.get('title'),
    description: `Get ${formData.get('discount_percent')}% instant discount on your travel booking.`,
    discount_percent: parseInt(formData.get('discount_percent'), 10),
    max_discount: parseInt(formData.get('max_discount') || '3000', 10),
    min_spend: parseInt(formData.get('min_spend') || '5000', 10),
    service_type: 'all',
    valid_until: formData.get('valid_until')
  };

  await window.db.saveCoupon(newCpn);
  window.state.showToast(`Coupon "${code}" published! ✓`, 'success');
  form.closest('.wy-modal-backdrop').remove();
  switchAdminTab('coupons');
};

window.submitAdminSettings = async function(form) {
  const formData = new FormData(form);
  const updated = {
    gst_percent: parseFloat(formData.get('gst_percent')),
    service_fee_percent: parseFloat(formData.get('service_fee_percent')),
    commission_percent: parseFloat(formData.get('commission_percent')),
    support_email: formData.get('support_email'),
    support_phone: formData.get('support_phone')
  };

  await window.db.updateSettings(updated);
  window.state.showToast('Platform financial parameters updated! ✓', 'success');
};
