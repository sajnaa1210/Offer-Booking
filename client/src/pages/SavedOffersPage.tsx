import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Offer } from '../types';
import demoOffers from '../demoData';
import zenovoHero from '../assets/zenovo-hero.svg';
import { getSavedOfferIds, removeSavedOfferId } from '../lib/savedOffers';

export default function SavedOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [savedOfferIds, setSavedOfferIds] = useState<number[]>([]);

  useEffect(() => {
    setSavedOfferIds(getSavedOfferIds());
    api.get('/offers')
      .then((response) => {
        const data = response.data;
        const allOffers = (!data || data.length === 0) ? demoOffers : data;
        setOffers(allOffers.filter((offer: Offer) => getSavedOfferIds().includes(offer.id)));
      })
      .catch(() => {
        setOffers(demoOffers.filter((offer) => getSavedOfferIds().includes(offer.id)));
      });
  }, []);

  function handleRemove(offerId: number) {
    removeSavedOfferId(offerId);
    setSavedOfferIds((current) => current.filter((id) => id !== offerId));
    setOffers((current) => current.filter((offer) => offer.id !== offerId));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 grid gap-6 rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm lg:grid-cols-[2fr_1.4fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Saved offers</p>
          <h1 className="mt-4 text-5xl font-serif font-semibold tracking-tight text-slate-900">Your curated collection</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Keep your favorite experiences handy and book them whenever you're ready.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">{offers.length} Saved offers</span>
            <Link to="/" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700">
              Browse all offers
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <img src={zenovoHero} alt="Saved offers hero" className="h-full w-full object-cover" />
        </div>
      </div>

      {offers.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600 shadow-sm">
          <p className="text-xl font-semibold text-slate-900">No saved offers yet</p>
          <p className="mt-4 max-w-xl mx-auto text-slate-600">Explore the offer collection and save the ones you love. Your saved list will show up here for quick access.</p>
          <Link to="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-amber-100 px-6 py-3 text-sm font-semibold text-amber-900 hover:bg-amber-200">
            Start browsing offers
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.id} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              {offer.image && <img src={offer.image} alt={offer.title} className="h-56 w-full object-cover transition duration-300 group-hover:scale-105" />}
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-900">Saved</span>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">{offer.title}</h2>
                    <p className="mt-2 text-sm text-slate-500">{offer.business?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold text-slate-900">₹{offer.offerPrice.toFixed(0)}</p>
                    <p className="mt-1 text-sm line-through text-slate-400">₹{offer.originalPrice.toFixed(0)}</p>
                  </div>
                </div>
                <p className="mt-6 text-slate-600">{offer.description}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link to={`/offers/${offer.id}`} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                    View offer
                  </Link>
                  <button onClick={() => handleRemove(offer.id)} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
