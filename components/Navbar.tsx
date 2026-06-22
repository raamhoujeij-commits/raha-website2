"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-gold-dim" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-cormorant text-2xl tracking-widest2 text-gold hover:text-gold-light transition-colors duration-300"
        >
          RAHA
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-10">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-cormorant text-sm tracking-widest font-light transition-colors duration-300 ${
                  pathname === href
                    ? "text-gold"
                    : "text-cream/60 hover:text-gold-light"
                }`}
              >
                {label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gold/80 hover:text-gold transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px bg-current mb-1.5 transition-all" />
          <span className="block w-4 h-px bg-current mb-1.5 ml-auto transition-all" />
          <span className="block w-6 h-px bg-current transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gold-dim px-6 py-6">
          <ul className="flex flex-col gap-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`font-cormorant text-lg tracking-widest transition-colors duration-300 ${
                    pathname === href ? "text-gold" : "text-cream/60 hover:text-gold"
                  }`}
                >
                  {label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
