"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import products from "@/data/products.json";
import { useCartStore } from "@/store/cartStore";

const SCENT_TYPES = ["All", "Woody", "Floral", "Smoky", "Fresh"];
const PRICE_RANGES = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under 400 kr", min: 0, max: 400 },
  { label: "400–500 kr", min: 400, max: 500 },
  { label: "Over 500 kr", min: 500, max: Infinity },
];

export default function ShopPage() {
  const [scentFilter, setScentFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(0);
  const { addItem } = useCartStore();

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceFilter];
    return products.filter((p) => {
      const matchScent = scentFilter === "All" || p.scent_type === scentFilter;
      const matchPrice = p.price_sek >= range.min && p.price_sek <= range.max;
      return matchScent && matchPrice;
    });
  }, [scentFilter, priceFilter]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase animate-fade-in">
            The Collection
          </p>
          <h1 className="font-cormorant font-light text-5xl md:text-6xl tracking-wider text-cream/90 animate-fade-up">
            Shop
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

        {/* Filters */}
        <div className="mb-12 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between border-b border-gold/10 pb-8">
          {/* Scent type */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-cormorant text-xs tracking-widest2 text-cream/30 uppercase">Scent</span>
            {SCENT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setScentFilter(t)}
                className={`font-cormorant text-xs tracking-widest px-3 py-1 border transition-all duration-300 uppercase ${
                  scentFilter === t
                    ? "border-gold/60 text-gold bg-gold/10"
                    : "border-gold/15 text-cream/40 hover:border-gold/30 hover:text-cream/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-cormorant text-xs tracking-widest2 text-cream/30 uppercase">Price</span>
            {PRICE_RANGES.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setPriceFilter(i)}
                className={`font-cormorant text-xs tracking-wider px-3 py-1 border transition-all duration-300 ${
                  priceFilter === i
                    ? "border-gold/60 text-gold bg-gold/10"
                    : "border-gold/15 text-cream/40 hover:border-gold/30 hover:text-cream/60"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-xl text-cream/30 tracking-wider">
              No blends match your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="group border border-gold/15 hover:border-gold/35 transition-all duration-700 relative overflow-hidden animate-fade-up opacity-0-start"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Ambient hover glow */}
                <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Image placeholder */}
                <div className="relative h-64 bg-black/50 border-b border-gold/10 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-ember/5" />
                  <div className="text-center space-y-2 relative z-10">
                    <p className="font-cormorant text-5xl text-gold/15 font-light tracking-widest">
                      {product.name.charAt(0)}
                    </p>
                    <p className="font-cormorant text-sm text-gold/30 tracking-widest" dir="rtl">
                      {product.arabic}
                    </p>
                  </div>
                </div>

                <div className="p-8 space-y-5 relative z-10">
                  {/* Intensity + scent type */}
                  <div className="flex items-center justify-between">
                    <span className="font-cormorant text-xs tracking-widest2 text-gold/40 uppercase">
                      {product.intensity}
                    </span>
                    <span className="font-cormorant text-xs tracking-wider text-cream/25 border border-cream/10 px-2 py-0.5">
                      {product.scent_type}
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <h2 className="font-cormorant font-light text-2xl tracking-wider text-cream/90 group-hover:text-gold-light transition-colors duration-500">
                      {product.name}
                    </h2>
                    <p className="font-cormorant text-sm text-cream/30 uppercase tracking-widest mt-0.5">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-cormorant font-light text-base text-cream/50 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Notes */}
                  <div className="flex flex-wrap gap-2">
                    {product.scent_notes.slice(0, 3).map((note) => (
                      <span
                        key={note}
                        className="font-cormorant text-xs tracking-wider text-cream/35 border border-cream/10 px-3 py-1"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Price + actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="font-cormorant text-xl tracking-wider text-gold">
                        {product.price_sek.toLocaleString("sv-SE")} kr
                      </p>
                      <p className="font-cormorant text-xs text-cream/25 tracking-wider">
                        {product.weight_g}g · incl. VAT
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/shop/${product.id}`}
                        className="font-cormorant text-xs tracking-widest text-cream/40 hover:text-gold transition-colors duration-300 uppercase border-b border-cream/15 hover:border-gold pb-0.5"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price_sek: product.price_sek,
                          })
                        }
                        className="font-cormorant text-xs tracking-widest uppercase px-5 py-2 border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-500"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
