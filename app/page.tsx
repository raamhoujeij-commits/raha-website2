import Link from "next/link";
import products from "@/data/products.json";
import FeaturedProductCard from "@/components/FeaturedProductCard";

export default function HomePage() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ember/5 blur-[120px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-gold/5 blur-[100px] animate-glow-pulse animate-delay-400" />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-3xl">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/60 animate-fade-in opacity-0-start uppercase">
            Stockholm · Est. 2024
          </p>

          <h1 className="font-cormorant font-light text-[clamp(5rem,18vw,12rem)] leading-none tracking-widest text-gold-gradient animate-fade-in opacity-0-start animate-delay-200">
            RAHA
          </h1>

          <div className="flex items-center gap-4 justify-center animate-fade-in opacity-0-start animate-delay-400">
            <div className="h-px w-16 bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-px w-16 bg-gold/30" />
          </div>

          <p className="font-cormorant font-light text-xl md:text-2xl tracking-widest text-cream/70 animate-fade-up opacity-0-start animate-delay-600">
            Scent your space. Scent yourself.
          </p>
          <p className="font-cormorant font-light text-base tracking-wider text-cream/40 max-w-sm mx-auto animate-fade-up opacity-0-start animate-delay-800">
            Gulf tradition reimagined for the European home. Bakhoor as it was always meant to be.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-up opacity-0-start" style={{ animationDelay: "1000ms" }}>
            <Link
              href="/shop"
              className="font-cormorant text-sm tracking-widest uppercase px-10 py-4 border border-gold/50 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-500"
            >
              Shop the Collection
            </Link>
            <Link
              href="/about"
              className="font-cormorant text-sm tracking-widest uppercase px-10 py-4 border border-cream/15 text-cream/50 hover:border-cream/30 hover:text-cream/70 transition-all duration-500"
            >
              Our Story
            </Link>
          </div>
        </div>

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

      {/* Featured products */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">The Collection</p>
            <h2 className="font-cormorant font-light text-4xl md:text-5xl tracking-wider text-cream/80">
              Featured Blends
            </h2>
            <p className="font-cormorant font-light text-base text-cream/35 max-w-md mx-auto tracking-wider">
              Three of our four bakhoor blends — each designed for a different moment in the day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <FeaturedProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block font-cormorant text-xs tracking-widest2 text-gold/70 border border-gold/30 px-10 py-3 hover:bg-gold/10 hover:border-gold transition-all duration-500 uppercase"
            >
              View All Blends
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story snippet */}
      <section className="py-24 px-6 border-t border-gold/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            {/* Decorative */}
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent mb-10" />
            <div className="space-y-6">
              <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">Our Story</p>
              <h2 className="font-cormorant font-light text-3xl md:text-4xl tracking-wider text-cream/80 leading-snug">
                A tradition carried across centuries
              </h2>
              <p className="font-cormorant font-light text-lg text-cream/45 leading-relaxed tracking-wide">
                RAHA — رَاحَة — means calm, comfort, rest. We founded RAHA in Stockholm to bring the
                ancient art of bakhoor to European homes, without compromise on craft or character.
              </p>
              <Link
                href="/about"
                className="inline-block font-cormorant text-xs tracking-widest2 text-gold/60 border-b border-gold/30 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-300 uppercase"
              >
                Read our story
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "ORIGIN", desc: "Gulf-sourced from master blenders" },
              { label: "CRAFT", desc: "Small-batch, hand-formed" },
              { label: "INTENTION", desc: "Minimal packaging, maximum presence" },
              { label: "EUROPE", desc: "Stockholm first, then the continent" },
            ].map(({ label, desc }) => (
              <div key={label} className="border border-gold/10 p-5 space-y-2">
                <p className="font-cormorant text-xs tracking-widest2 text-gold/50 uppercase">{label}</p>
                <p className="font-cormorant font-light text-sm text-cream/35 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
