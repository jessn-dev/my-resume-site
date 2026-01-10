"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // 1. Lock scrolling when preloader is active
        document.body.style.overflow = "hidden";

        // 2. Counter Animation (0% to 100%)
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev === 100) {
                    clearInterval(interval);

                    // Wait a moment at 100%, then fade out
                    setTimeout(() => {
                        setIsVisible(false);

                        // Wait for fade transition to finish, then cleanup
                        setTimeout(() => {
                            setIsFinished(true);
                            document.body.style.overflow = "auto"; // Unlock scroll
                        }, 1000);

                    }, 500);

                    return 100;
                }
                // Random increment for realistic "loading" feel
                const increment = Math.floor(Math.random() * 10) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // If completely finished, remove from DOM to save resources
    if (isFinished) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            {/* GLOWING ORB / LOGO PLACEHOLDER */}
            <div className="relative mb-8 h-24 w-24">
                <div className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
                <div className="relative h-full w-full rounded-full border-2 border-slate-800 bg-black flex items-center justify-center">
                    <span className="text-2xl font-black text-white">JN</span>
                </div>
            </div>

            {/* TEXT & PERCENTAGE */}
            <div className="w-64">
                <div className="mb-2 flex justify-between font-mono text-xs text-slate-500">
                    <span>SYSTEM_BOOT</span>
                    <span>{count}%</span>
                </div>

                {/* PROGRESS BAR */}
                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-900">
                    <div
                        className="h-full bg-blue-500 transition-all duration-200 ease-out"
                        style={{ width: `${count}%` }}
                    ></div>
                </div>

                {/* TERMINAL STATUS TEXT */}
                <div className="mt-4 h-6 text-center font-mono text-xs text-slate-400">
                    {count < 30 && <span>Initializing environment...</span>}
                    {count >= 30 && count < 70 && <span>Loading modules...</span>}
                    {count >= 70 && count < 100 && <span>Establishing connection...</span>}
                    {count === 100 && <span className="text-green-500">Access Granted.</span>}
                </div>
            </div>
        </div>
    );
}