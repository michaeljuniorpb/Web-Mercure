import React from "react";
import { motion } from "motion/react";
import { Bed, Users, Maximize, Check, ArrowRight, Sparkles } from "lucide-react";
import { ROOMS_DATA } from "../data/hotelData";
import { RoomType } from "../types";

interface RoomsSectionProps {
  onSelectRoom: (room: RoomType) => void;
  onViewRoomDetail: (room: RoomType) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom, onViewRoomDetail }) => {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
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
    <section id="kamar" className="py-20 md:py-28 bg-white relative">
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
            className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-[#EDE9FE]/50 rounded-full px-3.5 py-1"
          >
            Pilihan Akomodasi
          </motion.div>

          <motion.h2
            custom={0.2}
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading"
          >
            Kamar & Suite Eksklusif
          </motion.h2>

          <motion.p
            custom={0.3}
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-light"
          >
            Setiap kamar dirancang secara estetis dengan sentuhan kontemporer, jendela panorama, ranjang premium, dan fasilitas lengkap untuk memastikan istirahat Anda sempurna.
          </motion.p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS_DATA.map((room, idx) => (
            <motion.div
              key={room.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx * 0.15}
              variants={fadeUpVariant}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg flex flex-col justify-between group hover:border-[#6D28D9]/40 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Popular Room Tag */}
              {room.popular && (
                <div className="absolute top-4 right-4 z-20 bg-[#D4AF37] text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  <span>Favorit Tamu</span>
                </div>
              )}

              {/* Room Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={room.image}
                  alt={`${room.name} - Mercure Serpong Alam Sutera`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="600"
                  height="375"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded">
                    {room.category}
                  </span>
                </div>
              </div>

              {/* Room Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#6D28D9] transition-colors">
                      {room.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4">
                    {room.description}
                  </p>

                  {/* Room Specs Badges */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs text-slate-700 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Luas: {room.size}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <Bed className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>{room.bedType}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {room.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-600 block">Mulai dari</span>
                    <span className="text-lg font-bold text-[#6D28D9] font-heading">
                      {formatIDR(room.priceStart)}
                    </span>
                    <span className="text-[10px] text-slate-600"> /malam</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewRoomDetail(room)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#6D28D9] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => onSelectRoom(room)}
                      className="px-4 py-2 text-xs font-semibold text-slate-900 bg-[#D4AF37] hover:bg-[#C59F27] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center gap-1"
                    >
                      <span>Pesan</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
