export interface ServiceItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string;
  image: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { bookings: number };
}

export interface BookingItem {
  id: number;
  serviceId: number;
  service: { name: string; duration: number; price?: number };
  allServiceIds: string;
  totalDuration: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  staffName: string;
  date: string;
  time: string;
  notes: string | null;
  status: string;
  services?: { id: number; name: string; duration: number; price: number }[];
  createdAt: string;
  updatedAt: string;
}

export interface StaffMemberItem {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  image: string | null;
  sortOrder: number;
  active: boolean;
  createdAt: string;
}

export interface ReviewItem {
  id: number;
  customerName: string;
  customerImage: string | null;
  rating: number;
  text: string;
  active: boolean;
  createdAt: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  active: boolean;
  createdAt: string;
}

export interface ClosedDayItem {
  id: number;
  date: string;
  reason: string | null;
  createdAt: string;
}
