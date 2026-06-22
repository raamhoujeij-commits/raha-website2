import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RAHA — Luxury Bakhoor",
  description:
    "RAHA is a luxury Arabic incense brand rooted in Gulf tradition, reimagined for the modern European home. Launching in Sweden.",
  keywords: ["bakhoor", "arabic incense", "luxury", "Sweden", "oud", "RAHA"],
  openGraph: {
    title: "RAHA — Luxury Bakhoor",
    description: "Scent your space. Scent yourself.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
