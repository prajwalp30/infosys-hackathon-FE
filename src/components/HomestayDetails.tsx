import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Star, Users, Wifi, Coffee, Mountain, Heart, Phone, Mail, Calendar } from 'lucide-react';
import { Homestay } from '../types';

interface HomestayDetailsProps {
  homestay: Homestay;
  isOpen: boolean;
  onClose: () => void;
  onBooking: (homestay: Homestay) => void;
}

const HomestayDetails: React.FC<HomestayDetailsProps> = ({ homestay, isOpen, onClose, onBooking }) => {
  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Images */}
            <div className="space-y-4">
              <img
                src={homestay.images[0]}
                alt={homestay.title}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="grid grid-cols-2 gap-4">
                {homestay.images.slice(1, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${homestay.title} ${index + 2}`}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{homestay.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{homestay.rating}</span>
                    <span className="text-gray-600">({homestay.reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      {homestay.location.village}, {homestay.location.state}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{homestay.description}</p>
              </div>

              {/* Host Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold mb-3">Your Host</h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={homestay.host.avatar || 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={homestay.host.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{homestay.host.name}</p>
                    <p className="text-sm text-gray-600">Local Host</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold mb-3">What this place offers</h3>
                <div className="grid grid-cols-2 gap-3">
                  {homestay.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{homestay.capacity.guests} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>{homestay.capacity.rooms} rooms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{homestay.pricing.perNight}
                </span>
                <span className="text-gray-600 ml-2">per night</span>
              </div>
              <div className="flex space-x-3">
                <button className="p-3 border-2 border-gray-300 rounded-xl hover:border-green-600 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-xl hover:border-green-600 transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-xl hover:border-green-600 transition-colors">
                  <Mail className="w-5 h-5 text-gray-600" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onBooking(homestay)}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {homestay.reviews.length > 0 && (
            <div className="border-t p-6">
              <h3 className="text-xl font-semibold mb-4">Reviews</h3>
              <div className="space-y-4">
                {homestay.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src={review.user.avatar || 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{review.user.name}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{review.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HomestayDetails;