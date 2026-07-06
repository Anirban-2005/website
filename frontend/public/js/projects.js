// Projects: generate premium SVG mockups + parallax
(function () {
  const mockups = {
    dashboard: () => `
      <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#5B8CFF"/><stop offset="1" stop-color="#00E5FF"/>
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#8B5CF6" stop-opacity=".9"/><stop offset="1" stop-color="#5B8CFF" stop-opacity=".2"/>
          </linearGradient>
        </defs>
        <!-- laptop chassis -->
        <rect x="50" y="60" width="500" height="300" rx="14" fill="#0a1130" stroke="#1e2b55" stroke-width="1.5"/>
        <rect x="60" y="70" width="480" height="280" rx="8" fill="#050a1e"/>
        <!-- toolbar -->
        <circle cx="76" cy="86" r="4" fill="#ff5f57"/><circle cx="90" cy="86" r="4" fill="#febc2e"/><circle cx="104" cy="86" r="4" fill="#28c840"/>
        <rect x="120" y="82" width="220" height="8" rx="4" fill="#1a2447"/>
        <!-- sidebar -->
        <rect x="72" y="108" width="90" height="230" rx="8" fill="#0d1533"/>
        <rect x="82" y="120" width="70" height="10" rx="4" fill="url(#g1)" opacity=".9"/>
        <rect x="82" y="140" width="50" height="6" rx="3" fill="#1e2b55"/>
        <rect x="82" y="154" width="60" height="6" rx="3" fill="#1e2b55"/>
        <rect x="82" y="168" width="45" height="6" rx="3" fill="#1e2b55"/>
        <!-- stats cards -->
        <g>
          <rect x="176" y="108" width="112" height="70" rx="8" fill="#0d1533"/>
          <text x="184" y="132" fill="#8fa3d1" font-family="monospace" font-size="9">SESSIONS</text>
          <text x="184" y="160" fill="#fff" font-family="serif" font-size="22">12,842</text>
          <rect x="296" y="108" width="112" height="70" rx="8" fill="#0d1533"/>
          <text x="304" y="132" fill="#8fa3d1" font-family="monospace" font-size="9">POSTS</text>
          <text x="304" y="160" fill="#00E5FF" font-family="serif" font-size="22">3,410</text>
          <rect x="416" y="108" width="112" height="70" rx="8" fill="#0d1533"/>
          <text x="424" y="132" fill="#8fa3d1" font-family="monospace" font-size="9">ENGAGE</text>
          <text x="424" y="160" fill="#8B5CF6" font-family="serif" font-size="22">86.2%</text>
        </g>
        <!-- chart -->
        <rect x="176" y="188" width="352" height="150" rx="8" fill="#0d1533"/>
        <path d="M 190 300 Q 240 260 280 270 T 360 240 T 440 220 T 520 200" stroke="url(#g1)" stroke-width="2.4" fill="none"/>
        <path d="M 190 300 Q 240 260 280 270 T 360 240 T 440 220 T 520 200 L 520 330 L 190 330 Z" fill="url(#g2)" opacity=".35"/>
        <circle cx="360" cy="240" r="4" fill="#00E5FF"/>
      </svg>`,
    phone: () => `
      <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%">
        <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B8CFF"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs>
        <rect x="220" y="40" width="160" height="360" rx="26" fill="#050a1e" stroke="#1e2b55"/>
        <rect x="234" y="60" width="132" height="320" rx="18" fill="#0a1130"/>
        <rect x="266" y="66" width="68" height="10" rx="5" fill="#050a1e"/>
        <!-- news cards -->
        <rect x="244" y="90" width="112" height="52" rx="8" fill="#0d1533"/>
        <rect x="252" y="98" width="60" height="6" rx="3" fill="url(#pg)"/>
        <rect x="252" y="110" width="94" height="4" rx="2" fill="#1e2b55"/>
        <rect x="252" y="120" width="80" height="4" rx="2" fill="#1e2b55"/>
        <rect x="252" y="130" width="50" height="4" rx="2" fill="#1e2b55"/>
        <rect x="244" y="150" width="112" height="52" rx="8" fill="#0d1533"/>
        <rect x="252" y="158" width="70" height="6" rx="3" fill="#00E5FF"/>
        <rect x="252" y="170" width="90" height="4" rx="2" fill="#1e2b55"/>
        <rect x="252" y="180" width="86" height="4" rx="2" fill="#1e2b55"/>
        <rect x="252" y="190" width="60" height="4" rx="2" fill="#1e2b55"/>
        <rect x="244" y="210" width="112" height="52" rx="8" fill="#0d1533"/>
        <rect x="252" y="218" width="64" height="6" rx="3" fill="#8B5CF6"/>
        <rect x="252" y="230" width="90" height="4" rx="2" fill="#1e2b55"/>
        <rect x="252" y="240" width="82" height="4" rx="2" fill="#1e2b55"/>
        <rect x="252" y="250" width="70" height="4" rx="2" fill="#1e2b55"/>
        <!-- Nav bar -->
        <rect x="244" y="340" width="112" height="30" rx="8" fill="#0d1533"/>
        <circle cx="264" cy="355" r="4" fill="#00E5FF"/>
        <circle cx="300" cy="355" r="4" fill="#5B8CFF"/>
        <circle cx="336" cy="355" r="4" fill="#8B5CF6"/>
      </svg>`,
    radar: () => `
      <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%">
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0" stop-color="#00E5FF" stop-opacity=".55"/>
            <stop offset="1" stop-color="#00E5FF" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="300" cy="225" r="170" fill="url(#rg)"/>
        <circle cx="300" cy="225" r="170" fill="none" stroke="#00E5FF" stroke-opacity=".4" stroke-width="1"/>
        <circle cx="300" cy="225" r="130" fill="none" stroke="#00E5FF" stroke-opacity=".28" stroke-width="1"/>
        <circle cx="300" cy="225" r="90"  fill="none" stroke="#00E5FF" stroke-opacity=".2"  stroke-width="1"/>
        <circle cx="300" cy="225" r="50"  fill="none" stroke="#00E5FF" stroke-opacity=".15" stroke-width="1"/>
        <line x1="300" y1="55" x2="300" y2="395" stroke="#00E5FF" stroke-opacity=".18"/>
        <line x1="130" y1="225" x2="470" y2="225" stroke="#00E5FF" stroke-opacity=".18"/>
        <!-- sweep -->
        <path d="M 300 225 L 470 225 A 170 170 0 0 0 428 105 Z" fill="#00E5FF" fill-opacity=".22"/>
        <!-- targets -->
        <circle cx="360" cy="160" r="6" fill="#8B5CF6"/><circle cx="360" cy="160" r="14" fill="none" stroke="#8B5CF6" stroke-opacity=".5"/>
        <circle cx="240" cy="290" r="5" fill="#5B8CFF"/><circle cx="240" cy="290" r="12" fill="none" stroke="#5B8CFF" stroke-opacity=".5"/>
        <circle cx="400" cy="290" r="4" fill="#fff"/><circle cx="400" cy="290" r="10" fill="none" stroke="#fff" stroke-opacity=".4"/>
        <text x="300" y="60"  fill="#00E5FF" font-family="monospace" font-size="10" text-anchor="middle">0°</text>
        <text x="480" y="230" fill="#00E5FF" font-family="monospace" font-size="10">90°</text>
      </svg>`,
    parking: () => `
      <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%">
        <defs><linearGradient id="pkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B8CFF"/><stop offset="1" stop-color="#00E5FF"/></linearGradient></defs>
        <rect x="60" y="60" width="480" height="330" rx="12" fill="#0a1130" stroke="#1e2b55"/>
        <text x="80" y="90" fill="#8fa3d1" font-family="monospace" font-size="10">SMART PARKING · SECTOR A</text>
        <text x="80" y="112" fill="#fff" font-family="serif" font-size="20">Live occupancy</text>
        ${Array.from({length: 24}).map((_,i)=>{
          const col = i % 6; const row = Math.floor(i/6);
          const x = 80 + col*72; const y = 140 + row*54;
          const occupied = (i*7)%3===0;
          return `<g><rect x="${x}" y="${y}" width="62" height="42" rx="6" fill="${occupied?'#141d3f':'#0d1533'}" stroke="${occupied?'#8B5CF6':'#00E5FF'}" stroke-opacity=".55"/><circle cx="${x+52}" cy="${y+10}" r="3" fill="${occupied?'#8B5CF6':'#00E5FF'}"/></g>`;
        }).join('')}
        <rect x="80" y="360" width="80" height="16" rx="4" fill="url(#pkg)"/>
        <text x="180" y="373" fill="#cbd5e1" font-family="monospace" font-size="10">68% FREE · 32% OCCUPIED</text>
      </svg>`,
    rccar: () => `
      <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%">
        <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5B8CFF"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs>
        <path d="M 120 260 Q 180 200 260 200 L 400 200 Q 460 200 480 260 L 480 300 L 120 300 Z" fill="url(#cg)" opacity=".85"/>
        <path d="M 200 210 L 260 210 L 300 250 L 200 250 Z" fill="#0a1130" opacity=".6"/>
        <path d="M 320 210 L 380 210 L 400 250 L 300 250 Z" fill="#0a1130" opacity=".6"/>
        <circle cx="180" cy="310" r="30" fill="#050a1e" stroke="#1e2b55" stroke-width="2"/>
        <circle cx="180" cy="310" r="10" fill="#8fa3d1"/>
        <circle cx="420" cy="310" r="30" fill="#050a1e" stroke="#1e2b55" stroke-width="2"/>
        <circle cx="420" cy="310" r="10" fill="#8fa3d1"/>
        <!-- bluetooth -->
        <circle cx="490" cy="120" r="26" fill="#0d1533" stroke="#00E5FF"/>
        <path d="M 486 108 L 486 132 L 498 122 L 484 112 M 486 132 L 498 122 L 484 112" stroke="#00E5FF" stroke-width="1.6" fill="none"/>
        <path d="M 380 200 L 468 132" stroke="#00E5FF" stroke-dasharray="3 4" stroke-opacity=".7"/>
      </svg>`,
  };

  document.querySelectorAll('.project__mockup').forEach((el) => {
    const key = el.parentElement?.parentElement?.dataset.mockup;
    if (key && mockups[key]) el.innerHTML = mockups[key]();
  });

  // Parallax mockups on scroll
  if (window.gsap && window.ScrollTrigger) {
    document.querySelectorAll('.project').forEach((p) => {
      const m = p.querySelector('.project__mockup');
      if (!m) return;
      gsap.fromTo(m, { y: 60 }, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }
})();
