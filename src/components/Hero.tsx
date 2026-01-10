import Image from "next/image";
import creativePortrait from "@/public/assets/image_2.png";
import coderPortrait from "@/public/assets/image_1.png";

export default function Hero() {
    return (
        <section id="home" className="relative flex min-h-screen w-full items-center justify-center bg-black px-4 py-20 overflow-hidden">

            {/* --- GLOW WRAPPER --- */}
            <div className="relative z-10 h-[500px] w-full max-w-5xl sm:h-[600px] group">

                {/* Aurora Glow Background */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-50 blur-2xl transition duration-1000 group-hover:opacity-80 animate-aurora"></div>

                {/* MAIN CONTAINER */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl isolate">

                    {/* =========================================================
              1. HOVER TRIGGERS (Must be siblings to the text below)
             ========================================================= */}
                    <div className="peer/left absolute left-0 top-0 z-50 h-full w-1/2 cursor-pointer"></div>
                    <div className="peer/right absolute right-0 top-0 z-50 h-full w-1/2 cursor-pointer"></div>


                    {/* =========================================================
              2. BACKGROUND IMAGES
             ========================================================= */}

                    {/* LEFT IMAGE (Designer) */}
                    <div
                        className="
              absolute inset-0 z-10 h-full w-full
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]
              [clip-path:polygon(0_0,_55%_0,_45%_100%,_0_100%)]
              peer-hover/left:[clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]
              peer-hover/right:[clip-path:polygon(0_0,_0%_0,_0%_100%,_0_100%)]
            "
                    >
                        <div className="relative h-full w-full bg-slate-900">
                            <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 peer-hover/left:opacity-0 z-10"></div>
                            <Image
                                src={creativePortrait}
                                alt="Creative Designer"
                                fill
                                className="object-cover object-top transition-transform duration-1000 peer-hover/left:scale-105"
                                priority
                            />
                        </div>
                    </div>

                    {/* RIGHT IMAGE (Coder) */}
                    <div
                        className="
              absolute inset-0 z-20 h-full w-full
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]
              [clip-path:polygon(55%_0,_100%_0,_100%_100%,_45%_100%)]
              peer-hover/right:[clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]
              peer-hover/left:[clip-path:polygon(100%_0,_100%_0,_100%_100%,_100%_100%)]
            "
                    >
                        <div className="relative h-full w-full bg-slate-900">
                            <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 peer-hover/right:opacity-0 z-10"></div>
                            <Image
                                src={coderPortrait}
                                alt="Coder Developer"
                                fill
                                className="object-cover object-top transition-transform duration-1000 peer-hover/right:scale-105"
                                priority
                            />
                        </div>
                    </div>


                    {/* =========================================================
              3. TEXT LABELS (DIRECT SIBLINGS)
              We use absolute positioning with 'left' values to animate.

              Math Logic:
              - Center of Left Half = 25% (left-1/4)
              - Center of Right Half = 75% (left-3/4)
              - Center of Full Screen = 50% (left-1/2)
             ========================================================= */}

                    {/* --- DESIGNER TEXT --- */}
                    <span
                        className="
              pointer-events-none absolute z-40 top-1/2 -translate-y-1/2 -translate-x-1/2
              text-4xl sm:text-6xl font-extrabold text-white drop-shadow-xl tracking-tight
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]

              /* 1. Default Position: Center of Left Panel (25%) */
              left-1/4 opacity-100 blur-0

              /* 2. Hover Left: Moves to Center Screen (50%) */
              peer-hover/left:left-1/2
              peer-hover/left:text-purple-300
              peer-hover/left:scale-110

              /* 3. Hover Right: Pushed off to the Left (5%) and fades */
              peer-hover/right:left-[5%]
              peer-hover/right:opacity-0
              peer-hover/right:blur-sm
            "
                    >
            Designer.
          </span>

                    {/* --- CODER TEXT --- */}
                    <span
                        className="
              pointer-events-none absolute z-40 top-1/2 -translate-y-1/2 -translate-x-1/2
              text-4xl sm:text-6xl font-extrabold text-white drop-shadow-xl tracking-tight
              transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)]

              /* 1. Default Position: Center of Right Panel (75%) */
              left-3/4 opacity-100 blur-0

              /* 2. Hover Right: Moves to Center Screen (50%) */
              peer-hover/right:left-1/2
              peer-hover/right:text-blue-300
              peer-hover/right:scale-110

              /* 3. Hover Left: Pushed off to the Right (95%) and fades */
              peer-hover/left:left-[95%]
              peer-hover/left:opacity-0
              peer-hover/left:blur-sm
            "
                    >
            &lt;Coder /&gt;
          </span>


                    {/* HEADER (Fixed) */}
                    <div className="pointer-events-none absolute top-[15%] w-full text-center z-50">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white/90 drop-shadow-lg sm:text-5xl transition-opacity duration-500 peer-hover/left:opacity-30 peer-hover/right:opacity-30">
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