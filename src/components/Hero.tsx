"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import creativePortrait from "@/public/assets/image_2.png";
import coderPortrait from "@/public/assets/image_1.png";
import StripeGradient from "./ui/StripeGradient";

export default function Hero() {
    const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // --- TYPEWRITER STATE ---
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Looping Typewriter Logic
        const text = "Hi I'm Jesse Ngolab";
        let index = 0;
        let isDeleting = false;
        let timer: NodeJS.Timeout;

        const typeLoop = () => {
            if (!isDeleting && index <= text.length) {
                setTypedText(text.substring(0, index));
                index++;
                timer = setTimeout(typeLoop, 100);
            }
            else if (!isDeleting && index > text.length) {
                isDeleting = true;
                timer = setTimeout(typeLoop, 3000);
            }
            else if (isDeleting && index >= 0) {
                setTypedText(text.substring(0, index));
                index--;
                timer = setTimeout(typeLoop, 50);
            }
            else if (isDeleting && index < 0) {
                isDeleting = false;
                index = 0;
                timer = setTimeout(typeLoop, 500);
            }
        };

        typeLoop();

        return () => {
            window.removeEventListener("resize", checkMobile);
            clearTimeout(timer);
        };
    }, []);

    const handleMouseEnter = (side: "left" | "right") => {
        if (!isMobile) setActiveSide(side);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setActiveSide(null);
    };

    const handleClick = (side: "left" | "right") => {
        if (isMobile) setActiveSide((prev) => (prev === side ? null : side));
    };

    const getDesignerClipPath = () => {
        if (activeSide === "left") return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
        if (activeSide === "right") return "polygon(0 0, 0% 0, 0% 100%, 0 100%)";
        return "polygon(0 0, 55% 0, 45% 100%, 0 100%)";
    };

    return (
        <section id="home" className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black overflow-hidden pt-10 pb-10">

            {/* BACKGROUND GRADIENT */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <StripeGradient />
            </div>

            {/* =========================================================
          1. IMAGE SECTION (Resized & Centered)
         ========================================================= */}
            {/* RESIZED: max-w-3xl (approx 768px).
          This is slightly wider than the search bar (584px), creating a perfect pyramid shape.
      */}
            <div className="relative z-10 w-full max-w-3xl px-4 mb-8">

                {/* HEIGHT ADJUSTED: h-[300px] sm:h-[400px].
          Reduced height prevents it from looking stretched at the smaller width.
        */}
                <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden bg-transparent isolate">

                    {/* TRIGGERS */}
                    <div
                        className="absolute left-0 top-0 z-50 h-full w-1/2 cursor-pointer touch-manipulation"
                        onMouseEnter={() => handleMouseEnter("left")}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick("left")}
                    ></div>
                    <div
                        className="absolute right-0 top-0 z-50 h-full w-1/2 cursor-pointer touch-manipulation"
                        onMouseEnter={() => handleMouseEnter("right")}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick("right")}
                    ></div>

                    {/* LAYER 1: CODER (RIGHT) */}
                    <div className="absolute inset-0 z-0 h-full w-full bg-transparent">
                        <div className="relative h-full w-full bg-transparent">
                            <Image
                                src={coderPortrait}
                                alt="Coder"
                                fill
                                className={`object-cover object-top transition-transform duration-1000 ${activeSide === "right" ? "scale-105" : "scale-100"}`}
                                priority
                            />
                        </div>
                    </div>

                    {/* LAYER 2: DESIGNER (LEFT) */}
                    <div
                        className="absolute inset-0 z-10 h-full w-full bg-transparent transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]"
                        style={{ clipPath: getDesignerClipPath(), WebkitClipPath: getDesignerClipPath() }}
                    >
                        <div className="relative h-full w-full bg-transparent">
                            <Image
                                src={creativePortrait}
                                alt="Designer"
                                fill
                                className={`object-cover object-top transition-transform duration-1000 ${activeSide === "left" ? "scale-105" : "scale-100"}`}
                                priority
                            />
                        </div>
                    </div>

                    {/* LABELS (Scaled down to fit new size: text-4xl) */}
                    <span className={`pointer-events-none absolute z-40 top-1/2 -translate-y-1/2 -translate-x-1/2 text-3xl sm:text-5xl font-extrabold text-white drop-shadow-xl tracking-tight transition-all duration-700 ${activeSide === "left" ? "left-1/2 text-purple-300 scale-110" : activeSide === "right" ? "left-[5%] opacity-0 blur-sm" : "left-1/4 opacity-100 blur-0"}`}>Designer.</span>
                    <span className={`pointer-events-none absolute z-40 top-1/2 -translate-y-1/2 -translate-x-1/2 text-3xl sm:text-5xl font-extrabold text-white drop-shadow-xl tracking-tight transition-all duration-700 ${activeSide === "right" ? "left-1/2 text-blue-300 scale-110" : activeSide === "left" ? "left-[95%] opacity-0 blur-sm" : "left-3/4 opacity-100 blur-0"}`}>&lt;Coder /&gt;</span>
                </div>
            </div>


            {/* =========================================================
          2. GOOGLE SEARCH BAR SECTION
         ========================================================= */}
            <div className="relative z-20 flex w-full flex-col items-center px-4">

                <div className="group flex h-12 w-full max-w-[584px] items-center rounded-full border border-[#5f6368]/30 bg-[#303134]/80 px-4 shadow-md backdrop-blur-md transition-shadow hover:bg-[#303134] hover:shadow-lg hover:shadow-black/50">

                    {/* SEARCH ICON */}
                    <div className="pr-3 text-[#9aa0a6]">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </svg>
                    </div>

                    <input
                        type="text"
                        readOnly
                        value={typedText}
                        className="flex-1 bg-transparent text-[16px] text-[#e8eaed] outline-none"
                    />

                    {/* ICONS */}
                    <div className="flex items-center gap-3 pl-3">
                        <svg className="h-5 w-5 cursor-pointer text-[#8ab4f8]" focusable="false" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
                        <svg className="h-5 w-5 cursor-pointer text-[#8ab4f8]" focusable="false" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <a
                        href="#experience"
                        className="rounded bg-[#303134] px-4 py-2 text-sm font-medium text-[#e8eaed] hover:border hover:border-[#5f6368] hover:shadow-sm"
                    >
                        View Work
                    </a>
                    <a
                        href="#contact"
                        className="rounded bg-[#303134] px-4 py-2 text-sm font-medium text-[#e8eaed] hover:border hover:border-[#5f6368] hover:shadow-sm"
                    >
                        Contact
                    </a>
                </div>

            </div>

        </section>
    );
}