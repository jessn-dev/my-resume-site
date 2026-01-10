import Link from 'next/link';

export default function Navbar() {
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Experience', href: '#experience' },
        { name: 'About', href: '#about' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full pt-6 transition-all duration-300">
            {/* RESTORED: max-w-5xl (Standard Width) */}
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">

                {/* TEXT LOGO */}
                <div className="flex items-center">
                    <Link href="#home" className="group">
            <span className="text-3xl font-black tracking-tighter text-white transition-opacity hover:opacity-80">
              jbn<span className="text-blue-500">.</span>
            </span>
                    </Link>
                </div>

                {/* NAV LINKS */}
                <ul className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm font-bold text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all uppercase tracking-wide"
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