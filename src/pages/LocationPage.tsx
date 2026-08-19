import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  CheckCircle2,
  AlertCircle,
  Plane,
  Car,
  Train,
  Compass,
  MessageSquare,
  Sparkles,
  Loader2,
} from "lucide-react";
import { HOTEL_INFO, DIRECTIONS_DATA, OPERATING_HOURS_TABLE } from "../data/hotelData";
import { ContactFormData } from "../types";

export const LocationPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nama: "",
    email: "",
    telepon: "",
    keperluan: "Reservasi Kamar",
    pesan: "",
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{ id?: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessResponse(null);

    try {
      const response = await fetch("/api/contact/kontak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }

      setSuccessResponse({
        id: data.data?.id,
        message: data.message,
      });

      // Reset form on success
      setFormData({
        nama: "",
        email: "",
        telepon: "",
        keperluan: "Reservasi Kamar",
        pesan: "",
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan jaringan saat mengirim pesan.");
    } finally {
      setLoading(false);
    }
  };

  const getDirectionIcon = (type: string) => {
    switch (type) {
      case "plane":
        return <Plane className="w-6 h-6 text-[#D4AF37]" />;
      case "car":
        return <Car className="w-6 h-6 text-[#D4AF37]" />;
      case "train":
        return <Train className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Compass className="w-6 h-6 text-[#D4AF37]" />;
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
    <div className="bg-white min-h-screen">
      {/* Hero Banner for Lokasi & Kontak */}
      <section className="relative bg-[#6D28D9] text-white py-16 md:py-24 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6D28D9]/95 via-[#6D28D9]/80 to-[#4C1D95] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="inline-block text-xs font-semibold text-white/90 border border-white/30 rounded-full px-4 py-1 bg-white/10 backdrop-blur-sm mb-4"
          >
            Akses, Peta & Layanan Kontak
          </motion.div>

          <motion.h1
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading mb-4"
          >
            Lokasi & Hubungi Kami
          </motion.h1>

          <motion.p
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Kami siap melayani kebutuhan reservasi kamar, inquiry meeting korporat, pesta pernikahan, dan reservasi meja makan di Mercure Serpong Alam Sutera.
          </motion.p>
        </div>
      </section>

      {/* Main Grid: Google Maps Embed & Quick Contact Info Cards */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Google Maps Interactive Embed (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            variants={fadeUpVariant}
            className="lg:col-span-7 bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200"
          >
            <div className="p-4 bg-[#F5F3FF] border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#6D28D9]" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Peta Lokasi Mercure Serpong Alam Sutera
                </span>
              </div>
              <a
                href={HOTEL_INFO.gmapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#6D28D9] hover:underline flex items-center gap-1"
              >
                <span>Buka di Google Maps</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>

            <div className="w-full h-80 sm:h-96 md:h-[420px] bg-slate-100 relative">
              <iframe
                title="Peta Lokasi Mercure Serpong Alam Sutera"
                src={HOTEL_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="p-4 bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-100">
              <span>Koordinat GPS: -6.241835, 106.653396</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Area Parkir Luas & Valet Service Tersedia
              </span>
            </div>
          </motion.div>

          {/* Right: Contact Info Cards (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={fadeUpVariant}
            className="lg:col-span-5 space-y-4"
          >
            {/* Address Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#6D28D9] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#6D28D9]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                  Alamat Lengkap
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1 leading-relaxed">
                  {HOTEL_INFO.address}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  (Dekat Living World & Flavor Bliss Alam Sutera)
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Telepon & WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-slate-800">
                  Resepsionis: <a href={`tel:${HOTEL_INFO.phone}`} className="font-bold text-[#6D28D9] hover:underline">{HOTEL_INFO.phoneDisplay}</a>
                </p>
                <p className="text-xs sm:text-sm text-slate-800">
                  WhatsApp Reservasi: <a href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noreferrer" className="font-bold text-emerald-600 hover:underline">{HOTEL_INFO.whatsappDisplay}</a>
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#6D28D9] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                  Surat Elektronik (Email)
                </h3>
                <p className="text-xs sm:text-sm text-slate-800">
                  Reservasi: <a href={`mailto:${HOTEL_INFO.email}`} className="text-[#6D28D9] font-medium hover:underline">{HOTEL_INFO.email}</a>
                </p>
                <p className="text-xs sm:text-sm text-slate-800">
                  Sales & MICE: <a href={`mailto:${HOTEL_INFO.inquiryEmail}`} className="text-[#6D28D9] font-medium hover:underline">{HOTEL_INFO.inquiryEmail}</a>
                </p>
              </div>
            </div>

            {/* Check-In / Check-Out Schedule Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Waktu Check-In & Check-Out
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 mt-1">
                  Check-in Mulai: <strong>{HOTEL_INFO.checkInTime}</strong>
                </p>
                <p className="text-xs sm:text-sm text-slate-800">
                  Check-out Maksimal: <strong>{HOTEL_INFO.checkOutTime}</strong>
                </p>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  *Early check-in / late check-out tergantung ketersediaan kamar
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Directions Grid: 4 items with icons */}
      <section className="py-16 bg-[#F5F3FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-white rounded-full px-4 py-1">
              Panduan Menuju Lokasi
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Petunjuk Arah & Akses Transportasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Pilihan rute tercepat dan ternyaman menuju hotel kami dari berbagai titik transportasi penting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIRECTIONS_DATA.map((dir, idx) => (
              <motion.div
                key={dir.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx * 0.1}
                variants={fadeUpVariant}
                className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#4C1D95] flex items-center justify-center shadow-sm">
                      {getDirectionIcon(dir.icon)}
                    </div>
                    <span className="text-xs font-bold text-[#6D28D9] bg-[#EDE9FE] px-3 py-1 rounded-full">
                      {dir.estimate}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-1.5">
                    {dir.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    {dir.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Rute Panduan:
                    </span>
                    {dir.routeHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours Table */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-[#EDE9FE]/50 rounded-full px-4 py-1">
            Jadwal Operasional
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
            Jam Layanan Fasilitas Hotel
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#6D28D9] text-white">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Fasilitas / Layanan</th>
                <th className="py-3.5 px-6 font-semibold">Jam Operasional</th>
                <th className="py-3.5 px-6 font-semibold">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {OPERATING_HOURS_TABLE.map((row, i) => (
                <tr key={i} className="hover:bg-purple-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{row.facility}</td>
                  <td className="py-3.5 px-6 font-medium text-[#6D28D9]">{row.hours}</td>
                  <td className="py-3.5 px-6 text-slate-600">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="kontak-form" className="py-16 md:py-20 bg-[#EDE9FE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            variants={fadeUpVariant}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-100"
          >
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <div className="inline-block text-xs font-semibold text-[#6D28D9] border border-[#6D28D9]/30 bg-[#F5F3FF] rounded-full px-4 py-1">
                Kirim Pesan & Inquiry
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
                Formulir Kontak & Permintaan Penawaran
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Isi formulir di bawah ini. Tim Sales & Reservasi kami akan merespons dalam waktu 1x24 jam.
              </p>
            </div>

            {/* Success State Banner */}
            {successResponse && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-emerald-900">
                    Pesan Berhasil Terkirim!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    {successResponse.message}
                  </p>
                  {successResponse.id && (
                    <span className="text-[11px] text-emerald-700 block font-mono">
                      Nomor Referensi Tiket: <strong>{successResponse.id}</strong>
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Error State Banner */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-4"
              >
                <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-900">
                    Terjadi Kesalahan
                  </h4>
                  <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Lengkap */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-nama" className="text-xs font-bold text-slate-700">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-nama"
                    type="text"
                    required
                    placeholder="Contoh: Michael Junior"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 focus:bg-white transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-700">
                    Alamat Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Telepon / WhatsApp */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-telepon" className="text-xs font-bold text-slate-700">
                    Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-telepon"
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 focus:bg-white transition-colors"
                  />
                </div>

                {/* Keperluan / Purpose */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-keperluan" className="text-xs font-bold text-slate-700">
                    Keperluan Inquiry <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="contact-keperluan"
                    value={formData.keperluan}
                    onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Reservasi Kamar">Reservasi Kamar Individu / Keluarga</option>
                    <option value="Meeting & Konferensi Korporat (MICE)">Meeting & Konferensi Korporat (MICE)</option>
                    <option value="Wedding & Resepsi Pernikahan">Wedding & Resepsi Pernikahan</option>
                    <option value="Restoran Mint & Pepper">Reservasi Restoran Mint & Pepper</option>
                    <option value="Layanan Spa & Kolam Renang">Layanan Spa & Kolam Renang</option>
                    <option value="Kerjasama Bisnis & Vendor">Kerjasama Bisnis & Vendor</option>
                    <option value="Pertanyaan Umum">Pertanyaan Umum Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Pesan */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="contact-pesan" className="text-xs font-bold text-slate-700">
                  Detail Pesan / Pertanyaan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-pesan"
                  required
                  rows={4}
                  placeholder="Tuliskan tanggal rencana acara, jumlah peserta, atau kebutuhan spesifik Anda..."
                  value={formData.pesan}
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 focus:bg-white transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-full bg-[#D4AF37] hover:bg-[#C59F27] text-slate-900 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Mengirim Permintaan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan ke Tim Mercure</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
