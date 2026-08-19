import React from "react";
import { motion } from "motion/react";
import { Award, CheckCircle, Building2, MapPin, Sparkles } from "lucide-react";
import { HOTEL_STATS, HOTEL_INFO } from "../data/hotelData";

export const AboutSection: React.FC = () => {
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
    <section id="tentang" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Section Badge */}
            <motion.div
              custom={0.1}
              variants={fadeUpVariant}
              className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-[#EDE9FE]/50 rounded-full px-3.5 py-1"
            >
              Tentang Hotel Kami
            </motion.div>

            {/* Section Heading */}
            <motion.h2
              custom={0.2}
              variants={fadeUpVariant}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading leading-tight"
            >
              Kenyamanan Modern di Jantung Kawasan Bisnis Alam Sutera
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              custom={0.3}
              variants={fadeUpVariant}
              className="text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              <strong className="text-slate-900 font-semibold">{HOTEL_INFO.name}</strong> adalah hotel bisnis bintang 4 bertaraf internasional yang menghadirkan perpaduan sempurna antara kemewahan kontemporer dan keramahtamahan khas Indonesia. Terletak strategis di jantung Central Business District Alam Sutera, Tangerang Selatan.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              custom={0.4}
              variants={fadeUpVariant}
              className="text-sm sm:text-base text-slate-600 leading-relaxed"
            >
              Didesain khusus untuk para eksekutif bisnis dan wisatawan keluarga, hotel kami hanya berjarak beberapa langkah dari Living World, Mall @ Alam Sutera, IKEA, Flavor Bliss, serta memiliki akses langsung 25 menit menuju Bandara Internasional Soekarno-Hatta via Tol Kunciran.
            </motion.p>

            {/* 4-Stat Grid */}
            <motion.div
              custom={0.5}
              variants={fadeUpVariant}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4"
            >
              {HOTEL_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#F5F3FF] border border-purple-100 p-4 text-center hover:border-[#6D28D9]/30 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#6D28D9] font-heading">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Highlights bullet list */}
            <motion.div
              custom={0.6}
              variants={fadeUpVariant}
              className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-700"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Pelayanan Tamu Premium & Concierge 24 Jam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Wi-Fi Fiber Dedicated High-Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Parkir Luas & Layanan Valet</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image with Floating Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            variants={fadeUpVariant}
            className="lg:col-span-5 relative"
          >
            {/* Main Image Frame */}
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
                alt="Mercure Serpong Alam Sutera Luxury Architecture and Lobby"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width="1000"
                height="1250"
              />
              {/* Subtle Violet Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#6D28D9]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Recognition Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-6 sm:-left-6 bg-[#D4AF37] text-slate-950 px-5 py-4 rounded-2xl shadow-2xl border border-white/40 flex items-center gap-3.5 z-20 max-w-[260px]">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-inner">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-900 leading-none">
                  Hospitality Excellence
                </p>
                <p className="text-xs font-semibold text-slate-950 mt-1 leading-snug">
                  Hotel Bisnis Bintang 4 Pilihan Utama di Serpong
                </p>
              </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#EDE9FE] rounded-2xl -z-10 border border-purple-200" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
