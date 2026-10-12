// ============================================================================
// WANDERLUST YATRA - APPLICATION BOOTSTRAPPER & ROUTE REGISTRATION
// ============================================================================

// Register routes immediately
function registerAllAppRoutes() {
  if (!window.router) return;
  window.router.addRoute('/', renderHomeView);
  window.router.addRoute('/flights', renderFlightsView);
  window.router.addRoute('/hotels', renderHotelsView);
  window.router.addRoute('/hotel/:id', renderHotelDetailsView);
  window.router.addRoute('/packages', renderPackagesView);
  window.router.addRoute('/explore', renderExploreView);
  window.router.addRoute('/destination/:id', renderDestinationDetailsView);
  window.router.addRoute('/checkout', renderCheckoutView);
  window.router.addRoute('/login', renderAuthView);
  window.router.addRoute('/dashboard', renderUserDashboardView);
  window.router.addRoute('/my-bookings', renderMyBookingsView);
  window.router.addRoute('/offers', renderOffersView);
  window.router.addRoute('/support', renderSupportView);
  window.router.addRoute('/services', renderOtherServicesView);
  window.router.addRoute('/owner', renderHotelOwnerView);
  window.router.addRoute('/admin', renderAdminDashboardView);
}

// Call registration immediately
registerAllAppRoutes();

// Initialize app when DOM is ready
function initApplication() {
  registerAllAppRoutes();
  updateUserHeader();

  if (window.state) {
    window.state.on('userChanged', () => {
      updateUserHeader();
      window.router.handleRoute();
    });

    window.state.on('currencyChanged', (curr) => {
      const select = document.getElementById('currency-select');
      if (select) select.value = curr;
      window.router.handleRoute();
    });

    window.state.on('favoritesChanged', () => {
      updateUserHeader();
    });
  }

  // Trigger initial route
  if (window.router) {
    window.router.handleRoute();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApplication);
} else {
  initApplication();
}

// Helper: Renders user header area dynamically
function updateUserHeader() {
  const container = document.getElementById('user-actions-area');
  if (!container) return;

  const user = window.state?.currentUser;
  const favCount = window.state?.favorites?.length || 0;

  if (user) {
    container.innerHTML = `
      <div class="user-header-logged">
        <a href="#/dashboard" class="header-wishlist-link" title="Saved Wishlist">
          <span class="heart-icon">❤️</span>
          <span class="badge-count">${favCount}</span>
        </a>

        <div class="user-profile-menu-wrap" id="user-menu-wrap">
          <button class="user-profile-trigger" onclick="toggleUserDropdown()" aria-label="User Account Menu">
            <img src="${user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" class="nav-avatar" alt="User">
            <div class="nav-user-text">
              <span class="nav-user-name">${(user.full_name || 'Traveler').split(' ')[0]}</span>
              <span class="nav-user-role">${user.role === 'admin' ? '🛡️ Admin' : user.role === 'hotel_owner' ? '🏨 Owner' : '👑 Gold Club'}</span>
            </div>
            <span class="nav-arrow">▾</span>
          </button>

          <div class="user-dropdown-panel hidden" id="user-dropdown">
            <div class="dropdown-header">
              <strong>${user.full_name}</strong>
              <small>${user.email}</small>
            </div>
            <div class="dropdown-links">
              <a href="#/my-bookings" onclick="closeUserDropdown()">📑 My Bookings &amp; E-Tickets</a>
              <a href="#/dashboard" onclick="closeUserDropdown()">👤 Traveler Dashboard</a>
              <a href="#/offers" onclick="closeUserDropdown()">🏷️ My Deals &amp; Coupons</a>
              ${user.role === 'hotel_owner' || user.role === 'admin' ? `<a href="#/owner" onclick="closeUserDropdown()">🏨 Hotel Owner Portal</a>` : ''}
              ${user.role === 'admin' ? `<a href="#/admin" onclick="closeUserDropdown()">🛡️ Admin Control Panel</a>` : ''}
              <hr class="dropdown-divider">
              <button class="dropdown-logout-btn" onclick="window.state.logout(); closeUserDropdown();">🚪 Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="user-header-guest">
        <button class="btn btn-login-nav" onclick="window.router.navigate('/login')">
          <span class="user-icon">👤</span>
          <span>Login / Register</span>
        </button>
      </div>
    `;
  }
}

window.toggleUserDropdown = function() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.toggle('hidden');
};

window.closeUserDropdown = function() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
};

// Global click listener to close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const menuWrap = document.getElementById('user-menu-wrap');
  if (menuWrap && !menuWrap.contains(e.target)) {
    window.closeUserDropdown();
  }
});
