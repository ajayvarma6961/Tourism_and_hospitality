// ============================================================================
// GLOBAL APPLICATION STATE & EVENT EMITTER
// ============================================================================

class AppState {
  constructor() {
    this.listeners = {};
    this.currentUser = this.loadSavedUser();
    this.currency = localStorage.getItem('wy_currency') || 'INR';
    this.currencyRates = {
      INR: { symbol: '₹', rate: 1 },
      USD: { symbol: '$', rate: 0.012 },
      EUR: { symbol: '€', rate: 0.011 }
    };
    this.activeSearchTab = 'flights';
    this.bookingDraft = null;
    this.favorites = JSON.parse(localStorage.getItem('wy_favorites') || '[]');
  }

  loadSavedUser() {
    const raw = localStorage.getItem('wy_current_user');
    if (!raw) {
      // Default to demo traveler for immediate convenience, or prompt login
      return {
        id: "usr-traveler",
        email: "traveler@wanderyatra.com",
        full_name: "Rahul Sharma",
        phone: "+91 98765 43210",
        role: "traveler",
        avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      };
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  setUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem('wy_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wy_current_user');
    }
    this.emit('userChanged', user);
  }

  logout() {
    this.setUser(null);
    window.location.hash = '#/';
    this.showToast('You have been logged out successfully', 'info');
  }

  setCurrency(curr) {
    if (this.currencyRates[curr]) {
      this.currency = curr;
      localStorage.setItem('wy_currency', curr);
      this.emit('currencyChanged', curr);
    }
  }

  formatPrice(amountInINR) {
    const info = this.currencyRates[this.currency] || this.currencyRates.INR;
    const converted = Math.round(amountInINR * info.rate);
    return `${info.symbol}${converted.toLocaleString('en-IN')}`;
  }

  toggleFavorite(itemId, itemType, itemData) {
    const exists = this.favorites.find(f => f.id === itemId);
    if (exists) {
      this.favorites = this.favorites.filter(f => f.id !== itemId);
      this.showToast('Removed from saved wishlist', 'info');
    } else {
      this.favorites.push({ id: itemId, type: itemType, data: itemData, savedAt: new Date().toISOString() });
      this.showToast('Added to saved wishlist! ❤️', 'success');
    }
    localStorage.setItem('wy_favorites', JSON.stringify(this.favorites));
    this.emit('favoritesChanged', this.favorites);
  }

  isFavorite(itemId) {
    return this.favorites.some(f => f.id === itemId);
  }

  setBookingDraft(draft) {
    this.bookingDraft = draft;
    sessionStorage.setItem('wy_booking_draft', JSON.stringify(draft));
  }

  getBookingDraft() {
    if (this.bookingDraft) return this.bookingDraft;
    const raw = sessionStorage.getItem('wy_booking_draft');
    return raw ? JSON.parse(raw) : null;
  }

  clearBookingDraft() {
    this.bookingDraft = null;
    sessionStorage.removeItem('wy_booking_draft');
  }

  // --- Pub/Sub ---
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  // --- Global Toast Notification ---
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-root') || document.body;
    let toast = document.createElement('div');
    toast.className = `wy-toast wy-toast-${type}`;
    
    let icon = '✨';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `
      <span class="wy-toast-icon">${icon}</span>
      <span class="wy-toast-msg">${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}

window.state = new AppState();
