import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import ManageBookingsPage from './pages/ManageBookingsPage';
import ManageOffersPage from './pages/ManageOffersPage';
import ManageSlotsPage from './pages/ManageSlotsPage';
import OfferDetailPage from './pages/OfferDetailPage';
import OfferFormPage from './pages/OfferFormPage';
import PublicOffersPage from './pages/PublicOffersPage';
import SavedOffersPage from './pages/SavedOffersPage';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Routes>
        <Route path="/" element={<PublicOffersPage />} />
        <Route path="/offers/:id" element={<OfferDetailPage />} />
        <Route path="/saved" element={<SavedOffersPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/business" element={<ProtectedRoute><BusinessProfilePage /></ProtectedRoute>} />
        <Route path="/admin/offers" element={<ProtectedRoute><ManageOffersPage /></ProtectedRoute>} />
        <Route path="/admin/offers/new" element={<ProtectedRoute><OfferFormPage /></ProtectedRoute>} />
        <Route path="/admin/offers/:offerId/edit" element={<ProtectedRoute><OfferFormPage /></ProtectedRoute>} />
        <Route path="/admin/offers/:offerId/slots" element={<ProtectedRoute><ManageSlotsPage /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><ManageBookingsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
