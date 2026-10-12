// ============================================================================
// VIEW: MY BOOKINGS (Upcoming, Completed, Cancelled Trips & E-Tickets)
// ============================================================================

let userBookingsList = [];
let activeBookingsFilter = 'all';

async function renderMyBookingsView() {
  const user = window.state.currentUser;

  if (!user) {
    return `
      <div class="wy-error-view">
        <h2>Please Sign In</h2>
        <p>You must be signed in to access your booked trips and e-tickets.</p>
        <button class="btn btn-primary" onclick="window.router.navigate('/login')">Sign In</button>
      </div>
    `;
  }

  userBookingsList = await window.db.getUserBookings(user.id);

  return `
    <div class="wy-bookings-page">
      <div class="bookings-header-row">
        <div>
          <h1 class="page-title">My Bookings & E-Tickets</h1>
          <p class="page-subtitle">Track your upcoming vacations, download travel vouchers, or initiate cancellation requests.</p>
        </div>
        <button class="btn btn-primary" onclick="window.router.navigate('/flights')">+ Book Another Trip</button>
      </div>

      <!-- STATUS FILTER TABS -->
      <div class="booking-status-tabs">
        <button class="bkg-tab active" data-filter="all" onclick="filterBookingsTab('all', this)">All Trips (${userBookingsList.length})</button>
        <button class="bkg-tab" data-filter="confirmed" onclick="filterBookingsTab('confirmed', this)">Upcoming Confirmed</button>
        <button class="bkg-tab" data-filter="cancelled" onclick="filterBookingsTab('cancelled', this)">Cancelled Trips</button>
      </div>

      <!-- BOOKINGS LIST CONTAINER -->
      <div class="bookings-cards-list" id="bookings-cards-list">
        ${renderBookingsCards(userBookingsList)}
      </div>

      <!-- E-TICKET MODAL ROOT -->
      <div id="booking-modal-root"></div>
    </div>
  `;
}

function renderBookingsCards(list) {
  if (!list.length) {
    return `
      <div class="no-results-card">
        <span class="empty-icon">🧳</span>
        <h3>No bookings found in this category</h3>
        <p>Ready to plan your next memorable getaway? Explore flights, luxury stays, and tour packages.</p>
        <button class="btn btn-primary" onclick="window.router.navigate('/')">Explore Now</button>
      </div>
    `;
  }

  return list.map(b => `
    <div class="user-booking-card ${b.booking_status}">
      <div class="bkg-header-line">
        <div class="bkg-type-wrap">
          <span class="bkg-type-icon">${b.booking_type === 'flight' ? '✈️' : b.booking_type === 'hotel' ? '🏨' : '🌴'}</span>
          <span class="bkg-type-label">${b.booking_type.toUpperCase()} BOOKING</span>
        </div>
        <div class="bkg-status-wrap">
          <span class="bkg-ref">Ref: ${b.booking_reference}</span>
          <span class="status-pill status-${b.booking_status}">${b.booking_status.toUpperCase()}</span>
        </div>
      </div>

      <div class="bkg-body-content">
        <h3 class="bkg-title">${b.item_title}</h3>
        <p class="bkg-subtitle">${b.item_subtitle || ''}</p>

        <div class="bkg-details-chips">
          <span>👤 ${b.traveler_info?.name || 'Rahul Sharma'}</span>
          <span>💳 ${b.payment_method?.toUpperCase()} • Paid</span>
          <span>📅 Booked on ${new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>

        ${b.booking_status === 'cancelled' ? `
          <div class="cancelled-notice-box">
            <span>⚠️ Cancelled: ${b.cancellation_reason || 'Requested by user'}</span>
            <span>Refund processed: ${window.state.formatPrice(b.refund_amount || b.total_amount * 0.85)}</span>
          </div>
        ` : ''}
      </div>

      <div class="bkg-footer-line">
        <div class="bkg-price-col">
          <span class="price-paid-label">Total Amount Paid</span>
          <span class="price-paid-val">${window.state.formatPrice(b.total_amount)}</span>
        </div>

        <div class="bkg-actions-group">
          <button class="btn btn-outline" onclick="openETicketModal('${b.id}')">
            🖨️ View E-Ticket
          </button>
          ${b.booking_status === 'confirmed' ? `
            <button class="btn btn-danger-outline" onclick="requestCancelBooking('${b.id}')">
              Cancel Booking
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

window.filterBookingsTab = function(filter, btn) {
  activeBookingsFilter = filter;
  document.querySelectorAll('.bkg-tab').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === filter));
  
  const filtered = filter === 'all' ? userBookingsList : userBookingsList.filter(b => b.booking_status === filter);
  const container = document.getElementById('bookings-cards-list');
  if (container) container.innerHTML = renderBookingsCards(filtered);
};

