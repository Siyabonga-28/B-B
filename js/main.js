document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MOBILE NAVIGATION
  =============================== */

  const mobileToggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".nav-links");
  const navClose = document.querySelector(".nav-close");
  const overlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-links a");

  function openMenu() {
    nav?.classList.add("active");
    overlay?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    nav?.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileToggle?.addEventListener("click", openMenu);
  navClose?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });


  /* ===============================
     ACTIVE NAV HIGHLIGHT
  =============================== */

  const sections = document.querySelectorAll("section[id]");

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);


  /* ===============================
     SMOOTH SCROLL
  =============================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* ===============================
     SCROLL TO TOP BUTTON
  =============================== */

  const scrollButton = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (!scrollButton) return;

    if (window.pageYOffset > 300) {
      scrollButton.classList.add("show");
    } else {
      scrollButton.classList.remove("show");
    }
  });

  scrollButton?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  /* ===============================
     FAQ ACCORDION
  =============================== */

  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");

    question?.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });


  /* ===============================
     CONTACT FORM
  =============================== */

  const contactForm = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      if (!data.name || !data.email || !data.message) {
        showMessage(formMsg, "Please fill in all required fields", "error");
        return;
      }

      if (!validateEmail(data.email)) {
        showMessage(formMsg, "Enter a valid email address", "error");
        return;
      }

      showMessage(formMsg, "Sending...", "info");

      setTimeout(() => {
        showMessage(formMsg, "Thank you. We will contact you shortly.", "success");
        contactForm.reset();
      }, 1500);
    });
  }


  /* ===============================
     PREPLANNING FORM
  =============================== */

  const preplanningForm = document.getElementById("preplanningForm");
  const ppFormMsg = document.getElementById("ppFormMsg");

  if (preplanningForm) {
    preplanningForm.addEventListener("submit", e => {
      e.preventDefault();

      const formData = new FormData(preplanningForm);
      const data = Object.fromEntries(formData);

      if (!data.ppName || !data.ppEmail) {
        showMessage(ppFormMsg, "Please fill in required fields", "error");
        return;
      }

      if (!validateEmail(data.ppEmail)) {
        showMessage(ppFormMsg, "Enter a valid email address", "error");
        return;
      }

      showMessage(ppFormMsg, "Sending...", "info");

      setTimeout(() => {
        showMessage(ppFormMsg, "Guide will be sent shortly.", "success");
        preplanningForm.reset();
      }, 1500);
    });
  }


  /* ===============================
     MODALS
  =============================== */

  function openModal(modal) {
    modal?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModals() {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const id = btn.getAttribute("data-modal");
      openModal(document.getElementById(id));
    });
  });

  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", closeModals);
  });

  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
      closeModals();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModals();
    }
  });


  /* ===============================
     TESTIMONIALS
  =============================== */

  const testimonials = [
    {
      text: "Exceptional care and compassion during our difficult time.",
      author: "Thabo M.",
      location: "Johannesburg",
      initials: "TM"
    },
    {
      text: "Professional and respectful throughout.",
      author: "Priya N.",
      location: "Pretoria",
      initials: "PN"
    },
    {
      text: "Highly recommended funeral service.",
      author: "David W.",
      location: "Cape Town",
      initials: "DW"
    }
  ];

  const testimonialContainer = document.getElementById("testimonialsContainer");

  if (testimonialContainer) {
    testimonialContainer.innerHTML = testimonials.map(t => `
      <div class="testimonial-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="author-initials">${t.initials}</div>
          <div>
            <h4>${t.author}</h4>
            <p>${t.location}</p>
          </div>
        </div>
      </div>
    `).join("");
  }


  /* ===============================
     UTILITIES
  =============================== */

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = "form-msg " + type;
  }

  /* ===============================
     COPYRIGHT YEAR
  =============================== */

  const year = document.getElementById("currentYear");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});