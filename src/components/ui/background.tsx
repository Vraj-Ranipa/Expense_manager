"use client";

import { useEffect, useRef } from "react";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const particles: Particle[] = [];
    const particleCount = 60; // Slightly reduced count for text readability
    const connectionDistance = 150;
    const mouseRadius = 200;

    const symbols = ["$", "%", "€", "£", "¥", "+", "-", "₹", "₵"];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      symbol: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 14 + 10; // Font size range
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];

        // Matches the global creative theme
        const colors = [
          "rgba(168, 85, 247, 0.4)", // Purple
          "rgba(34, 211, 238, 0.4)", // Cyan
          "rgba(59, 130, 246, 0.3)", // Blue
          "rgba(236, 72, 153, 0.4)", // Pink
          "rgba(16, 185, 129, 0.4)", // Emerald (Money)
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRadius - distance) / mouseRadius;
          const directionX = forceDirectionX * force * 3;
          const directionY = forceDirectionY * force * 3;

          this.vx -= directionX * 0.05;
          this.vy -= directionY * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;

        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.01;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.01;

        // Wrap around
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.font = `${this.size}px "Outfit", sans-serif`; // Use app font
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.symbol, this.x, this.y);

        // Subtle glow
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
      }
    }

    const init = () => {
      particles.length = 0; // Clear existing
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#05010a");
      gradient.addColorStop(1, "#0f0518");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections (faint network)
      connectParticles();

      requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacityValue = 1 - (distance / connectionDistance);
            // Use a more neutral color for connections so it's not too messy
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.05})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.x;
      mouseY = e.y;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init(); // Re-init on resize to prevent clustering
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    init();
    const frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[0px]"></div>
      <canvas
        ref={canvasRef}
        className="block"
      />
      {/* Vignette & Noise Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
    </div>
  );
}
