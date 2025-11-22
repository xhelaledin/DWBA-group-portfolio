export function loadHeaderAndHero() {
  const header = document.getElementById("header");

  header.innerHTML = `
    <header>
      <h1><a href="index.html">The Albanians in Sweden</a></h1>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="members.html">Our Team</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="auth.html">Sign Up</a></li>
        </ul>
      </nav>
    </header>
  `;

  // Add active class
  highlightActiveLink();
}

function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop(); // e.g. "members.html"
  const links = document.querySelectorAll("nav ul li a");

  links.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

// Automatically call it (no need to import anywhere)
// loadHeaderAndHero();