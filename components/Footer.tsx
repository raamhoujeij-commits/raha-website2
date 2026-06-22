export default function Footer() {
  return (
    <footer className="border-t border-gold/20 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-cormorant text-xl tracking-widest2 text-gold/70">RAHA</span>
        <p className="font-cormorant text-sm tracking-widest text-cream/30 text-center">
          © {new Date().getFullYear()} RAHA. ALL RIGHTS RESERVED.
        </p>
        <p className="font-cormorant text-sm tracking-wider text-cream/30">
          STOCKHOLM, SWEDEN
        </p>
      </div>
    </footer>
  );
}
