const topBtn = document.getElementById("topBtn");
const revealItems = document.querySelectorAll(".reveal-up");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const profilePhoto = document.querySelector(".profile-photo");
const portfolioNav = document.querySelector(".portfolio-nav");
const navbarMenu = document.getElementById("navbarMenu");
const navToggle = document.querySelector(".navbar-toggler");
const navLinks = document.querySelectorAll("#navbarMenu .nav-link");

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.src =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='100%25' height='100%25' rx='28' fill='%23073e89'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-size='82' font-weight='700' fill='%23ffffff'>SP</text></svg>";
  });
}

function updateNavState() {
  if (!portfolioNav) {
    return;
  }

  portfolioNav.classList.toggle("is-scrolled", window.scrollY > 20);
}

function updateTopButton() {
  if (!topBtn) {
    return;
  }

  topBtn.classList.toggle("show", window.scrollY > 320);
}

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      formStatus.textContent = "Please complete all required fields correctly.";
      formStatus.className = "form-status is-error mb-0";
      return;
    }

    contactForm.classList.add("was-validated");
    formStatus.textContent =
      "Message ready. You can connect with Sai Prasad using the contact links above.";
    formStatus.className = "form-status is-success mb-0";
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navbarMenu || !navbarMenu.classList.contains("show")) {
      return;
    }

    const collapseInstance =
      window.bootstrap && window.bootstrap.Collapse
        ? window.bootstrap.Collapse.getOrCreateInstance(navbarMenu)
        : null;

    collapseInstance?.hide();
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  updateNavState();
  updateTopButton();
});

window.addEventListener("load", () => {
  updateNavState();
  updateTopButton();
});
