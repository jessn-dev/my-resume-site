"use client";

import { useRef, useState } from "react";
import { Send, Mail, MessageSquare, User, CheckCircle2 } from "lucide-react";
import { sendEmail } from "@/app/actions";
import Vortex from "./Vortex";
import SpotlightCard from "./SpotlightCard";
import ScrambleText from "./ScrambleText";
import Globe from "./Globe";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        setStatus("sending");
        const result = await sendEmail(formData);

        if (result.success) {
            setStatus("success");
            formRef.current?.reset();
            setTimeout(() => setStatus("idle"), 5000);
        } else {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    }

    return (
        <section id="contact" className="relative w-full min-h-[80vh] bg-transparent py-24 px-6 md:px-12 lg:px-20 overflow-hidden flex flex-col justify-center">
            {/* Background Vortex */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Vortex />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    Get in <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"><ScrambleText text="Touch" /></span>.
                </h2>
                <p className="text-xl text-white/40 font-light">
                    Have a job or project in mind or just want to say hi? My inbox is always open.
                </p>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <SpotlightCard className="rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden relative min-h-[500px]">
                    
                    {/* Background Globe */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen overflow-hidden">
                        <Globe />
                    </div>

                    {/* HUD Overlay Text */}
                    <div className="absolute top-6 left-6 z-10 pointer-events-none hidden md:block">
                        <h3 className="text-xl font-bold text-white/50 mb-1">Global Network</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_1s_infinite]" />
                            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Node routing active</p>
                        </div>
                    </div>

                    {/* Foreground Form */}
                    <div className="relative z-20 p-8 pt-32 md:pt-32 pointer-events-auto max-w-2xl mx-auto">
                        <form
                            ref={formRef}
                            action={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-white/80 drop-shadow-md uppercase tracking-widest ml-1">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-white/80 drop-shadow-md uppercase tracking-widest ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-white/80 drop-shadow-md uppercase tracking-widest ml-1">Message</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 text-white/40" size={18} />
                                    <textarea
                                        required
                                        name="message"
                                        rows={5}
                                        placeholder="Your message here..."
                                        className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={status === "sending"}
                                type="submit"
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg backdrop-blur-md ${
                                    status === "success"
                                        ? "bg-green-500/80 hover:bg-green-500 border border-green-400 text-white"
                                        : "bg-blue-600/80 hover:bg-blue-500 border border-blue-400 text-white"
                                } disabled:opacity-50`}
                            >
                                {status === "sending" ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : status === "success" ? (
                                    <><CheckCircle2 size={20} /> Sent Successfully</>
                                ) : (
                                    <><Send size={18} /> Send Message</>
                                )}
                            </button>
                        </form>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
}