import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CreditCard, MapPin, Star } from 'lucide-react';
import { Homestay } from '../types';
import toast from 'react-hot-toast';

interface BookingFormProps {
  stay: Homestay;
  onBook: (bookingData: any) => void;
  selectedDates: { checkIn: string; checkOut: string } | null;
  onDatesChange: (dates: { checkIn: string; checkOut: string } | null) => void;
  guests: number;
  onGuestsChange: (guests: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  stay,
  onBook,
  selectedDates,
  onDatesChange,
  guests,
  onGuestsChange
}) => {
  const [checkIn, setCheckIn] = useState(selectedDates?.checkIn || '');
  const [checkOut, setCheckOut] = useState(selectedDates?.checkOut || '');

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * stay.pricing.perNight;
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    const bookingData = {
      checkIn,
      checkOut,
      guests,
      nights: calculateNights(),
      totalAmount: calculateTotal()
    };

    onBook(bookingData);
  };

  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ₹{stay.pricing.perNight.toLocaleString()}
          </span>
          <span className="text-gray-600">per night</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{stay.rating}</span>
          <span className="text-sm text-gray-600">({stay.reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  onDatesChange({ checkIn: e.target.value, checkOut });
                }}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  onDatesChange({ checkIn, checkOut: e.target.value });
                }}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Guest Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={guests}
              onChange={(e) => onGuestsChange(parseInt(e.target.value))}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            >
              {Array.from({ length: stay.capacity.guests }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} guest{i + 1 > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>₹{stay.pricing.perNight.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>₹{Math.round(total * 0.05).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>₹{(total + Math.round(total * 0.05)).toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Book Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBooking}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Reserve</span>
        </motion.button>

        <p className="text-xs text-gray-500 text-center">
          You won't be charged yet
        </p>
      </div>

      {/* Location Info */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{stay.location.village}, {stay.location.state}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;