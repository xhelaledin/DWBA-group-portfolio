import { getHeaderHTML } from "./header-templates.js";

export function loadHeaderAndHero() {
  const header = document.getElementById("header");

  // Check if user is logged in
  const storedUser = localStorage.getItem("loggedInUser");
  const isLoggedIn = !!storedUser; //We want a boolean value here so we use the double negation operator [!!]

  // (header-templates.js)
  header.innerHTML = getHeaderHTML(isLoggedIn, storedUser);

  // Initialize navigation and authentication logic
  highlightActiveLink();
  initAuthLogic(isLoggedIn);
  initHamburgerMenu();
}

// Mobile responsive hamburger menu
function initHamburgerMenu() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on links or auth buttons
    const navLinks = navMenu.querySelectorAll("a");
    const authButtons = navMenu.querySelectorAll("button");

    [...navLinks, ...authButtons].forEach((element) => {
      element.addEventListener("click", () => {
        // Don't close menu when clicking login trigger (it opens modal)
        if (element.id !== "login-trigger" && element.id !== "user-avatar") {
          hamburgerBtn.classList.remove("active");
          navMenu.classList.remove("active");
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// Highlight the active navigation link based on current page
function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll("nav ul li a");
  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// Initialize authentication event listeners and logic
function initAuthLogic(isLoggedIn) {
  const overlay = document.getElementById("login-overlay");

  if (isLoggedIn) {
    initLoggedInState(overlay);
  } else {
    initLoggedOutState(overlay);
  }
}

// Handle logged-in user interactions (avatar dropdown, logout)
function initLoggedInState(overlay) {
  const avatarBtn = document.getElementById("user-avatar");
  const dropdown = document.getElementById("user-dropdown");
  const logoutBtn = document.getElementById("dropdown-logout");

  // Toggle dropdown on avatar click
  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (dropdown && dropdown.classList.contains("show")) {
      if (!dropdown.contains(e.target) && e.target !== avatarBtn) {
        dropdown.classList.remove("show");
      }
    }
  });

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.reload();
    });
  }
}

// Handle logged-out user interactions (modal, login/register forms)
function initLoggedOutState(overlay) {
  const triggerBtn = document.getElementById("login-trigger");
  const viewLogin = document.getElementById("view-login");
  const viewRegister = document.getElementById("view-register");
  const btnShowReg = document.getElementById("btn-show-register");
  const btnShowLogin = document.getElementById("btn-show-login");
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");

  // Open modal when login button is clicked
  if (triggerBtn) {
    triggerBtn.addEventListener("click", () => {
      overlay.classList.add("open");
      viewLogin.classList.remove("hidden");
      viewRegister.classList.add("hidden");
    });
  }

  // Close modal when clicking backdrop
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  }

  // Switch to register view
  if (btnShowReg) {
    btnShowReg.addEventListener("click", () => {
      viewLogin.classList.add("hidden");
      viewRegister.classList.remove("hidden");
    });
  }

  // Switch to login view
  if (btnShowLogin) {
    btnShowLogin.addEventListener("click", (e) => {
      e.preventDefault();
      viewRegister.classList.add("hidden");
      viewLogin.classList.remove("hidden");
    });
  }

  // Handle login form submission
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      validateAndLogin(email, password, overlay);
    });
  }

  // Handle register form submission
  if (formRegister) {
    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-pass").value;
      validateAndLogin(email, password, overlay);
    });
  }
}

// Validate password and perform login
function validateAndLogin(email, password, overlay) {
  let capitalCount = 0;
  let digitCount = 0;
  let specialCount = 0;

  // Count character types in password
  for (let ch of password) {
    if (ch >= "A" && ch <= "Z") {
      capitalCount++;
    } else if (ch >= "0" && ch <= "9") {
      digitCount++;
    } else if (ch >= "a" && ch <= "z") {
      // lowercase letter, skip
    } else {
      specialCount++;
    }
  }

  // Validate password requirements
  const isValid =
    password.length >= 8 &&
    capitalCount >= 2 &&
    digitCount >= 1 &&
    specialCount >= 1;

  if (isValid) {
    localStorage.setItem("loggedInUser", email);
    overlay.classList.remove("open");
    alert("Welcome, " + email + "!");
    window.location.reload();
  } else {
    alert(
      "Password invalid! Requirements:\n- 8+ chars\n- 2 uppercase\n- 1 digit\n- 1 special char"
    );
  }
}
