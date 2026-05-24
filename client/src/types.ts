export interface OfferSlot {
  id: number;
  offerId: number;
  slotStart: string;
  slotEnd: string;
  capacity: number;
  bookedCount: number;
  status: string;
  availableCount: number;
}

export interface Offer {
  id: number;
  businessId: number;
  business?: { id: number; name: string };
  image?: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  maxBookingPerCustomer: number;
  termsAndConditions: string;
  status: string;
  slots?: OfferSlot[];
}

export interface Booking {
  id: number;
  bookingReference: string;
  offerId: number;
  slotId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  peopleCount: number;
  specialNote?: string;
  status: string;
  createdAt: string;
  offer?: Offer;
  slot?: OfferSlot;
}

export interface DashboardSummary {
  totalOffers: number;
  activeOffers: number;
  totalBookings: number;
  todaysBookings: number;
  totalCapacity: number;
  bookedSeats: number;
  availableSeats: number;
  conversionRate: number;
  recentBookings: Array<{ id: number; customerName: string; offerName: string; slotTime: string; peopleCount: number; status: string }>;
}
