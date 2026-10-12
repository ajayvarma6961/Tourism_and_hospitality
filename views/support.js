// ============================================================================
// VIEW: CONTACT & 24/7 TRAVEL SUPPORT
// ============================================================================

async function renderSupportView() {
  const settings = await window.db.getSettings();

  return `
    <div class="wy-support-page">
      <!-- HERO -->
      <section class="wy-support-hero">
        <div class="support-hero-content">
          <span class="badge-sparkle">✦ 24/7 Traveler Helpdesk</span>
          <h1>How Can We Help Your Journey?</h1>
          <p>Whether you need to modify a reservation, inquire about flight timings, or request a refund, our dedicated concierge team is ready around the clock.</p>
        </div>
      </section>

      <!-- EMERGENCY HELPLINES -->
      <section class="wy-section">
        <div class="helpline-cards-grid">
          <div class="helpline-card">
            <span class="hl-icon">📞</span>
            <h3>Toll-Free Phone Helpline</h3>
            <p class="hl-number">${settings.support_phone || '+91 1800 200 4567'}</p>
            <span class="hl-note">Available 24 hours a day, 7 days a week</span>
          </div>

          <div class="helpline-card">
            <span class="hl-icon">✉️</span>
            <h3>Email Support Desk</h3>
            <p class="hl-number">${settings.support_email || 'support@wanderyatra.com'}</p>
            <span class="hl-note">Average response time under 15 minutes</span>
          </div>

          <div class="helpline-card">
            <span class="hl-icon">💬</span>
            <h3>WhatsApp Instant Concierge</h3>
            <p class="hl-number">+91 98765 43210</p>
            <span class="hl-note">Direct text assistance on mobile</span>
          </div>
        </div>
      </section>

      <!-- MAIN SPLIT: FAQS & CONTACT FORM -->
      <section class="wy-section bg-surface">
        <div class="support-split-grid">
          <!-- FAQS -->
          <div class="faqs-column">
            <h2 class="support-subheading">Frequently Asked Questions</h2>
            
            <div class="faq-accordion">
              <details class="faq-item" open>
                <summary class="faq-q">How do I cancel or reschedule my flight or hotel booking?</summary>
                <p class="faq-a">You can cancel your booking directly by heading to <strong>My Bookings</strong> in your top profile menu. Click "Cancel Booking" on your trip card. You will see an immediate refund calculation (standard 85% refundable), and credits will be credited to your original payment method within 3 business days.</p>
              </details>

              <details class="faq-item">
                <summary class="faq-q">Where can I download my verified E-Ticket and tax invoice?</summary>
                <p class="faq-a">Your official E-Ticket is generated immediately upon successful payment. You can access and print it anytime under <strong>My Bookings</strong> by clicking the "View E-Ticket" button.</p>
              </details>

              <details class="faq-item">
                <summary class="faq-q">Are all hotel properties on the platform verified?</summary>
                <p class="faq-a">Yes. Every listed resort, palace, and hotel undergoes comprehensive quality audits for hygiene, amenities, and security before being published on our platform.</p>
              </details>

              <details class="faq-item">
                <summary class="faq-q">What documents do I need during hotel check-in?</summary>
                <p class="faq-a">All primary guests must present an official Government-issued photo identification (such as Aadhaar card, Passport, or Driving License) along with your Tourism and Hospitality booking voucher.</p>
              </details>
            </div>
          </div>

          <!-- CONTACT FORM -->
          <div class="contact-form-column">
            <div class="contact-card">
              <h2 class="support-subheading">Send Us an Inquiry</h2>
              <p class="contact-sub">Have a custom holiday package request or need assistance? Fill the form below:</p>

              <form onsubmit="event.preventDefault(); submitSupportTicket();">
                <div class="form-group mb-3">
                  <label>Your Name *</label>
                  <input type="text" id="supp-name" class="form-control" placeholder="Enter full name" value="${window.state.currentUser?.full_name || ''}" required>
                </div>

                <div class="form-group mb-3">
                  <label>Email Address *</label>
                  <input type="email" id="supp-email" class="form-control" placeholder="name@example.com" value="${window.state.currentUser?.email || ''}" required>
                </div>

                <div class="form-group mb-3">
                  <label>Booking Reference (Optional)</label>
                  <input type="text" id="supp-ref" class="form-control" placeholder="e.g. WY-FL-89210">
                </div>

                <div class="form-group mb-3">
                  <label>Message / Details *</label>
                  <textarea id="supp-msg" class="form-control" rows="4" placeholder="How can we help you?" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Submit Support Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

window.submitSupportTicket = function() {
  const name = document.getElementById('supp-name')?.value;
  const msg = document.getElementById('supp-msg')?.value;
  if (!name || !msg) return;

  const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
  window.state.showToast(`Support Ticket #${ticketId} created! Our concierge will email you shortly. ✓`, 'success');
  document.getElementById('supp-msg').value = '';
};
