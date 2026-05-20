// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.querySelector('.back-to-top');
const themeToggleBtn = document.querySelector('.theme-toggle');
const contactForm = document.getElementById('contactForm');
const heroTitle = document.querySelector('.hero h1');

// Typing Effect
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  element.classList.add('typing');

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing');
    }
  }
  type();
}

// Smooth Scrolling
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  navbar.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
}

// Back to Top Visibility
function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

// Theme Toggle Mechanics
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load Theme State
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️';
  }
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Email Regex Validation Helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form Validation and Asynchronous Submission to Formspree
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Validation
  if (!data.name || !data.email || !data.message) {
    alert('Please fill in all fields.');
    return;
  }

  if (!isValidEmail(data.email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Submit via AJAX Fetch API to Formspree
  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    } else {
      alert('Oops! There was a problem submitting your form. Please try again.');
    }
  })
  .catch(error => {
    alert('Oops! There was a network connectivity problem. Please try again.');
  });
}

// Global Lifecycle Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize typing effect safely
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }

  // Setup elements for scroll visibility animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
  });

  const skillItems = document.querySelectorAll('.skills-list span');
  skillItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Theme Restoration
  loadTheme();
});

// Event Triggers
document.querySelectorAll('.navbar a, .hero-actions a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    smoothScroll(target);

    // Auto-collapse mobile tray when navigation selection occurs
    if (navbar.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
});

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

window.addEventListener('scroll', toggleBackToTop);

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Click outside helper to dismiss navigation drawer on mobile layouts
document.addEventListener('click', (e) => {
  if (navbar && mobileMenuToggle && !navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    navbar.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  }
});