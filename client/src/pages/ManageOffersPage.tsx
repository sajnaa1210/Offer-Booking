import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import AdminNav from '../components/AdminNav';
import { Offer } from '../types';
import placeholder from '../assets/placeholder.svg';

export default function ManageOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    api.get('/offers?activeOnly=false').then((response) => setOffers(response.data));
  }, []);

  async function handleDelete(offerId: number) {
    const confirmed = window.confirm('Delete this offer and all its slots?');
    if (!confirmed) return;

    await api.delete(`/offers/${offerId}`);
    setOffers((current) => current.filter((offer) => offer.id !== offerId));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNav />
      <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Manage Offers</h1>
          <p className="text-slate-600">Create, update, and review all business offers.</p>
        </div>
        <Link to="/admin/offers/new" className="rounded bg-slate-900 px-4 py-2 text-white">Create Offer</Link>
      </div>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id} className="rounded-xl bg-white p-5 shadow">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
              <div className="flex items-center gap-4">
                <img src={offer.image || placeholder} alt={offer.title} className="h-20 w-32 rounded object-cover" />
                <div>
                  <h2 className="text-xl font-semibold">{offer.title}</h2>
                  <p className="text-slate-600">{offer.business?.name || 'Unknown business'} · {offer.status}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-slate-100 px-3 py-1">{offer.category}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{offer.discountPercentage}% off</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Ends {new Date(offer.endDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to={`/admin/offers/${offer.id}/edit`} className="rounded bg-slate-800 px-3 py-2 text-white">
                Edit
              </Link>
              <Link to={`/admin/offers/${offer.id}/slots`} className="rounded bg-slate-600 px-3 py-2 text-white">
                Manage Slots
              </Link>
              <button onClick={() => handleDelete(offer.id)} className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
