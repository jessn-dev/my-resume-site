import {
    Code2,
    Server,
    Dumbbell,
    ShieldCheck,
    Terminal,
    Cpu
} from "lucide-react"; // You might need to install: npm install lucide-react

export default function About() {
    return (
        <section id="about" className="py-24 bg-slate-950 text-slate-300">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Beyond the <span className="text-blue-500">Code</span>.
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-400">
                        I am a Senior Developer with a passion for secure architecture and high-performance systems.
                        My philosophy is simple: build robustly, document clearly, and never stop learning.
                    </p>
                </div>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: The Main Narrative (Spans 2 columns) */}
                    <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Code2 className="w-6 h-6 text-blue-400" />
                            <h3 className="text-xl font-semibold text-white">Full Stack Engineering</h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            With over 8 years of experience, I specialize in the JavaScript ecosystem.
                            I don't just write functions; I architect scalable solutions that can handle
                            complex business logic without breaking a sweat.
                        </p>
                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2">
                            {["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "AWS"].map((tech) => (
                                <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {tech}
                </span>
                            ))}
                        </div>
                    </div>

                    {/* Card 2: The "Lab" / Infrastructure Interest */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Server className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-xl font-semibold text-white">The Home Lab</h3>
                            </div>
                            <p className="text-slate-400 text-sm">
                                I am a practitioner at heart. I maintain a fully segmented home lab designed to simulate
                                real-world threats and test infrastructure. This controlled environment allows me to rigorously
                                experiment with <strong> networking, virtualization, penetration testing, and hybrid cloud services </strong> while
                                analyzing attack vectors and vulnerabilities firsthand.
                            </p>
                        </div>
                        {/* Abstract visual decoration */}
                        <Server className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-800/50 group-hover:text-emerald-900/20 transition-colors" />
                    </div>

                    {/* Card 3: Security Mindset */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-6 h-6 text-purple-400" />
                            <h3 className="text-xl font-semibold text-white">Security First</h3>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Code is only as good as it is secure. I actively study cybersecurity principles
                            (currently exploring CySA+ topics) to ensure my applications are hardened against vulnerabilities.
                        </p>
                    </div>

                    {/* Card 4: Mentorship / Terminal */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal className="w-6 h-6 text-orange-400" />
                            <h3 className="text-xl font-semibold text-white">DevOps & CI/CD</h3>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Automating the boring stuff allows us to focus on what matters. I build robust
                            pipelines ensuring smooth deployments from commit to production.
                        </p>
                    </div>

                    {/* Card 5: Discipline / Bodybuilding (Spans 1 column) */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors group">
                        <div className="flex items-center gap-3 mb-4">
                            <Dumbbell className="w-6 h-6 text-red-400" />
                            <h3 className="text-xl font-semibold text-white">Discipline</h3>
                        </div>
                        <p className="text-slate-400 text-sm">
                            The consistency required for bodybuilding mirrors the discipline needed for
                            clean code. Iteration, patience, and progressive overload apply to both the gym and the codebase.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}