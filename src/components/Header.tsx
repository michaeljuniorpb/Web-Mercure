import React, { useState, useEffect } from "react";
import { Star, Phone, Menu, X, Calendar, MapPin, Mail, ChevronRight } from "lucide-react";
import { HOTEL_INFO } from "../data/hotelData";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda", path: "/" },
    { label: "Tentang Kami", path: "/#tentang" },
    { label: "Kamar & Suite", path: "/#kamar" },
    { label: "Fasilitas", path: "/#fasilitas" },
    { label: "Testimoni", path: "/#testimoni" },
    { label: "Lokasi & Kontak", path: "/lokasi" },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith("/#")) {
      if (currentPath !== "/") {
        onNavigate("/");
        setTimeout(() => {
          const element = document.querySelector(path.replace("/", ""));
          element?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const element = document.querySelector(path.replace("/", ""));
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Notification Bar for Corporate & ALL Members */}
      <div className="bg-[#4C1D95] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-purple-200">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Kawasan Bisnis Alam Sutera, Tangerang Selatan
            </span>
            <span className="text-purple-300">•</span>
            <span className="text-purple-200">
              Jaminan Tarif Terbaik & Pelayanan Tamu Bintang 4
            </span>
          </div>
          <div className="flex items-center space-x-4 text-purple-200">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              {HOTEL_INFO.phoneDisplay}
            </a>
            <span>•</span>
            <a
              href={`mailto:${HOTEL_INFO.email}`}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-[#D4AF37]" />
              {HOTEL_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            id="header-logo-btn"
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] flex items-center justify-center text-white font-bold text-xl shadow-md border border-purple-200 group-hover:scale-105 transition-transform">
              <span className="font-heading">M</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-heading">
                  MERCURE
                </span>
                <div className="flex items-center ml-1">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#6D28D9] uppercase">
                Serpong Alam Sutera
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          >
            {navLinks.map((link) => {
              const isActive =
                (link.path === "/" && currentPath === "/") ||
                (link.path === "/lokasi" && currentPath === "/lokasi");

              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#6D28D9] bg-[#EDE9FE] font-semibold"
                      : "text-slate-700 hover:text-[#6D28D9] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              id="header-call-btn"
              href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#6D28D9] bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi Kami</span>
            </a>
            <button
              id="header-booking-btn"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-900 bg-[#D4AF37] hover:bg-[#C59F27] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Kamar</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="mobile-booking-trigger"
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-slate-900 bg-[#D4AF37] rounded-lg"
            >
              Reservasi
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#6D28D9] hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="grid gap-1 py-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:text-[#6D28D9] hover:bg-purple-50 rounded-lg"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-900 bg-[#D4AF37] rounded-lg shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservasi Kamar Online</span>
              </button>
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#6D28D9] bg-purple-50 rounded-lg border border-purple-200"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon: {HOTEL_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
