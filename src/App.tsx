import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/HomePage';
import TicketPurchasePage from './pages/TicketPurchasePage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import MyTicketsPage from './pages/MyTicketsPage';
import ViewTicketsPage from './pages/ViewTicketsPage';
import AdminPanel from './pages/admin';
import AdminLogin from './pages/admin/login';
import { RaffleCodeProvider } from './contexts/RaffleCodeContext';
import { RaffleProvider } from './contexts/RaffleContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

function App() {
  return (
    <RaffleProvider>
      <RaffleCodeProvider>
        <AdminAuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="comprar" element={<TicketPurchasePage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="sucesso" element={<SuccessPage />} />
              <Route path="meus-bilhetes" element={<MyTicketsPage />} />
              <Route path="bilhetes/:code" element={<ViewTicketsPage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPanel />} />
            </Route>
          </Routes>
        </AdminAuthProvider>
      </RaffleCodeProvider>
    </RaffleProvider>
  );
}

export default App;