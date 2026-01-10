"use client"; // <--- Essential for handling State/Interactions

import { useState } from "react";
import Image from "next/image";
import creativePortrait from "@/public/assets/image_2.png";
import coderPortrait from "@/public/assets/image_1.png";

export default function Hero() {
    // State to track which side is active ('left', 'right', or null)
    const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null);

    // Helper to handle interactions (Hover on Desktop, Tap on Mobile)
    const handleInteraction = (side: "left" | "right") => {
        setActiveSide((prev) => (prev === side ? null : side)); // Tap again to close on mobile
    };

    return (
        <section id="home" className="relative flex min-h-screen w-full items-center justify-center bg-black px-4 py-20 overflow-hidden">

            {/* --- GLOW WRAPPER --- */}
            <div className="relative z-10 h-[500px] w-full max-w-5xl sm:h-[600px] group">

                {/* Aurora Glow Background */}
                <div
                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-50 blur-2xl transition duration-1000 animate-aurora
          ${activeSide ? "opacity-80" : "opacity-50"}`}
                ></div>

                {/* MAIN CONTAINER */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl isolate">

                    {/* =========================================================
              1. INTERACTION TRIGGERS (Replaces peer-hover)
             ========================================================= */}

                    {/* LEFT TRIGGER */}
                    <div
                        className="absolute left-0 top-0 z-50 h-full w-1/2 cursor-pointer"
                        onMouseEnter={() => setActiveSide("left")}
                        onMouseLeave={() => setActiveSide(null)}
                        onClick={() => handleInteraction("left")}
                    ></div>

                    {/* RIGHT TRIGGER */}
                    <div
                        className="absolute right-0 top-0 z-50 h-full w-1/2 cursor-pointer"
                        onMouseEnter={() => setActiveSide("right")}
                        onMouseLeave={() => setActiveSide(null)}
                        onClick={() => handleInteraction("right")}
                    ></div>


                    {/* =========================================================
              2. BACKGROUND IMAGES (Driven by State)
             ========================================================= */}

                    {/* LEFT IMAGE (Designer) */}
                    <div
                        className={`
              absolute inset-0 z-10 h-full w-full 
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]
              [clip-path:polygon(0_0,_55%_0,_45%_100%,_0_100%)]
              ${activeSide === "left" ? "[clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]" : ""}
              ${activeSide === "right" ? "[clip-path:polygon(0_0,_0%_0,_0%_100%,_0_100%)]" : ""}
            `}
                    >
                        <div className="relative h-full w-full bg-slate-900">
                            <div
                                className={`absolute inset-0 bg-black/40 transition-opacity duration-700 z-10 
                ${activeSide === "left" ? "opacity-0" : "opacity-40"}`}
                            ></div>
                            <Image
                                src={creativePortrait}
                                alt="Creative Designer"
                                fill
                                className={`object-cover object-top transition-transform duration-1000 
                ${activeSide === "left" ? "scale-105" : "scale-100"}`}
                                priority
                            />
                        </div>
                    </div>

                    {/* RIGHT IMAGE (Coder) */}
                    <div
                        className={`
              absolute inset-0 z-20 h-full w-full 
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]
              [clip-path:polygon(55%_0,_100%_0,_100%_100%,_45%_100%)]
              ${activeSide === "right" ? "[clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]" : ""}
              ${activeSide === "left" ? "[clip-path:polygon(100%_0,_100%_0,_100%_100%,_100%_100%)]" : ""}
            `}
                    >
                        <div className="relative h-full w-full bg-slate-900">
                            <div
                                className={`absolute inset-0 bg-black/40 transition-opacity duration-700 z-10
                 ${activeSide === "right" ? "opacity-0" : "opacity-40"}`}
                            ></div>
                            <Image
                                src={coderPortrait}
                                alt="Coder Developer"
                                fill
                                className={`object-cover object-top transition-transform duration-1000 
                ${activeSide === "right" ? "scale-105" : "scale-100"}`}
                                priority
                            />
                        </div>
                    </div>


                    {/* =========================================================
              3. TEXT LABELS (Driven by State)
             ========================================================= */}

                    {/* --- DESIGNER TEXT --- */}
                    <span
                        className={`
              pointer-events-none absolute z-40 top-1/2 -translate-y-1/2 -translate-x-1/2
              text-3xl sm:text-6xl font-extrabold text-white drop-shadow-xl tracking-tight
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]
              
              /* Logic:
                 Default: left-1/4 (25%)
                 Active Left: left-1/2 (50%)
                 Active Right: left-[5%] (Pushed away)
              */
              ${activeSide === "left"
                            ? "left-1/2 text-purple-300 scale-110"
                            : activeSide === "right"
                                ? "left-[5%] opacity-0 blur-sm"
                                : "left-1/4 opacity-100 blur-0"}
            `}
                    >
            Designer.
          </span>

                    {/* --- CODER TEXT --- */}
                    <span
                        className={`
              pointer-events-none absolute z-40 top-1/2 -translate-y-1/2 -translate-x-1/2
              text-3xl sm:text-6xl font-extrabold text-white drop-shadow-xl tracking-tight
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]

              /* Logic:
                 Default: left-3/4 (75%)
                 Active Right: left-1/2 (50%)
                 Active Left: left-[95%] (Pushed away)
              */
              ${activeSide === "right"
                            ? "left-1/2 text-blue-300 scale-110"
                            : activeSide === "left"
                                ? "left-[95%] opacity-0 blur-sm"
                                : "left-3/4 opacity-100 blur-0"}
            `}
                    >
            &lt;Coder /&gt;
          </span>


                    {/* HEADER (Fixed) */}
                    <div className="pointer-events-none absolute top-[15%] w-full text-center z-50">
                        <h1
                            className={`text-3xl font-extrabold tracking-tight text-white/90 drop-shadow-lg sm:text-5xl transition-opacity duration-500 
               ${activeSide ? "opacity-30" : "opacity-100"}`}
                        >
                            I'm a
                        </h1>
                    </div>

                </div>
            </div>

            {/* EXTERNAL BUTTONS */}
            <div className="absolute bottom-10 z-20 flex gap-4">
                <a
                    href="#experience"
                    className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 font-bold text-white transition hover:bg-white/20 hover:scale-105"
                >
                    View Work
                </a>
                <a
                    href="#contact"
                    className="rounded-full bg-white px-8 py-3 font-bold text-slate-900 hover:bg-slate-200 transition hover:scale-105"
                >
                    Contact
                </a>
            </div>

        </section>
    );
}