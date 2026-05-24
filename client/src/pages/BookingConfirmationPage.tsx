import { useLocation, useNavigate } from 'react-router-dom';
import zenovoHero from '../assets/zenovo-hero.svg';

export default function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as any;

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl bg-white p-8 shadow">No booking confirmation available.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <img src={booking.offer?.image || zenovoHero} alt="Confirmed booking" className="mb-6 h-48 w-full rounded-3xl object-cover" />
        <h1 className="text-3xl font-semibold">Booking Confirmed</h1>
        <p className="mt-3 text-slate-600">Your booking reference is listed below.</p>
        <div className="mt-6 space-y-4 rounded-3xl bg-slate-50 p-6">
          <div>
            <p className="text-sm uppercase text-slate-500">Reference</p>
            <p className="text-xl font-semibold">{booking.bookingReference}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-slate-500">Customer</p>
            <p>{booking.customerName}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-slate-500">Offer</p>
            <p>{booking.offer?.title || booking.offerId}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-slate-500">Slot</p>
            <p>{booking.slot?.slotStart ? new Date(booking.slot.slotStart).toLocaleString() : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-slate-500">Status</p>
            <p>{booking.status}</p>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="mt-6 rounded bg-slate-900 px-5 py-2 text-white">Back to Offers</button>
      </div>
    </div>
  );
}
