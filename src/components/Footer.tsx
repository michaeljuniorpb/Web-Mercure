import React from "react";
import { Star, MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { HOTEL_INFO } from "../data/hotelData";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="hotel-footer" className="bg-[#4C1D95] text-white pt-16 pb-8 border-t border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-purple-800/60">
          {/* Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#6D28D9] font-bold text-xl flex items-center justify-center shadow font-heading">
                M
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white font-heading">
                    MERCURE
                  </span>
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] font-semibold tracking-widest text-purple-200 uppercase">
                  Serpong Alam Sutera
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              Hotel bisnis bintang 4 berstandar internasional terkemuka di Tangerang Selatan. Menghadirkan kenyamanan menginap premium, ballroom megah, dan fasilitas terlengkap di jantung Central Business District Alam Sutera, Tangerang Selatan.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-900/60 border border-purple-700/50 text-xs text-purple-200">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Garansi Layanan <strong>Hotel Bintang 4 Terpercaya</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-200">
              <li>
                <button
                  onClick={() => handleLinkClick("/")}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Beranda</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/#tentang")}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Tentang Hotel</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/#kamar")}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Kamar & Suite</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/#fasilitas")}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Fasilitas & Pool</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/#testimoni")}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Ulasan Tamu</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/lokasi")}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Lokasi & Kontak</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Fasilitas Unggulan */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              Fasilitas & Kuliner
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-200">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Grand Ballroom & 12 Ruang Meeting</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Mint & Pepper Restaurant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Man Aur Tan Lounge & Bar</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Kolam Renang Infinity Lantai 2</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Fitness Center & Ruang Sauna</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Aromatherapy Spa & Massage</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              Kontak & Alamat
            </h4>
            <div className="space-y-2.5 text-xs text-purple-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {HOTEL_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white font-medium">
                  {HOTEL_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white">
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Check-in: {HOTEL_INFO.checkInTime} | Check-out: {HOTEL_INFO.checkOutTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
          <p>
            &copy; {currentYear} <strong>{HOTEL_INFO.name}</strong>. Semua hak dilindungi.
          </p>
          <div className="flex items-center space-x-6 text-purple-300">
            <span className="hover:text-white cursor-pointer">Syarat & Ketentuan</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="text-[#D4AF37] font-semibold">Instagram: @mercureserpong</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
