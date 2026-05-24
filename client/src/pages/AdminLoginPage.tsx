import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import zenovoHero from '../assets/zenovo-hero.svg';
import { useAuth } from '../AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@willovate.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [token, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      setToken(response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Login failed. Check credentials.');
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg">
        <img src={zenovoHero} alt="Zenovo admin preview" className="mx-auto mb-6 h-28 w-full rounded-3xl object-cover" />
        <h1 className="mb-6 text-3xl font-semibold">Admin Login</h1>
        {error && <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full" />
          </label>
          <button type="submit" className="w-full rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">Sign In</button>
        </form>
      </div>
    </div>
  );
}
