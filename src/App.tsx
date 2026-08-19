import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { RoomsSection } from "./components/RoomsSection";
import { FacilitiesSection } from "./components/FacilitiesSection";
import { LocationSection } from "./components/LocationSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { LocationPage } from "./pages/LocationPage";
import { BookingModal } from "./components/BookingModal";
import { RoomDetailModal } from "./components/RoomDetailModal";
import { FacilityModal } from "./components/FacilityModal";
import { RoomType, FacilityItem } from "./types";
import { HOTEL_INFO, INFINITY_POOL } from "./data/hotelData";
import { MessageSquare, Phone } from "lucide-react";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingParams, setBookingParams] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomType?: string;
  }>({});
  const [selectedRoomDetail, setSelectedRoomDetail] = useState<RoomType | null>(null);
  const [selectedFacilityDetail, setSelectedFacilityDetail] = useState<FacilityItem | null>(null);

  // Sync with browser history / hash
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    if (window.location.pathname === "/lokasi") {
      setCurrentPath("/lokasi");
    }
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (path.startsWith("/")) {
      window.history.pushState({}, "", path);
    }
  };

  // Structured Data Schema.org for SEO
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Hotel",
          "@id": "https://mercureserpongalamsutera.com/#hotel",
          "name": HOTEL_INFO.name,
          "description": HOTEL_INFO.shortDesc,
          "starRating": {
            "@type": "Rating",
            "ratingValue": "4"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. Alam Sutera Boulevard Kav. 23",
            "addressLocality": "Pakulonan, Serpong Utara",
            "addressRegion": "Tangerang Selatan, Banten",
            "postalCode": "15325",
            "addressCountry": "ID"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -6.241835,
            "longitude": 106.653396
          },
          "telephone": HOTEL_INFO.phone,
          "email": HOTEL_INFO.email,
          "priceRange": "$$",
          "checkinTime": "14:00",
          "checkoutTime": "12:00",
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Outdoor Infinity Pool", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Fitness Center & Sauna", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Grand Ballroom & Meeting Rooms", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Mint & Pepper Restaurant", "value": true }
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://mercureserpongalamsutera.com/#website",
          "url": "https://mercureserpongalamsutera.com/",
          "name": HOTEL_INFO.name,
          "inLanguage": "id-ID"
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    script.id = "hotel-structured-data";
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("hotel-structured-data");
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  const handleOpenBookingWithParams = (params: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  }) => {
    setBookingParams(params);
    setIsBookingOpen(true);
  };

  const handleSelectRoomForBooking = (room: RoomType) => {
    setBookingParams({ roomType: room.name });
    setIsBookingOpen(true);
  };

  const handleOpenPoolDetail = () => {
    setSelectedFacilityDetail({
      id: "infinity-pool",
      title: INFINITY_POOL.title,
      tag: INFINITY_POOL.tag,
      description: INFINITY_POOL.description,
      image: INFINITY_POOL.image,
      operatingHours: INFINITY_POOL.operatingHours,
      location: INFINITY_POOL.location,
      highlights: [
        "Kedalaman 1.2m untuk dewasa & 0.5m untuk anak",
        "Pemandangan asri cakrawala kota Alam Sutera",
        "Poolside Bar menyajikan jus & mocktails segar",
        "Handuk renang bersih & kursi santai berjemur gratis",
      ],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#6D28D9] selection:text-white font-sans">
      {/* Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenBooking={() => {
          setBookingParams({});
          setIsBookingOpen(true);
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-grow">
        {currentPath === "/lokasi" ? (
          <LocationPage />
        ) : (
          <>
            {/* 1. Hero Section with Full-Bleed Imagery, Gold Stars, and Quick Booking */}
            <Hero
              onOpenBookingWithParams={handleOpenBookingWithParams}
              onExploreFacilities={() => {
                const el = document.getElementById("fasilitas");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* 2. About Section (2-Column Grid + Stats) */}
            <AboutSection />

            {/* 3. Rooms & Suites Showcase */}
            <RoomsSection
              onSelectRoom={handleSelectRoomForBooking}
              onViewRoomDetail={(room) => setSelectedRoomDetail(room)}
            />

            {/* 4. Facilities Bento Grid (bg-muted) */}
            <FacilitiesSection
              onSelectFacility={(fac) => setSelectedFacilityDetail(fac)}
              onOpenPoolDetail={handleOpenPoolDetail}
            />

            {/* 5. Location Section (2-Column Reversed) */}
            <LocationSection
              onGoToLocationPage={() => {
                navigate("/lokasi");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* 6. Testimonials Section (bg-secondary) */}
            <TestimonialsSection />

            {/* 7. Final Call to Action Banner */}
            <CtaSection
              onOpenBooking={() => {
                setBookingParams({});
                setIsBookingOpen(true);
              }}
              onGoToContact={() => {
                navigate("/lokasi");
                setTimeout(() => {
                  const el = document.getElementById("kontak-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Floating Fast WhatsApp Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/\+/g, "")}?text=Halo%20Mercure%20Serpong%20Alam%20Sutera,%20saya%20ingin%20bertanya%20mengenai%20reservasi`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi WhatsApp Mercure Serpong"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center gap-2 group"
      >
        <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold whitespace-nowrap pr-1">
          WhatsApp Kami
        </span>
      </a>

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialParams={bookingParams}
      />

      <RoomDetailModal
        room={selectedRoomDetail}
        onClose={() => setSelectedRoomDetail(null)}
        onBookNow={(room) => {
          setSelectedRoomDetail(null);
          handleSelectRoomForBooking(room);
        }}
      />

      <FacilityModal
        facility={selectedFacilityDetail}
        onClose={() => setSelectedFacilityDetail(null)}
        onGoToContact={() => {
          setSelectedFacilityDetail(null);
          navigate("/lokasi");
          setTimeout(() => {
            const el = document.getElementById("kontak-form");
            el?.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }}
      />
    </div>
  );
}
