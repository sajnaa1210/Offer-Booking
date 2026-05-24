import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import AdminNav from '../components/AdminNav';
import { DashboardSummary } from '../types';
import zenovoHero from '../assets/zenovo-hero.svg';

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    api.get('/dashboard/summary').then((response) => setSummary(response.data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNav />
      <header className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-4">
          <img src={zenovoHero} alt="Zenovo dashboard" className="hidden h-24 w-24 rounded-3xl object-cover md:block" />
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="text-slate-600">Review offers, bookings, and business metrics.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/business" className="rounded bg-slate-900 px-4 py-2 text-white">Business Profile</Link>
          <Link to="/admin/offers" className="rounded bg-slate-600 px-4 py-2 text-white">Manage Offers</Link>
          <Link to="/admin/bookings" className="rounded bg-slate-600 px-4 py-2 text-white">Bookings</Link>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {summary ? (
          [
            { label: 'Active Offers', value: summary.activeOffers },
            { label: 'Total Bookings', value: summary.totalBookings },
            { label: 'Today’s Bookings', value: summary.todaysBookings },
            { label: 'Booked Seats', value: summary.bookedSeats },
            { label: 'Available Seats', value: summary.availableSeats },
            { label: 'Conversion Rate', value: `${summary.conversionRate}%` }
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-white p-5 shadow">
              <p className="text-sm uppercase text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.value}</p>
            </div>
          ))
        ) : (
          <div className="col-span-3 rounded-xl bg-white p-5 text-center shadow">Loading metrics…</div>
        )}
      </div>

      <section className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Recent Bookings</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Offer</th>
                <th className="px-4 py-3">Slot</th>
                <th className="px-4 py-3">People</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {summary?.recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-3">{booking.customerName}</td>
                  <td className="px-4 py-3">{booking.offerName}</td>
                  <td className="px-4 py-3">{booking.slotTime}</td>
                  <td className="px-4 py-3">{booking.peopleCount}</td>
                  <td className="px-4 py-3">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
