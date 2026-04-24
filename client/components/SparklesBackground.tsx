"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  radius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  z: number;
}

const colors = ["#ef4444", "#3b82f6", "#a855f7", "#f97316"]; // Red, Blue, Purple, Orange

export default function SparklesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = 500; 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        radius: Math.random() * (Math.max(width, height) / 1.2),
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.0015) + 0.0005 * (Math.random() < 0.5 ? 1 : -1), // Random direction
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        z: Math.random() * 100, // For 3D depth / opacity effect
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      // Calculate mouse offset for interactive shifting
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      
      for (let p of particles) {
        // Rotate
        p.angle += p.speed;
        
        // Calculate position
        let x = cx + p.radius * Math.cos(p.angle);
        let y = cy + p.radius * Math.sin(p.angle);

        // Apply slight parallax effect based on mouse
        x -= dx * (p.z / 800);
        y -= dy * (p.z / 800);

        ctx.save();
        ctx.translate(x, y);
        // Tangent angle + small adjustment
        ctx.rotate(p.angle + Math.PI / 2 + (p.speed < 0 ? Math.PI : 0));
        
        ctx.fillStyle = p.color;
        // Make the opacity vary slightly with Z for depth
        ctx.globalAlpha = 0.2 + (p.z / 100) * 0.8;

        ctx.beginPath();
        // A short dash / arrow shape
        ctx.roundRect(-p.size / 2, -p.size * 2, p.size, p.size * 4, p.size / 2);
        ctx.fill();
        
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />
      {/* Radial gradient mask to fade out edges if needed, or to make it look spherical */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
}
