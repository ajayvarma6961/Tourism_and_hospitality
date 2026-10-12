// ============================================================================
// VIEW: OFFERS & DEALS (Live travel promotional coupons & discounts)
// ============================================================================

async function renderOffersView() {
  const coupons = await window.db.getCoupons();

  return `
    <div class="wy-offers-page">
      <section class="wy-offers-hero">
        <div class="offers-hero-text">
          <span class="badge-sparkle">✦ Verified Promo Codes & Discounts</span>
          <h1>Exclusive Travel Deals & Offers</h1>
          <p>Save up to ₹4,000 on your domestic and international flights, luxury resorts, boutique homestays, and tour packages.</p>
        </div>
      </section>

      <section class="wy-section">
        <div class="offers-full-grid">
          ${coupons.map(cpn => `
            <div class="offer-big-card">
              <div class="offer-big-badge">${cpn.discount_percent}% DISCOUNT</div>
              <div class="offer-big-content">
                <div class="service-pill">${cpn.service_type.toUpperCase()} OFFERS</div>
                <h3>${cpn.title}</h3>
                <p>${cpn.description}</p>
                
                <div class="offer-terms-list">
                  <span>• Minimum spend: ${window.state.formatPrice(cpn.min_spend || 0)}</span>
                  <span>• Valid through: ${cpn.valid_until}</span>
                  ${cpn.max_discount ? `<span>• Maximum discount: ${window.state.formatPrice(cpn.max_discount)}</span>` : ''}
                </div>

                <div class="offer-action-box">
                  <div class="coupon-copy-wrap" onclick="copyCouponCode('${cpn.code}')">
                    <span class="cpn-code-bold">${cpn.code}</span>
                    <span class="cpn-click-copy">Click to Copy</span>
                  </div>
                  <button class="btn btn-primary" onclick="copyCouponCode('${cpn.code}'); window.router.navigate('/flights');">
                    Apply & Book Now
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}
