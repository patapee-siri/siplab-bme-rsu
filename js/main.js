// ═══ SIPLAB BME RSU — Main JavaScript ═══

// ── Navbar scroll shadow ──
const mainNav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (mainNav) {
    mainNav.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(0,0,0,.3)'
      : 'none';
  }
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ── Counter animation ──
function animateCounter(el, target, duration = 1800) {
  const start = parseInt(el.textContent) || 0;
  const startTime = performance.now();
  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * ease);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// ── Intersection Observer for counters + fade-up ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    // counter
    if (el.dataset.target !== undefined) {
      animateCounter(el, parseInt(el.dataset.target));
    }

    // fade-up
    if (el.classList.contains('fade-up')) {
      el.classList.add('visible');
    }

    observer.unobserve(el);
  });
}, { threshold: 0.2 });

// Observe all counter elements
document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  a.classList.toggle('active', href === currentPage);
});

// ── Spinner (if present) ──
window.addEventListener('load', () => {
  const spinner = document.getElementById('spinner');
  if (spinner) spinner.style.display = 'none';
});
