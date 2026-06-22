const products = [
  {
    id: 1,
    name: "Oud Al Layali",
    arabic: "عود الليالي",
    tagline: "Nights of Oud",
    description:
      "A deep, resinous blend of aged agarwood and warm amber. Burns long and slowly, leaving a trail of dark sweetness that lingers through the night.",
    notes: ["Agarwood", "Dark Amber", "Musk", "Sandalwood"],
    intensity: "DEEP",
  },
  {
    id: 2,
    name: "Zahrat Al Sabah",
    arabic: "زهرة الصباح",
    tagline: "Morning Flower",
    description:
      "A lighter, floral bakhoor for the morning ritual. Rose water and white oud open the senses gently, like sunlight through silk curtains.",
    notes: ["White Oud", "Rose", "Jasmine", "Light Musk"],
    intensity: "LIGHT",
  },
  {
    id: 3,
    name: "Ramad",
    arabic: "رماد",
    tagline: "Ember & Ash",
    description:
      "Our most modern blend. Smoky, dry, with an edge of burnt wood and vetiver. For those who wear their home like a signature.",
    notes: ["Burnt Wood", "Vetiver", "Benzoin", "Black Pepper"],
    intensity: "BOLD",
  },
  {
    id: 4,
    name: "Nour",
    arabic: "نور",
    tagline: "Light",
    description:
      "A luminous, transparent blend. Citrus woods and light resins create a clean, radiant smoke — effortless for daily use in any European interior.",
    notes: ["Citrus Wood", "Light Resin", "Bergamot", "White Musk"],
    intensity: "FRESH",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center space-y-4">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">
            The Collection
          </p>
          <h1 className="font-cormorant font-light text-5xl md:text-6xl tracking-wider text-cream/90">
            Our Blends
          </h1>
          <p className="font-cormorant font-light text-base text-cream/40 max-w-md mx-auto tracking-wider">
            Four bakhoor blends, each crafted for a different moment in the day.
          </p>
          <div className="flex items-center gap-4 justify-center pt-2">
            <div className="h-px w-12 bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-px w-12 bg-gold/30" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="group border border-gold/15 p-8 hover:border-gold/35 transition-all duration-700 relative overflow-hidden"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Ambient hover glow */}
              <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Coming soon badge */}
              <div className="absolute top-6 right-6">
                <span className="font-cormorant text-xs tracking-widest text-ember/80 border border-ember/30 px-2 py-1 uppercase">
                  Coming Soon
                </span>
              </div>

              <div className="space-y-5 relative z-10">
                {/* Intensity */}
                <span className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase">
                  {product.intensity}
                </span>

                {/* Name */}
                <div>
                  <h2 className="font-cormorant font-light text-3xl tracking-wider text-cream/90 group-hover:text-gold-light transition-colors duration-500">
                    {product.name}
                  </h2>
                  <p className="font-cormorant text-lg text-gold/40 mt-0.5" dir="rtl">
                    {product.arabic}
                  </p>
                  <p className="font-cormorant text-sm tracking-widest text-cream/35 uppercase mt-1">
                    {product.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="font-cormorant font-light text-base text-cream/50 leading-relaxed">
                  {product.description}
                </p>

                {/* Notes */}
                <div className="pt-2">
                  <p className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase mb-3">
                    Notes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="font-cormorant text-xs tracking-wider text-cream/40 border border-cream/10 px-3 py-1"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center space-y-4 border-t border-gold/10 pt-16">
          <p className="font-cormorant font-light text-xl text-cream/50 tracking-wider">
            Reserve your place before we open.
          </p>
          <a
            href="/"
            className="inline-block font-cormorant text-xs tracking-widest2 text-gold/70 border border-gold/40 px-8 py-3 hover:bg-gold/10 hover:border-gold transition-all duration-500 uppercase"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </div>
  );
}
