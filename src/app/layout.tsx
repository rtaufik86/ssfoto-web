import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "SS Foto Digital Lab | Cetak Foto Premium Sejak 1986",
  description: "Studio foto profesional dan digital lab terpercaya. Cetak foto kualitas lab, pas foto kilat, photobook premium, custom frame. 5 cabang di Jakarta.",
  keywords: "cetak foto, pas foto, foto studio, photobook, frame foto, digital lab, Jakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased bg-white text-gray-900 flex flex-col min-h-screen`}>
        <CustomCursor />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
