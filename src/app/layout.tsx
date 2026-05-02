import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { GlobalSchema } from "@/components/schema";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SS Foto Digital Lab | Cetak Foto Premium Sejak 1986",
  description: "Studio foto profesional dan digital lab terpercaya. Cetak foto kualitas lab, pas foto kilat, photobook premium, custom frame. 5 cabang di Jakarta.",
  keywords: "cetak foto, pas foto, foto studio, photobook, frame foto, digital lab, Jakarta",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    images: [{
      url: "/api/og?title=SS%20Foto%20Digital%20Lab&subtitle=Premium%20Photo%20Printing%20Sejak%201986",
      width: 1200,
      height: 630,
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} antialiased bg-white flex flex-col min-h-screen`}>
        <GlobalSchema />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
