import React from "react";
import { X, Bed, Users, Maximize, Check, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { RoomType } from "../types";

interface RoomDetailModalProps {
  room: RoomType | null;
  onClose: () => void;
  onBookNow: (room: RoomType) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose, onBookNow }) => {
  if (!room) return null;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative my-8 text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Room Header Image */}
        <div className="relative aspect-[16/9] w-full bg-slate-900">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold bg-[#D4AF37] text-slate-950 px-2.5 py-1 rounded-md">
              {room.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mt-1">
              {room.name}
            </h3>
          </div>
        </div>

        {/* Room Specs & Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#F5F3FF] rounded-2xl text-center border border-purple-100">
            <div>
              <Maximize className="w-4 h-4 text-[#6D28D9] mx-auto mb-1" />
              <span className="text-[11px] text-slate-500 block">Luas Kamar</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">{room.size}</span>
            </div>
            <div>
              <Users className="w-4 h-4 text-[#6D28D9] mx-auto mb-1" />
              <span className="text-[11px] text-slate-500 block">Kapasitas</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">{room.capacity}</span>
            </div>
            <div>
              <Bed className="w-4 h-4 text-[#6D28D9] mx-auto mb-1" />
              <span className="text-[11px] text-slate-500 block">Tipe Tempat Tidur</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">{room.bedType}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Deskripsi Kamar</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">Fasilitas & Keunggulan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Tarif Mulai</span>
              <span className="text-2xl font-bold text-[#6D28D9] font-heading">
                {formatIDR(room.priceStart)}
              </span>
              <span className="text-xs text-slate-500"> /malam</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-3 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookNow(room);
                }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#C59F27] text-slate-900 text-xs font-bold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Pesan Kamar Ini</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
