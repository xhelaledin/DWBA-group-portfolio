// HTML Template Functions for Header Component
export function getHeaderHTML(isLoggedIn, userEmail) {
  return `
    <header>
      <h1><a href="index.html">The Albanians in Sweden</a></h1>
      <nav>
        <button class="hamburger-btn" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-menu">
          <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="members.html">Our Team</a></li>
            <li><a href="pricing.html">Pricing</a></li>
          </ul>
          
          <div id="auth-action-container" class="nav-auth">
            ${isLoggedIn ? getAvatarHTML(userEmail) : getLoginButtonHTML()}
          </div>
        </div>
      </nav>
    </header>
    ${getModalHTML()}
  `;
}

function getModalHTML() {
  return `
    <div id="login-overlay" class="modal-overlay">
      <div class="login-modal">
        ${getLoginViewHTML()}
        ${getRegisterViewHTML()}
      </div>
    </div>
  `;
}

function getLoginViewHTML() {
  return `
    <div id="view-login" class="auth-view">
      <div class="auth-icon-container">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>
      <div>
        <h2>Welcome Back</h2>
        <p class="auth-subtitle">
          Sign in to access your account.
        </p>
      </div>
      <form id="form-login" class="modal-form">
        <input type="email" id="login-email" class="modal-input" placeholder="Email Address" required />
        <input type="password" id="login-password" class="modal-input" placeholder="Password" required />
        <button type="submit" class="modal-btn">Sign In</button>
      </form>
      <div class="modal-footer">
        Don't have an account? <span id="btn-show-register" class="modal-link">Sign Up</span>
      </div>
    </div>
  `;
}

function getRegisterViewHTML() {
  return `
    <div id="view-register" class="auth-view hidden">
      <div class="auth-icon-container">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      </div>
      <p class="auth-subtitle auth-subtitle-left">
        Sign up to access exclusive content and benefits!
      </p>
      <form id="form-register" class="modal-form">
        <input required id="reg-email" class="modal-input" placeholder="Email" type="email" />
        <input required id="reg-username" class="modal-input" placeholder="Username" type="text" />
        <input required id="reg-pass" class="modal-input" placeholder="Password" type="password" />
        <input required id="reg-pass-confirm" class="modal-input" placeholder="Confirm Password" type="password" />
        <button class="modal-btn" type="submit">Sign Up</button>
      </form>
      <p class="auth-footer-text">
        Already have an account? <button id="btn-show-login" class="auth-link-btn">Sign In</button>
      </p>
    </div>
  `;
}

function getLoginButtonHTML() {
  return `
    <button id="login-trigger" class="login-btn-trigger">
      <div class="login-icon-circle">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
      </div>
      <span>Sign In</span>
      <svg class="login-user-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </button>
  `;
}

function getAvatarHTML(email) {
  const firstLetter = email ? email.charAt(0).toUpperCase() : "U"; // U = User
  return `
    <div class="avatar-wrapper">
      <div id="user-avatar" class="user-profile-circle" title="${email}">
        ${firstLetter}
      </div>
      ${getDropdownHTML(email)}
    </div>
  `;
}

function getDropdownHTML(email) {
  return `
    <div id="user-dropdown" class="dropdown-wrapper">
      <div class="dropdown-content">
        <div class="dropdown-item disabled">
          ${email}
          <span class="badge-pill">User</span>
        </div>
        <div class="dropdown-separator"></div>
        <div class="dropdown-item" id="dropdown-profile">
          Profile
          <span class="icon-small">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
          </span>
        </div>
        <div class="dropdown-item" id="dropdown-logout">
          Log Out
          <span class="icon-small">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  `;
}
