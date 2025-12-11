import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Lokasi Toko", href: "/lokasi" },
    { label: "Layanan", href: "/layanan" },
    { label: "Kontak", href: "/kontak" },
  ];

  const productLinks = [
    { label: "Cetak Pas Foto", href: "/layanan" },
    { label: "Wall Decor & Frame", href: "/layanan" },
    { label: "Foto Studio", href: "/layanan" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Branding */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo/ssfoto-logo.png"
                alt="SS Foto Digital Lab"
                width={160}
                height={45}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Melayani kebutuhan fotografi keluarga Indonesia sejak 1986.
              Kualitas lab profesional, hasil tahan puluhan tahun.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/ssfoto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-[#ea2423] rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram SS Foto"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/ssfoto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-[#ea2423] rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook SS Foto"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Layanan Populer</h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Jl. Balai Pustaka Timur No.11, Rawamangun, Jakarta Timur
                  13220
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#ea2423] flex-shrink-0" />
                <a
                  href="tel:+6281936444486"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +62 819-3644-4486
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ea2423] flex-shrink-0" />
                <a
                  href="mailto:info@ssfoto.co.id"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  info@ssfoto.co.id
                </a>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/6281936444486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} SS Foto Digital Lab. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
