import React from "react";
import { X, Clock, MapPin, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { FacilityItem } from "../types";
import { HOTEL_INFO } from "../data/hotelData";

interface FacilityModalProps {
  facility: FacilityItem | null;
  onClose: () => void;
  onGoToContact: () => void;
}

export const FacilityModal: React.FC<FacilityModalProps> = ({ facility, onClose, onGoToContact }) => {
  if (!facility) return null;

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

        {/* Header Image */}
        <div className="relative aspect-[16/9] w-full bg-slate-900">
          <img
            src={facility.image}
            alt={facility.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold bg-[#D4AF37] text-slate-950 px-2.5 py-1 rounded-md">
              {facility.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mt-1">
              {facility.title}
            </h3>
          </div>
        </div>

        {/* Details & Specs */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#F5F3FF] rounded-2xl border border-purple-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Jam Operasional</span>
                <span className="font-semibold text-slate-800">{facility.operatingHours}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Lokasi di Hotel</span>
                <span className="font-semibold text-slate-800">{facility.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Gambaran Layanan</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {facility.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">Keunggulan & Fasilitas Utama</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {facility.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Pertanyaan & Reservasi Khusus: <strong>{HOTEL_INFO.phoneDisplay}</strong>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  onClose();
                  onGoToContact();
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ajukan Penawaran Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
