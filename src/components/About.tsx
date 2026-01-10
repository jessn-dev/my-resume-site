export default function About() {
    return (
        <section id="about" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-3xl font-bold text-slate-900">About Me</h2>
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div>
                        {/* Placeholder for an image later */}
                        <div className="aspect-square w-full max-w-md rounded-2xl bg-slate-200"></div>
                    </div>
                    <div>
                        <p className="mb-6 text-lg text-slate-600 leading-relaxed">
                            [Long form bio goes here]. I am passionate about building accessible,
                            pixel-perfect, performant web applications.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            When I'm not coding, you can find me [Hobby 1], [Hobby 2], or [Hobby 3].
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}