"use client";
import { Music, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { playHoverSound } from "@/utils/audio";

export default function SpotifyWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = 0.08; // Ultra-low background volume (white noise level)

        const attemptPlay = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(() => {
                    // Still blocked by browser
                });
            }
        };

        // Attempt immediately
        attemptPlay();

        // Listen for any user gesture
        document.addEventListener('mousedown', attemptPlay, { once: true });
        document.addEventListener('keydown', attemptPlay, { once: true });

        return () => {
            document.removeEventListener('mousedown', attemptPlay);
            document.removeEventListener('keydown', attemptPlay);
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent document click from overriding manual toggle
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
    };

    return (
        <>
            {/* Native DOM Audio element ensures browser correctly registers user gestures */}
            <audio 
                ref={audioRef} 
                src="https://coderadio-admin-v2.freecodecamp.org/radio/8000/radio.mp3" 
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
            />
            
            <button 
                onClick={togglePlay}
                onMouseEnter={playHoverSound}
                className={`fixed bottom-6 left-6 z-[99] hidden md:flex items-center gap-4 backdrop-blur-md border rounded-full px-4 py-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                    isPlaying ? "bg-[#0d1117]/90 border-green-500/30" : "bg-[#0d1117]/80 border-slate-800"
                }`}
            >
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isPlaying ? "bg-green-500/20" : "bg-blue-500/10"}`}>
                    {isPlaying ? <Music size={14} className="text-green-400" /> : <Play size={14} className="text-blue-400 ml-0.5" />}
                    {isPlaying && <span className="absolute inset-0 rounded-full border border-green-500/50 animate-[spin_4s_linear_infinite]" />}
                </div>
                
                <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest leading-tight">
                        {isPlaying ? "Now_Playing" : "System_Audio"}
                    </span>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                        {isPlaying ? "Lofi Radio 24/7 🎧" : "Click to play"}
                    </span>
                </div>

                {isPlaying && (
                    <div className="flex items-end gap-[3px] h-3 ml-2">
                        <div className="w-1 bg-green-500/80 rounded-t-sm animate-[bounce_1s_infinite]" style={{ animationDelay: '0.0s' }} />
                        <div className="w-1 bg-green-500/80 rounded-t-sm animate-[bounce_1.2s_infinite]" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 bg-green-500/80 rounded-t-sm animate-[bounce_0.8s_infinite]" style={{ animationDelay: '0.4s' }} />
                    </div>
                )}
            </button>
        </>
    );
}
