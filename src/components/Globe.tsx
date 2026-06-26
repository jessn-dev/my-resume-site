"use client";
import { useEffect, useRef } from "react";

export default function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = 500;
        let height = canvas.height = 500;

        const dots: any[] = [];
        const radius = 180;
        
        // Generate sphere points using Fibonacci sphere algorithm
        const samples = 500;
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
        for (let i = 0; i < samples; i++) {
            const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y
            const theta = phi * i; // golden angle increment
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;
            dots.push({ x, y, z });
        }

        let rotation = 0;
        let animId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            // Spin slowly
            rotation += 0.003;

            const cos = Math.cos(rotation);
            const sin = Math.sin(rotation);

            dots.forEach(dot => {
                // Rotate around Y axis
                const rotX = dot.x * cos - dot.z * sin;
                const rotZ = dot.z * cos + dot.x * sin;

                // Orthographic / Fake Perspective projection
                const perspective = 400 / (400 + rotZ * radius);
                const screenX = width / 2 + rotX * radius * perspective;
                const screenY = height / 2 + dot.y * radius * perspective;

                // Scale dot size based on depth
                const size = Math.max(0.5, 2.5 * perspective);
                // Opacity based on depth (hide back dots slightly to give 3D volume)
                const opacity = rotZ > 0 ? 0.15 : Math.min(1, 0.4 + perspective * 0.6);

                ctx.beginPath();
                ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
                ctx.fill();
            });

            // Draw a subtle connecting ring (Equator)
            ctx.beginPath();
            ctx.ellipse(width/2, height/2, radius + 20, (radius + 20) * 0.2, 0, 0, Math.PI*2);
            ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw a subtle connecting ring (Polar)
            ctx.beginPath();
            ctx.ellipse(width/2, height/2, radius + 30, radius + 30, 0, 0, Math.PI*2);
            ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="relative flex items-center justify-center w-full h-full min-h-[400px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)] animate-pulse" />
            <canvas ref={canvasRef} className="z-10 mix-blend-screen max-w-full h-auto" />
        </div>
    );
}
