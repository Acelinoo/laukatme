import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Laukatme — Seafood Mentah & Segar Langsung Dari Nelayan",
  description:
    "Toko online seafood mentah dan segar dengan kustomisasi jenis potongan gratis dan pengiriman cepat via WhatsApp. Kualitas terjamin dari pesisir pantai.",
  keywords: ["seafood segar", "ikan segar", "udang", "cumi", "kerang", "fillet ikan", "kustomisasi potongan", "Laukatme"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-sand-beige text-deep-ocean-brown font-sans">
        {children}
      </body>
    </html>
  );
}
