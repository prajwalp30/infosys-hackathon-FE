import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import StayDetails from './pages/StayDetails';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import HostDashboard from './pages/HostDashboard';
import AdminPanel from './pages/AdminPanel';
import ContactUs from './pages/ContactUs';
import AuthModal from './components/AuthModal';
import { useState } from 'react';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Toaster position="top-right" />
            
            <Header onAuthClick={() => setShowAuthModal(true)} />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stays" element={<SearchResults />} />
                <Route path="/stay/:id" element={<StayDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard/host" element={<HostDashboard />} />
                <Route path="/dashboard/admin" element={<AdminPanel />} />
                <Route path="/contact" element={<ContactUs />} />
              </Routes>
            </main>

            <Footer />

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;