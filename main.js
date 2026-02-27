// Cursor
const dot  = document.getElementById('cd');
const ring = document.getElementById('cr');
if (dot && ring) {
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';  dot.style.top  = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';  ring.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '48px'; ring.style.height = '48px'; ring.style.borderColor = 'rgba(15,32,96,.65)'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '30px'; ring.style.height = '30px'; ring.style.borderColor = 'rgba(15,32,96,.4)'; });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
}

// Active nav
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});
