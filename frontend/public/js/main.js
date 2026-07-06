// Main: loader dismissal + light global state
(function () {
  const loader = document.querySelector('.loader');
  const fill = document.querySelector('.loader__bar-fill');

  let progress = 0;
  const step = () => {
    progress = Math.min(100, progress + 3 + Math.random() * 8);
    if (fill) fill.style.width = progress + '%';
    if (progress < 100) setTimeout(step, 60);
  };
  step();

  window.addEventListener('load', () => {
    if (fill) fill.style.width = '100%';
    setTimeout(() => loader && loader.classList.add('done'), 250);
  });

  // Fail-safe dismiss
  setTimeout(() => loader && loader.classList.add('done'), 1400);
})();
