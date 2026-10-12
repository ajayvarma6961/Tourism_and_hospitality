// ============================================================================
// VIEW: BOOKING & CHECKOUT (Interactive 3-Step Payment & E-Ticket Voucher)
// ============================================================================

let checkoutDraft = null;
let appliedDiscount = 0;
let appliedCouponCode = '';
let selectedPaymentMethod = 'upi';
let addOnsSelected = {
  insurance: false,
  airportCab: false
};

async function renderCheckoutView() {
  checkoutDraft = window.state.getBookingDraft();

  if (!checkoutDraft) {
    return `
      <div class="wy-error-view">
        <span class="empty-icon">🛒</span>
        <h2>No Active Booking Selected</h2>
        <p>Please select a flight, hotel, or holiday package to proceed with checkout.</p>
        <button class="btn btn-primary" onclick="window.router.navigate('/')">Explore Travel Options</button>
      </div>
    `;
  }

  const currentUser = window.state.currentUser || {
    full_name: "Rahul Sharma",
    email: "traveler@wanderyatra.com",
    phone: "+91 98765 43210"
  };

  appliedDiscount = 0;
  appliedCouponCode = '';
  addOnsSelected = { insurance: false, airportCab: false };

  return `
    <div class="wy-checkout-page">
      <!-- CHECKOUT HEADER -->
      <div class="checkout-header-strip">
        <div class="checkout-header-content">
          <button class="back-link-btn" onclick="window.history.back()">← Back</button>
          <h1>Secure Checkout & Traveler Details</h1>
          <div class="checkout-steps-indicator">
            <span class="step-badge active">1. Review Trip</span>
            <span class="step-connector">→</span>
            <span class="step-badge active">2. Travellers & Add-ons</span>
            <span class="step-connector">→</span>
            <span class="step-badge active">3. Secure Payment</span>
          </div>
        </div>
      </div>

      <div class="checkout-grid-layout">
        <!-- LEFT: TRAVELER FORM & PAYMENT SELECTOR -->
        <div class="checkout-main-column">
          <!-- Item Summary Card -->
          <div class="checkout-card">
            <div class="card-tag-row">
              <span class="tag-type">${(checkoutDraft.booking_type || 'Trip').toUpperCase()} BOOKING</span>
              <span class="tag-instant">✓ Instant Confirmation</span>
            </div>
            <h2 class="checkout-item-title">${checkoutDraft.item_title}</h2>
            <p class="checkout-item-sub">${checkoutDraft.item_subtitle || ''}</p>
          </div>

          <!-- Traveler Information Form -->
          <div class="checkout-card">
            <h3 class="checkout-section-heading">1. Traveler Information</h3>
            <p class="section-sub">Please ensure names match your government-issued ID.</p>
            
            <form id="traveler-form" class="checkout-form-grid" onsubmit="event.preventDefault()">
              <div class="form-group">
                <label for="trav-name">Full Name (as per ID) *</label>
                <input type="text" id="trav-name" class="form-control" value="${currentUser.full_name}" required>
              </div>

              <div class="form-group">
                <label for="trav-email">Email Address (for E-Ticket) *</label>
                <input type="email" id="trav-email" class="form-control" value="${currentUser.email}" required>
              </div>

              <div class="form-group">
                <label for="trav-phone">Mobile Phone (for SMS updates) *</label>
                <input type="tel" id="trav-phone" class="form-control" value="${currentUser.phone}" required>
              </div>

              <div class="form-group">
                <label for="trav-requests">Special Requests (Optional)</label>
                <input type="text" id="trav-requests" class="form-control" placeholder="e.g. Non-smoking room, Quiet floor, Window seat">
              </div>
            </form>
          </div>

          <!-- Optional Trip Protection & Add-ons -->
          <div class="checkout-card">
            <h3 class="checkout-section-heading">2. Value Add-ons & Protection</h3>
            
            <div class="addons-list">
              <label class="addon-item">
                <input type="checkbox" id="addon-ins" onchange="toggleAddOn('insurance', 249)">
                <div class="addon-info">
                  <div class="addon-title-row">
                    <strong>Comprehensive Travel Insurance</strong>
                    <span class="addon-price">+ ₹249</span>
                  </div>
                  <p>Covers trip delays, emergency medical expenses up to ₹5,00,000, and lost baggage compensation.</p>
                </div>
              </label>

              <label class="addon-item">
                <input type="checkbox" id="addon-cab" onchange="toggleAddOn('airportCab', 799)">
                <div class="addon-info">
                  <div class="addon-title-row">
                    <strong>Verified Airport Pickup & Drop Cab</strong>
                    <span class="addon-price">+ ₹799</span>
                  </div>
                  <p>Guaranteed on-time AC sedan with professional chauffeur waiting at arrival terminal.</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Payment Method Selector (Test Mode) -->
          <div class="checkout-card">
            <div class="payment-header-row">
              <h3 class="checkout-section-heading">3. Payment Gateway Simulation</h3>
              <span class="test-mode-badge">🧪 Test Mode (Zero Real Charges)</span>
            </div>
            <p class="section-sub">Choose your preferred payment method. Live authorization test without storing sensitive credentials.</p>

            <div class="payment-tabs">
              <button class="pay-tab active" data-method="upi" onclick="switchPaymentMethod('upi')">
                <span>📱 UPI / QR Code</span>
              </button>
              <button class="pay-tab" data-method="card" onclick="switchPaymentMethod('card')">
                <span>💳 Credit / Debit Card</span>
              </button>
              <button class="pay-tab" data-method="netbanking" onclick="switchPaymentMethod('netbanking')">
                <span>🏦 NetBanking</span>
              </button>
            </div>

            <!-- UPI Payment Form -->
            <div id="pay-panel-upi" class="pay-panel active">
              <div class="upi-box">
                <div class="upi-input-wrap">
                  <label>Enter UPI ID (VPA)</label>
                  <div class="input-with-button">
                    <input type="text" id="upi-id-input" placeholder="e.g. yourname@okhdfcbank" value="traveler@upi">
                    <button class="btn btn-sm btn-outline" type="button" onclick="window.state.showToast('UPI ID verified! ✓')">Verify</button>
                  </div>
                </div>
                <div class="upi-qr-sim">
                  <div class="qr-mock-code">
                    <div class="qr-pattern"></div>
                    <span class="qr-label">Scan with any UPI App</span>
                  </div>
                  <div class="upi-apps-icons">
                    <span class="upi-badge">GPay</span>
                    <span class="upi-badge">PhonePe</span>
                    <span class="upi-badge">Paytm</span>
                    <span class="upi-badge">BHIM</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Payment Form -->
            <div id="pay-panel-card" class="pay-panel">
              <div class="card-inputs-grid">
                <div class="form-group full-width">
                  <label>Card Number</label>
                  <input type="text" class="form-control" placeholder="4111 2222 3333 4444" value="4111 2222 3333 4444">
                </div>
                <div class="form-group">
                  <label>Expiry Date</label>
                  <input type="text" class="form-control" placeholder="MM/YY" value="12/28">
                </div>
                <div class="form-group">
                  <label>CVV / CVC</label>
                  <input type="password" class="form-control" placeholder="123" maxlength="4" value="889">
                </div>
                <div class="form-group full-width">
                  <label>Cardholder Name</label>
                  <input type="text" class="form-control" placeholder="Full name on card" value="${currentUser.full_name}">
                </div>
              </div>
            </div>

            <!-- NetBanking Form -->
            <div id="pay-panel-netbanking" class="pay-panel">
              <label>Select Bank</label>
              <select class="form-control select-input mb-3">
                <option value="HDFC">HDFC Bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
                <option value="Kotak">Kotak Mahindra Bank</option>
              </select>
              <p class="text-muted small">You will be securely redirected to your bank's test authorization simulator.</p>
            </div>
          </div>
        </div>

        <!-- RIGHT: FARE BREAKDOWN & COUPONS -->
        <aside class="checkout-sidebar-column">
          <div class="fare-summary-card">
            <h3 class="fare-card-title">Price Breakdown</h3>
            
            <div class="fare-rows-list">
              <div class="fare-row">
                <span>Base Fare / Accommodation</span>
                <span>${window.state.formatPrice(checkoutDraft.base_amount)}</span>
              </div>
              <div class="fare-row">
                <span>Taxes, GST & Service Charges (18%)</span>
                <span>${window.state.formatPrice(checkoutDraft.tax_amount)}</span>
              </div>
              <div class="fare-row" id="row-addons" style="display: none;">
                <span>Value Add-ons</span>
                <span id="addons-price-display">₹0</span>
              </div>
              <div class="fare-row discount-row" id="row-discount" style="display: none;">
                <span id="discount-label">Coupon Discount</span>
                <span id="discount-amount-display">- ₹0</span>
              </div>
            </div>

            <hr class="fare-divider">

            <div class="fare-total-row">
              <span class="total-label">Total Payable:</span>
              <span class="total-amount" id="final-payable-amount">${window.state.formatPrice(checkoutDraft.total_amount)}</span>
            </div>

            <!-- Promo Code Box -->
            <div class="promo-code-card">
              <label for="promo-input">Have a Promo Code?</label>
              <div class="promo-input-group">
                <input type="text" id="promo-input" placeholder="e.g. WANDER20" value="WANDER20">
                <button type="button" class="btn btn-outline-dark" onclick="applyCheckoutCoupon()">Apply</button>
              </div>
              <span id="promo-status-msg" class="promo-msg"></span>
              
              <div class="quick-coupons-suggest">
                <span class="quick-cpn-tag" onclick="document.getElementById('promo-input').value='WANDER20'; applyCheckoutCoupon();">WANDER20 (20% OFF)</span>
                <span class="quick-cpn-tag" onclick="document.getElementById('promo-input').value='WELCOME500'; applyCheckoutCoupon();">WELCOME500 (₹500 OFF)</span>
              </div>
            </div>

            <!-- Confirm & Pay CTA -->
            <button class="btn btn-primary btn-block btn-pay-now" id="btn-confirm-pay" onclick="executeSimulatedBooking()">
              <span>🔒 Confirm & Pay ${window.state.formatPrice(checkoutDraft.total_amount)}</span>
            </button>

            <div class="safe-checkout-note">
              <span>🛡️ 256-bit Encrypted SSL Payment</span>
              <span>• Instant E-Voucher</span>
            </div>
          </div>
        </aside>
      </div>

      <!-- VOUCHER CONTAINER MODAL ROOT (Populated upon confirmation) -->
      <div id="voucher-overlay" class="voucher-overlay hidden"></div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// INTERACTION & CALCULATION LOGIC
// ----------------------------------------------------------------------------
window.switchPaymentMethod = function(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-method') === method));
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.toggle('active', p.id === `pay-panel-${method}`));
};

window.toggleAddOn = function(type, price) {
  const isChecked = document.getElementById(type === 'insurance' ? 'addon-ins' : 'addon-cab')?.checked;
  addOnsSelected[type] = isChecked;
  recalculateFinalPrice();
};

window.applyCheckoutCoupon = async function() {
  const code = document.getElementById('promo-input')?.value.trim();
  const statusMsg = document.getElementById('promo-status-msg');
  if (!code) return;

  const result = await window.db.validateCoupon(code, checkoutDraft.base_amount, checkoutDraft.booking_type);
  if (result.valid) {
    appliedDiscount = result.discount_amount;
    appliedCouponCode = code.toUpperCase();
    statusMsg.className = "promo-msg success";
    statusMsg.textContent = `✓ ${result.message}`;
    window.state.showToast(`Coupon ${code} applied successfully! 🎉`);
  } else {
    appliedDiscount = 0;
    appliedCouponCode = '';
    statusMsg.className = "promo-msg error";
    statusMsg.textContent = `✕ ${result.message}`;
    window.state.showToast(result.message, 'error');
  }
  recalculateFinalPrice();
};

function recalculateFinalPrice() {
  let addOnsTotal = 0;
  if (addOnsSelected.insurance) addOnsTotal += 249;
  if (addOnsSelected.airportCab) addOnsTotal += 799;

  const rowAddons = document.getElementById('row-addons');
  const addonsPriceDisplay = document.getElementById('addons-price-display');
  if (rowAddons && addonsPriceDisplay) {
    if (addOnsTotal > 0) {
      rowAddons.style.display = 'flex';
      addonsPriceDisplay.textContent = window.state.formatPrice(addOnsTotal);
    } else {
      rowAddons.style.display = 'none';
    }
  }

  const rowDiscount = document.getElementById('row-discount');
  const discountDisplay = document.getElementById('discount-amount-display');
  const discountLabel = document.getElementById('discount-label');
  if (rowDiscount && discountDisplay) {
    if (appliedDiscount > 0) {
      rowDiscount.style.display = 'flex';
      discountLabel.textContent = `Coupon (${appliedCouponCode})`;
      discountDisplay.textContent = `- ${window.state.formatPrice(appliedDiscount)}`;
    } else {
      rowDiscount.style.display = 'none';
    }
  }

  const newTotal = Math.max(0, checkoutDraft.base_amount + checkoutDraft.tax_amount + addOnsTotal - appliedDiscount);
  const totalDisplay = document.getElementById('final-payable-amount');
  const payBtn = document.getElementById('btn-confirm-pay');

  if (totalDisplay) totalDisplay.textContent = window.state.formatPrice(newTotal);
  if (payBtn) payBtn.innerHTML = `<span>🔒 Confirm & Pay ${window.state.formatPrice(newTotal)}</span>`;

  checkoutDraft.total_amount = newTotal;
  checkoutDraft.discount_amount = appliedDiscount;
}

window.executeSimulatedBooking = async function() {
  const name = document.getElementById('trav-name')?.value.trim();
  const email = document.getElementById('trav-email')?.value.trim();
  const phone = document.getElementById('trav-phone')?.value.trim();
  const requests = document.getElementById('trav-requests')?.value.trim() || '';

  if (!name || !email || !phone) {
    window.state.showToast('Please fill all required traveler information fields', 'error');
    return;
  }

  const btn = document.getElementById('btn-confirm-pay');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="wy-spinner-sm"></span> Authorizing Payment...`;
  }

  // 1-second realistic payment gateway authorization
  setTimeout(async () => {
    try {
      const currentUser = window.state.currentUser;
      const bookingPayload = {
        user_id: currentUser ? currentUser.id : "usr-traveler",
        booking_type: checkoutDraft.booking_type,
        item_id: checkoutDraft.item_id,
        item_title: checkoutDraft.item_title,
        item_subtitle: checkoutDraft.item_subtitle,
        booking_details: checkoutDraft.booking_details,
        traveler_info: {
          name,
          email,
          phone,
          special_requests: requests,
          add_ons: addOnsSelected
        },
        base_amount: checkoutDraft.base_amount,
        tax_amount: checkoutDraft.tax_amount,
        discount_amount: appliedDiscount,
        total_amount: checkoutDraft.total_amount,
        coupon_code: appliedCouponCode || null,
        payment_method: selectedPaymentMethod,
        booking_status: 'confirmed'
      };

      const createdBooking = await window.db.createBooking(bookingPayload);
      window.state.clearBookingDraft();

      // Trigger Confetti Celebration
      showBookingSuccessVoucher(createdBooking);
    } catch (e) {
      console.error(e);
      window.state.showToast('Payment processing error: ' + e.message, 'error');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Retry Payment';
      }
    }
  }, 1000);
};

