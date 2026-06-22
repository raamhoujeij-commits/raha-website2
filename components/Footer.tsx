import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 py-14 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-cormorant text-2xl tracking-widest2 text-gold/70">RAHA</span>
            <p className="font-cormorant font-light text-sm text-cream/30 leading-relaxed tracking-wide max-w-xs">
              Gulf tradition reimagined for the modern European home. Bakhoor as it was always meant to be.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase">Navigate</p>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-cormorant text-sm tracking-wider text-cream/35 hover:text-gold transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase">Contact</p>
            <p className="font-cormorant text-sm text-gold/50 tracking-wider">hello@rahascent.com</p>
            <p className="font-cormorant text-sm text-cream/25 tracking-wide">Stockholm, Sweden</p>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-cormorant text-xs tracking-widest text-cream/20">
            © {new Date().getFullYear()} RAHA. ALL RIGHTS RESERVED.
          </p>
          <p className="font-cormorant text-xs tracking-wider text-cream/15">
            Payments secured by Stripe · Ships from Stockholm
          </p>
        </div>
      </div>
    </footer>
  );
}
