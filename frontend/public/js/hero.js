// Hero animations: word reveal, typing, tilt, counters
(function () {
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    requestAnimationFrame(() => {
      const words = heroTitle.querySelectorAll('.word');
      if (window.gsap) {
        gsap.set(words, { yPercent: 110 });
        gsap.to(words, {
          yPercent: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.06,
          delay: 0.25,
          onStart: () => heroTitle.classList.add('is-in'),
        });
      } else {
        heroTitle.classList.add('is-in');
      }
    });
  }

  // Typing effect
  const typeEl = document.querySelector('.hero__type');
  if (typeEl) {
    let strings = [];
    try { strings = JSON.parse(typeEl.dataset.strings || '[]'); } catch { strings = []; }
    if (strings.length) {
      let idx = 0, ch = 0, deleting = false;
      const tick = () => {
        const current = strings[idx];
        if (!deleting) {
          ch++;
          typeEl.textContent = current.slice(0, ch);
          if (ch === current.length) { deleting = true; setTimeout(tick, 1400); return; }
          setTimeout(tick, 55 + Math.random() * 40);
        } else {
          ch--;
          typeEl.textContent = current.slice(0, ch);
          if (ch === 0) { deleting = false; idx = (idx + 1) % strings.length; setTimeout(tick, 220); return; }
          setTimeout(tick, 24);
        }
      };
      setTimeout(tick, 1400);
    }
  }

  // 3D tilt
  document.querySelectorAll('.tilt').forEach((el) => {
    let raf;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-4px)`;
      });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // Counters
  const counters = document.querySelectorAll('[data-count]');
  const format = (v, decimals) => decimals ? v.toFixed(decimals) : Math.round(v).toString();
  const runCounter = (el) => {
    const to = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1500;
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(to * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  counters.forEach((c) => io.observe(c));
})();
