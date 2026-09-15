import { useEffect, useRef } from 'react';

interface BackgroundAuraProps {
  intensity?: 'calm' | 'golden' | 'celebration' | 'fire';
}

export default function BackgroundAura({ intensity = 'golden' }: BackgroundAuraProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      fadeSpeed: number;
      color: string;
      isEmber: boolean;
      twinkle: boolean;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    const particleCount = intensity === 'celebration' ? 85 : 65;
    const particles: Particle[] = [];

    const goldColors = [
      '#f59e0b',
      '#fbbf24',
      '#fef3c7',
      '#d97706',
      '#f43f5e',
      '#38bdf8',
      '#ec4899',
      '#ffffff',
    ];

    for (let i = 0; i < particleCount; i++) {
      const isEmber = Math.random() > 0.35;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isEmber ? 2.6 : 1.8) + 0.6,
        speedY: -(Math.random() * (isEmber ? 0.75 : 0.3) + 0.15),
        speedX: (Math.random() - 0.5) * 0.45,
        opacity: Math.random() * 0.6 + 0.15,
        maxOpacity: Math.random() * 0.7 + 0.25,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        isEmber,
        twinkle: Math.random() > 0.5,
      });
    }

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 7 + 9,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        active: true,
      });
    };

    let shootingStarTimer = 0;
    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Render glowing background gradients
      const grad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.4) * 60,
        height * 0.45 + Math.cos(time * 0.3) * 40,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );

      if (intensity === 'celebration') {
        grad.addColorStop(0, 'rgba(234, 88, 12, 0.22)');
        grad.addColorStop(0.3, 'rgba(217, 70, 239, 0.1)');
        grad.addColorStop(0.6, 'rgba(245, 158, 11, 0.06)');
        grad.addColorStop(1, 'rgba(5, 6, 8, 0)');
      } else {
        grad.addColorStop(0, 'rgba(217, 119, 6, 0.14)');
        grad.addColorStop(0.35, 'rgba(180, 83, 9, 0.06)');
        grad.addColorStop(1, 'rgba(5, 6, 8, 0)');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Periodically trigger celestial shooting star
      shootingStarTimer++;
      if (shootingStarTimer > 180 && Math.random() < 0.02) {
        spawnShootingStar();
        shootingStarTimer = 0;
      }

      // Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.x > width || star.y > height) {
          star.active = false;
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const starGrad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        starGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        starGrad.addColorStop(0.8, 'rgba(251, 191, 36, 0.8)');
        starGrad.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw particles with interactive mouse repulsion/fun
      const mouse = mouseRef.current;
      particles.forEach((p) => {
        // Slight interactive drift when mouse approaches
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
        }

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.25;
        p.opacity += p.fadeSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.08) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Loop around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.shadowBlur = p.isEmber ? 12 : 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Cinematic subtle light leaks */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none animate-breathe" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-orange-600/10 blur-[140px] pointer-events-none animate-breathe" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-96 rounded-full bg-yellow-600/8 blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,5,7,0.7)_100%)] pointer-events-none" />
    </div>
  );
}
