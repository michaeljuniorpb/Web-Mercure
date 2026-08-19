import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface ContactMessage {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  keperluan: string;
  pesan: string;
  createdAt: string;
}

const contactInbox: ContactMessage[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hotel: "Mercure Serpong Alam Sutera",
      timestamp: new Date().toISOString(),
    });
  });

  // Contact form submission endpoint
  app.post("/api/contact/kontak", (req, res) => {
    const { nama, email, telepon, keperluan, pesan } = req.body;

    if (!nama || !email || !telepon || !pesan) {
      return res.status(400).json({
        success: false,
        error: "Harap lengkapi semua kolom wajib (Nama, Email, Telepon, dan Pesan).",
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Format email tidak valid. Harap periksa kembali alamat email Anda.",
      });
    }

    const newMessage: ContactMessage = {
      id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      nama: String(nama).trim(),
      email: String(email).trim(),
      telepon: String(telepon).trim(),
      keperluan: keperluan || "Reservasi Kamar",
      pesan: String(pesan).trim(),
      createdAt: new Date().toISOString(),
    };

    contactInbox.push(newMessage);

    console.log(`[Inbox] New contact inquiry received from ${newMessage.nama} (${newMessage.email}) - Purpose: ${newMessage.keperluan}`);

    return res.status(200).json({
      success: true,
      message: "Terima kasih! Permintaan Anda telah berhasil dikirim. Tim Mercure Serpong Alam Sutera akan segera menghubungi Anda melalui email atau WhatsApp dalam waktu 1x24 jam kerja.",
      data: {
        id: newMessage.id,
        nama: newMessage.nama,
        keperluan: newMessage.keperluan,
        createdAt: newMessage.createdAt,
      },
    });
  });

  // Room inquiry / booking simulation endpoint
  app.post("/api/booking/inquiry", (req, res) => {
    const { checkIn, checkOut, guests, roomType, guestName, guestEmail, guestPhone, specialRequests } = req.body;

    if (!checkIn || !checkOut || !roomType) {
      return res.status(400).json({
        success: false,
        error: "Harap pilih tanggal check-in, check-out, dan tipe kamar.",
      });
    }

    const bookingRef = `MERCURE-AS-${Math.floor(100000 + Math.random() * 900000)}`;

    return res.status(200).json({
      success: true,
      bookingReference: bookingRef,
      message: `Pemesanan ${roomType} untuk tanggal ${checkIn} s/d ${checkOut} berhasil dicatat dengan kode referensi ${bookingRef}.`,
      details: {
        bookingReference: bookingRef,
        checkIn,
        checkOut,
        guests: guests || 2,
        roomType,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        hotelContact: "+62 21 296 6866",
      },
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mercure Serpong Alam Sutera web server running on port ${PORT}`);
  });
}

startServer();
