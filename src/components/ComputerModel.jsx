import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ComputerModel() {
  const canvasRef = useRef();
  const wrapRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    const scene = new THREE.Scene();

    function getSize() {
      return { w: canvas.clientWidth, h: canvas.clientHeight };
    }
    let { w, h } = getSize();

    // ---------- Camera ----------
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0.6, 1.1, 7.2);
    camera.lookAt(0, 0, 0);

    // ---------- Renderer ----------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ---------- Lighting ----------
    scene.add(new THREE.AmbientLight(0x8899cc, 0.3));

    const keyLight = new THREE.DirectionalLight(0x22d3ee, 1.6);
    keyLight.position.set(3, 4, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xa78bfa, 2.4, 20);
    rimLight.position.set(-3, -1, 4);
    scene.add(rimLight);

    const backLight = new THREE.PointLight(0x0ea5e9, 1.4, 20);
    backLight.position.set(0, 2, -3);
    scene.add(backLight);

    const screenLight = new THREE.PointLight(0x38bdf8, 1.8, 6);
    screenLight.position.set(0, 0.5, 1.4);
    scene.add(screenLight);

    // warm desk-lamp accent light (contrast against cool cyan/purple)
    const lampLight = new THREE.PointLight(0xffb17a, 1.6, 5);
    lampLight.position.set(2.6, 0.6, 1.2);
    scene.add(lampLight);

    // ---------- Root rig ----------
    const rig = new THREE.Group();
    scene.add(rig);

    const cyan = 0x22d3ee;
    const purple = 0xa78bfa;
    const green = 0x4ade80;
    const modeColors = [cyan, purple, green];
    const metalDark = new THREE.MeshStandardMaterial({ color: 0x151b2c, metalness: 0.75, roughness: 0.3 });
    const plasticDark = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.3, roughness: 0.55 });

    // =========================================================
    // helper: soft procedural wood-grain texture for the desk
    // =========================================================
    function makeWoodTexture() {
      const c = document.createElement("canvas");
      c.width = 512; c.height = 512;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#1a1410";
      ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 40; i++) {
        ctx.strokeStyle = `rgba(60,45,35,${0.15 + Math.random() * 0.2})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        const y = Math.random() * 512;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(170, y + (Math.random() - 0.5) * 40, 340, y + (Math.random() - 0.5) * 40, 512, y);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 1);
      return tex;
    }
    const woodTex = makeWoodTexture();

    // =========================================================
    // DESK SURFACE
    // =========================================================
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.1, 3.4),
      new THREE.MeshStandardMaterial({ map: woodTex, metalness: 0.15, roughness: 0.5 })
    );
    desk.position.set(0, -1.55, 0);
    desk.receiveShadow = true;
    rig.add(desk);

    const deskEdge = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.01, 0.02),
      new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.3 })
    );
    deskEdge.position.set(0, -1.5, 1.7);
    rig.add(deskEdge);

    // mousepad
    const mousepad = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.015, 32),
      new THREE.MeshStandardMaterial({ color: 0x0a1220, roughness: 0.9 })
    );
    mousepad.position.set(1.15, -1.495, 1.0);
    mousepad.receiveShadow = true;
    rig.add(mousepad);

    // =========================================================
    // MONITOR
    // =========================================================
    const monitor = new THREE.Group();

    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.85, 0.14), metalDark);
    frame.castShadow = true;
    monitor.add(frame);

    const bezelLip = new THREE.Mesh(
      new THREE.BoxGeometry(2.62, 1.62, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 0.2, roughness: 0.8 })
    );
    bezelLip.position.z = 0.071;
    monitor.add(bezelLip);

    const screenOnMat = new THREE.MeshStandardMaterial({
      color: 0x020617, emissive: 0x0a1e33, emissiveIntensity: 1.1, metalness: 0.1, roughness: 0.15,
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.45, 1.48), screenOnMat);
    screen.position.z = 0.085;
    screen.userData.id = "screen";
    monitor.add(screen);

    const highlight = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.35),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.03 })
    );
    highlight.position.set(-0.5, 0.4, 0.086);
    highlight.rotation.z = 0.6;
    monitor.add(highlight);

    // --- screen content: mode 0 = waveform bars, mode 1 = code lines, mode 2 = app grid ---
    const lineGroup = new THREE.Group();
    const lineWidths = [0.9, 1.5, 1.1, 1.7, 0.7, 1.3, 1.0, 0.5];
    lineWidths.forEach((width, i) => {
      const bar = new THREE.Mesh(
        new THREE.PlaneGeometry(width * 0.55, 0.045),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? cyan : purple, transparent: true, opacity: 0.85 })
      );
      bar.position.set(-1.05 + (width * 0.55) / 2, 0.58 - i * 0.145, 0.09);
      lineGroup.add(bar);
    });
    monitor.add(lineGroup);

    const gridGroup = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const tile = new THREE.Mesh(
          new THREE.PlaneGeometry(0.32, 0.32),
          new THREE.MeshBasicMaterial({
            color: (r + c) % 2 === 0 ? cyan : purple, transparent: true, opacity: 0.55,
          })
        );
        tile.position.set(-0.85 + c * 0.42, 0.35 - r * 0.42, 0.09);
        gridGroup.add(tile);
      }
    }
    gridGroup.visible = false;
    monitor.add(gridGroup);

    const camDot = new THREE.Mesh(
      new THREE.CircleGeometry(0.02, 12),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.4 })
    );
    camDot.position.set(0, 0.86, 0.075);
    monitor.add(camDot);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.6, 16), metalDark);
    neck.position.set(0, -1.18, -0.05);
    neck.castShadow = true;
    monitor.add(neck);

    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.06, 32), metalDark);
    standBase.position.set(0, -1.46, -0.05);
    standBase.castShadow = true;
    monitor.add(standBase);

    // --- power button on the bottom bezel ---
    const powerBtnMat = new THREE.MeshBasicMaterial({ color: green });
    const powerBtn = new THREE.Mesh(new THREE.CircleGeometry(0.028, 16), powerBtnMat);
    powerBtn.position.set(0, -0.86, 0.075);
    powerBtn.userData.id = "power";
    monitor.add(powerBtn);
    const powerRing = new THREE.Mesh(
      new THREE.RingGeometry(0.032, 0.04, 16),
      new THREE.MeshBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.8 })
    );
    powerRing.position.copy(powerBtn.position);
    monitor.add(powerRing);

    monitor.position.set(0, 0.35, 0);
    rig.add(monitor);

    // =========================================================
    // KEYBOARD
    // =========================================================
    const keyboardGroup = new THREE.Group();
    const kbBody = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 0.62), plasticDark);
    kbBody.castShadow = true;
    keyboardGroup.add(kbBody);

    const keyGeo = new THREE.BoxGeometry(0.1, 0.03, 0.1);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.3, roughness: 0.6 });
    const cols = 13, rows = 4;
    const keysMesh = new THREE.InstancedMesh(keyGeo, keyMat, cols * rows);
    const dummy = new THREE.Object3D();
    let idx = 0;
    const keyBasePositions = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pos = { x: -0.75 + c * 0.125, y: 0.055, z: -0.22 + r * 0.14 };
        keyBasePositions.push(pos);
        dummy.position.set(pos.x, pos.y, pos.z);
        dummy.updateMatrix();
        keysMesh.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    keysMesh.userData.id = "keyboard";
    keyboardGroup.add(keysMesh);
    keyboardGroup.position.set(0, -1.46, 1.05);
    keyboardGroup.rotation.x = -0.06;
    rig.add(keyboardGroup);

    // key-press ripple state
    let lastKeyPress = -10;
    let pressedKeyIndex = -1;

    // =========================================================
    // MOUSE (physical desk mouse, draggable on the pad)
    // =========================================================
    const mouseGroup = new THREE.Group();
    const mouseBody = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), plasticDark);
    mouseBody.scale.set(0.7, 0.5, 1.15);
    mouseBody.castShadow = true;
    mouseBody.userData.id = "mouse";
    mouseGroup.add(mouseBody);

    const mouseLedMat = new THREE.MeshBasicMaterial({ color: cyan });
    const mouseLed = new THREE.Mesh(new THREE.CircleGeometry(0.015, 10), mouseLedMat);
    mouseLed.position.set(0, 0.05, 0.16);
    mouseLed.rotation.x = -Math.PI / 2.3;
    mouseGroup.add(mouseLed);

    mouseGroup.position.set(1.15, -1.47, 1.0);
    rig.add(mouseGroup);
    const mouseHome = mouseGroup.position.clone();
    const mousepadCenter = new THREE.Vector2(1.15, 1.0);
    const mousepadRadius = 0.5;

    // =========================================================
    // CPU TOWER (with front power LED)
    // =========================================================
    const tower = new THREE.Group();
    const towerBody = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.5, 1.15), metalDark);
    towerBody.castShadow = true;
    towerBody.userData.id = "power";
    tower.add(towerBody);

    const towerStripMat = new THREE.MeshBasicMaterial({ color: purple, transparent: true, opacity: 0.9 });
    const towerStrip = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.3, 0.02), towerStripMat);
    towerStrip.position.set(0.28, 0, 0.58);
    tower.add(towerStrip);

    for (let i = 0; i < 5; i++) {
      const vent = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.015, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
      );
      vent.position.set(0, -0.5 + i * 0.09, 0.585);
      tower.add(vent);
    }

    const powerLedMat = new THREE.MeshBasicMaterial({ color: green });
    const powerLed = new THREE.Mesh(new THREE.CircleGeometry(0.018, 10), powerLedMat);
    powerLed.position.set(-0.2, 0.55, 0.585);
    tower.add(powerLed);

    tower.position.set(-2.7, -0.75, 0.3);
    rig.add(tower);

    // =========================================================
    // SPEAKERS (either side of monitor)
    // =========================================================
    function makeSpeaker(x) {
      const spk = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.28), plasticDark);
      body.castShadow = true;
      spk.add(body);
      const grille = new THREE.Mesh(
        new THREE.CircleGeometry(0.09, 20),
        new THREE.MeshStandardMaterial({ color: 0x0a0f1e, roughness: 0.8 })
      );
      grille.position.set(0, 0.08, 0.145);
      spk.add(grille);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.09, 0.1, 20),
        new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.5 })
      );
      ring.position.set(0, 0.08, 0.146);
      spk.add(ring);
      spk.position.set(x, -1.24, 0.55);
      return spk;
    }
    rig.add(makeSpeaker(-1.75));
    rig.add(makeSpeaker(1.75));

    // =========================================================
    // DESK LAMP (clickable toggle)
    // =========================================================
    const lamp = new THREE.Group();
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.04, 24), metalDark);
    lampBase.userData.id = "lamp";
    lamp.add(lampBase);
    const armLower = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.7, 10), metalDark);
    armLower.position.set(0, 0.35, 0);
    armLower.rotation.z = 0.25;
    lamp.add(armLower);
    const armUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.55, 10), metalDark);
    armUpper.position.set(0.28, 0.75, 0);
    armUpper.rotation.z = -0.5;
    lamp.add(armUpper);
    const lampHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.16, 0.22, 20, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.35, side: THREE.DoubleSide })
    );
    lampHead.position.set(0.5, 0.98, 0);
    lampHead.rotation.z = Math.PI - 0.9;
    lampHead.userData.id = "lamp";
    lamp.add(lampHead);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffdca8 });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), bulbMat);
    bulb.position.set(0.56, 0.9, 0);
    bulb.userData.id = "lamp";
    lamp.add(bulb);
    lamp.position.set(2.65, -1.5, 1.0);
    lampLight.position.set(2.75, -0.85, 1.0);
    rig.add(lamp);

    // =========================================================
    // COFFEE MUG (click for steam)
    // =========================================================
    const mug = new THREE.Group();
    const mugBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.09, 0.2, 20),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 })
    );
    mugBody.userData.id = "mug";
    mug.add(mugBody);
    const mugHandle = new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.015, 8, 16, Math.PI * 1.4),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 })
    );
    mugHandle.position.set(0.11, 0, 0);
    mugHandle.rotation.y = Math.PI / 2;
    mug.add(mugHandle);
    const coffee = new THREE.Mesh(
      new THREE.CircleGeometry(0.095, 20),
      new THREE.MeshStandardMaterial({ color: 0x2d1a0f, roughness: 0.3 })
    );
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.1;
    mug.add(coffee);
    mug.position.set(-1.6, -1.42, 1.15);
    mug.castShadow = true;
    rig.add(mug);

    // steam particles above the mug
    const steamGroup = new THREE.Group();
    const steamData = [];
    for (let i = 0; i < 10; i++) {
      const s = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
      );
      s.position.set(mug.position.x + (Math.random() - 0.5) * 0.08, mug.position.y + 0.12, mug.position.z);
      steamData.push({ delay: (i / 10) * 2, active: false, t: Math.random() * 2 });
      steamGroup.add(s);
    }
    rig.add(steamGroup);
    let steamOn = false;

    // =========================================================
    // SMALL DESK PLANT
    // =========================================================
    const plant = new THREE.Group();
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.07, 0.14, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 })
    );
    plant.add(pot);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.28, 8), leafMat);
      const a = (i / 5) * Math.PI * 2;
      leaf.position.set(Math.cos(a) * 0.03, 0.2, Math.sin(a) * 0.03);
      leaf.rotation.z = Math.cos(a) * 0.35;
      leaf.rotation.x = Math.sin(a) * 0.35;
      plant.add(leaf);
    }
    plant.position.set(-2.15, -1.44, 1.25);
    rig.add(plant);

    // =========================================================
    // CABLE from tower to monitor (curved tube)
    // =========================================================
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.55, -1.35, 0.4),
      new THREE.Vector3(-1.6, -1.5, 0.9),
      new THREE.Vector3(-0.6, -1.48, 0.6),
      new THREE.Vector3(-0.1, -1.35, 0.1),
    ]);
    const cableTube = new THREE.Mesh(
      new THREE.TubeGeometry(cableCurve, 40, 0.012, 8, false),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.7 })
    );
    rig.add(cableTube);

    // =========================================================
    // FLOATING ACCENT SHAPES (signature tech motif)
    // =========================================================
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.MeshBasicMaterial({ color: cyan, wireframe: true, transparent: true, opacity: 0.85 })
    );
    ico.position.set(2.3, 1.5, 0.6);
    rig.add(ico);

    const oct = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.2, 0),
      new THREE.MeshBasicMaterial({ color: purple, wireframe: true, transparent: true, opacity: 0.9 })
    );
    oct.position.set(-2.5, 1.6, 0.7);
    rig.add(oct);

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.04, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.75 })
    );
    torus.position.set(0, 1.7, -0.4);
    rig.add(torus);

    const particles = new THREE.Group();
    const particleGeo = new THREE.SphereGeometry(0.02, 6, 6);
    const particleData = [];
    for (let i = 0; i < 40; i++) {
      const pm = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? cyan : purple, transparent: true, opacity: 0.4 + Math.random() * 0.5,
      });
      const p = new THREE.Mesh(particleGeo, pm);
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.6 + Math.random() * 1.1;
      p.position.set(Math.cos(angle) * radius, 0.5 + Math.random() * 1.8, Math.sin(angle) * radius * 0.4);
      particleData.push({ baseY: p.position.y, speed: 0.2 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2 });
      particles.add(p);
    }
    rig.add(particles);

    // =========================================================
    // INTERACTIVE STATE
    // =========================================================
    let screenOn = true;
    let lampOn = true;
    let screenMode = 0; // 0 waveform, 1 code-ish, 2 app grid
    const interactiveIds = new Set(["power", "lamp", "mug", "screen", "mouse", "keyboard"]);
    const tooltipText = {
      power: "Power button — click to sleep / wake the rig",
      lamp: "Desk lamp — click to toggle",
      mug: "Coffee — click for steam",
      screen: "Screen — click to switch view",
      mouse: "Mouse — drag it around the pad",
      keyboard: "Keyboard — click a key to type",
    };

    function applyScreenMode() {
      lineGroup.visible = screenOn && screenMode !== 2;
      gridGroup.visible = screenOn && screenMode === 2;
      const c = modeColors[screenMode % modeColors.length];
      lineGroup.children.forEach((bar) => {
        if (screenMode === 1) {
          bar.scale.x = 0.4 + Math.random() * 0.6; // code-line jitter
        } else {
          bar.scale.x = 1;
        }
        bar.material.color.set(bar === lineGroup.children[0] ? c : bar.material.color);
      });
      gridGroup.children.forEach((tile, i) => {
        tile.material.color.set(i % 2 === 0 ? c : (screenMode === 2 ? purple : c));
      });
    }

    function setScreenPower(on) {
      screenOn = on;
      screenOnMat.emissiveIntensity = on ? 1.0 : 0;
      screenOnMat.emissive.set(on ? 0x0a1e33 : 0x000000);
      screenOnMat.color.set(on ? 0x020617 : 0x010104);
      screenLight.intensity = on ? 1.6 : 0.05;
      powerBtnMat.color.set(on ? green : 0x475569);
      powerLedMat.color.set(on ? green : 0x334155);
      towerStripMat.opacity = on ? 0.9 : 0.15;
      lineGroup.visible = on && screenMode !== 2;
      gridGroup.visible = on && screenMode === 2;
    }

    function setLamp(on) {
      lampOn = on;
      lampLight.intensity = on ? 1.5 : 0;
      bulbMat.color.set(on ? 0xffdca8 : 0x334155);
    }

    function cycleScreen() {
      if (!screenOn) return;
      screenMode = (screenMode + 1) % 3;
      applyScreenMode();
    }

    function pressRandomKey() {
      pressedKeyIndex = Math.floor(Math.random() * keyBasePositions.length);
      lastKeyPress = clockElapsed();
    }

    let elapsedRef = 0;
    function clockElapsed() { return elapsedRef; }

    function handleInteract(id) {
      if (id === "power") setScreenPower(!screenOn);
      else if (id === "lamp") setLamp(!lampOn);
      else if (id === "mug") steamOn = !steamOn;
      else if (id === "screen") cycleScreen();
      else if (id === "keyboard") pressRandomKey();
    }

    applyScreenMode();

    // =========================================================
    // RAYCASTING (click + hover)
    // =========================================================
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();

    function findInteractiveId(obj) {
      let cur = obj;
      while (cur) {
        if (cur.userData && interactiveIds.has(cur.userData.id)) return cur.userData.id;
        cur = cur.parent;
      }
      return null;
    }

    function pickAt(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObjects(rig.children, true);
      for (const hit of hits) {
        const id = findInteractiveId(hit.object);
        if (id) return id;
      }
      return null;
    }

    function handleClick(e) {
      if (draggingMouseProp) return;
      const id = pickAt(e.clientX, e.clientY);
      if (id) handleInteract(id);
    }
    canvas.addEventListener("click", handleClick);

    // =========================================================
    // MOUSE-PROP DRAG (drag the physical desk mouse on the pad)
    // =========================================================
    let draggingMouseProp = false;
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.47);
    const dragPoint = new THREE.Vector3();

    function tryStartMouseDrag(clientX, clientY) {
      const id = pickAt(clientX, clientY);
      if (id === "mouse") {
        draggingMouseProp = true;
        canvas.style.cursor = "grabbing";
        return true;
      }
      return false;
    }

    function updateMouseDrag(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNDC, camera);
      if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
        const local = new THREE.Vector2(dragPoint.x, dragPoint.z);
        const d = local.distanceTo(mousepadCenter);
        if (d > mousepadRadius) {
          local.sub(mousepadCenter).normalize().multiplyScalar(mousepadRadius).add(mousepadCenter);
        }
        mouseGroup.position.x = local.x;
        mouseGroup.position.z = local.y;
      }
    }

    // =========================================================
    // MOUSE + DRAG SYSTEM (camera parallax / rig tilt)
    // =========================================================
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let velocityX = 0, velocityY = 0;
    let isDraggingRig = false;
    let prevX = 0, prevY = 0;

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetX = -y * 0.22;
      targetY = x * 0.4;

      if (draggingMouseProp) {
        updateMouseDrag(e.clientX, e.clientY);
        return;
      }

      // hover cursor + tooltip
      const id = pickAt(e.clientX, e.clientY);
      if (id) {
        canvas.style.cursor = "pointer";
        if (tooltip) {
          tooltip.style.opacity = "1";
          tooltip.textContent = tooltipText[id] || "";
          tooltip.style.left = `${e.clientX - rect.left + 14}px`;
          tooltip.style.top = `${e.clientY - rect.top + 14}px`;
        }
      } else {
        canvas.style.cursor = isDraggingRig ? "grabbing" : "grab";
        if (tooltip) tooltip.style.opacity = "0";
      }
    }
    function handleMouseDown(e) {
      if (tryStartMouseDrag(e.clientX, e.clientY)) return;
      isDraggingRig = true;
      prevX = e.clientX; prevY = e.clientY;
      canvas.style.cursor = "grabbing";
    }
    function handleMouseUp() {
      isDraggingRig = false;
      draggingMouseProp = false;
      canvas.style.cursor = "grab";
    }
    function handleDrag(e) {
      if (draggingMouseProp) return;
      if (!isDraggingRig) return;
      velocityY = (e.clientX - prevX) * 0.003;
      velocityX = (e.clientY - prevY) * 0.003;
      prevX = e.clientX; prevY = e.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleDrag);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.style.cursor = "grab";

    // =========================================================
    // ANIMATE
    // =========================================================
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      elapsedRef = t;

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      velocityX *= 0.95;
      velocityY *= 0.95;

      rig.rotation.x = currentX + velocityX;
      rig.rotation.y = currentY + velocityY;
      rig.position.y = Math.sin(t * 0.9) * 0.05;

      ico.rotation.x += 0.012; ico.rotation.y += 0.016;
      oct.rotation.x -= 0.01; oct.rotation.y += 0.014;
      torus.rotation.z += 0.02;

      if (screenOn) {
        lineGroup.children.forEach((bar, i) => {
          bar.material.opacity = 0.5 + 0.4 * Math.abs(Math.sin(t * 1.3 + i * 0.6));
        });
        gridGroup.children.forEach((tile, i) => {
          tile.material.opacity = 0.35 + 0.3 * Math.abs(Math.sin(t * 1.6 + i * 0.4));
        });
        screenOnMat.emissiveIntensity = 1.0 + Math.sin(t * 1.1) * 0.15;
        screenLight.intensity = 1.6 + Math.sin(t * 1.1) * 0.3;
      }

      if (lampOn) lampLight.intensity = 1.5 + Math.sin(t * 2.3) * 0.15;

      // key press ripple
      if (pressedKeyIndex >= 0 && t - lastKeyPress < 0.15) {
        const p = keyBasePositions[pressedKeyIndex];
        dummy.position.set(p.x, p.y - 0.012, p.z);
        dummy.updateMatrix();
        keysMesh.setMatrixAt(pressedKeyIndex, dummy.matrix);
        keysMesh.instanceMatrix.needsUpdate = true;
      } else if (pressedKeyIndex >= 0) {
        const p = keyBasePositions[pressedKeyIndex];
        dummy.position.set(p.x, p.y, p.z);
        dummy.updateMatrix();
        keysMesh.setMatrixAt(pressedKeyIndex, dummy.matrix);
        keysMesh.instanceMatrix.needsUpdate = true;
        pressedKeyIndex = -1;
      }

      // steam rise
      steamGroup.children.forEach((s, i) => {
        const d = steamData[i];
        if (steamOn) {
          d.t += 0.016;
          if (d.t > 2) d.t = 0;
          s.position.x = mug.position.x + Math.sin(d.t * 3 + i) * 0.03;
          s.position.y = mug.position.y + 0.12 + d.t * 0.35;
          s.position.z = mug.position.z;
          s.material.opacity = Math.sin((d.t / 2) * Math.PI) * 0.35;
        } else {
          s.material.opacity *= 0.9;
        }
      });

      particles.children.forEach((p, i) => {
        const d = particleData[i];
        p.position.y = d.baseY + Math.sin(t * d.speed + d.phase) * 0.16;
      });

      keyLight.intensity = 1.5 + Math.sin(t * 1.6) * 0.2;

      renderer.render(scene, camera);
    }
    animate();

    // =========================================================
    // RESIZE / CLEANUP
    // =========================================================
    function onResize() {
      const s = getSize();
      camera.aspect = s.w / s.h;
      camera.updateProjectionMatrix();
      renderer.setSize(s.w, s.h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("click", handleClick);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      woodTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute z-10 rounded-md bg-slate-900/90 px-2 py-1 text-xs text-cyan-200 opacity-0 transition-opacity duration-150 whitespace-nowrap"
      />
    </div>
  );
}