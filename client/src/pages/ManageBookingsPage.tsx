import { useEffect, useState } from 'react';
import api from '../api';
import AdminNav from '../components/AdminNav';
import zenovoHero from '../assets/zenovo-hero.svg';
import { Booking } from '../types';

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    api.get('/bookings').then((response) => setBookings(response.data));
  }, []);

  async function updateStatus(id: number, status: string) {
    await api.put(`/bookings/${id}/status`, { status });
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNav />
      <div className="mb-6 rounded-xl bg-white p-6 shadow flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manage Bookings</h1>
          <p className="text-slate-600">Update booking statuses and review details.</p>
        </div>
        <img src={zenovoHero} alt="Zenovo bookings overview" className="hidden h-24 w-24 rounded-3xl object-cover lg:block" />
      </div>
      <div className="overflow-x-auto rounded-xl bg-white p-4 shadow">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Offer</th>
              <th className="px-4 py-3">Slot</th>
              <th className="px-4 py-3">People</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-4 py-3">{booking.bookingReference}</td>
                <td className="px-4 py-3">{booking.customerName}</td>
                <td className="px-4 py-3">{booking.offer?.title || booking.offerId}</td>
                <td className="px-4 py-3">{booking.slot?.slotStart ? `${new Date(booking.slot.slotStart).toLocaleString()}` : '—'}</td>
                <td className="px-4 py-3">{booking.peopleCount}</td>
                <td className="px-4 py-3">{booking.status}</td>
                <td className="px-4 py-3 space-x-2">
                  {['Pending', 'Confirmed', 'Cancelled', 'Completed', 'NoShow'].map((status) => (
                    <button key={status} onClick={() => updateStatus(booking.id, status)} className="rounded bg-slate-900 px-2 py-1 text-white text-xs hover:bg-slate-700">
                      {status}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
