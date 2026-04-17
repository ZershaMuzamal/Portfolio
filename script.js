// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.querySelector('.back-to-top');
const themeToggleBtn = document.querySelector('.theme-toggle');
const contactForm = document.getElementById('contactForm');
const heroTitle = document.querySelector('.hero h1');

// Typing Effect
function typeWriter(element, text, speed = 100) {
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

// Back to Top
function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load Theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️';
  }
}

// Intersection Observer for Animations
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

// Form Validation and Submission
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (!data.name || !data.email || !data.message) {
    alert('Please fill in all fields.');
    return;
  }

  if (!isValidEmail(data.email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate form submission (in a real app, you'd send to a server)
  alert('Thank you for your message! I\'ll get back to you soon.');
  contactForm.reset();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize typing effect
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 50);

  // Add fade-in class to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Add fade-in to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
  });

  // Add stagger animation to skills
  const skillItems = document.querySelectorAll('.skills-list span');
  skillItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Load saved theme
  loadTheme();
});

// Navigation links smooth scroll
document.querySelectorAll('.navbar a, .hero-actions a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    smoothScroll(target);

    // Close mobile menu after clicking
    if (navbar.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
});

// Mobile menu toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Back to top
window.addEventListener('scroll', toggleBackToTop);
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme toggle
themeToggleBtn.addEventListener('click', toggleTheme);

// Contact form
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    navbar.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  }
});