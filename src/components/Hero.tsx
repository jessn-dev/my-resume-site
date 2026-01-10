export default function Hero() {
    return (
        <section id="home" className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-12">
            <div className="container mx-auto px-4">
        <span className="mb-4 block text-lg font-medium text-blue-600">
          Hello, I am
        </span>
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                    [Your Name Here]
                </h1>
                <p className="mb-8 max-w-2xl text-xl text-slate-600">
                    A Senior Developer turning complex problems into elegant solutions.
                    [Resume summary will go here].
                </p>
                <div className="flex gap-4">
                    <a href="#contact" className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-all">
                        Contact Me
                    </a>
                    <a href="#experience" className="rounded-lg border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50 transition-all">
                        View Work
                    </a>
                </div>
            </div>
        </section>
    );
}