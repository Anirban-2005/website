# Protyasha Pahari — Personal Brand Portfolio

## Original Problem Statement
Build a world-class personal portfolio for Protyasha Pahari (AI/ML Engineer, KIIT student) using **vanilla HTML/CSS/JS + Three.js + GSAP + ScrollTrigger + Lenis + SplitType**. Feel: Apple / OpenAI / Stripe / Linear / Framer. Dark futuristic theme, glassmorphism, neural-network background, custom cursor, cinematic typography.

## Architecture
- Vanilla portfolio lives entirely in `/app/frontend/public/`
- CRA React shell (`App.js`) renders `null`; React's `#root` div is hidden
- Portfolio HTML is included directly in `public/index.html` (outside `#root`)
- CDN libraries: Three.js 0.160, GSAP 3.12.5, ScrollTrigger, Lenis 1.0.42, SplitType 0.3.4
- Google fonts: Manrope (sans), Instrument Serif (display), JetBrains Mono (mono)

## File Structure
```
/app/frontend/public/
├── index.html                (full portfolio DOM)
├── css/  style, navbar, hero, about, skills, projects,
│        achievements, education, contact, animations
├── js/   main, hero, cursor, network, animations, projects, scroll
└── assets/  images/, resume.pdf
```

## Sections Implemented
1. Hero — animated word reveal, typing effect, floating glass profile card, animated counters, CTAs
2. About — Apple-style storytelling with animated stat cards
3. Experience — 3 glass cards: IEEE SPS, USC KIIT, NSS Lakshya
4. Skills — floating bubble cloud (no progress bars), 4 categories with legend
5. Projects — 5 projects with premium SVG mockups (RPA dashboard, phone/news, radar, parking grid, RC car)
6. Certifications — 6 glass cards (Summer Analytics 2025, SIH, CodeSprint, Automatrix, Asteroid Search, UiPath)
7. Education — KIIT B.Tech ECS, 8.33 CGPA (school hidden per brief)
8. Contact — futuristic glass form with animated success + direct channels

## Interactions
- Custom glowing orb cursor with particle trail + magnetic hover
- Glass navbar (transparent → glass on scroll, animated underlines, mobile burger)
- 3D tilt on glass cards
- Word/char reveal via SplitType + GSAP
- Lenis smooth scroll with GSAP ticker sync
- ScrollTrigger + IntersectionObserver batched fade-ups
- SVG project mockups with parallax scroll

## Background
GPU-accelerated Three.js scene: ~1600 additive Points (sprite-textured), ~1400 line-segment connections, 60 additive pulse Points travelling along links. Camera parallax on mouse + scroll. 60 FPS target.

## Next Action Items
- Replace placeholder `resume.pdf` with the real file when available
- Wire the contact form to a backend or email service (currently client-side only)
- Add real GitHub/Live Demo URLs per project once repos are public
