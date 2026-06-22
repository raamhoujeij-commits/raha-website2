"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-black border-l border-gold/20 flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gold/15">
          <h2 className="font-cormorant text-sm tracking-widest3 text-gold/80 uppercase">
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="text-cream/40 hover:text-gold transition-colors duration-300"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent mx-auto" />
              <p className="font-cormorant text-xl tracking-wider text-cream/30">
                Your cart is empty
              </p>
              <p className="font-cormorant text-sm tracking-wider text-cream/20">
                Discover our collection
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-4 font-cormorant text-xs tracking-widest2 text-gold/60 border border-gold/30 px-6 py-2 hover:bg-gold/10 hover:border-gold transition-all duration-500 uppercase"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-start gap-5 border-b border-gold/10 pb-6">
                {/* Placeholder image */}
                <div className="w-16 h-16 bg-gold/5 border border-gold/15 flex-shrink-0 flex items-center justify-center">
                  <span className="font-cormorant text-xs text-gold/30 tracking-wider">
                    {item.name.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-cormorant text-base tracking-wider text-cream/80">{item.name}</p>
                  <p className="font-cormorant text-sm tracking-wider text-gold/60 mt-0.5">
                    {item.price_sek.toLocaleString("sv-SE")} kr
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 border border-gold/25 text-cream/50 hover:border-gold/50 hover:text-gold transition-colors flex items-center justify-center font-cormorant text-sm"
                    >
                      −
                    </button>
                    <span className="font-cormorant text-sm tracking-wider text-cream/60 min-w-[1.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 border border-gold/25 text-cream/50 hover:border-gold/50 hover:text-gold transition-colors flex items-center justify-center font-cormorant text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right space-y-3">
                  <p className="font-cormorant text-sm text-cream/50">
                    {(item.price_sek * item.quantity).toLocaleString("sv-SE")} kr
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-cream/20 hover:text-ember transition-colors text-xs tracking-wider font-cormorant uppercase"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-gold/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-cormorant text-sm tracking-widest text-cream/40 uppercase">Subtotal</span>
              <span className="font-cormorant text-xl tracking-wider text-gold">
                {totalPrice().toLocaleString("sv-SE")} kr
              </span>
            </div>
            <p className="font-cormorant text-xs tracking-wider text-cream/25">
              Shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center font-cormorant text-sm tracking-widest uppercase py-4 bg-gold/10 border border-gold/50 text-gold hover:bg-gold/20 hover:border-gold transition-all duration-500"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
