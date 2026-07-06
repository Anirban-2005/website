// Scroll-triggered reveals + navbar + section titles
(function () {
  const gsapAvail = typeof gsap !== 'undefined';
  const stAvail = typeof ScrollTrigger !== 'undefined';
  if (gsapAvail && stAvail) gsap.registerPlugin(ScrollTrigger);

  // Section title character reveal
  document.querySelectorAll('.reveal-lines').forEach((el) => {
    if (typeof SplitType !== 'undefined') {
      const split = new SplitType(el, { types: 'chars' });
      split.chars.forEach((c, i) => c.style.setProperty('--i', i));
    }
    if (gsapAvail && stAvail) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        onEnter: () => el.classList.add('is-in'),
      });
    } else {
      el.classList.add('is-in');
    }
  });

  // Fade-up cards
  const fadeSelectors = [
    '.hero__eyebrow', '.hero__bio', '.hero__ctas', '.hero__stats', '.hero__card',
    '.about__lead', '.about__stats li', '.exp__card', '.bubble', '.skills__legend',
    '.project', '.cert', '.edu__card', '.contact__form', '.contact__side',
  ];
  document.querySelectorAll(fadeSelectors.join(', ')).forEach((el) => el.classList.add('fade-up'));

  // Use IntersectionObserver for reliable reveal (works for items in-view on load)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.fade-up').forEach((e) => io.observe(e));

  // Navbar glass on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-glass');
    else nav.classList.remove('is-glass');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Nav active link
  const links = document.querySelectorAll('.nav__link');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => secObserver.observe(s));

  // Nav mobile
  const burger = document.querySelector('.nav__burger');
  if (burger) burger.addEventListener('click', () => nav.classList.toggle('is-open'));
  document.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('is-open')));

  // Contact form
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('is-sent');
      setTimeout(() => form.reset(), 300);
    });
  }

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
