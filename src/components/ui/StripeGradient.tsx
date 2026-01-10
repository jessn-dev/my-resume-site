"use client";

export default function StripeGradient() {
    return (
        <div className="absolute inset-0 h-full w-full bg-[#0a0a0a] overflow-hidden">

            {/* CONTAINER FILTER:
        We apply a massive blur (100px) and extra saturation to the whole container.
        This blends the moving orbs into a smooth, liquid mesh.
      */}
            <div className="relative h-full w-full blur-[100px] saturate-150">

                {/* 1. Base Gradient (Deep Blue/Purple - The River) */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: "linear-gradient(90deg, #1e1e2e 0%, #3a1c71 50%, #1e1e2e 100%)",
                    }}
                />

                {/* 2. Giant Moving Blob: CYAN (Top Right) */}
                <div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500 opacity-40 mix-blend-hard-light animate-blob"></div>

                {/* 3. Giant Moving Blob: VIOLET (Bottom Left) */}
                <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600 opacity-40 mix-blend-hard-light animate-blob animation-delay-2000"></div>

                {/* 4. Giant Moving Blob: BLUE (Center) */}
                <div className="absolute top-[20%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-600 opacity-40 mix-blend-hard-light animate-blob animation-delay-4000"></div>

                {/* 5. Highlight Blob: PINK/RED Accent (Drifting) */}
                <div className="absolute bottom-[20%] right-[20%] h-[400px] w-[400px] rounded-full bg-pink-600 opacity-30 mix-blend-hard-light animate-blob animation-delay-long"></div>

            </div>

            {/* Optional: Noise Texture Overlay (Adds that premium 'grainy' look) */}
            <div className="absolute inset-0 bg-transparent opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>
    );
}