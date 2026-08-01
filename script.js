// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.textContent = '☰';
    });
  });
}

// ===== Auto-close mobile menu on resize =====
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks) {
    navLinks.classList.remove('open');
    if (menuToggle) menuToggle.textContent = '☰';
  }
});

// ===== Year in Footer =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Send form to WhatsApp =====
function sendForm(form, subject) {
  const formData = new FormData(form);
  let lines = [`📋 ${subject}`, ''];
  formData.forEach((value, key) => {
    if (value && value.trim()) {
      const label = form.querySelector(`label[for="${key}"]`)?.textContent || key;
      lines.push(`▸ ${label}: ${value}`);
    }
  });
  const text = lines.join('\n');
  const phone = '989010040035'; // بدون صفر ابتدا
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  return false;
}

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .step, .benefit, .product, .stat').forEach(el => {
  observer.observe(el);
});
