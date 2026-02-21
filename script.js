const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const topBtn = document.getElementById("topBtn");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const projectCards = document.querySelectorAll(".project-card");
const profilePhoto = document.querySelector(".profile-photo");

if (profilePhoto) {
    profilePhoto.addEventListener("error", () => {
        profilePhoto.src =
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><rect width='100%25' height='100%25' fill='%23073e89'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-size='56' font-weight='700' fill='%23ffffff'>SP</text></svg>";
    });
}

revealItems.forEach((item, index) => {
    const delay = Math.min(index * 90, 420);
    item.style.animationDelay = `${delay}ms`;
});

function toggleMenu() {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

function handleScrollButton() {
    if (window.scrollY > 280) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
}

window.addEventListener("scroll", handleScrollButton);

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const id = entry.target.getAttribute("id");
            navAnchors.forEach((link) => {
                const active = link.getAttribute("href") === `#${id}`;
                link.classList.toggle("active", active);
            });
        });
    },
    { threshold: 0.55 }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill all fields.";
            formStatus.style.color = "#c61b2a";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formStatus.textContent = "Please enter a valid email address.";
            formStatus.style.color = "#c61b2a";
            return;
        }

        formStatus.textContent = "Message sent successfully. I will get back to you soon.";
        formStatus.style.color = "#0a7b60";
        contactForm.reset();
    });
}

projectCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        if (window.matchMedia("(hover: none)").matches) {
            return;
        }

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const translateX = (x - centerX) / 24;
        const translateY = (y - centerY) / 24;

        card.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

handleScrollButton();
