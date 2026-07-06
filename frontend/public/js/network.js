// Three.js GPU-accelerated neural network background
(function () {
  const canvas = document.getElementById('neural-net');
  if (!canvas || typeof THREE === 'undefined') return;

  const DPR = Math.min(window.devicePixelRatio || 1, 1.6);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(DPR);
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 400);
  camera.position.z = 60;

  // ------- Nodes (Points with circular sprite texture) -------
  const NODE_COUNT = window.innerWidth < 800 ? 700 : 1600;
  const RANGE_X = 120;
  const RANGE_Y = 70;
  const RANGE_Z = 90;

  // Create a soft circular sprite via canvas
  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 64; spriteCanvas.height = 64;
  const sctx = spriteCanvas.getContext('2d');
  const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0.0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(200,220,255,0.9)');
  grad.addColorStop(0.6, 'rgba(120,170,255,0.25)');
  grad.addColorStop(1.0, 'rgba(120,170,255,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 64, 64);
  const spriteTex = new THREE.CanvasTexture(spriteCanvas);

  const nodeGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(NODE_COUNT * 3);
  const nodeSizes = new Float32Array(NODE_COUNT);
  const baseZ = new Float32Array(NODE_COUNT);
  const speeds = new Float32Array(NODE_COUNT);

  for (let i = 0; i < NODE_COUNT; i++) {
    const x = (Math.random() - 0.5) * RANGE_X;
    const y = (Math.random() - 0.5) * RANGE_Y;
    const z = (Math.random() - 0.5) * RANGE_Z;
    positions[i * 3 + 0] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    baseZ[i] = z;
    speeds[i] = 0.3 + Math.random() * 0.9;
    nodeSizes[i] = 0.6 + Math.random() * 1.4;
  }
  nodeGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));

  const nodeMat = new THREE.PointsMaterial({
    map: spriteTex,
    size: 0.9,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    color: 0xbfd6ff,
  });
  const nodes = new THREE.Points(nodeGeom, nodeMat);
  scene.add(nodes);

  // ------- Connections (single line segments geometry) -------
  const MAX_LINKS = 1400;
  const linkGeom = new THREE.BufferGeometry();
  const linkPositions = new Float32Array(MAX_LINKS * 6);
  const linkColors = new Float32Array(MAX_LINKS * 6);
  linkGeom.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3).setUsage(THREE.DynamicDrawUsage));
  linkGeom.setAttribute('color', new THREE.BufferAttribute(linkColors, 3).setUsage(THREE.DynamicDrawUsage));
  const linkMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending });
  const lines = new THREE.LineSegments(linkGeom, linkMat);
  scene.add(lines);

  // Precompute static links between close-ish neighbors (deterministic, cheap)
  const linkPairs = [];
  const maxDistSq = 8 * 8;
  const step = 3;
  for (let i = 0; i < NODE_COUNT && linkPairs.length < MAX_LINKS; i += step) {
    let attempts = 0;
    for (let j = i + 1; j < NODE_COUNT && attempts < 40; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dsq = dx * dx + dy * dy + dz * dz;
      if (dsq < maxDistSq) {
        linkPairs.push([i, j]);
        if (linkPairs.length >= MAX_LINKS) break;
      }
      attempts++;
    }
  }
  const LINK_COUNT = linkPairs.length;
  linkGeom.setDrawRange(0, LINK_COUNT * 2);

  // ------- Energy pulses (points) -------
  const PULSE_COUNT = 60;
  const pulseGeo = new THREE.BufferGeometry();
  const pulsePositions = new Float32Array(PULSE_COUNT * 3);
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3).setUsage(THREE.DynamicDrawUsage));
  const pulseMat = new THREE.PointsMaterial({ map: spriteTex, color: 0x00e5ff, size: 1.4, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, sizeAttenuation: true, depthWrite: false });
  const pulses = new THREE.Points(pulseGeo, pulseMat);
  scene.add(pulses);

  const pulseState = [];
  for (let i = 0; i < PULSE_COUNT; i++) {
    const linkIndex = Math.floor(Math.random() * LINK_COUNT);
    pulseState.push({ link: linkIndex, t: Math.random(), speed: 0.15 + Math.random() * 0.35 });
  }

  // Mouse
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // Resize
  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  // Loop
  const clock = new THREE.Clock();
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  function tick() {
    const t = clock.getElapsedTime();

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    // Parallax camera
    camera.position.x = mouse.x * 6;
    camera.position.y = -mouse.y * 4 + scrollY * -0.008;
    camera.lookAt(0, 0, 0);

    // Update node positions (Points) with z bob
    const nodeAttr = nodeGeom.attributes.position.array;
    for (let i = 0; i < NODE_COUNT; i++) {
      const bob = Math.sin(t * speeds[i] + i * 0.13) * 0.4;
      nodeAttr[i * 3 + 0] = positions[i * 3];
      nodeAttr[i * 3 + 1] = positions[i * 3 + 1];
      nodeAttr[i * 3 + 2] = baseZ[i] + bob;
    }
    nodeGeom.attributes.position.needsUpdate = true;

    // Update link positions/colors (light — reuse indices)
    const posAttr = linkGeom.attributes.position.array;
    const colAttr = linkGeom.attributes.color.array;
    for (let k = 0; k < LINK_COUNT; k++) {
      const [a, b] = linkPairs[k];
      const ax = positions[a * 3], ay = positions[a * 3 + 1], az = baseZ[a] + Math.sin(t * speeds[a] + a * 0.13) * 0.4;
      const bx = positions[b * 3], by = positions[b * 3 + 1], bz = baseZ[b] + Math.sin(t * speeds[b] + b * 0.13) * 0.4;
      posAttr[k * 6 + 0] = ax; posAttr[k * 6 + 1] = ay; posAttr[k * 6 + 2] = az;
      posAttr[k * 6 + 3] = bx; posAttr[k * 6 + 4] = by; posAttr[k * 6 + 5] = bz;

      // Colors: blue->cyan->violet by position
      const hue = 0.55 + ((ay + RANGE_Y * 0.5) / RANGE_Y) * 0.25;
      const c = new THREE.Color().setHSL(hue, 0.7, 0.58);
      colAttr[k * 6 + 0] = c.r; colAttr[k * 6 + 1] = c.g; colAttr[k * 6 + 2] = c.b;
      colAttr[k * 6 + 3] = c.r * 0.5; colAttr[k * 6 + 4] = c.g * 0.7; colAttr[k * 6 + 5] = c.b;
    }
    linkGeom.attributes.position.needsUpdate = true;
    linkGeom.attributes.color.needsUpdate = true;

    // Update pulses along links
    for (let i = 0; i < PULSE_COUNT; i++) {
      const p = pulseState[i];
      p.t += p.speed * 0.016;
      if (p.t > 1) { p.t = 0; p.link = Math.floor(Math.random() * LINK_COUNT); }
      const [a, b] = linkPairs[p.link];
      const ax = positions[a * 3], ay = positions[a * 3 + 1], az = baseZ[a];
      const bx = positions[b * 3], by = positions[b * 3 + 1], bz = baseZ[b];
      pulsePositions[i * 3 + 0] = ax + (bx - ax) * p.t;
      pulsePositions[i * 3 + 1] = ay + (by - ay) * p.t;
      pulsePositions[i * 3 + 2] = az + (bz - az) * p.t;
    }
    pulseGeo.attributes.position.needsUpdate = true;

    // Slow rotation
    scene.rotation.y = Math.sin(t * 0.05) * 0.15 + mouse.x * 0.08;
    scene.rotation.x = Math.cos(t * 0.04) * 0.08 + mouse.y * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
