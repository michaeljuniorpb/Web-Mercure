export interface RoomType {
  id: string;
  name: string;
  category: string;
  size: string;
  capacity: string;
  bedType: string;
  priceStart: number;
  image: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FacilityItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  operatingHours: string;
  location: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  comment: string;
  avatarColor: string;
  stayType: string;
}

export interface DirectionItem {
  id: string;
  title: string;
  estimate: string;
  description: string;
  routeHighlights: string[];
  icon: "plane" | "car" | "train" | "map";
}

export interface ContactFormData {
  nama: string;
  email: string;
  telepon: string;
  keperluan: string;
  pesan: string;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}
