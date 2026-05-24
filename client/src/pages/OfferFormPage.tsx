import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import AdminNav from '../components/AdminNav';

const defaultOffer = {
  businessId: 0,
  title: '',
  description: '',
  image: '',
  category: '',
  originalPrice: 0,
  offerPrice: 0,
  maxBookingPerCustomer: 1,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  termsAndConditions: '',
  status: 'Draft'
};

export default function OfferFormPage() {
  const { offerId } = useParams();
  const isEdit = Boolean(offerId);
  const [offer, setOffer] = useState(defaultOffer);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!offerId) {
      setOffer(defaultOffer);
      setMessage('');
      return;
    }

    api.get(`/offers/${offerId}`)
      .then((response) => {
        const existingOffer = response.data;
        setOffer({
          ...existingOffer,
          image: existingOffer.image || '',
          startDate: existingOffer.startDate?.slice(0, 10) || defaultOffer.startDate,
          endDate: existingOffer.endDate?.slice(0, 10) || defaultOffer.endDate,
        });
      })
      .catch(() => {
        setMessage('Could not load the selected offer.');
      });
  }, [offerId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (offer.offerPrice >= offer.originalPrice) {
      setMessage('Offer price must be less than original price.');
      return;
    }

    if (new Date(offer.endDate) <= new Date(offer.startDate)) {
      setMessage('End date must be after start date.');
      return;
    }

    try {
      if (isEdit && offerId) {
        await api.put(`/offers/${offerId}`, offer);
      } else {
        await api.post('/offers', offer);
      }
      navigate('/admin/offers');
    } catch (error) {
      setMessage('Could not save the offer. Review data and try again.');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNav />
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold">{isEdit ? 'Edit Offer' : 'Create Offer'}</h1>
        {message && <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">{message}</div>}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="text-sm text-slate-700">Business ID</span>
            <input type="number" value={offer.businessId} onChange={(e) => setOffer({ ...offer, businessId: Number(e.target.value) })} className="mt-1 w-full" />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm text-slate-700">Offer Title</span>
            <input value={offer.title} onChange={(e) => setOffer({ ...offer, title: e.target.value })} className="mt-1 w-full" />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm text-slate-700">Description</span>
            <textarea value={offer.description} onChange={(e) => setOffer({ ...offer, description: e.target.value })} className="mt-1 w-full min-h-[120px]" />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm text-slate-700">Image URL (optional)</span>
            <input value={offer.image} onChange={(e) => setOffer({ ...offer, image: e.target.value })} className="mt-1 w-full" />
            {offer.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={offer.image} alt="preview" className="mt-3 h-40 w-full object-cover rounded" />
            )}
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">Category</span>
            <input value={offer.category} onChange={(e) => setOffer({ ...offer, category: e.target.value })} className="mt-1 w-full" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">Original Price</span>
            <input type="number" value={offer.originalPrice} onChange={(e) => setOffer({ ...offer, originalPrice: Number(e.target.value) })} className="mt-1 w-full" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">Offer Price</span>
            <input type="number" value={offer.offerPrice} onChange={(e) => setOffer({ ...offer, offerPrice: Number(e.target.value) })} className="mt-1 w-full" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">Max Booking Per Customer</span>
            <input type="number" min={1} value={offer.maxBookingPerCustomer} onChange={(e) => setOffer({ ...offer, maxBookingPerCustomer: Number(e.target.value) })} className="mt-1 w-full" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">Status</span>
            <select value={offer.status} onChange={(e) => setOffer({ ...offer, status: e.target.value })} className="mt-1 w-full">
              {['Draft', 'Active', 'Paused', 'Cancelled'].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">Start Date</span>
            <input type="date" value={offer.startDate} onChange={(e) => setOffer({ ...offer, startDate: e.target.value })} className="mt-1 w-full" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">End Date</span>
            <input type="date" value={offer.endDate} onChange={(e) => setOffer({ ...offer, endDate: e.target.value })} className="mt-1 w-full" />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm text-slate-700">Terms and Conditions</span>
            <textarea value={offer.termsAndConditions} onChange={(e) => setOffer({ ...offer, termsAndConditions: e.target.value })} className="mt-1 w-full min-h-[100px]" />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">Save Offer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
