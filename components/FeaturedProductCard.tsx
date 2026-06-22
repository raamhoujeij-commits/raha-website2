"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  name: string;
  arabic: string;
  tagline: string;
  description: string;
  scent_notes: string[];
  intensity: string;
  price_sek: number;
}

export default function FeaturedProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { addItem } = useCartStore();

  return (
    <div
      className="group border border-gold/15 hover:border-gold/30 transition-all duration-700 relative overflow-hidden animate-fade-up opacity-0-start"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image placeholder */}
      <div className="h-56 bg-black/50 border-b border-gold/10 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-ember/5" />
        <div className="text-center relative z-10">
          <p className="font-cormorant text-6xl text-gold/10 font-light leading-none">{product.name.charAt(0)}</p>
          <p className="font-cormorant text-lg text-gold/20 mt-2 tracking-widest" dir="rtl">{product.arabic}</p>
        </div>
      </div>

      <div className="p-6 space-y-4 relative z-10">
        <span className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase">
          {product.intensity}
        </span>

        <div>
          <h3 className="font-cormorant font-light text-xl tracking-wider text-cream/85 group-hover:text-gold-light transition-colors duration-500">
            {product.name}
          </h3>
          <p className="font-cormorant text-xs tracking-widest text-cream/30 uppercase mt-0.5">
            {product.tagline}
          </p>
        </div>

        <p className="font-cormorant font-light text-sm text-cream/45 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <p className="font-cormorant text-lg tracking-wider text-gold">
            {product.price_sek.toLocaleString("sv-SE")} kr
          </p>
          <div className="flex gap-3">
            <Link
              href={`/shop/${product.id}`}
              className="font-cormorant text-xs tracking-widest text-cream/35 hover:text-gold transition-colors uppercase border-b border-cream/10 hover:border-gold pb-0.5"
            >
              Details
            </Link>
            <button
              onClick={() =>
                addItem({ id: product.id, name: product.name, price_sek: product.price_sek })
              }
              className="font-cormorant text-xs tracking-widest uppercase px-4 py-1.5 border border-gold/35 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-500"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
