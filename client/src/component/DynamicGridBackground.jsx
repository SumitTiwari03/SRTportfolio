import React, { useEffect, useRef } from 'react';

const DynamicGridBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lines = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Line class for random moving lines
    class MovingLine {
      constructor() {
        this.reset();
      }

      reset() {
        // Random starting position
        const startSide = Math.floor(Math.random() * 4);
        switch(startSide) {
          case 0: // Top
            this.x = Math.random() * canvas.width;
            this.y = 0;
            break;
          case 1: // Right
            this.x = canvas.width;
            this.y = Math.random() * canvas.height;
            break;
          case 2: // Bottom
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            break;
          case 3: // Left
            this.x = 0;
            this.y = Math.random() * canvas.height;
            break;
        }

        // Random velocity
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.length = Math.random() * 100 + 50;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = Math.random() * 60 + 270; // Purple to blue range
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Reset if out of bounds
        if (this.x < -this.length || this.x > canvas.width + this.length ||
            this.y < -this.length || this.y > canvas.height + this.length) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);

        // Draw line in direction of movement
        const endX = this.x + this.vx * this.length;
        const endY = this.y + this.vy * this.length;

        // Create gradient for the line
        const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0)`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 60%, ${this.opacity})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 60%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

    // Initialize lines
    const lineCount = Math.min(window.innerWidth / 100, 15);
    for (let i = 0; i < lineCount; i++) {
      lines.push(new MovingLine());
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = isDarkMode
        ? 'rgba(17, 24, 39, 0.2)'
        : 'rgba(249, 250, 251, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw lines
      lines.forEach(line => {
        line.update();
        line.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default DynamicGridBackground;
