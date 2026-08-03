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

// ===== تابع ارسال از طریق واتس‌اپ (با گرفتن id فرم) =====
function sendWhatsApp(formId, subject) {
  const form = document.getElementById(formId);
  if (!form) {
    alert('خطا: فرم یافت نشد!');
    return false;
  }
  const formData = new FormData(form);
  let lines = [`📋 ${subject}`, ''];
  formData.forEach((value, key) => {
    if (value && value.trim()) {
      const label = form.querySelector(`label[for="${key}"]`)?.textContent || key;
      lines.push(`▸ ${label}: ${value}`);
    }
  });
  const text = lines.join('\n');
  const phone = '989010040035';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  return false;
}

// ===== تابع ارسال از طریق پیامک (با گرفتن id فرم) =====
function sendSMS(formId, subject) {
  const form = document.getElementById(formId);
  if (!form) {
    alert('خطا: فرم یافت نشد!');
    return false;
  }
  const formData = new FormData(form);
  let lines = [`📋 ${subject}`, ''];
  formData.forEach((value, key) => {
    if (value && value.trim()) {
      const label = form.querySelector(`label[for="${key}"]`)?.textContent || key;
      lines.push(`▸ ${label}: ${value}`);
    }
  });
  const text = lines.join('\n');
  // شماره با کد کشور ۰۰۹۸
  const phone = '00989010040035';
  const url = `sms:${phone}?body=${encodeURIComponent(text)}`;
  
  // روش مطمئن: هم location.href و هم fallback
  try {
    window.location.href = url;
  } catch(e) {
    window.open(url, '_blank');
  }
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
