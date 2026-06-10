/* SOBRE.JS — animação de entrada dos cards */

// Intersection Observer para revelar os cards ao rolar
const cards = document.querySelectorAll('.sobre-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

cards.forEach((card) => observer.observe(card));
