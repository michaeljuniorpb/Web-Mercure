import React, { useState } from "react";
import { X, Calendar, Users, BedDouble, CheckCircle2, ShieldCheck, Sparkles, Loader2, Phone, Mail } from "lucide-react";
import { ROOMS_DATA, HOTEL_INFO } from "../data/hotelData";
import { BookingFormData, RoomType } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomType?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialParams,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: initialParams?.checkIn || formatDate(today),
    checkOut: initialParams?.checkOut || formatDate(tomorrow),
    guests: initialParams?.guests || 2,
    roomType: initialParams?.roomType || ROOMS_DATA[0].name,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  // Selected room details
  const selectedRoom = ROOMS_DATA.find((r) => r.name === formData.roomType) || ROOMS_DATA[0];

  // Calculate nights
  const checkInDate = new Date(formData.checkIn);
  const checkOutDate = new Date(formData.checkOut);
  const diffTime = Math.max(1, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const estimatedTotal = selectedRoom.priceStart * nights;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/booking/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedBooking({
          reference: data.bookingReference,
          message: data.message,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 text-slate-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-6 h-6" />
        </button>

        {confirmedBooking ? (
          /* Confirmation State */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                Reservasi Berhasil Diajukan
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mt-1">
                Terima Kasih, {formData.guestName || "Tamu Terhormat"}!
              </h3>
            </div>

            <div className="bg-[#F5F3FF] border border-purple-100 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-purple-100">
                <span className="text-slate-500">Kode Referensi Pemesanan:</span>
                <span className="font-mono font-bold text-[#6D28D9] text-base">
                  {confirmedBooking.reference}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block text-[11px]">Tipe Kamar:</span>
                  <span className="font-semibold text-slate-800">{formData.roomType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Durasi Menginap:</span>
                  <span className="font-semibold text-slate-800">{nights} Malam ({formData.checkIn} - {formData.checkOut})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Jumlah Tamu:</span>
                  <span className="font-semibold text-slate-800">{formData.guests} Tamu</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Estimasi Tarif:</span>
                  <span className="font-semibold text-[#6D28D9]">{formatIDR(estimatedTotal)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Konfirmasi resmi dan voucher pemesanan telah dikirimkan ke email <strong>{formData.guestEmail}</strong>. Resepsionis kami siap menyambut Anda pada pukul 14:00 WIB.
            </p>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                onClose();
              }}
              className="w-full py-3.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold rounded-full shadow transition-colors"
            >
              Selesai & Tutup
            </button>
          </div>
        ) : (
          /* Form State */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Jaminan Tarif Terbaik Langsung</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Reservasi Kamar Online
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {HOTEL_INFO.name} • Alam Sutera, Tangerang Selatan
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
              {/* Check-In / Check-Out */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tanggal Check-in
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    min={formatDate(today)}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tanggal Check-out
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    min={formData.checkIn || formatDate(today)}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                  />
                </div>
              </div>

              {/* Room Selection & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Pilihan Tipe Kamar
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name} - {formatIDR(r.priceStart)}/malam
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Jumlah Tamu
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                  >
                    <option value={1}>1 Tamu</option>
                    <option value={2}>2 Tamu (Standard)</option>
                    <option value={3}>3 Tamu (Extra Bed)</option>
                    <option value={4}>4 Tamu (Family)</option>
                  </select>
                </div>
              </div>

              {/* Guest Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Tamu"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Konfirmasi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={formData.guestEmail}
                    onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    No. Handphone / WA <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.guestPhone}
                    onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Permintaan Khusus (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Non-smoking room, high floor, honeymoon setup..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-[#6D28D9]/40"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-[#EDE9FE] border border-purple-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-purple-900 block font-medium">
                    Estimasi Total ({nights} Malam)
                  </span>
                  <span className="text-xl font-bold text-[#6D28D9] font-heading">
                    {formatIDR(estimatedTotal)}
                  </span>
                  <span className="text-[10px] text-purple-700 block">
                    *Termasuk pajak & biaya pelayanan (10% Service + 11% Tax)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#6D28D9] bg-white px-2.5 py-1 rounded-full shadow-sm">
                    Bayar di Hotel
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#C59F27] text-slate-900 font-bold text-sm shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses Reservasi...</span>
                  </>
                ) : (
                  <span>Konfirmasi Reservasi Online</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
