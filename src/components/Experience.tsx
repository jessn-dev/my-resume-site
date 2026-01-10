export default function Experience() {
    // We will populate this array with your resume data later
    const jobs = [
        {
            company: "Tech Company A",
            role: "Senior Frontend Engineer",
            period: "2021 - Present",
            description: "Led the migration from legacy code to Next.js..."
        },
        {
            company: "Startup B",
            role: "Full Stack Developer",
            period: "2018 - 2021",
            description: "Built scalable APIs and managed AWS infrastructure..."
        },
    ];

    return (
        <section id="experience" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-3xl font-bold text-slate-900">Experience</h2>

                <div className="space-y-12">
                    {jobs.map((job, index) => (
                        <div key={index} className="group relative border-l-4 border-slate-200 pl-8 hover:border-blue-500 transition-colors">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-600">
                {job.period}
              </span>
                            <h3 className="text-xl font-bold text-slate-900">
                                {job.role} <span className="text-slate-500">at {job.company}</span>
                            </h3>
                            <p className="mt-4 text-slate-600 leading-relaxed">
                                {job.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}