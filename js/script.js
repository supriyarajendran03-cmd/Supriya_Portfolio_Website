const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const themeToggle = document.querySelector("#themeToggle");
const navLinks = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const detailButtons = document.querySelectorAll(".details-toggle");
const contactForm = document.querySelector("#contactForm");
const formFeedback = document.querySelector("#formFeedback");

document.querySelector("#year").textContent = new Date().getFullYear();

// Mobile navigation: open and close the menu and close it after choosing a section.
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Light/dark theme toggle.
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
});

// Project category filters.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Expand/collapse the learning notes for each project.
detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const details = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    details.hidden = isExpanded;
    button.querySelector("span").textContent = isExpanded ? "＋" : "−";
  });
});

// This demo validates input and displays a local confirmation; it does not send a message.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#visitorName").value.trim();
  const message = document.querySelector("#visitorMessage").value.trim();
  if (!name || !message) {
    formFeedback.textContent = "Please complete both fields before continuing.";
    return;
  }
  formFeedback.textContent = `Thanks, ${name}! Your message was checked in this demo, but it has not been sent.`;
  contactForm.reset();
});
