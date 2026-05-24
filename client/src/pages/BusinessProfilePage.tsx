import { useEffect, useState } from 'react';
import api from '../api';
import AdminNav from '../components/AdminNav';
import placeholder from '../assets/placeholder.svg';

export default function BusinessProfilePage() {
  const [business, setBusiness] = useState({
    id: 0,
    name: '',
    businessType: 'Restaurant',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    logoUrl: '',
    openingTime: '09:00',
    closingTime: '18:00'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/business').then((response) => {
      if (response.data.length > 0) {
        const payload = response.data[0];
        setBusiness({
          ...business,
          id: payload.id,
          name: payload.name,
          businessType: payload.businessType,
          ownerName: payload.ownerName,
          phone: payload.phone,
          email: payload.email,
          address: payload.address,
          city: payload.city,
          logoUrl: payload.logoUrl || '',
          openingTime: payload.openingTime || '09:00',
          closingTime: payload.closingTime || '18:00'
        });
      }
    });
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      if (business.id > 0) {
        await api.put(`/business/${business.id}`, business);
        setMessage('Business profile updated.');
      } else {
        const response = await api.post('/business', business);
        setBusiness(response.data);
        setMessage('Business profile created.');
      }
    } catch (error) {
      setMessage('Could not save business profile.');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNav />
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Business Profile</h1>
          </div>
          <img src={business.logoUrl || placeholder} alt="Business logo" className="hidden h-24 w-24 rounded-3xl object-cover border border-slate-200 md:block" />
        </div>
        {message && <div className="mb-4 rounded border border-slate-200 bg-slate-50 p-3 text-slate-700">{message}</div>}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {[
            { label: 'Business Name', key: 'name' },
            { label: 'Business Type', key: 'businessType' },
            { label: 'Owner Name', key: 'ownerName' },
            { label: 'Phone', key: 'phone' },
            { label: 'Email', key: 'email' },
            { label: 'City', key: 'city' },
            { label: 'Address', key: 'address' },
            { label: 'Logo URL', key: 'logoUrl' }
          ].map((field) => (
            <label key={field.key} className="block">
              <span className="text-sm text-slate-700">{field.label}</span>
              {field.key === 'businessType' ? (
                <select
                  className="mt-1 w-full"
                  value={(business as any)[field.key]}
                  onChange={(e) => setBusiness({ ...business, [field.key]: e.target.value })}
                >
                  {['Restaurant', 'Gym', 'Salon', 'Clinic', 'Coaching', 'Turf', 'Other'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={(business as any)[field.key]}
                  onChange={(e) => setBusiness({ ...business, [field.key]: e.target.value })}
                  className="mt-1 w-full"
                />
              )}
            </label>
          ))}
          <label className="block">
            <span className="text-sm text-slate-700">Opening Time</span>
            <input
              type="time"
              value={business.openingTime}
              onChange={(e) => setBusiness({ ...business, openingTime: e.target.value })}
              className="mt-1 w-full"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-700">Closing Time</span>
            <input
              type="time"
              value={business.closingTime}
              onChange={(e) => setBusiness({ ...business, closingTime: e.target.value })}
              className="mt-1 w-full"
            />
          </label>
          <div className="md:col-span-2">
            <button className="rounded bg-slate-900 px-4 py-2 text-white">Save Business</button>
          </div>
        </form>
      </div>
    </div>
  );
}
