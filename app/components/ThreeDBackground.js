"use client"
import { useEffect } from 'react';
import * as THREE from 'three';

const ThreeDBackground = () => {
  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threeDCanvas').appendChild(renderer.domElement);

    // Create the dots
    const numDots = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numDots * 3);

    for (let i = 0; i < numDots * 3; i += 3) {
      positions[i] = Math.random() * 200 - 100; // x
      positions[i + 1] = Math.random() * 200 - 100; // y
      positions[i + 2] = Math.random() * 200 - 100; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Create lines connecting the dots
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5 });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];

    for (let i = 0; i < numDots; i++) {
      for (let j = i + 1; j < numDots; j++) {
        linePositions.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Set the camera position
    camera.position.z = 150;

    // Animate the scene
    const animate = () => {
      requestAnimationFrame(animate);

      points.rotation.x += 0.001;
      points.rotation.y += 0.001;
      lines.rotation.x += 0.001;
      lines.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div id="threeDCanvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ThreeDBackground;
