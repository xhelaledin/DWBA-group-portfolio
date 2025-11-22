import { loadHeaderAndHero } from "./header.js";
import { initContactSection } from "./contact.js";

// Load header first (creates the login overlay)
loadHeaderAndHero();

// Then initialize specific page logic
document.addEventListener("DOMContentLoaded", () => {
  // Init contact section if it exists on the page
  if (document.querySelector(".contact-section")) {
    initContactSection();
  }
});