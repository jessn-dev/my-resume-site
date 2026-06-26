"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

export default function HorizontalScrollWrapper({ children, headerContent }: { children: React.ReactNode, headerContent?: React.ReactNode }) {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [scrollRange, setScrollRange] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    useEffect(() => {
        const updateRange = () => {
            if (scrollRef.current) {
                const paddingAndGaps = 200; // Account for pl-20 pr-20 and some gap margin to ensure we scroll all the way
                const range = scrollRef.current.scrollWidth - window.innerWidth + paddingAndGaps;
                setScrollRange(range > 0 ? range : 0);
            }
        };

        // Initial update and small delay to allow images/dom to settle
        updateRange();
        setTimeout(updateRange, 500);
        
        window.addEventListener("resize", updateRange);
        return () => window.removeEventListener("resize", updateRange);
    }, [children]);

    // By passing a function instead of a dynamic array, Framer Motion safely binds the current state to the scroll progress!
    const x = useTransform(scrollYProgress, (p) => -(p * scrollRange));
    const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

    return (
        <div className="relative">
            {/* Mobile: Standard vertical flow */}
            <div className="block lg:hidden">
                {headerContent && <div className="mb-4">{headerContent}</div>}
                {children}
            </div>

            {/* Desktop: Horizontal Parallax Scroll */}
            <section ref={targetRef} className="relative h-[250vh] w-full hidden lg:block bg-transparent">
                <div className="sticky top-[10vh] flex flex-col justify-center h-[90vh] overflow-hidden">
                    {headerContent && (
                        <div className="w-full shrink-0 relative z-10 mb-4">
                            {headerContent}
                        </div>
                    )}
                    <div className="w-full relative z-10">
                        <motion.div ref={scrollRef} style={{ x }} className="flex gap-10 pl-20 pr-20 items-center w-max">
                            {children}
                        </motion.div>
                    </div>

                    {/* GitHub Call to Action - Positioned naturally below the cards */}
                    <motion.div 
                        style={{ opacity: textOpacity }}
                        className="w-full flex justify-center items-center gap-6 pointer-events-none select-none z-0 px-10 mt-8"
                    >
                        <Star className="text-yellow-400/80 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-pulse" size={24} />
                        <h1 className="text-sm md:text-base lg:text-lg font-mono text-white/50 tracking-[0.2em] uppercase text-center max-w-4xl leading-loose">
                            If you find these projects helpful, please leave a star on GitHub to help others discover them. 
                            <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] block mt-2 font-bold tracking-[0.3em]">
                                A star goes a long way.
                            </span>
                        </h1>
                        <Star className="text-yellow-400/80 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-pulse" size={24} />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
