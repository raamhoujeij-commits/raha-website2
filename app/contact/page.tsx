"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg("Your message has been received. We will respond within 48 hours.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Unable to send your message. Please try again.");
    }
  };

  const inputClass =
    "w-full bg-transparent border border-gold/25 text-cream font-cormorant text-base tracking-wider px-4 py-3 placeholder:text-cream/25 focus:outline-none focus:border-gold/60 transition-colors duration-300";

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <p className="font-cormorant text-xs tracking-widest3 text-gold/50 uppercase">Get in Touch</p>
          <h1 className="font-cormorant font-light text-5xl md:text-6xl tracking-wider text-cream/90">
            Contact
          </h1>
          <p className="font-cormorant font-light text-base text-cream/40 tracking-wider">
            For wholesale, press, or collaboration enquiries.
          </p>
          <div className="flex items-center gap-4 justify-center pt-2">
            <div className="h-px w-12 bg-gold/30" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-px w-12 bg-gold/30" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-black">
              Select a subject
            </option>
            {["General Enquiry", "Wholesale & Retail", "Press & Media", "Collaboration", "Other"].map((s) => (
              <option key={s} value={s} className="bg-black">
                {s}
              </option>
            ))}
          </select>

          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className={`${inputClass} resize-none`}
          />

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full border border-gold/50 text-gold font-cormorant text-sm tracking-widest py-4 hover:bg-gold/10 hover:border-gold transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed uppercase"
          >
            {status === "loading" ? "Sending..." : status === "success" ? "Sent" : "Send Message"}
          </button>

          {msg && (
            <p
              className={`font-cormorant text-sm tracking-wider text-center ${
                status === "success" ? "text-gold/70" : "text-ember"
              }`}
            >
              {msg}
            </p>
          )}
        </form>

        {/* Direct contact */}
        <div className="mt-16 border-t border-gold/10 pt-12 text-center space-y-3">
          <p className="font-cormorant text-xs tracking-widest2 text-cream/30 uppercase">Direct</p>
          <p className="font-cormorant text-base text-gold/60 tracking-wider">hello@rahascent.com</p>
          <p className="font-cormorant text-sm text-cream/30 tracking-wide">Stockholm, Sweden</p>
        </div>
      </div>
    </div>
  );
}
