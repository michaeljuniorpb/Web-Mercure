import React, { useState } from "react";
import { motion } from "motion/react";
import { Star, Calendar, Users, BedDouble, ChevronDown, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { HOTEL_INFO, ROOMS_DATA } from "../data/hotelData";

interface HeroProps {
  onOpenBookingWithParams?: (params: { checkIn: string; checkOut: string; guests: number; roomType: string }) => void;
  onExploreFacilities?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookingWithParams, onExploreFacilities }) => {
  // Today and tomorrow defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState(ROOMS_DATA[0].name);

  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenBookingWithParams) {
      onOpenBookingWithParams({ checkIn, checkOut, guests, roomType });
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: (customDelay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: customDelay,
      },
    }),
  } as const;

  return (
    <section
      id="beranda"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between items-center bg-slate-900 overflow-hidden text-white pt-12 pb-8 md:pt-16 md:pb-12"
    >
      {/* Background Image with High Priority */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85"
          alt="Mercure Serpong Alam Sutera Luxury Hotel Exterior & Lobby"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
          width="2000"
          height="1200"
        />
        {/* Deep Violet Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6D28D9]/85 via-[#6D28D9]/60 to-[#6D28D9]/90 pointer-events-none" />
      </div>

      {/* Decorative Subtle Backlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto">
        {/* Hotel Bintang 4 Badge & Star Rating */}
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#EDE9FE]/30 mb-6 shadow-sm"
        >
          <div className="flex items-center space-x-1">
            {[...Array(HOTEL_INFO.stars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </div>
          <span className="text-xs font-semibold tracking-wide text-white">
            Hotel Bintang 4 Alam Sutera
          </span>
        </motion.div>

        {/* H1 Main Heading */}
        <motion.h1
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-heading max-w-4xl mx-auto leading-tight"
        >
          Mercure Serpong Alam Sutera
        </motion.h1>

        {/* Gold Decorative Divider */}
        <motion.div
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="flex items-center justify-center gap-3 my-5"
        >
          <span className="h-px w-16 bg-[#D4AF37]" />
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span className="h-px w-16 bg-[#D4AF37]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-light leading-relaxed mb-8"
        >
          {HOTEL_INFO.tagline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            id="hero-cta-primary"
            onClick={() => onOpenBookingWithParams?.({ checkIn, checkOut, guests, roomType })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-slate-950 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <span>Reservasi Kamar Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-cta-secondary"
            onClick={() => {
              const el = document.getElementById("tentang");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-medium text-base transition-all duration-200 cursor-pointer"
          >
            <span>Jelajahi Hotel</span>
          </button>
        </motion.div>
      </div>

      {/* Quick Booking Bar Floating Card */}
      <motion.div
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="relative z-20 w-full max-w-5xl px-4 sm:px-6"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 border border-slate-100 text-slate-900">
          <form onSubmit={handleBookingSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* Check-In */}
            <div className="space-y-1 text-left">
              <label htmlFor="hero-checkin" className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Check-in</span>
              </label>
              <input
                id="hero-checkin"
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="space-y-1 text-left">
              <label htmlFor="hero-checkout" className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Check-out</span>
              </label>
              <input
                id="hero-checkout"
                type="date"
                value={checkOut}
                min={checkIn || formatDate(today)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50"
                required
              />
            </div>

            {/* Guests */}
            <div className="space-y-1 text-left">
              <label htmlFor="hero-guests" className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Tamu</span>
              </label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 cursor-pointer"
              >
                <option value={1}>1 Tamu (Single)</option>
                <option value={2}>2 Tamu (Double)</option>
                <option value={3}>3 Tamu</option>
                <option value={4}>4 Tamu (Family)</option>
              </select>
            </div>

            {/* Room Type */}
            <div className="space-y-1 text-left">
              <label htmlFor="hero-room-type" className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Tipe Kamar</span>
              </label>
              <select
                id="hero-room-type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 cursor-pointer truncate"
              >
                {ROOMS_DATA.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                id="hero-search-availability-btn"
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C59F27] text-slate-950 font-semibold text-sm py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>Cek Tarif</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mt-6 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          const el = document.getElementById("tentang");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[11px] tracking-wider font-medium uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
