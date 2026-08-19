import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Waves, Clock, MapPin, Sparkles } from "lucide-react";
import { FACILITIES_DATA, INFINITY_POOL } from "../data/hotelData";
import { FacilityItem } from "../types";

interface FacilitiesSectionProps {
  onSelectFacility: (facility: FacilityItem) => void;
  onOpenPoolDetail: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  onSelectFacility,
  onOpenPoolDetail,
}) => {
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
    <section id="fasilitas" className="py-20 md:py-28 bg-[#F5F3FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <motion.div
            custom={0.1}
            variants={fadeUpVariant}
            className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-white rounded-full px-3.5 py-1"
          >
            Fasilitas Hotel Bintang 4
          </motion.div>

          <motion.h2
            custom={0.2}
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading"
          >
            Pengalaman & Fasilitas Terlengkap
          </motion.h2>

          <motion.p
            custom={0.3}
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-light"
          >
            Dari ruang konvensi mutakhir hingga relaksasi holistik dan hidangan kuliner kelas dunia, kami menyediakan segala kebutuhan untuk produktivitas dan kenyamanan Anda.
          </motion.p>
        </motion.div>

        {/* 3-Column Bento Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES_DATA.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx * 0.12}
              variants={fadeUpVariant}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => onSelectFacility(facility)}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg border border-purple-100/60"
            >
              {/* Background Image */}
              <img
                src={facility.image}
                alt={`${facility.title} - Mercure Serpong`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width="600"
                height="450"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#6D28D9]/95 via-[#6D28D9]/40 to-transparent pointer-events-none" />

              {/* Content Box */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                {/* Tag */}
                <span className="text-[#D4AF37] uppercase tracking-wider text-xs font-bold mb-1.5">
                  {facility.tag}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2 leading-tight group-hover:text-amber-200 transition-colors">
                  {facility.title}
                </h3>

                {/* Brief description */}
                <p className="text-xs sm:text-sm text-purple-100/90 line-clamp-2 mb-3">
                  {facility.description}
                </p>

                {/* Arrow Link on Hover */}
                <div className="flex items-center gap-1 text-xs font-semibold text-[#D4AF37] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Lihat Detail & Jadwal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wide Pool Card Below */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          variants={fadeUpVariant}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          onClick={onOpenPoolDetail}
          className="mt-8 relative rounded-2xl overflow-hidden shadow-xl h-72 md:h-80 group cursor-pointer border border-purple-100"
        >
          <img
            src={INFINITY_POOL.image}
            alt="Mercure Serpong Alam Sutera Outdoor Infinity Pool"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            width="1600"
            height="500"
          />

          {/* Deep Violet Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9]/95 via-[#6D28D9]/60 to-transparent pointer-events-none" />

          {/* Text Overlay on Left Side */}
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center max-w-xl text-white z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              <Waves className="w-4 h-4 text-[#D4AF37]" />
              <span>{INFINITY_POOL.tag}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white mb-2 leading-tight">
              {INFINITY_POOL.title}
            </h3>

            <p className="text-xs sm:text-sm text-purple-100 mb-4 line-clamp-2 md:line-clamp-3">
              {INFINITY_POOL.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {INFINITY_POOL.operatingHours}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {INFINITY_POOL.location}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
              <span>Informasi Akses Kolam Renang</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
