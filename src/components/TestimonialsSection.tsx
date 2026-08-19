import React from "react";
import { motion } from "motion/react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data/hotelData";

export const TestimonialsSection: React.FC = () => {
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
    <section id="testimoni" className="py-20 md:py-28 bg-[#EDE9FE] relative overflow-hidden">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/30 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-white rounded-full px-4 py-1"
          >
            Pengalaman Tamu
          </motion.div>

          <motion.h2
            custom={0.2}
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading"
          >
            Dipercaya Eksekutif Bisnis & Tamu Keluarga
          </motion.h2>

          <motion.p
            custom={0.3}
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-light"
          >
            Simak ulasan otentik dari para eksekutif korporat, penyelenggara MICE, dan tamu staycation yang telah merasakan standar pelayanan bintang 4 kami.
          </motion.p>
        </motion.div>

        {/* 2x2 Grid Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx * 0.12}
              variants={fadeUpVariant}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl p-8 border border-[#6D28D9]/10 shadow-sm relative flex flex-col justify-between group hover:shadow-md transition-all duration-300"
            >
              {/* Large subtle quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-purple-100 group-hover:text-[#6D28D9]/20 transition-colors pointer-events-none" />

              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                  <span className="text-xs font-semibold text-slate-500 ml-2">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full ${item.avatarColor} text-white font-bold text-sm flex items-center justify-center shadow-sm font-heading`}
                  >
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {item.role} {item.company ? `• ${item.company}` : ""}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-[#6D28D9] bg-[#EDE9FE] px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#6D28D9]" />
                  <span>{item.stayType}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
