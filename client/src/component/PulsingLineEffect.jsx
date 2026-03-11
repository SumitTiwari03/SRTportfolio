import React, { useEffect, useRef, useState } from 'react';

const PulsingLineEffect = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let pulses = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pulse class for traveling light effects
    class Pulse {
      constructor() {
        this.reset();
      }

      reset() {
        const gridSize = 40;
        // Random direction: 0=horizontal, 1=vertical
        const direction = Math.floor(Math.random() * 2);

        if (direction === 0) {
          // Horizontal movement
          const leftToRight = Math.random() > 0.5;
          this.x = leftToRight ? 0 : canvas.width;
          // Snap to grid
          this.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
          this.vx = leftToRight ? 2.5 : -2.5;
          this.vy = 0;
        } else {
          // Vertical movement
          const topToBottom = Math.random() > 0.5;
          // Snap to grid
          this.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
          this.y = topToBottom ? 0 : canvas.height;
          this.vx = 0;
          this.vy = topToBottom ? 2.5 : -2.5;
        }

        this.trail = [];
        this.maxTrailLength = 30;
        this.hue = Math.random() * 60 + 270; // Purple to blue range
        this.life = 1;
      }

      update() {
        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }

        this.x += this.vx;
        this.y += this.vy;

        // Check bounds
        if (this.x < -50 || this.x > canvas.width + 50 ||
            this.y < -50 || this.y > canvas.height + 50) {
          this.reset();
        }
      }

      draw() {
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const point = this.trail[i];
          const nextPoint = this.trail[i + 1];
          if (!nextPoint) continue;

          const progress = i / this.trail.length;
          const opacity = progress * 0.8;

          // Calculate distance to mouse for glow effect
          const dx = point.x - mousePosition.x;
          const dy = point.y - mousePosition.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          const glowIntensity = Math.max(0, 1 - distToMouse / 200);

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);

          // Create gradient for the line segment
          const gradient = ctx.createLinearGradient(
            point.x, point.y, nextPoint.x, nextPoint.y
          );

          const baseOpacity = opacity * (0.5 + glowIntensity * 0.5);
          gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, ${baseOpacity})`);
          gradient.addColorStop(1, `hsla(${this.hue}, 80%, 70%, ${baseOpacity * 1.2})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2 + glowIntensity * 3;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 10 + glowIntensity * 20;
          ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, ${glowIntensity})`;
          ctx.stroke();
        }

        // Draw head
        const headGlow = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${headGlow})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, 0.8)`;
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      }
    }

    // Initialize pulses
    const pulseCount = Math.min(Math.floor(canvas.width / 200), 8);
    for (let i = 0; i < pulseCount; i++) {
      pulses.push(new Pulse());
    }

    // Animation loop
    const animate = () => {
      // Clear with slight fade for trail effect
      ctx.fillStyle = isDarkMode
        ? 'rgba(31, 41, 55, 0.2)'
        : 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw pulses
      pulses.forEach(pulse => {
        pulse.update();
        pulse.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode, mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default PulsingLineEffect;
