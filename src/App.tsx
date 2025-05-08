import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { UserProvider } from './contexts/UserContext';
import { RaffleProvider } from './contexts/RaffleContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <RaffleProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Outlet />
          </main>
          <Footer />
        </div>
      </RaffleProvider>
    </UserProvider>
  );
}

export default App;