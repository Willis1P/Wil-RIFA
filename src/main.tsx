import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import HomePage from './pages/HomePage';
import TicketPurchasePage from './pages/TicketPurchasePage';
import MyTicketsPage from './pages/MyTicketsPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'comprar',
        element: <TicketPurchasePage />
      },
      {
        path: 'meus-bilhetes',
        element: <MyTicketsPage />
      },
      {
        path: 'conta',
        element: <AccountPage />
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'cadastro',
        element: <RegisterPage />
      },
      {
        path: 'sucesso',
        element: <SuccessPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);