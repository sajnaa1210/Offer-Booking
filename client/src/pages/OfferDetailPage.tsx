import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { Offer, OfferSlot } from '../types';
import demoOffers from '../demoData';
import zenovoHero from '../assets/zenovo-hero.svg';
import { getSavedOfferIds, removeSavedOfferId, saveOfferId } from '../lib/savedOffers';

const initialBooking = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  slotId: 0,
  peopleCount: 1,
  specialNote: ''
};

export default function OfferDetailPage() {
  const { id } = useParams();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [booking, setBooking] = useState(initialBooking);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    api.get(`/offers/${id}`)
      .then((response) => {
        setOffer(response.data);
        setIsSaved(getSavedOfferIds().includes(Number(id)));
      })
      .catch(() => {
        const demoOffer = demoOffers.find((item) => item.id === Number(id));
        setOffer(demoOffer || null);
        setIsSaved(getSavedOfferIds().includes(Number(id)));
      });
  }, [id]);

  function toggleSaved() {
    if (!offer) return;
    if (isSaved) {
      removeSavedOfferId(offer.id);
      setIsSaved(false);
    } else {
      saveOfferId(offer.id);
      setIsSaved(true);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (!booking.slotId) {
      setError('Please choose a slot before booking.');
      return;
    }

    try {
      const response = await api.post('/bookings', {
        ...booking,
        offerId: Number(id),
        slotId: booking.slotId,
      });
      navigate('/booking-confirmation', { state: response.data });
    } catch (err) {
      const selectedSlot = offer?.slots?.find((slot) => slot.id === booking.slotId);
      if (!offer || !selectedSlot) {
        setError('Unable to place booking. Check slot and customer information.');
        return;
      }

      const demoBooking = {
        id: Date.now(),
        bookingReference: `ZENOVO-${Date.now()}`,
        offerId: offer.id,
        offer,
        slotId: selectedSlot.id,
        slot: selectedSlot,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        customerEmail: booking.customerEmail,
        peopleCount: booking.peopleCount,
        specialNote: booking.specialNote,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      navigate('/booking-confirmation', { state: demoBooking });
    }
  }

  const slots = offer?.slots?.filter((slot) => slot.status === 'Available');

  return (
    <div className="container mx-auto px-4 py-8">
      {!offer ? (
        <div className="rounded-xl bg-white p-8 shadow">Loading offer...</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl bg-white p-8 shadow">
            <img src={offer.image || zenovoHero} alt={offer.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold">{offer.title}</h1>
                <p className="mt-3 text-slate-600">{offer.description}</p>
              </div>
              <button
                type="button"
                onClick={toggleSaved}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isSaved ? 'border border-amber-200 bg-amber-100 text-amber-900 hover:bg-amber-200' : 'border border-slate-200 bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm uppercase text-slate-500">Business</p>
                <p className="mt-2 text-lg font-semibold">{offer.business?.name}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm uppercase text-slate-500">Available slots</p>
                <p className="mt-2 text-lg font-semibold">{slots?.length ?? 0}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm uppercase text-slate-500">Price details</p>
              <p>Original: ₹{offer.originalPrice.toFixed(0)}</p>
              <p className="text-xl font-semibold">Offer: ₹{offer.offerPrice.toFixed(0)}</p>
              <p className="text-slate-500">Max bookings per customer: {offer.maxBookingPerCustomer}</p>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm uppercase text-slate-500">Terms & conditions</p>
              <p className="mt-2 text-slate-700 whitespace-pre-line">{offer.termsAndConditions}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="text-2xl font-semibold">Book Slot</h2>
          <div className="mt-6 hidden overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 md:block">
            <img src={zenovoHero} alt="Zenovo booking preview" className="h-40 w-full object-cover" />
          </div>
            {error && <div className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">{error}</div>}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm text-slate-700">Select Slot</span>
                <select value={booking.slotId} onChange={(e) => setBooking({ ...booking, slotId: Number(e.target.value) })} className="mt-1 w-full">
                  <option value={0}>Choose a slot</option>
                  {slots?.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {new Date(slot.slotStart).toLocaleString()} - {new Date(slot.slotEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({slot.availableCount} seats)
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-700">Customer Name</span>
                <input value={booking.customerName} onChange={(e) => setBooking({ ...booking, customerName: e.target.value })} className="mt-1 w-full" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-700">Phone</span>
                <input value={booking.customerPhone} onChange={(e) => setBooking({ ...booking, customerPhone: e.target.value })} className="mt-1 w-full" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-700">Email (optional)</span>
                <input value={booking.customerEmail} onChange={(e) => setBooking({ ...booking, customerEmail: e.target.value })} className="mt-1 w-full" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-700">People Count</span>
                <input type="number" min={1} value={booking.peopleCount} onChange={(e) => setBooking({ ...booking, peopleCount: Number(e.target.value) })} className="mt-1 w-full" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-700">Special Note</span>
                <textarea value={booking.specialNote} onChange={(e) => setBooking({ ...booking, specialNote: e.target.value })} className="mt-1 w-full min-h-[100px]" />
              </label>
              <button type="submit" className="w-full rounded bg-slate-900 px-4 py-2 text-white">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
