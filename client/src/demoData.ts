import { Offer } from './types';

export const demoOffers: Offer[] = [
  {
    id: 1,
    businessId: 1,
    business: { id: 1, name: 'Glow Spa & Salon' },
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5ca8a89f0c7b468b55e25c5dd7110f0c',
    title: 'Deluxe Glow Facial',
    description: 'Revitalizing facial treatment with premium serums.',
    category: 'Beauty',
    originalPrice: 2500,
    offerPrice: 999,
    discountPercentage: 60,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    maxBookingPerCustomer: 2,
    termsAndConditions: 'Non-refundable. Valid for 3 months.',
    status: 'active',
    slots: [
      {
        id: 101,
        offerId: 1,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
        capacity: 8,
        bookedCount: 0,
        status: 'Available',
        availableCount: 8
      },
      {
        id: 102,
        offerId: 1,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 54).toISOString(),
        capacity: 8,
        bookedCount: 0,
        status: 'Available',
        availableCount: 8
      }
    ]
  },
  {
    id: 2,
    businessId: 2,
    business: { id: 2, name: 'Urban Bites Kitchen' },
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f9a4b6f7c8e9d2a1b2c3d4e5f6a7b8c',
    title: 'Chef Special Tasting Menu (2 pax)',
    description: 'A curated multi-course tasting experience.',
    category: 'Food',
    originalPrice: 3999,
    offerPrice: 1999,
    discountPercentage: 50,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    maxBookingPerCustomer: 1,
    termsAndConditions: 'Reservation required. Subject to availability.',
    status: 'active',
    slots: [
      {
        id: 201,
        offerId: 2,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        capacity: 10,
        bookedCount: 0,
        status: 'Available',
        availableCount: 10
      },
      {
        id: 202,
        offerId: 2,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 46).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
        capacity: 10,
        bookedCount: 0,
        status: 'Available',
        availableCount: 10
      }
    ]
  },
  {
    id: 3,
    businessId: 3,
    business: { id: 3, name: 'Zen Yoga Studio' },
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
    title: 'Sunrise Flow - 5 Class Pack',
    description: 'Early morning energizing vinyasa sessions.',
    category: 'Wellness',
    originalPrice: 3000,
    offerPrice: 1299,
    discountPercentage: 57,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    maxBookingPerCustomer: 5,
    termsAndConditions: 'Non-transferable. Expires in 60 days.',
    status: 'active',
    slots: [
      {
        id: 301,
        offerId: 3,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 9).toISOString(),
        capacity: 12,
        bookedCount: 0,
        status: 'Available',
        availableCount: 12
      },
      {
        id: 302,
        offerId: 3,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 32).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 33).toISOString(),
        capacity: 12,
        bookedCount: 2,
        status: 'Available',
        availableCount: 10
      }
    ]
  },
  {
    id: 4,
    businessId: 4,
    business: { id: 4, name: 'Pixel Portraits' },
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e',
    title: 'Couples Photoshoot Mini (30 mins)',
    description: 'Quick creative shoot with one edited image.',
    category: 'Photography',
    originalPrice: 4999,
    offerPrice: 2499,
    discountPercentage: 50,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
    maxBookingPerCustomer: 1,
    termsAndConditions: 'Includes one edited digital image.',
    status: 'active',
    slots: [
      {
        id: 401,
        offerId: 4,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 11).toISOString(),
        capacity: 6,
        bookedCount: 1,
        status: 'Available',
        availableCount: 5
      },
      {
        id: 402,
        offerId: 4,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 28).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 29).toISOString(),
        capacity: 6,
        bookedCount: 0,
        status: 'Available',
        availableCount: 6
      }
    ]
  },
  {
    id: 5,
    businessId: 5,
    business: { id: 5, name: 'Spark Auto Care' },
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5d4c3b2a1f0e9d8c7b6a5e4f3c2b1a0d',
    title: 'Express Interior Cleaning',
    description: 'Quick interior refresh and vacuuming.',
    category: 'Automotive',
    originalPrice: 1200,
    offerPrice: 599,
    discountPercentage: 50,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    maxBookingPerCustomer: 2,
    termsAndConditions: 'Subject to vehicle size.',
    status: 'active',
    slots: [
      {
        id: 501,
        offerId: 5,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 14).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 15).toISOString(),
        capacity: 5,
        bookedCount: 0,
        status: 'Available',
        availableCount: 5
      },
      {
        id: 502,
        offerId: 5,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 38).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 39).toISOString(),
        capacity: 5,
        bookedCount: 1,
        status: 'Available',
        availableCount: 4
      }
    ]
  },
  {
    id: 6,
    businessId: 6,
    business: { id: 6, name: 'FitForge Gym' },
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4e96c5d96da8f6e0f3e3b5c8a1a2d4f6',
    title: 'Personal Training 3 Sessions',
    description: 'One-on-one training plan for beginners.',
    category: 'Fitness',
    originalPrice: 4500,
    offerPrice: 1999,
    discountPercentage: 56,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
    maxBookingPerCustomer: 3,
    termsAndConditions: 'Sessions valid for 40 days.',
    status: 'active',
    slots: [
      {
        id: 701,
        offerId: 6,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 16).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 17).toISOString(),
        capacity: 6,
        bookedCount: 1,
        status: 'Available',
        availableCount: 5
      },
      {
        id: 702,
        offerId: 6,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 40).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 41).toISOString(),
        capacity: 6,
        bookedCount: 0,
        status: 'Available',
        availableCount: 6
      }
    ]
  },
  {
    id: 7,
    businessId: 7,
    business: { id: 7, name: 'Sparkle Home Services' },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d',
    title: 'Deep Home Cleaning (3 BHK)',
    description: 'Thorough home cleaning package for medium homes.',
    category: 'Home Services',
    originalPrice: 6000,
    offerPrice: 2999,
    discountPercentage: 50,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    maxBookingPerCustomer: 1,
    termsAndConditions: 'Subject to inspection on arrival.',
    status: 'active',
    slots: [
      {
        id: 601,
        offerId: 7,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 21).toISOString(),
        capacity: 8,
        bookedCount: 2,
        status: 'Available',
        availableCount: 6
      },
      {
        id: 602,
        offerId: 7,
        slotStart: new Date(Date.now() + 1000 * 60 * 60 * 44).toISOString(),
        slotEnd: new Date(Date.now() + 1000 * 60 * 60 * 45).toISOString(),
        capacity: 8,
        bookedCount: 0,
        status: 'Available',
        availableCount: 8
      }
    ]
  }
];

export default demoOffers;
