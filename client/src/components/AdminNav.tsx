import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AdminNav() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    navigate('/admin/login');
  }

  return (
    <div className="mb-6 rounded-xl bg-white p-4 shadow">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/dashboard" className="rounded bg-slate-900 px-4 py-2 text-white">
            Dashboard
          </Link>
          <Link to="/admin/business" className="rounded bg-slate-600 px-4 py-2 text-white">
            Business
          </Link>
          <Link to="/admin/offers" className="rounded bg-slate-600 px-4 py-2 text-white">
            Offers
          </Link>
          <Link to="/admin/bookings" className="rounded bg-slate-600 px-4 py-2 text-white">
            Bookings
          </Link>
        </div>
        <button onClick={handleLogout} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
}