function showBookingSuccessVoucher(booking) {
  const overlay = document.getElementById('voucher-overlay');
  if (!overlay) return;

  overlay.classList.remove('hidden');
  overlay.innerHTML = `
    <div class="voucher-card">
      <div class="voucher-success-header">
        <div class="success-icon-wrap">✓</div>
        <h2>Booking Confirmed & Paid!</h2>
        <p>A confirmation email and SMS with your e-ticket has been sent to <strong>${booking.traveler_info.email}</strong>.</p>
      </div>

      <!-- E-TICKET VOUCHER DESIGN -->
      <div class="e-ticket-box" id="printable-e-ticket">
        <div class="ticket-top">
          <div class="ticket-brand">
            <span class="ticket-logo">Tourism and Hospitality</span>
            <span class="ticket-type-badge">${booking.booking_type.toUpperCase()} E-TICKET</span>
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
              <span class="info-val">${booking.traveler_info.name}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Contact</span>
              <span class="info-val">${booking.traveler_info.phone}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Payment Method</span>
              <span class="info-val">${booking.payment_method.toUpperCase()} (TXN: ${booking.payment_transaction_id})</span>
            </div>
            <div class="info-block">
              <span class="info-label">Total Amount Paid</span>
              <span class="info-val text-green">${window.state.formatPrice(booking.total_amount)}</span>
            </div>
          </div>

          <div class="ticket-barcode-row">
            <div class="barcode-visual">
              <div class="barcode-lines"></div>
              <span>${booking.booking_reference} • VERIFIED IRCTC & AIRLINE PNR</span>
            </div>
            <div class="qr-box-small">
              <span>SCAN E-TICKET</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTIONS -->
      <div class="voucher-actions-row">
        <button class="btn btn-primary" onclick="window.print()">
          🖨️ Print / Download E-Ticket
        </button>
        <button class="btn btn-secondary" onclick="window.router.navigate('/my-bookings')">
          View in My Bookings →
        </button>
        <button class="btn btn-outline" onclick="window.router.navigate('/')">
          Plan Another Trip
        </button>
      </div>
    </div>
  `;
}