window.openETicketModal = async function(bookingId) {
  const booking = await window.db.getBookingByRef(bookingId);
  if (!booking) return;

  const modalRoot = document.getElementById('booking-modal-root') || document.body;
  const modal = document.createElement('div');
  modal.className = 'wy-modal-backdrop';
  modal.innerHTML = `
    <div class="wy-modal-card modal-lg">
      <div class="modal-header">
        <div>
          <span class="badge-type">${booking.booking_type.toUpperCase()} TRAVEL VOUCHER</span>
          <h2 class="modal-title">Official E-Ticket: ${booking.booking_reference}</h2>
        </div>
        <button class="modal-close-btn" onclick="this.closest('.wy-modal-backdrop').remove()">✕</button>
      </div>

      <div class="modal-body">
        <div class="e-ticket-box">
          <div class="ticket-top">
            <div class="ticket-brand">
              <span class="ticket-logo">Tourism and Hospitality</span>
              <span class="ticket-type-badge">${booking.booking_status.toUpperCase()}</span>
            </div>
            <div class="ticket-ref">
              <span class="ref-label">Booking Reference:</span>
              <span class="ref-value">${booking.booking_reference}</span>
            </div>
          </div>

          <div class="ticket-body">
            <h3 class="ticket-item-title">${booking.item_title}</h3>
            <p class="ticket-item-sub">${booking.item_subtitle}</p>

            <div class="ticket-info-grid">
              <div class="info-block">
                <span class="info-label">Primary Traveler</span>
                <span class="info-val">${booking.traveler_info?.name || 'Guest'}</span>
              </div>
              <div class="info-block">
                <span class="info-label">Email / SMS</span>
                <span class="info-val">${booking.traveler_info?.email || 'N/A'}</span>
              </div>
              <div class="info-block">
                <span class="info-label">Transaction ID</span>
                <span class="info-val">${booking.payment_transaction_id || 'TXN-SUCCESS'}</span>
              </div>
              <div class="info-block">
                <span class="info-label">Total Amount Paid</span>
                <span class="info-val text-green">${window.state.formatPrice(booking.total_amount)}</span>
              </div>
            </div>

            <div class="ticket-barcode-row">
              <div class="barcode-visual">
                <div class="barcode-lines"></div>
                <span>${booking.booking_reference} • AIRLINE / IRCTC COMPLIANT</span>
              </div>
              <div class="qr-box-small">
                <span>VERIFIED PNR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-outline" onclick="this.closest('.wy-modal-backdrop').remove()">Close</button>
        <button class="btn btn-primary" onclick="window.print()">🖨️ Print E-Ticket</button>
      </div>
    </div>
  `;
  modalRoot.appendChild(modal);
};

window.requestCancelBooking = async function(bookingId) {
  const booking = await window.db.getBookingByRef(bookingId);
  if (!booking) return;

  const refundEstimate = Math.round(booking.total_amount * 0.85);
  const confirmed = confirm(`Are you sure you want to cancel booking ${booking.booking_reference}?\n\nEstimated refundable amount: ${window.state.formatPrice(refundEstimate)} (85% refund after standard airline/hotel cancellation fee).\n\nProceed with cancellation?`);

  if (confirmed) {
    await window.db.cancelBooking(bookingId, "Cancelled by user via dashboard");
    window.state.showToast(`Booking ${booking.booking_reference} cancelled. Refund of ${window.state.formatPrice(refundEstimate)} initiated.`, 'info');
    renderMyBookingsView().then(html => {
      const container = document.getElementById('main-content');
      if (container) container.innerHTML = html;
    });
  }
};
