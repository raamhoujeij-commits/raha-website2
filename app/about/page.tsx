export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center space-y-4">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase animate-fade-in">
            Our Story
          </p>
          <h1 className="font-cormorant font-light text-5xl md:text-6xl tracking-wider text-cream/90 animate-fade-up">
            About RAHA
          </h1>
          <div className="flex items-center gap-4 justify-center pt-2">
            <div className="h-px w-12 bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-px w-12 bg-gold/30" />
          </div>
        </div>

        {/* Story */}
        <div className="space-y-12 text-cream/60 font-cormorant font-light text-lg leading-[1.9] tracking-wide">
          <p className="animate-fade-up">
            Bakhoor — the ancient art of incense — has perfumed homes across the Arabian Peninsula for
            millennia. It is woven into memory: the warmth before a guest arrives, the smoke that rises
            at the end of a long day, the ritual that signals rest, celebration, or reflection.
          </p>

          <div className="border-l border-gold/30 pl-8 py-2">
            <p className="text-xl md:text-2xl text-cream/80 italic font-light tracking-wider leading-relaxed">
              "RAHA" — رَاحَة — means calm, comfort, rest. It is the feeling we set out to create.
            </p>
          </div>

          <p className="animate-fade-up animate-delay-200">
            Founded in Stockholm, RAHA was born from a simple question: why does such a rich tradition
            remain so unknown in Europe? We grew up with bakhoor in our homes. We know what it means
            to light a charcoal, to watch the smoke curl through a room, to let the scent linger in fabric
            and memory alike. We wanted to bring that experience here — not as an exotic curiosity, but
            as a considered luxury for everyday ritual.
          </p>

          <p className="animate-fade-up animate-delay-400">
            We work directly with master blenders in the Gulf to source only the finest oud woods, amber
            resins, and botanicals. Every RAHA blend is formulated with both tradition and the modern
            European home in mind — notes that are rich without being overwhelming, persistent without
            being suffocating.
          </p>

          <p className="animate-fade-up animate-delay-600">
            We are launching first in Sweden, then across Scandinavia and Europe. For us, this is not a
            product launch. It is an introduction — of a culture, a ritual, and a different way of
            being at home.
          </p>
        </div>

        {/* Values */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-gold/10 pt-16">
          {[
            {
              label: "ORIGIN",
              text: "All blends sourced from traditional Gulf master blenders. No synthetic substitutes.",
            },
            {
              label: "CRAFT",
              text: "Small-batch production. Each piece of bakhoor is hand-formed and slow-dried.",
            },
            {
              label: "INTENTION",
              text: "Designed to integrate into modern life — not perform. Minimal packaging, maximum presence.",
            },
            {
              label: "EXPANSION",
              text: "Launching in Stockholm 2024. Expanding to Oslo, Copenhagen, Amsterdam, and London.",
            },
          ].map(({ label, text }) => (
            <div key={label} className="space-y-3">
              <h3 className="font-cormorant text-xs tracking-widest3 text-gold/60 uppercase">{label}</h3>
              <p className="font-cormorant font-light text-base text-cream/50 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
