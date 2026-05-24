import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import AdminNav from '../components/AdminNav';
import placeholder from '../assets/placeholder.svg';
import { OfferSlot } from '../types';

export default function ManageSlotsPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [slots, setSlots] = useState<OfferSlot[]>([]);
  const [offerTitle, setOfferTitle] = useState('');
  const [form, setForm] = useState({
    slotStart: '',
    slotEnd: '',
    capacity: 1
  });
  const [editSlotId, setEditSlotId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    slotStart: '',
    slotEnd: '',
    capacity: 1
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!offerId) return;

    api.get(`/offers/${offerId}`).then((response) => {
      setOfferTitle(response.data.title);
    });

    api.get(`/offers/${offerId}/slots`).then((response) => setSlots(response.data));
  }, [offerId]);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setMessage('');
    if (!offerId) return;
    try {
      await api.post('/slots', {
        offerId: Number(offerId),
        slotStart: form.slotStart,
        slotEnd: form.slotEnd,
        capacity: form.capacity
      });
      setMessage('Slot created successfully.');
      setForm({ slotStart: '', slotEnd: '', capacity: 1 });
      const response = await api.get(`/offers/${offerId}/slots`);
      setSlots(response.data);
    } catch (error) {
      setMessage('Could not create slot. Check the values and try again.');
    }
  }

  async function handleDelete(id: number) {
    await api.delete(`/slots/${id}`);
    setSlots((current) => current.filter((slot) => slot.id !== id));
  }

  function handleEdit(slot: OfferSlot) {
    setEditSlotId(slot.id);
    setEditForm({
      slotStart: slot.slotStart.slice(0, 16),
      slotEnd: slot.slotEnd.slice(0, 16),
      capacity: slot.capacity
    });
    setMessage('');
  }

  async function handleSave(id: number) {
    const existingSlot = slots.find((slot) => slot.id === id);
    if (!existingSlot) return;

    if (new Date(editForm.slotEnd) <= new Date(editForm.slotStart)) {
      setMessage('Slot end time must be after the start time.');
      return;
    }

    try {
      await api.put(`/slots/${id}`, {
        id,
        offerId: existingSlot.offerId,
        slotStart: editForm.slotStart,
        slotEnd: editForm.slotEnd,
        capacity: editForm.capacity,
        status: existingSlot.status,
        bookedCount: existingSlot.bookedCount
      });

      const response = await api.get(`/offers/${offerId}/slots`);
      setSlots(response.data);
      setEditSlotId(null);
      setMessage('Slot updated successfully.');
    } catch (error) {
      setMessage('Could not update the slot. Review the values and try again.');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNav />
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={placeholder} alt="Slots" className="hidden h-20 w-28 rounded-3xl object-cover md:block" />
            <div>
              <h1 className="text-2xl font-semibold">Manage Slots</h1>
              <p className="text-slate-600">Offer: {offerTitle || 'Loading...'}</p>
            </div>
          </div>
          <button onClick={() => navigate('/admin/offers')} className="rounded bg-slate-900 px-4 py-2 text-white">
            Back to Offers
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="mb-4 text-xl font-semibold">Create a Slot</h2>
            {message && <div className="mb-4 rounded border border-slate-200 bg-white p-3 text-slate-700">{message}</div>}
            <form onSubmit={handleCreate} className="space-y-4">
              <label className="block">
                <span className="text-sm text-slate-700">Start Date & Time</span>
                <input type="datetime-local" value={form.slotStart} onChange={(e) => setForm({ ...form, slotStart: e.target.value })} className="mt-1 w-full" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-700">End Date & Time</span>
                <input type="datetime-local" value={form.slotEnd} onChange={(e) => setForm({ ...form, slotEnd: e.target.value })} className="mt-1 w-full" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-700">Capacity</span>
                <input type="number" min={1} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} className="mt-1 w-full" />
              </label>
              <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">Create Slot</button>
            </form>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="mb-4 text-xl font-semibold">Current Slots</h2>
            <div className="space-y-4">
              {slots.length === 0 ? (
                <p className="text-slate-600">No slots created yet.</p>
              ) : (
                slots.map((slot) => (
                  <div key={slot.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    {editSlotId === slot.id ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="text-sm text-slate-700">Start</span>
                          <input type="datetime-local" value={editForm.slotStart} onChange={(e) => setEditForm({ ...editForm, slotStart: e.target.value })} className="mt-1 w-full" />
                        </label>
                        <label className="block">
                          <span className="text-sm text-slate-700">End</span>
                          <input type="datetime-local" value={editForm.slotEnd} onChange={(e) => setEditForm({ ...editForm, slotEnd: e.target.value })} className="mt-1 w-full" />
                        </label>
                        <label className="block">
                          <span className="text-sm text-slate-700">Capacity</span>
                          <input type="number" min={1} value={editForm.capacity} onChange={(e) => setEditForm({ ...editForm, capacity: Number(e.target.value) })} className="mt-1 w-full" />
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => handleSave(slot.id)} className="rounded bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700">
                            Save
                          </button>
                          <button type="button" onClick={() => setEditSlotId(null)} className="rounded bg-slate-300 px-3 py-2 text-slate-800 hover:bg-slate-400">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold">{new Date(slot.slotStart).toLocaleString()} – {new Date(slot.slotEnd).toLocaleString()}</p>
                          <p className="text-sm text-slate-500">Capacity: {slot.capacity} · Booked: {slot.bookedCount} · Available: {slot.availableCount}</p>
                          <p className="text-sm text-slate-500">Status: {slot.status}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => handleEdit(slot)} className="rounded bg-slate-800 px-3 py-2 text-white hover:bg-slate-900">
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(slot.id)} className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
