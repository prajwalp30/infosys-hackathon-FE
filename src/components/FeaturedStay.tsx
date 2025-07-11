import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Calendar } from 'lucide-react';

const FeaturedStay: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-semibold">This Monsoon, explore Coorg</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Green Valley Homestay
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Cozy up at GreenHill Homestay, surrounded by misty coffee plantations and waterfalls. 
                Experience authentic Kodava culture with warm hospitality and home-cooked traditional meals.
              </p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-gray-700 font-medium">4.8 (127 reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Up to 4 guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Kodagu, Karnataka</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  View Stay
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-colors"
                >
                  See More
                </motion.button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/courtyard-of-south-indian-village.webp"
                alt="Traditional South Indian Village Homestay Courtyard"
                className="w-full h-full object-cover min-h-96"
              />
              <div className="absolute top-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg">
                <span className="text-green-600 font-bold">₹2,500/night</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStay;