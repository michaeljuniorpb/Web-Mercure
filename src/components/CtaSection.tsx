import React from "react";
import { motion } from "motion/react";
import { ArrowRight, PhoneCall, Calendar } from "lucide-react";
import { HOTEL_INFO } from "../data/hotelData";

interface CtaSectionProps {
  onOpenBooking: () => void;
  onGoToContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenBooking, onGoToContact }) => {
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
    <section className="bg-[#6D28D9] text-white relative overflow-hidden py-20 md:py-28">
      {/* Decorative Circles in Background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            custom={0.1}
            variants={fadeUpVariant}
            className="inline-block text-xs font-semibold text-white/90 border border-white/30 rounded-full px-4 py-1 bg-white/10 backdrop-blur-sm"
          >
            Reservasi & Informasi Korporat
          </motion.div>

          {/* Heading */}
          <motion.h2
            custom={0.2}
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-heading max-w-3xl mx-auto leading-tight"
          >
            Rencanakan Menginap atau Event Bisnis Anda Bersama Kami
          </motion.h2>

          {/* Gold Decorative Divider */}
          <motion.div
            custom={0.3}
            variants={fadeUpVariant}
            className="flex items-center justify-center gap-4 my-4"
          >
            <div className="h-px w-16 bg-[#D4AF37]" />
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <div className="h-px w-16 bg-[#D4AF37]" />
          </motion.div>

          {/* Description */}
          <motion.p
            custom={0.4}
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8"
          >
            Dapatkan jaminan harga terbaik untuk reservasi langsung, paket spesial meeting korporat, serta kenyamanan layanan hospitality bintang 4 terbaik.
          </motion.p>

          {/* Buttons */}
          <motion.div
            custom={0.5}
            variants={fadeUpVariant}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              id="cta-booking-btn"
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#C59F27] text-slate-900 font-bold text-base shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Kamar Online</span>
            </button>

            <button
              id="cta-contact-btn"
              onClick={onGoToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-base hover:translate-y-[-2px] transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi Tim Sales & MICE</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
