"use client";
import { useEffect, useRef } from "react";

export default function Vortex() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const particles: any[] = [];
        const particleCount = 120; // Enough for a swarm, light enough for performance
        
        let mouseX = width / 2;
        let mouseY = height / 2;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 0.5,
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const draw = () => {
            ctx.fillStyle = "rgba(10, 10, 10, 0.15)"; // Soft trail effect
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p, i) => {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Vortex fluid pull
                if (dist < 400) {
                    p.vx += dx * 0.00005;
                    p.vy += dy * 0.00005;
                    
                    // Circular spin
                    p.vx += dy * 0.0005;
                    p.vy -= dx * 0.0005;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Friction
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${1 - dist/600})`;
                ctx.fill();

                // Draw fluid web connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    
                    if (dist2 < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 - dist2/800})`;
                        ctx.stroke();
                    }
                }
            });
            animId = requestAnimationFrame(draw);
        };

        let animId = requestAnimationFrame(draw);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60 z-0" />;
}
