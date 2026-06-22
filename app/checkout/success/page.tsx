"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-[100px] animate-glow-pulse" />
      </div>

      <div className="relative z-10 max-w-lg space-y-8 animate-fade-up">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border border-gold/30 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-12 bg-gold/30" />
          <div className="w-1 h-1 rounded-full bg-gold/50" />
          <div className="h-px w-12 bg-gold/30" />
        </div>

        <div className="space-y-4">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">
            Order Confirmed
          </p>
          <h1 className="font-cormorant font-light text-4xl md:text-5xl tracking-wider text-cream/90">
            Thank You
          </h1>
          <p className="font-cormorant font-light text-lg text-cream/50 leading-relaxed tracking-wide">
            Your order has been received. A confirmation has been sent to your email address.
          </p>
        </div>

        {paymentIntent && (
          <div className="border border-gold/15 px-6 py-4">
            <p className="font-cormorant text-xs tracking-widest text-cream/25 uppercase">
              Reference
            </p>
            <p className="font-cormorant text-sm text-cream/40 tracking-widest mt-1 font-light">
              {paymentIntent}
            </p>
          </div>
        )}

        <div className="space-y-4 border-t border-gold/10 pt-8">
          <p className="font-cormorant font-light text-base text-cream/40 tracking-wide">
            Your bakhoor will be dispatched within 1–2 business days. You will receive a shipping notification by email.
          </p>
          <p className="font-cormorant font-light text-sm text-cream/30 tracking-wide">
            Delivered in carbon-neutral packaging from Stockholm.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/shop"
            className="font-cormorant text-sm tracking-widest uppercase px-8 py-3 border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-500"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="font-cormorant text-sm tracking-widest uppercase px-8 py-3 border border-cream/10 text-cream/40 hover:text-cream/60 hover:border-cream/20 transition-all duration-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-cormorant text-cream/30 tracking-widest">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
