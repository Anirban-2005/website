// Lenis smooth scroll + GSAP sync
(function () {
  if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return;
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });
  window.__lenis = lenis;

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', () => { if (window.ScrollTrigger) ScrollTrigger.update(); });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -20, duration: 1.2 });
      }
    });
  });
})();
