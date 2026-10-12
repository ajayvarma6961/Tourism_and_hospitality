// ============================================================================
// VIEW: USER DASHBOARD (Profile, Stats, Saved Favorites, Travel Preferences)
// ============================================================================

async function renderUserDashboardView() {
  const user = window.state.currentUser;

  if (!user) {
    return `
      <div class="wy-error-view">
        <h2>Please Sign In</h2>
        <p>You need to be logged in to view your traveler dashboard.</p>
        <button class="btn btn-primary" onclick="window.router.navigate('/login')">Sign In Now</button>
      </div>
    `;
  }

  const userBookings = await window.db.getUserBookings(user.id);
  const favorites = window.state.favorites;

  const totalSpent = userBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);

  return `
    <div class="wy-dashboard-page">
      <!-- DASHBOARD PROFILE HERO -->
      <div class="dash-hero-card">
        <div class="dash-user-row">
          <img src="${user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" class="dash-avatar" alt="${user.full_name}">
          <div class="dash-user-meta">
            <div class="dash-badges-row">
              <span class="member-tier-badge">👑 Gold Club Traveler</span>
              <span class="role-badge">${user.role.toUpperCase()}</span>
            </div>
            <h1 class="dash-name">${user.full_name}</h1>
            <p class="dash-email">✉️ ${user.email} • 📞 ${user.phone || '+91 98765 43210'}</p>
          </div>
        </div>

        <div class="dash-quick-actions">
          <button class="btn btn-outline-light" onclick="window.router.navigate('/my-bookings')">My Bookings (${userBookings.length})</button>
          <button class="btn btn-primary" onclick="window.router.navigate('/flights')">Book New Trip</button>
          <button class="btn btn-outline" onclick="window.state.logout()">Sign Out</button>
        </div>
      </div>

      <!-- TRAVEL STATS KPI CARDS -->
      <div class="stats-cards-grid">
        <div class="stat-kpi-card">
          <span class="kpi-icon">✈️</span>
          <div class="kpi-info">
            <span class="kpi-val">${userBookings.length}</span>
            <span class="kpi-label">Total Bookings</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">💰</span>
          <div class="kpi-info">
            <span class="kpi-val">${window.state.formatPrice(totalSpent)}</span>
            <span class="kpi-label">Total Traveled Value</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">❤️</span>
          <div class="kpi-info">
            <span class="kpi-val">${favorites.length}</span>
            <span class="kpi-label">Saved Wishlist Stays</span>
          </div>
        </div>
        <div class="stat-kpi-card">
          <span class="kpi-icon">🎁</span>
          <div class="kpi-info">
            <span class="kpi-val">1,250</span>
            <span class="kpi-label">Reward Yatra Coins</span>
          </div>
        </div>
      </div>

      <!-- MAIN SPLIT -->
      <div class="dash-grid-split">
        <!-- LEFT: SAVED WISHLIST -->
        <div class="dash-column">
          <div class="dash-card">
            <div class="dash-card-header">
              <h3>Saved Wishlist (${favorites.length})</h3>
              <button class="btn btn-sm btn-outline" onclick="window.router.navigate('/explore')">Explore More</button>
            </div>

            ${!favorites.length ? `
              <div class="empty-state-p">
                <p>You haven't saved any destinations or hotels yet. Click the heart icon on any card to save it!</p>
              </div>
            ` : `
              <div class="saved-items-list">
                ${favorites.map(fav => `
                  <div class="saved-item-row" onclick="window.router.navigate('/${fav.type === 'hotel' ? 'hotel/' + fav.id : 'destination/' + fav.id}')">
                    <img src="${fav.data.cover_image}" alt="${fav.data.name}">
                    <div class="saved-item-info">
                      <h4>${fav.data.name}</h4>
                      <p>${fav.data.state_country || fav.data.city || 'India'}</p>
                    </div>
                    <button class="btn-remove-fav" onclick="event.stopPropagation(); window.state.toggleFavorite('${fav.id}', '${fav.type}', {}); renderUserDashboardView();">✕</button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

        <!-- RIGHT: PERSONAL PROFILE DETAILS -->
        <div class="dash-column">
          <div class="dash-card">
            <div class="dash-card-header">
              <h3>Profile & Travel Preferences</h3>
            </div>
            
            <form class="profile-details-form" onsubmit="event.preventDefault(); window.state.showToast('Profile information updated successfully! ✓');">
              <div class="form-group mb-3">
                <label>Full Name</label>
                <input type="text" class="form-control" value="${user.full_name}">
              </div>
              <div class="form-group mb-3">
                <label>Email Address</label>
                <input type="email" class="form-control" value="${user.email}" readonly>
              </div>
              <div class="form-group mb-3">
                <label>Mobile Number</label>
                <input type="tel" class="form-control" value="${user.phone || '+91 98765 43210'}">
              </div>
              <div class="form-group mb-3">
                <label>Passport / Government ID</label>
                <input type="text" class="form-control" value="XXXX-XXXX-4912" placeholder="Aadhaar or Passport number">
              </div>
              <div class="form-group mb-3">
                <label>Dietary & Seating Preference</label>
                <select class="form-control select-input">
                  <option value="veg" selected>Vegetarian Meal / Window Seat</option>
                  <option value="nonveg">Non-Vegetarian Meal / Aisle Seat</option>
                  <option value="jain">Jain Meal</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Save Profile Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}
