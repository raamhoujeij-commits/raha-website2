"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  name: string;
  price_sek: number;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price_sek: product.price_sek });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full font-cormorant text-sm tracking-widest uppercase py-4 border transition-all duration-500 ${
        added
          ? "border-gold bg-gold/15 text-gold"
          : "border-gold/50 text-gold bg-gold/5 hover:bg-gold/15 hover:border-gold"
      }`}
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
