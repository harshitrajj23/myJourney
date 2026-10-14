"use client";

import { useEffect, useRef } from "react";
import { useJourneyMotion } from "./JourneyExperience";
import { createParticleForms, updateParticlePositions } from "./particleMorph";
import styles from "./KineticSculpture.module.css";

// Deterministic, server-rendered depth: no browser APIs or random hydration values.
const staticParticles = Array.from({ length: 680 }, (_, index) => {
  const y = 1 - (index + 0.5) / 340;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * 2.399963229728653;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const scale = 1 + z * 0.13;
  return {
    x: (250 + (x * 181 + Math.sin(y * 5) * 13) * scale).toFixed(2),
    y: (250 + y * 184 * scale).toFixed(2),
    radius: (0.85 + (z + 1) * 0.7 + (index % 9 === 0 ? 0.6 : 0)).toFixed(2),
    opacity: (0.28 + (z + 1) * 0.34).toFixed(2),
    color: x + y * 0.4 > 0.28 ? "#c5a8ff" : x < -0.3 ? "#d5ff93" : "#8cecf2",
  };
});

/** Three.js enhances the static particle sphere only on motion-capable desktops. */
export default function KineticSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { motionEnabled, reducedMotion } = useJourneyMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !motionEnabled || reducedMotion) return;
    const mount = host;
    const desktop = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    let generation = 0;
    let disposed = false;
    let releaseScene: (() => void) | undefined;

    async function syncEligibility() {
      const current = ++generation;
      releaseScene?.();
      releaseScene = undefined;
      if (!desktop.matches || disposed) return;

      try {
        const THREE = await import("three");
        if (disposed || current !== generation || !desktop.matches) return;
        const section = mount.closest("section") ?? mount;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
        const sculpture = new THREE.Group();
        scene.add(sculpture);
        let renderer: InstanceType<typeof THREE.WebGLRenderer> | undefined;
        let observer: IntersectionObserver | undefined;
        let resizeObserver: ResizeObserver | undefined;
        let frame = 0;
        let inView = false;
        let finished = false;
        let previousTime = 0;
        let elapsed = 0;
        let progress = 0;
        let fitDistanceFactor = 1;
        const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0 };
        const disposable: Array<{ dispose: () => void }> = [];

        function remember<T extends { dispose: () => void }>(resource: T) {
          disposable.push(resource);
          return resource;
        }

        function stop() {
          cancelAnimationFrame(frame);
          frame = 0;
          previousTime = 0;
        }

        function cleanup() {
          if (finished) return;
          finished = true;
          stop();
          mount.removeAttribute("data-rendered");
          observer?.disconnect();
          resizeObserver?.disconnect();
          observer = undefined;
          resizeObserver = undefined;
          document.removeEventListener("visibilitychange", syncPlayback);
          window.removeEventListener("scroll", onScroll);
          section.removeEventListener("pointermove", onPointerMove);
          section.removeEventListener("pointerleave", onPointerLeave);
          renderer?.domElement.removeEventListener("webglcontextlost", onContextLost);
          disposable.forEach((resource) => resource.dispose());
          renderer?.dispose();
          renderer?.forceContextLoss();
          renderer?.domElement.remove();
          renderer = undefined;
        }

        function onContextLost(event: Event) { event.preventDefault(); cleanup(); }

        function onPointerMove(event: Event) {
          if (finished || !inView || document.hidden) return;
          const { clientX, clientY } = event as PointerEvent;
          const bounds = section.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          pointer.x = Math.max(-1, Math.min(1, ((clientX - bounds.left) / bounds.width) * 2 - 1));
          pointer.y = Math.max(-1, Math.min(1, ((clientY - bounds.top) / bounds.height) * 2 - 1));
        }

        function onPointerLeave() { pointer.x = 0; pointer.y = 0; }

        function onScroll() {
          if (finished || document.hidden) return;
          const bounds = section.getBoundingClientRect();
          progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height)));
        }

        function syncPlayback() {
          if (finished || !inView || document.hidden) stop();
          else if (!frame) { onScroll(); frame = requestAnimationFrame(animate); }
        }

        releaseScene = cleanup;
        const count = window.innerWidth >= 1200 ? 2400 : 1400;
        const forms = createParticleForms(count);
        const positions = new Float32Array(count * 3);
        updateParticlePositions(positions, forms, 0, 0, 0, 0);
        const geometry = remember(new THREE.BufferGeometry());
        const positionAttribute = new THREE.BufferAttribute(positions, 3);
        positionAttribute.setUsage(THREE.DynamicDrawUsage);
        geometry.setAttribute("position", positionAttribute);
        geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3.3);

        const colors = new Float32Array(count * 3);
        const lime = new THREE.Color("#d5ff93");
        const violet = new THREE.Color("#c5a8ff");
        const cyan = new THREE.Color("#8cecf2");
        const color = new THREE.Color();
        for (let index = 0; index < count; index += 1) {
          const band = (forms.sphere[index * 3] + forms.sphere[index * 3 + 1] * 0.4) / 3.3;
          color.copy(band > 0 ? cyan : lime).lerp(band > 0 ? violet : cyan, Math.min(1, Math.abs(band) * 1.6));
          color.toArray(colors, index * 3);
        }
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // A tiny local soft sprite keeps points luminous without custom shader code.
        const sprite = document.createElement("canvas");
        sprite.width = 64;
        sprite.height = 64;
        const context = sprite.getContext("2d");
        if (!context) throw new Error("Particle sprite context unavailable");
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(255,255,255,1)");
        gradient.addColorStop(0.48, "rgba(255,255,255,0.45)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
        const texture = remember(new THREE.CanvasTexture(sprite));
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = remember(new THREE.PointsMaterial({
          map: texture, size: 0.09, sizeAttenuation: true,
          vertexColors: true, transparent: true, opacity: 0.96,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
        }));
        const glowMaterial = remember(new THREE.PointsMaterial({
          map: texture, size: 0.24, sizeAttenuation: true,
          vertexColors: true, transparent: true, opacity: 0.1,
          blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
          toneMapped: false,
        }));
        const depthMaterial = remember(new THREE.PointsMaterial({
          map: texture, size: 0.045, sizeAttenuation: true,
          vertexColors: true, transparent: true, opacity: 0.5,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
        }));
        const particles = new THREE.Points(geometry, material);
        const glowParticles = new THREE.Points(geometry, glowMaterial);
        const depthParticles = new THREE.Points(geometry, depthMaterial);
        particles.frustumCulled = false;
        glowParticles.frustumCulled = false;
        depthParticles.frustumCulled = false;
        sculpture.add(glowParticles, particles, depthParticles);

        // The satellite layer is sampled from the live particle buffer once per frame.
        // Its fixed offsets make a deeper dust field without another morph target.
        const dustCount = Math.min(320, Math.max(140, Math.ceil(count / 8)));
        const dustPositions = new Float32Array(dustCount * 3);
        const dustIndices = new Uint32Array(dustCount);
        const dustColors = new Float32Array(dustCount * 3);
        for (let index = 0; index < dustCount; index += 1) {
          dustIndices[index] = Math.min(count - 1, Math.floor((index * count) / dustCount));
          const dustColor = index % 5 === 0 ? violet : index % 3 === 0 ? lime : cyan;
          dustColor.toArray(dustColors, index * 3);
        }
        const dustGeometry = remember(new THREE.BufferGeometry());
        const dustPositionAttribute = new THREE.BufferAttribute(dustPositions, 3);
        dustPositionAttribute.setUsage(THREE.DynamicDrawUsage);
        dustGeometry.setAttribute("position", dustPositionAttribute);
        dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));
        dustGeometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3.3);
        const dustMaterial = remember(new THREE.PointsMaterial({
          map: texture, size: 0.055, sizeAttenuation: true,
          vertexColors: true, transparent: true, opacity: 0.62,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
        }));
        const dust = new THREE.Points(dustGeometry, dustMaterial);
        dust.frustumCulled = false;
        sculpture.add(dust);

        // Three short, deterministic line strips add a quiet sense of flow to every form.
        const trailCount = 86;
        const trailPositions = new Float32Array(trailCount * 3 * 3);
        const trailColors = new Float32Array(trailCount * 3 * 3);
        for (let trail = 0; trail < 3; trail += 1) {
          const start = Math.floor((trail * count) / 3);
          for (let index = 0; index < trailCount; index += 1) {
            const sourceIndex = (start + index * 3) % count;
            const sourceOffset = sourceIndex * 3;
            const trailOffset = (trail * trailCount + index) * 3;
            trailColors[trailOffset] = colors[sourceOffset] * 1.2;
            trailColors[trailOffset + 1] = colors[sourceOffset + 1] * 1.2;
            trailColors[trailOffset + 2] = colors[sourceOffset + 2] * 1.2;
          }
        }
        const trailMaterial = remember(new THREE.LineBasicMaterial({
          vertexColors: true, transparent: true, opacity: 0.22,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
        }));
        const trails = new THREE.Group();
        const trailPositionAttributes: Array<InstanceType<typeof THREE.BufferAttribute>> = [];
        for (let trail = 0; trail < 3; trail += 1) {
          const trailGeometry = remember(new THREE.BufferGeometry());
          const startOffset = trail * trailCount * 3;
          const endOffset = startOffset + trailCount * 3;
          const trailPositionAttribute = new THREE.BufferAttribute(
            trailPositions.subarray(startOffset, endOffset), 3,
          );
          trailPositionAttribute.setUsage(THREE.DynamicDrawUsage);
          trailGeometry.setAttribute("position", trailPositionAttribute);
          trailGeometry.setAttribute(
            "color", new THREE.BufferAttribute(trailColors.subarray(startOffset, endOffset), 3),
          );
          trailGeometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3.3);
          const trailLine = new THREE.Line(trailGeometry, trailMaterial);
          trailLine.frustumCulled = false;
          trailPositionAttributes.push(trailPositionAttribute);
          trails.add(trailLine);
        }
        sculpture.add(trails);

        function fitCurrentForm() {
          // Scan scalars only: keep the smaller sphere as prominent as the wide wave.
          let radiusSquared = 0;
          for (let offset = 0; offset < positions.length; offset += 3) {
            const x = positions[offset];
            const y = positions[offset + 1];
            const z = positions[offset + 2];
            radiusSquared = Math.max(radiusSquared, x * x + y * y + z * z);
          }
          camera.position.z = Math.max(1, Math.sqrt(radiusSquared)) * fitDistanceFactor;
        }

        function animate(time: number) {
          frame = 0;
          if (finished || !inView || document.hidden) return;
          const delta = previousTime ? Math.max(0, Math.min((time - previousTime) / 1000, 0.04)) : 0;
          previousTime = time;
          elapsed += delta;
          const ease = 1 - Math.exp(-delta * 3.5);
          pointer.smoothX += (pointer.x - pointer.smoothX) * ease;
          pointer.smoothY += (pointer.y - pointer.smoothY) * ease;
          try {
            updateParticlePositions(positions, forms, elapsed, progress, pointer.smoothX, pointer.smoothY);
            positionAttribute.needsUpdate = true;
            for (let index = 0; index < dustCount; index += 1) {
              const sourceOffset = dustIndices[index] * 3;
              const dustOffset = index * 3;
              const depthScale = 1.035 + (index % 7) * 0.006;
              dustPositions[dustOffset] = positions[sourceOffset] * depthScale + Math.sin(index * 2.17) * 0.035;
              dustPositions[dustOffset + 1] = positions[sourceOffset + 1] * depthScale + Math.cos(index * 1.71) * 0.035;
              dustPositions[dustOffset + 2] = positions[sourceOffset + 2] * depthScale + Math.sin(index * 0.83) * 0.045;
            }
            dustPositionAttribute.needsUpdate = true;
            for (let trail = 0; trail < 3; trail += 1) {
              const start = Math.floor((trail * count) / 3);
              for (let index = 0; index < trailCount; index += 1) {
                const sourceIndex = (start + index * 3) % count;
                const sourceOffset = sourceIndex * 3;
                const trailOffset = (trail * trailCount + index) * 3;
                trailPositions[trailOffset] = positions[sourceOffset];
                trailPositions[trailOffset + 1] = positions[sourceOffset + 1];
                trailPositions[trailOffset + 2] = positions[sourceOffset + 2];
              }
            }
            for (let trail = 0; trail < trailPositionAttributes.length; trail += 1) {
              trailPositionAttributes[trail].needsUpdate = true;
            }
            fitCurrentForm();
            camera.position.x = pointer.smoothX * 0.24 + Math.sin(elapsed * 0.17) * 0.12;
            camera.position.y = pointer.smoothY * 0.16 + Math.cos(elapsed * 0.13) * 0.08;
            camera.lookAt(0, 0, 0);
            sculpture.rotation.set(
              -0.12 + pointer.smoothY * 0.13 + progress * 0.12,
              elapsed * 0.065 + pointer.smoothX * 0.22 + Math.sin(elapsed * 0.11) * 0.035,
              -0.12 + Math.sin(elapsed * 0.16) * 0.045,
            );
            renderer?.render(scene, camera);
            mount.dataset.rendered = "true";
            frame = requestAnimationFrame(animate);
          } catch { cleanup(); }
        }

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.className = styles.canvas;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);
        mount.appendChild(renderer.domElement);

        const resize = () => {
          if (finished) return;
          const { width, height } = mount.getBoundingClientRect();
          if (!width || !height) return;
          camera.aspect = width / height;
          // Fit each form's bounding radius, including perspective depth and soft sprites.
          const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
          const limitingFov = Math.min(halfFov, Math.atan(Math.tan(halfFov) * camera.aspect));
          fitDistanceFactor = 1.1 / Math.sin(limitingFov);
          fitCurrentForm();
          camera.updateProjectionMatrix();
          try { renderer?.setSize(width, height, false); } catch { cleanup(); }
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        resize();
        if (finished) return;
        observer = new IntersectionObserver(([entry]) => {
          if (finished) return;
          inView = entry.isIntersecting;
          syncPlayback();
        }, { threshold: 0.04 });
        observer.observe(mount);
        document.addEventListener("visibilitychange", syncPlayback);
        window.addEventListener("scroll", onScroll, { passive: true });
        section.addEventListener("pointermove", onPointerMove, { passive: true });
        section.addEventListener("pointerleave", onPointerLeave);
        onScroll();
      } catch {
        // A blocked chunk or unavailable WebGL leaves the static artwork in place.
        if (current === generation) releaseScene?.();
      }
    }

    void syncEligibility();
    desktop.addEventListener("change", syncEligibility);
    return () => {
      disposed = true;
      generation += 1;
      desktop.removeEventListener("change", syncEligibility);
      releaseScene?.();
    };
  }, [motionEnabled, reducedMotion]);

  return (
    <div ref={hostRef} className={styles.sculpture} aria-hidden="true">
      <div className={styles.halo} />
      <svg className={styles.staticCloud} viewBox="0 0 500 500" focusable="false" aria-hidden="true">
        <defs>
          <radialGradient id="sculptureCore" cx="46%" cy="44%" r="58%">
            <stop offset="0" stopColor="#d5ff93" stopOpacity="0.22" />
            <stop offset="0.42" stopColor="#8cecf2" stopOpacity="0.08" />
            <stop offset="1" stopColor="#8cecf2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sculptureOrbit" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d5ff93" stopOpacity="0" />
            <stop offset="0.42" stopColor="#d5ff93" stopOpacity="0.42" />
            <stop offset="0.72" stopColor="#c5a8ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#8cecf2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle className={styles.staticCore} cx="250" cy="250" r="174" fill="url(#sculptureCore)" />
        <g className={styles.staticRings} fill="none" stroke="url(#sculptureOrbit)">
          <ellipse cx="250" cy="250" rx="184" ry="92" transform="rotate(-22 250 250)" strokeWidth="1.3" />
          <ellipse cx="250" cy="250" rx="162" ry="116" transform="rotate(54 250 250)" strokeWidth="0.9" />
          <ellipse cx="250" cy="250" rx="134" ry="178" transform="rotate(76 250 250)" strokeWidth="0.75" opacity="0.7" />
        </g>
        <g className={styles.staticCurves} fill="none" stroke="url(#sculptureOrbit)" strokeLinecap="round">
          <path d="M74 292C119 168 217 124 322 171s125 133 96 205" strokeWidth="1.1" />
          <path d="M103 358c72-54 132-66 201-28s95 26 123-58" strokeWidth="0.75" opacity="0.72" />
          <path d="M122 145c53 42 118 53 186 25 41-17 73-14 100 11" strokeWidth="0.65" opacity="0.58" />
        </g>
        {staticParticles.map((particle, index) => (
          <circle key={index} cx={particle.x} cy={particle.y} r={particle.radius} fill={particle.color} opacity={particle.opacity} />
        ))}
        <g className={styles.staticSparks} fill="#efffd0">
          <circle cx="122" cy="179" r="2.2" /><circle cx="371" cy="153" r="1.7" />
          <circle cx="397" cy="281" r="2.1" /><circle cx="158" cy="371" r="1.6" />
          <circle cx="290" cy="96" r="1.4" /><circle cx="91" cy="263" r="1.2" />
        </g>
      </svg>
    </div>
  );
}
