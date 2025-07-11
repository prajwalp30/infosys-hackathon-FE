import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, ArrowRight } from 'lucide-react';
import { Homestay } from '../types';
import { sampleHomestays } from '../data/sampleData';
import { useNavigate } from 'react-router-dom';

interface SimilarStaysProps {
  currentStay: Homestay;
}

const SimilarStays: React.FC<SimilarStaysProps> = ({ currentStay }) => {
  const navigate = useNavigate();

  // Get similar stays (same state, excluding current stay)
  const similarStays = sampleHomestays
    .filter(stay => 
      stay.id !== currentStay.id && 
      stay.location.state === currentStay.location.state
    )
    .slice(0, 3);

  // If no stays in same state, get random stays
  const displayStays = similarStays.length > 0 
    ? similarStays 
    : sampleHomestays.filter(stay => stay.id !== currentStay.id).slice(0, 3);

  const handleStayClick = (stayId: string) => {
    navigate(`/stay/${stayId}`);
  };

  if (displayStays.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Similar Stays in {currentStay.location.state}
        </h2>
        <button
          onClick={() => navigate('/stays')}
          className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayStays.map((stay, index) => (
          <motion.div
            key={stay.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
            onClick={() => handleStayClick(stay.id)}
          >
            <div className="relative">
              <img
                src={stay.images[0]}
                alt={stay.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-green-600">
                ₹{stay.pricing.perNight}/night
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  {stay.title}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{stay.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {stay.location.village}, {stay.location.state}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {stay.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Up to {stay.capacity.guests} guests
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">
                    {stay.reviews.length} reviews
                  </span>
                </div>
              </div>

              {/* Amenities Preview */}
              <div className="mt-4 flex flex-wrap gap-2">
                {stay.amenities.slice(0, 2).map((amenity, amenityIndex) => (
                  <span
                    key={amenityIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {stay.amenities.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{stay.amenities.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SimilarStays;