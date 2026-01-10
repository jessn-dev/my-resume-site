import React from "react";

export default function GridBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">

            {/* 1. The Grid Pattern */}
            {/* We use a small SVG repeated across the screen */}
            <div className="absolute inset-0 z-0 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* 2. The Radial Gradient Mask (The "Spotlight" effect) */}
            {/* This creates the fade-to-black vignette edges */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            {/* 3. Optional: A subtle moving beam of light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>

            {/* 4. Content Container */}
            <div className="relative z-20 w-full">
                {children}
            </div>
        </div>
    );
}