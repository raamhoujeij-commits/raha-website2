"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({
  clientSecret,
  customer,
}: {
  clientSecret: string;
  customer: { name: string; email: string; address: string; city: string; postcode: string };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { clearCart } = useCartStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: customer.name,
            email: customer.email,
            address: {
              line1: customer.address,
              city: customer.city,
              postal_code: customer.postcode,
              country: "SE",
            },
          },
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message || "Payment failed. Please try again.");
      setLoading(false);
    } else {
      clearCart();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="font-cormorant text-xs tracking-widest2 text-gold/50 uppercase mb-4">
          Payment Details
        </p>
        <div className="border border-gold/20 p-4 bg-black/30">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </div>

      {error && (
        <p className="font-cormorant text-sm tracking-wider text-ember/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full font-cormorant text-sm tracking-widest uppercase py-4 border border-gold/50 text-gold bg-gold/5 hover:bg-gold/15 hover:border-gold transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Complete Purchase"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [step, setStep] = useState<"details" | "payment">("details");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "Sweden",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (items.length === 0) router.push("/shop");
  }, [items, router]);

  const inputClass =
    "w-full bg-transparent border border-gold/25 text-cream font-cormorant text-base tracking-wider px-4 py-3 placeholder:text-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300";

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err) {
      setError("Unable to initiate checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center space-y-3">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">
            Secure Checkout
          </p>
          <h1 className="font-cormorant font-light text-4xl md:text-5xl tracking-wider text-cream/90">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — form */}
          <div className="lg:col-span-3">
            {step === "details" ? (
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div>
                  <p className="font-cormorant text-xs tracking-widest2 text-gold/50 uppercase mb-4">
                    Contact Information
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={customer.name}
                      onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                      required
                      className={inputClass}
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={customer.email}
                      onChange={(e) => setCustomer((p) => ({ ...p, email: e.target.value }))}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <p className="font-cormorant text-xs tracking-widest2 text-gold/50 uppercase mb-4">
                    Shipping Address
                  </p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Street address"
                      value={customer.address}
                      onChange={(e) => setCustomer((p) => ({ ...p, address: e.target.value }))}
                      required
                      className={inputClass}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Postcode"
                        value={customer.postcode}
                        onChange={(e) => setCustomer((p) => ({ ...p, postcode: e.target.value }))}
                        required
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={customer.city}
                        onChange={(e) => setCustomer((p) => ({ ...p, city: e.target.value }))}
                        required
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="text"
                      value={customer.country}
                      readOnly
                      className={`${inputClass} text-cream/30 cursor-not-allowed`}
                    />
                  </div>
                </div>

                {error && (
                  <p className="font-cormorant text-sm tracking-wider text-ember/80">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-cormorant text-sm tracking-widest uppercase py-4 border border-gold/50 text-gold bg-gold/5 hover:bg-gold/15 hover:border-gold transition-all duration-500 disabled:opacity-40"
                >
                  {loading ? "Loading..." : "Continue to Payment"}
                </button>
              </form>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  locale: "en",
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#C9A96E",
                      colorBackground: "#000000",
                      colorText: "#F5EDD6",
                      colorTextPlaceholder: "#F5EDD640",
                      colorDanger: "#C4622D",
                      fontFamily: "Cormorant Garamond, serif",
                      borderRadius: "0px",
                      spacingUnit: "4px",
                    },
                    rules: {
                      ".Input": {
                        border: "1px solid #C9A96E44",
                        backgroundColor: "transparent",
                        color: "#F5EDD6",
                      },
                      ".Input:focus": { border: "1px solid #C9A96E99" },
                      ".Label": { color: "#F5EDD640", letterSpacing: "0.1em" },
                      ".Tab": { border: "1px solid #C9A96E22", backgroundColor: "transparent" },
                      ".Tab--selected": { border: "1px solid #C9A96E66", backgroundColor: "#C9A96E0A" },
                    },
                  },
                }}
              >
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setStep("details")}
                    className="font-cormorant text-xs tracking-widest text-cream/30 hover:text-gold transition-colors uppercase flex items-center gap-2"
                  >
                    ← Back to Details
                  </button>
                  <div className="border border-gold/10 p-4 space-y-1">
                    <p className="font-cormorant text-sm text-cream/50 tracking-wider">{customer.name}</p>
                    <p className="font-cormorant text-sm text-cream/40 tracking-wider">{customer.email}</p>
                    <p className="font-cormorant text-sm text-cream/40 tracking-wider">
                      {customer.address}, {customer.postcode} {customer.city}
                    </p>
                  </div>
                </div>
                <CheckoutForm clientSecret={clientSecret} customer={customer} />
              </Elements>
            ) : null}
          </div>

          {/* Right — order summary */}
          <div className="lg:col-span-2">
            <div className="border border-gold/15 p-8 space-y-6 sticky top-32">
              <p className="font-cormorant text-xs tracking-widest2 text-gold/50 uppercase">
                Order Summary
              </p>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-cormorant text-base tracking-wider text-cream/70">
                        {item.name}
                      </p>
                      <p className="font-cormorant text-xs tracking-wider text-cream/30">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-cormorant text-sm text-cream/50 whitespace-nowrap">
                      {(item.price_sek * item.quantity).toLocaleString("sv-SE")} kr
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold/10 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-cormorant text-sm tracking-wider text-cream/40">Subtotal</span>
                  <span className="font-cormorant text-sm text-cream/60">
                    {totalPrice().toLocaleString("sv-SE")} kr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-cormorant text-sm tracking-wider text-cream/40">Shipping</span>
                  <span className="font-cormorant text-sm text-cream/40">
                    {totalPrice() >= 1000 ? "Free" : "Calculated at payment"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gold/15 pt-4 flex justify-between items-center">
                <span className="font-cormorant text-sm tracking-widest text-cream/50 uppercase">Total</span>
                <span className="font-cormorant text-2xl tracking-wider text-gold">
                  {totalPrice().toLocaleString("sv-SE")} kr
                </span>
              </div>

              <p className="font-cormorant text-xs tracking-wider text-cream/20 text-center">
                Payments processed securely by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
