"use client";

import { useRef, useState } from "react";
import { Send, Mail, MessageSquare, User, CheckCircle2 } from "lucide-react";
import { sendEmail } from "@/app/actions";

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
        <section id="contact" className="relative w-full bg-black py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    Get in <span className="text-blue-500">Touch</span>.
                </h2>
                <p className="text-xl text-white/40 font-light">
                    Have a job or project in mind or just want to say hi? My inbox is always open.
                </p>
            </div>

            <div className="max-w-2xl mx-auto">
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="space-y-6 bg-[#0d1117] p-8 rounded-2xl border border-white/10 shadow-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1">Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1">Message</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-white/20" size={18} />
                            <textarea
                                required
                                name="message"
                                rows={5}
                                placeholder="Your message here..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    <button
                        disabled={status === "sending"}
                        type="submit"
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            status === "success"
                                ? "bg-green-500 text-white"
                                : "bg-blue-600 hover:bg-blue-500 text-white"
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
        </section>
    );
}