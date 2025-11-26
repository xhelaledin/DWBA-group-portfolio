export function initContactSection() {
  const guestView = document.getElementById("contact-guest-view");
  const memberView = document.getElementById("contact-member-view");
  const contactLoginTrigger = document.getElementById("contact-login-trigger");
  const contactForm = document.getElementById("contact-form");
  const usernameDisplay = document.getElementById("contact-username");

  // 1. Check Auth Status
  const storedUser = localStorage.getItem("loggedInUser");

  if (storedUser) {
    // --- Logged In ---
    if (guestView) guestView.style.display = "none";
    if (memberView) memberView.style.display = "block";

    // Display the email/username in the greeting
    if (usernameDisplay) {
      usernameDisplay.textContent = storedUser.split("@")[0];
    }
  } else {
    // --- Guest (Not Logged In) ---
    if (guestView) guestView.style.display = "block";
    if (memberView) memberView.style.display = "none";

    if (contactLoginTrigger) {
      contactLoginTrigger.addEventListener("click", () => {
        const overlay = document.getElementById("login-overlay");
        if (overlay) {
          overlay.classList.add("open");
        }
      });
    }
  }

  // 2. Handle "Fake" Sending
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const subject = document.getElementById("msg-subject").value;
      const content = document.getElementById("msg-content").value;

      if (subject && content) {
        alert(
          "Message sent successfully!\n\nWe will reply to " +
            storedUser +
            " shortly."
        );
        contactForm.reset();
      }
    });
  }
}
