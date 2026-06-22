import WaitlistForm from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ember/5 blur-[120px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-gold/5 blur-[100px] animate-glow-pulse animate-delay-400" />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-3xl">
          {/* Eyebrow */}
          <p className="font-cormorant text-xs tracking-widest3 text-gold/60 animate-fade-in opacity-0-start uppercase">
            Stockholm · Est. 2024
          </p>

          {/* Brand name */}
          <h1 className="font-cormorant font-light text-[clamp(5rem,18vw,12rem)] leading-none tracking-widest text-gold-gradient animate-fade-in opacity-0-start animate-delay-200">
            RAHA
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-4 justify-center animate-fade-in opacity-0-start animate-delay-400">
            <div className="h-px w-16 bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-px w-16 bg-gold/30" />
          </div>

          {/* Tagline */}
          <p className="font-cormorant font-light text-xl md:text-2xl tracking-widest text-cream/70 animate-fade-up opacity-0-start animate-delay-600">
            Scent your space. Scent yourself.
          </p>
          <p className="font-cormorant font-light text-base tracking-wider text-cream/40 max-w-sm mx-auto animate-fade-up opacity-0-start animate-delay-800">
            Gulf tradition reimagined for the European home. Bakhoor as it was always meant to be.
          </p>

          {/* Waitlist */}
          <div className="pt-6 animate-fade-up opacity-0-start" style={{ animationDelay: "1000ms" }}>
            <p className="font-cormorant text-xs tracking-widest2 text-gold/50 uppercase mb-6">
              Be the first to know
            </p>
            <WaitlistForm />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0-start" style={{ animationDelay: "1400ms" }}>
          <span className="font-cormorant text-xs tracking-widest text-cream/20 uppercase">Discover</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/30 to-transparent" />
        </div>
      </section>

      {/* Values strip */}
      <section className="border-y border-gold/10 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            { title: "RITUAL", body: "Each burn is an act of intention — a pause in the modern rhythm." },
            { title: "HERITAGE", body: "Sourced from centuries-old Gulf tradition, refined for Nordic sensibility." },
            { title: "LUXURY", body: "Only the finest woods, resins, and botanicals, prepared without compromise." },
          ].map(({ title, body }) => (
            <div key={title} className="space-y-3">
              <h3 className="font-cormorant text-xs tracking-widest3 text-gold/70 uppercase">{title}</h3>
              <p className="font-cormorant font-light text-base text-cream/50 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teaser */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">Coming Soon</p>
          <h2 className="font-cormorant font-light text-4xl md:text-5xl tracking-wider text-cream/80">
            The Collection
          </h2>
          <p className="font-cormorant font-light text-lg text-cream/40 leading-relaxed">
            Three blends. Crafted for the morning, the evening, and the ceremony between.
          </p>
          <a
            href="/products"
            className="inline-block mt-4 font-cormorant text-xs tracking-widest2 text-gold/70 border-b border-gold/30 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-300 uppercase"
          >
            Preview the range
          </a>
        </div>
      </section>
    </>
  );
}
