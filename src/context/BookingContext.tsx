import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Homestay, Booking } from '../types';
import { useAuth } from './AuthContext';

interface BookingContextType {
  currentBooking: Partial<Booking> | null;
  setCurrentBooking: (booking: Partial<Booking> | null) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  favorites: string[];
  addToFavorites: (homestayId: string) => void;
  removeFromFavorites: (homestayId: string) => void;
  isFavorite: (homestayId: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking> | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('villageStayBookings');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('villageStayFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const addBooking = (booking: Booking) => {
    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    localStorage.setItem('villageStayBookings', JSON.stringify(newBookings));
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('villageStayBookings', JSON.stringify(updatedBookings));
  };

  const cancelBooking = (id: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('villageStayBookings', JSON.stringify(updatedBookings));
  };

  const addToFavorites = (homestayId: string) => {
    const newFavorites = [...favorites, homestayId];
    setFavorites(newFavorites);
    localStorage.setItem('villageStayFavorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (homestayId: string) => {
    const newFavorites = favorites.filter(id => id !== homestayId);
    setFavorites(newFavorites);
    localStorage.setItem('villageStayFavorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (homestayId: string) => {
    return favorites.includes(homestayId);
  };

  const value = {
    currentBooking,
    setCurrentBooking,
    bookings,
    addBooking,
    updateBooking,
    cancelBooking,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};