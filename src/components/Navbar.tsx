import Link from 'next/link';

export default function Navbar() {
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Experience', href: '#experience' },
        { name: 'About', href: '#about' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="text-xl font-bold text-slate-900">
                    <Link href="#home">DevPortfolio</Link>
                </div>

                <ul className="flex gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}