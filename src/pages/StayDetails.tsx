import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Wifi, Coffee, Mountain, Heart, Share, Calendar } from 'lucide-react';
import { sampleHomestays } from '../data/sampleData';
import { Homestay } from '../types';
import { useBooking } from '../context/BookingContext';
import ImageCarousel from '../components/ImageCarousel';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import BookingForm from '../components/BookingForm';
import ReviewsSection from '../components/ReviewsSection';
import SimilarStays from '../components/SimilarStays';
import HostInfo from '../components/HostInfo';

const StayDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCurrentBooking } = useBooking();
  const [stay, setStay] = useState<Homestay | null>(null);
  const [selectedDates, setSelectedDates] = useState<{ checkIn: string; checkOut: string } | null>(null);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const foundStay = sampleHomestays.find(s => s.id === id);
    setStay(foundStay || null);
  }, [id]);

  const handleBookNow = (bookingData: any) => {
    if (!stay) return;

    const booking = {
      id: Math.random().toString(36),
      homestayId: stay.id,
      homestay: stay,
      ...bookingData,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    setCurrentBooking(booking);
    navigate('/checkout');
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'home-cooked meals':
        return <Coffee className="w-4 h-4" />;
      case 'nature walks':
        return <Mountain className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  if (!stay) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay not found</h2>
          <p className="text-gray-600 mb-4">The homestay you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/stays')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse All Stays
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stay.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{stay.rating}</span>
                  <span>({stay.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{stay.location.village}, {stay.location.state}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-green-600 transition-colors">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-green-600 transition-colors">
                <Heart className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-8">
          <ImageCarousel images={stay.images} title={stay.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <HostInfo host={stay.host} />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-600 leading-relaxed">{stay.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stay.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capacity */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sleep arrangements</h2>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{stay.capacity.guests} guests maximum</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>{stay.capacity.rooms} rooms</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <ReviewsSection reviews={stay.reviews} rating={stay.rating} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm
                stay={stay}
                onBook={handleBookNow}
                selectedDates={selectedDates}
                onDatesChange={setSelectedDates}
                guests={guests}
                onGuestsChange={setGuests}
              />
            </div>
          </div>
        </div>

        {/* Similar Stays */}
        <div className="mt-16">
          <SimilarStays currentStay={stay} />
        </div>
      </div>
    </div>
  );
};

export default StayDetails;