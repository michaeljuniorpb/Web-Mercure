import React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import { HOTEL_INFO } from "../data/hotelData";

interface LocationSectionProps {
  onGoToLocationPage: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onGoToLocationPage }) => {
  const highlights = [
    "3 Menit ke Living World Alam Sutera & Flavor Bliss",
    "5 Menit ke Mall @ Alam Sutera & IKEA Indonesia",
    "25 Menit ke Bandara Internasional Soekarno-Hatta via Tol Kunciran",
    "Akses langsung Gerbang Tol Jakarta - Merak & Stasiun KRL",
    "Dikelilingi kawasan perbankan, universitas, & rumah sakit internasional",
  ];

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
    <section id="lokasi" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (Desktop: Order 1) - Map & Image Preview */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={fadeUpVariant}
            className="lg:col-span-6 lg:order-1 relative"
          >
            {/* Image / Map Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1000&q=80"
                alt="Mercure Serpong Alam Sutera Strategic Business District"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width="1000"
                height="750"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating Location Pin Card */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-3.5 border border-slate-100 flex items-center gap-3 z-10 max-w-[240px]">
                <div className="w-9 h-9 rounded-lg bg-[#6D28D9] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#6D28D9] uppercase tracking-wide">
                    Pusat Alam Sutera
                  </p>
                  <p className="text-xs font-semibold text-slate-900 leading-snug">
                    Dekat Tol & Mall Utama
                  </p>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  Kav. 23 Alam Sutera Boulevard
                </span>
                <a
                  href={HOTEL_INFO.gmapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#D4AF37] hover:bg-[#C59F27] text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Buka Maps</span>
                </a>
              </div>
            </div>

            {/* Decorative Accent Background */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#EDE9FE] rounded-2xl -z-10 border border-purple-200" />
          </motion.div>

          {/* Right Column (Desktop: Order 2) - Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 lg:order-2 space-y-6"
          >
            {/* Badge */}
            <motion.div
              custom={0.1}
              variants={fadeUpVariant}
              className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-[#EDE9FE]/50 rounded-full px-4 py-1"
            >
              Aksesibilitas & Lokasi
            </motion.div>

            {/* Heading */}
            <motion.h2
              custom={0.2}
              variants={fadeUpVariant}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading leading-tight"
            >
              Lokasi Strategis di Pusat Segitiga Emas Tangerang Selatan
            </motion.h2>

            <motion.p
              custom={0.3}
              variants={fadeUpVariant}
              className="text-sm sm:text-base text-slate-600 leading-relaxed font-light"
            >
              Dikelilingi pusat perbelanjaan ternama, perkantoran multinasional, rumah sakit modern, dan pusat kuliner. Hotel kami memberikan kemudahan akses maksimal bagi mobilitas bisnis maupun liburan Anda.
            </motion.p>

            {/* Bullet Highlights */}
            <motion.div
              custom={0.4}
              variants={fadeUpVariant}
              className="space-y-3 pt-1"
            >
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Address Box */}
            <motion.div
              custom={0.5}
              variants={fadeUpVariant}
              className="bg-[#F5F3FF] rounded-xl border border-purple-100 p-4.5 flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-purple-200 flex items-center justify-center flex-shrink-0 text-[#6D28D9] shadow-sm">
                <MapPin className="w-5 h-5 text-[#6D28D9]" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                  Alamat Lengkap Hotel
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 mt-1 font-medium leading-relaxed">
                  {HOTEL_INFO.address}
                </p>
              </div>
            </motion.div>

            {/* CTA Button to Full Lokasi Page */}
            <motion.div custom={0.6} variants={fadeUpVariant} className="pt-2">
              <button
                id="location-see-more-btn"
                onClick={onGoToLocationPage}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold text-sm shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all cursor-pointer"
              >
                <span>Lihat Panduan Rute & Kontak Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
