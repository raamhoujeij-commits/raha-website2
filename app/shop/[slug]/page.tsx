import { notFound } from "next/navigation";
import products from "@/data/products.json";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return {};
  return {
    title: `${product.name} — RAHA`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const others = products.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-3 font-cormorant text-xs tracking-widest text-cream/30 uppercase">
          <Link href="/shop" className="hover:text-gold transition-colors duration-300">
            Shop
          </Link>
          <span className="text-cream/15">·</span>
          <span className="text-cream/50">{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-black/30 border border-gold/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-ember/10" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-ember/5 blur-[80px]" />
              <div className="text-center space-y-4 relative z-10">
                <p className="font-cormorant font-light text-8xl text-gold/10 leading-none tracking-widest">
                  {product.name.charAt(0)}
                </p>
                <p className="font-cormorant text-3xl text-gold/20 tracking-widest" dir="rtl">
                  {product.arabic}
                </p>
              </div>
            </div>
            {/* Intensity badge */}
            <div className="absolute top-6 left-6">
              <span className="font-cormorant text-xs tracking-widest2 text-gold/60 border border-gold/25 px-3 py-1 uppercase bg-black/40 backdrop-blur-sm">
                {product.intensity}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8 lg:pt-4">
            <div className="space-y-3">
              <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">
                {product.scent_type} · {product.weight_g}g
              </p>
              <h1 className="font-cormorant font-light text-4xl md:text-5xl tracking-wider text-cream/90">
                {product.name}
              </h1>
              <p className="font-cormorant text-xl text-gold/35 tracking-widest" dir="rtl">
                {product.arabic}
              </p>
              <p className="font-cormorant text-sm tracking-widest text-cream/35 uppercase">
                {product.tagline}
              </p>
            </div>

            <div className="h-px bg-gold/10 w-full" />

            <p className="font-cormorant font-light text-lg text-cream/60 leading-relaxed tracking-wide">
              {product.description}
            </p>

            {/* Scent notes */}
            <div className="space-y-3">
              <p className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase">Scent Notes</p>
              <div className="flex flex-wrap gap-2">
                {product.scent_notes.map((note) => (
                  <span
                    key={note}
                    className="font-cormorant text-sm tracking-wider text-cream/50 border border-cream/10 px-4 py-1.5"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* How to use */}
            <div className="space-y-3 border-l border-gold/20 pl-6">
              <p className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase">How to Use</p>
              <p className="font-cormorant font-light text-base text-cream/45 leading-relaxed tracking-wide">
                {product.how_to_use}
              </p>
            </div>

            {/* Price + CTA */}
            <div className="space-y-5 pt-2">
              <div>
                <p className="font-cormorant text-3xl tracking-wider text-gold">
                  {product.price_sek.toLocaleString("sv-SE")} kr
                </p>
                <p className="font-cormorant text-xs text-cream/25 tracking-wider mt-1">
                  Incl. VAT · Free shipping over 1 000 kr
                </p>
              </div>
              <AddToCartButton product={product} />
            </div>

            {/* Stock note */}
            {product.stock < 15 && (
              <p className="font-cormorant text-xs tracking-wider text-ember/60 uppercase">
                Only {product.stock} left in stock
              </p>
            )}
          </div>
        </div>

        {/* You may also like */}
        {others.length > 0 && (
          <div className="mt-32 border-t border-gold/10 pt-20">
            <h2 className="font-cormorant font-light text-2xl tracking-widest text-center text-cream/50 mb-12 uppercase">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/shop/${other.id}`}
                  className="group border border-gold/10 hover:border-gold/30 p-6 transition-all duration-500 flex items-center gap-6"
                >
                  <div className="w-16 h-16 bg-black/50 border border-gold/10 flex-shrink-0 flex items-center justify-center">
                    <span className="font-cormorant text-2xl text-gold/15">{other.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant text-lg tracking-wider text-cream/70 group-hover:text-gold-light transition-colors">
                      {other.name}
                    </p>
                    <p className="font-cormorant text-sm text-cream/30 tracking-wider uppercase">{other.tagline}</p>
                  </div>
                  <p className="font-cormorant text-base text-gold/60 whitespace-nowrap">
                    {other.price_sek.toLocaleString("sv-SE")} kr
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
