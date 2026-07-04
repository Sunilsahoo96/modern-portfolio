import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

const ThreeBackground = () => {
  const canvasRef = useRef(null);
  const { themeColors, theme } = useSelector((state) => state.themeReducer);

  // References to update colors dynamically on state change
  const materialsRef = useRef({ wave: null, stars: null });

  // Sync color changes from Redux without re-creating the WebGL context
  useEffect(() => {
    const primary = themeColors.primaryColor || "#F28C26";
    if (materialsRef.current.wave) {
      materialsRef.current.wave.color.set(primary);
    }
    if (materialsRef.current.stars) {
      // Background stars get a slightly faded or secondary color
      materialsRef.current.stars.color.set(primary);
    }
  }, [themeColors.primaryColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;
    camera.position.y = 8;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // Transparent canvas so the CSS theme background shows through
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Helper to generate a soft circular texture dynamically (zero external asset dependency)
    const createCircleTexture = () => {
      const size = 64;
      const canvasEl = document.createElement("canvas");
      canvasEl.width = size;
      canvasEl.height = size;
      const ctx = canvasEl.getContext("2d");

      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      return new THREE.CanvasTexture(canvasEl);
    };

    const particleTexture = createCircleTexture();
    const primaryColor = themeColors.primaryColor || "#F28C26";

    // --- Layer 1: Rippling Particle Wave (Grid) ---
    const gridCols = 55;
    const gridRows = 55;
    const numParticles = gridCols * gridRows;
    const separation = 1.1;

    const waveGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);

    // Initial grid layout in X-Z plane
    let idx = 0;
    for (let x = 0; x < gridCols; x++) {
      for (let z = 0; z < gridRows; z++) {
        // Center the grid around origin
        positions[idx] = (x - gridCols / 2) * separation;
        positions[idx + 1] = 0; // Y starts at 0, animated in loop
        positions[idx + 2] = (z - gridRows / 2) * separation;
        idx += 3;
      }
    }

    waveGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(primaryColor),
    });
    materialsRef.current.wave = waveMaterial;

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    // Tilt the wave slightly to recede into the distance
    wavePoints.rotation.x = -Math.PI / 4.5;
    scene.add(wavePoints);

    // --- Layer 2: Floating Starfield ---
    const starCount = 180;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;     // X
      starPositions[i + 1] = (Math.random() - 0.2) * 50; // Y (tilted upwards)
      starPositions[i + 2] = (Math.random() - 0.5) * 80; // Z
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      size: 0.25,
      map: particleTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(primaryColor),
    });
    materialsRef.current.stars = starMaterial;

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // --- Interaction States ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Normalized coordinates from -1 to 1
      mouse.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouse.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleScroll = () => {
      // Scroll percentage relative to page height
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scroll.targetY = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Lerp mouse and scroll inputs for liquid-smooth transitions
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.y += (scroll.targetY - scroll.y) * 0.05;

      // --- Update Layer 1 (Ripple Wave) ---
      const positionAttr = waveGeometry.attributes.position;
      const positionsArray = positionAttr.array;

      let idx = 0;
      for (let x = 0; x < gridCols; x++) {
        for (let z = 0; z < gridRows; z++) {
          // Unique wave equation combining coordinate factors & time
          const yVal =
            Math.sin(x * 0.2 + time * 1.0) * 1.2 +
            Math.cos(z * 0.2 + time * 1.0) * 1.2;

          positionsArray[idx + 1] = yVal;
          idx += 3;
        }
      }
      positionAttr.needsUpdate = true;

      // Parallax effect on the wave based on mouse and scroll
      wavePoints.rotation.y = mouse.x * 0.08 + time * 0.015;
      wavePoints.rotation.x = -Math.PI / 4.5 + mouse.y * 0.05;
      // Shift wave upwards or downwards based on page scroll
      wavePoints.position.y = -scroll.y * 8;
      wavePoints.position.z = -scroll.y * 3;

      // --- Update Layer 2 (Starfield) ---
      starPoints.rotation.y = time * 0.005 + mouse.x * 0.03;
      starPoints.rotation.x = time * 0.002 + mouse.y * 0.02;
      starPoints.position.y = -scroll.y * 4;

      renderer.render(scene, camera);
    };

    animate();

    // --- Window Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Dispose resources to avoid memory leaks
      waveGeometry.dispose();
      waveMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 transition-opacity duration-500"
      style={{
        opacity: theme === "dark" ? 0.7 : 0.45, // Slightly softer opacity in light mode for readability
      }}
    />
  );
};

export default ThreeBackground;
