// ============================================================================
// VIEW: AUTHENTICATION (Login, Registration, 1-Click Demo Accounts & Supabase Config)
// ============================================================================

async function renderAuthView() {
  const currentUser = window.state.currentUser;

  return `
    <div class="wy-auth-page">
      <div class="auth-card-wrapper">
        <!-- BRAND HEADER -->
        <div class="auth-brand-header">
          <span class="auth-logo">Tourism and Hospitality</span>
          <h2>Welcome to Premium Travel</h2>
          <p>Sign in to manage your bookings, save dream stays, and unlock exclusive member discounts.</p>
        </div>

        ${currentUser ? `
          <div class="logged-in-box">
            <img src="${currentUser.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" class="logged-avatar" alt="Avatar">
            <h3>Currently signed in as ${currentUser.full_name}</h3>
            <p>${currentUser.email} • Role: <strong>${currentUser.role.toUpperCase()}</strong></p>

            <div class="auth-btn-group">
              <button class="btn btn-primary" onclick="window.router.navigate('/dashboard')">Go to User Dashboard</button>
              ${currentUser.role === 'hotel_owner' ? `<button class="btn btn-secondary" onclick="window.router.navigate('/owner')">Hotel Owner Portal</button>` : ''}
              ${currentUser.role === 'admin' ? `<button class="btn btn-secondary" onclick="window.router.navigate('/admin')">Admin Control Panel</button>` : ''}
              <button class="btn btn-outline" onclick="window.state.logout(); renderAuthView();">Sign Out</button>
            </div>
          </div>
        ` : `
          <!-- TABS: LOGIN / REGISTER -->
          <div class="auth-tabs-row">
            <button class="auth-tab active" id="tab-btn-login" onclick="switchAuthTab('login')">Sign In</button>
            <button class="auth-tab" id="tab-btn-register" onclick="switchAuthTab('register')">Create Account</button>
          </div>

          <!-- 1-CLICK DEMO ACCOUNTS STRIP -->
          <div class="demo-accounts-strip">
            <span class="demo-title">⚡ Instant 1-Click Test Logins:</span>
            <div class="demo-btn-group">
              <button class="demo-chip-btn" onclick="quickDemoLogin('traveler@wanderyatra.com', 'traveler123')">
                👤 Traveler (Rahul)
              </button>
              <button class="demo-chip-btn" onclick="quickDemoLogin('owner@luxuryhotels.com', 'owner123')">
                🏨 Hotel Owner (Vikram)
              </button>
              <button class="demo-chip-btn" onclick="quickDemoLogin('admin@wanderyatra.com', 'admin123')">
                🛡️ Admin (Aparna)
              </button>
            </div>
          </div>

          <!-- LOGIN FORM -->
          <form id="auth-form-login" class="auth-form-body active" onsubmit="event.preventDefault(); submitLoginForm();">
            <div class="form-group">
              <label for="login-email">Email Address</label>
              <input type="email" id="login-email" class="form-control" placeholder="traveler@wanderyatra.com" value="traveler@wanderyatra.com" required>
            </div>
            <div class="form-group">
              <label for="login-pass">Password</label>
              <input type="password" id="login-pass" class="form-control" placeholder="••••••••" value="traveler123" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-auth-submit">Sign In to Account</button>
          </form>

          <!-- REGISTRATION FORM -->
          <form id="auth-form-register" class="auth-form-body" onsubmit="event.preventDefault(); submitRegisterForm();">
            <div class="form-group">
              <label for="reg-name">Full Name *</label>
              <input type="text" id="reg-name" class="form-control" placeholder="e.g. Ananya Sharma" required>
            </div>
            <div class="form-group">
              <label for="reg-email">Email Address *</label>
              <input type="email" id="reg-email" class="form-control" placeholder="ananya@example.com" required>
            </div>
            <div class="form-group">
              <label for="reg-phone">Phone Number</label>
              <input type="tel" id="reg-phone" class="form-control" placeholder="+91 98765 00000">
            </div>
            <div class="form-group">
              <label for="reg-pass">Password *</label>
              <input type="password" id="reg-pass" class="form-control" placeholder="Create strong password" required>
            </div>
            <div class="form-group">
              <label for="reg-role">Account Type</label>
              <select id="reg-role" class="form-control select-input">
                <option value="traveler" selected>Traveler (Book holidays, flights, hotels)</option>
                <option value="hotel_owner">Hotel & Property Owner (List your hotels & resorts)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-auth-submit">Create Free Account</button>
          </form>
        `}

        <!-- SUPABASE CLOUD CONNECTION DRAWER -->
        <div class="supabase-config-card">
          <div class="supa-header">
            <span class="supa-logo">⚡ Supabase Database Connection</span>
            <span class="supa-status-tag" id="supa-status-badge">Integrated & Active</span>
          </div>
          <p class="supa-desc">The application uses Supabase PostgreSQL database architecture with local high-performance fallback persistence. You can optionally connect your live Supabase Project:</p>
          <div class="supa-inputs">
            <input type="text" id="supa-url-input" class="form-control form-control-sm mb-2" placeholder="https://xyzcompany.supabase.co" value="${window.db.getSupabaseConfig()?.url || ''}">
            <input type="password" id="supa-key-input" class="form-control form-control-sm mb-2" placeholder="anon key..." value="${window.db.getSupabaseConfig()?.key || ''}">
            <div class="supa-actions">
              <button class="btn btn-sm btn-outline-dark" onclick="saveSupabaseSettings()">Save Supabase Keys</button>
              <button class="btn btn-sm btn-outline" onclick="window.db.setSupabaseConfig(null, null); window.state.showToast('Reset to persistent browser database mode');">Reset to Default</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// AUTH INTERACTION LOGIC
// ----------------------------------------------------------------------------
window.switchAuthTab = function(tab) {
  document.getElementById('tab-btn-login')?.classList.toggle('active', tab === 'login');
  document.getElementById('tab-btn-register')?.classList.toggle('active', tab === 'register');
  document.getElementById('auth-form-login')?.classList.toggle('active', tab === 'login');
  document.getElementById('auth-form-register')?.classList.toggle('active', tab === 'register');
};

window.quickDemoLogin = async function(email, pass) {
  const user = await window.db.authenticate(email, pass);
  if (user) {
    window.state.setUser(user);
    window.state.showToast(`Logged in as ${user.full_name} (${user.role.toUpperCase()})! 🎉`);
    if (user.role === 'admin') window.router.navigate('/admin');
    else if (user.role === 'hotel_owner') window.router.navigate('/owner');
    else window.router.navigate('/dashboard');
  } else {
    window.state.showToast('Demo login credentials failed', 'error');
  }
};

window.submitLoginForm = async function() {
  const email = document.getElementById('login-email')?.value.trim();
  const pass = document.getElementById('login-pass')?.value;
  if (!email || !pass) return;

  const user = await window.db.authenticate(email, pass);
  if (user) {
    window.state.setUser(user);
    window.state.showToast(`Welcome back, ${user.full_name}! 👋`);
    if (user.role === 'admin') window.router.navigate('/admin');
    else if (user.role === 'hotel_owner') window.router.navigate('/owner');
    else window.router.navigate('/dashboard');
  } else {
    window.state.showToast('Invalid email or password. Try our 1-click demo logins above!', 'error');
  }
};

window.submitRegisterForm = async function() {
  const name = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  const phone = document.getElementById('reg-phone')?.value.trim();
  const pass = document.getElementById('reg-pass')?.value;
  const role = document.getElementById('reg-role')?.value || 'traveler';

  if (!name || !email || !pass) {
    window.state.showToast('Please fill all required fields', 'error');
    return;
  }

  try {
    const newUser = await window.db.registerUser({
      full_name: name,
      email,
      password: pass,
      phone,
      role
    });
    window.state.setUser(newUser);
    window.state.showToast(`Account created successfully! Welcome, ${newUser.full_name} 🌟`);
    if (role === 'hotel_owner') window.router.navigate('/owner');
    else window.router.navigate('/dashboard');
  } catch (err) {
    window.state.showToast(err.message, 'error');
  }
};

window.saveSupabaseSettings = function() {
  const url = document.getElementById('supa-url-input')?.value.trim();
  const key = document.getElementById('supa-key-input')?.value.trim();
  if (url && key) {
    window.db.setSupabaseConfig(url, key);
    window.state.showToast('Supabase configuration saved! Connected to cloud database.');
  } else {
    window.state.showToast('Please provide both Supabase URL and Anon Key', 'error');
  }
};
