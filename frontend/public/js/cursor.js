// Custom cursor
(function () {
  if (window.matchMedia('(max-width: 900px)').matches) return;
  const el = document.querySelector('.cursor');
  if (!el) return;
  const dot = el.querySelector('.cursor__dot');
  const ring = el.querySelector('.cursor__ring');
  const label = el.querySelector('.cursor__label');

  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let rx = x, ry = y;
  let tx = x, ty = y;

  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  window.addEventListener('mousedown', () => el.classList.add('is-click'));
  window.addEventListener('mouseup', () => el.classList.remove('is-click'));

  function loop() {
    x += (tx - x) * 0.5;
    y += (ty - y) * 0.5;
    rx += (tx - rx) * 0.14;
    ry += (ty - ry) * 0.14;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    label.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  }
  loop();

  // Hover targets
  const hoverables = 'a, button, .magnetic, .bubble, .chip, .project, .cert, input, textarea';
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest(hoverables);
    if (t) {
      el.classList.add('is-hover');
      const cursorLabel = t.getAttribute('data-cursor');
      if (cursorLabel) {
        label.textContent = cursorLabel;
        el.classList.add('is-label');
      }
      if (t.matches('.project')) el.classList.add('is-view');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target.closest(hoverables);
    if (t) {
      el.classList.remove('is-hover', 'is-label', 'is-view');
      label.textContent = '';
    }
  });

  // Magnetic effect
  document.querySelectorAll('.magnetic').forEach((m) => {
    m.addEventListener('mousemove', (e) => {
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      m.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
    });
    m.addEventListener('mouseleave', () => { m.style.transform = ''; });
  });
})();
