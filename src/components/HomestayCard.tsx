import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Heart } from 'lucide-react';
import { Homestay } from '../types';
import { useBooking } from '../context/BookingContext';

interface HomestayCardProps {
  homestay: Homestay;
  onSelect: (homestay: Homestay) => void;
}

const HomestayCard: React.FC<HomestayCardProps> = ({ homestay, onSelect }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useBooking();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(homestay.id)) {
      removeFromFavorites(homestay.id);
    } else {
      addToFavorites(homestay.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
      onClick={() => onSelect(homestay)}
    >
      <div className="relative">
        <img
          src={homestay.images[0]}
          alt={homestay.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorite(homestay.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
        <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-green-600">
          ₹{homestay.pricing.perNight}/night
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            {homestay.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">{homestay.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-3">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {homestay.location.village}, {homestay.location.state}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {homestay.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Up to {homestay.capacity.guests} guests
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">
              {homestay.reviews.length} reviews
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomestayCard;