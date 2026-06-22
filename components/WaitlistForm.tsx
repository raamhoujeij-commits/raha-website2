"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You have been added to our exclusive waitlist. We will be in touch.");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to reach the server. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 bg-transparent border border-gold/30 text-cream font-cormorant text-base tracking-wider px-4 py-3 placeholder:text-cream/30 focus:outline-none focus:border-gold/70 transition-colors duration-300"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-transparent border border-gold/30 text-cream font-cormorant text-base tracking-wider px-4 py-3 placeholder:text-cream/30 focus:outline-none focus:border-gold/70 transition-colors duration-300"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full border border-gold/60 text-gold font-cormorant text-sm tracking-widest py-3 hover:bg-gold/10 hover:border-gold transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "loading"
          ? "JOINING..."
          : status === "success"
          ? "JOINED"
          : "JOIN THE WAITLIST"}
      </button>

      {message && (
        <p
          className={`font-cormorant text-sm tracking-wider text-center transition-opacity duration-500 ${
            status === "success" ? "text-gold/80" : "text-ember"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
