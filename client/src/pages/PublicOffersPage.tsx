import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Offer } from '../types';
import demoOffers from '../demoData';
import zenovoHero from '../assets/zenovo-hero.svg';
import { getSavedOfferIds, removeSavedOfferId, saveOfferId } from '../lib/savedOffers';

export default function PublicOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [savedOfferIds, setSavedOfferIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setSavedOfferIds(getSavedOfferIds());
    api.get('/offers')
      .then((response) => {
        const data = response.data;
        if (!data || data.length === 0) setOffers(demoOffers);
        else setOffers(data);
      })
      .catch(() => {
        // If API is unavailable, show demo data
        setOffers(demoOffers);
      });
  }, []);

  function toggleSaved(offer: Offer) {
    const isSaved = savedOfferIds.includes(offer.id);
    if (isSaved) {
      removeSavedOfferId(offer.id);
      setSavedOfferIds((current) => current.filter((id) => id !== offer.id));
    } else {
      saveOfferId(offer.id);
      setSavedOfferIds((current) => [...current, offer.id]);
    }
  }

  const categories = ['All', ...Array.from(new Set(offers.map((o) => o.category))).sort()];

  const visibleOffers = offers.filter((offer) =>
    (category === 'All' || offer.category === category) &&
    (offer.title.toLowerCase().includes(search.toLowerCase()) ||
      offer.business?.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm lg:grid-cols-[1.6fr_1fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Premium offers</p>
          <div className="mt-4 mb-6 h-0.5 w-24 rounded-full bg-amber-300/80"></div>
          <h1 className="text-5xl font-serif font-semibold tracking-tight text-slate-900">Zenovo</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">A calm, elegant booking experience with curated offers and soft visual polish for modern customers.</p>
        </div>
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
          <img src={zenovoHero} alt="Zenovo hero" className="h-56 w-full object-cover" />
        </div>
      </header>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full gap-3 md:w-1/2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search offers, business, category"
            className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-300 bg-white px-4 py-3">
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Link to="/saved" className="inline-flex items-center justify-center rounded-full bg-amber-100 px-4 py-2 text-amber-900 hover:bg-amber-200 md:w-auto">
          Saved offers ({savedOfferIds.length})
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleOffers.map((offer) => (
          <div key={offer.id} className="rounded-3xl border border-transparent bg-white p-0 overflow-hidden card-accent">
            {offer.image && (
              <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <span className="inline-block rounded-full px-3 py-1 text-sm font-medium text-white badge-gradient">{offer.category}</span>
                <h2 className="mt-3 text-2xl font-bold">{offer.title}</h2>
                <p className="text-slate-500">{offer.business?.name}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-slate-500">Save</div>
                <div className="mt-1 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">₹{offer.originalPrice - offer.offerPrice}</div>
              </div>
            </div>
            <div className="mb-4 space-y-2 text-slate-700">
              <p className="text-sm line-through text-slate-400">₹{offer.originalPrice.toFixed(0)}</p>
              <p className="text-2xl font-extrabold text-slate-900">₹{offer.offerPrice.toFixed(0)}</p>
              <p className="text-sm text-slate-500">{offer.discountPercentage}% off • Expires: {new Date(offer.endDate).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to={`/offers/${offer.id}`} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white btn-gradient">
                Book Now
              </Link>
              <button
                type="button"
                onClick={() => toggleSaved(offer)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${savedOfferIds.includes(offer.id)
                  ? 'border border-amber-200 bg-amber-100 text-amber-900 hover:bg-amber-200'
                  : 'border border-slate-200 bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {savedOfferIds.includes(offer.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
