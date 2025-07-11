import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Shield, Calendar } from 'lucide-react';
import { User } from '../types';

interface HostInfoProps {
  host: User;
}

const HostInfo: React.FC<HostInfoProps> = ({ host }) => {
  // Mock host stats - in real app, this would come from API
  const hostStats = {
    yearsHosting: 3,
    totalGuests: 150,
    responseRate: 98,
    responseTime: '2 hours'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-50 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Meet your host</h2>
      
      <div className="flex items-start space-x-6">
        {/* Host Avatar */}
        <div className="flex-shrink-0">
          <img
            src={host.avatar || 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt={host.name}
            className="w-20 h-20 rounded-full"
          />
        </div>

        {/* Host Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900">{host.name}</h3>
            <div className="flex items-center space-x-1">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Verified Host</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{hostStats.yearsHosting}</div>
              <div className="text-sm text-gray-600">Years hosting</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{hostStats.totalGuests}</div>
              <div className="text-sm text-gray-600">Guests hosted</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{hostStats.responseRate}%</div>
              <div className="text-sm text-gray-600">Response rate</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{hostStats.responseTime}</div>
              <div className="text-sm text-gray-600">Response time</div>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            Welcome to our family home! We've been sharing our village's beauty with travelers for over {hostStats.yearsHosting} years. 
            We love meeting people from different cultures and showing them the authentic rural life of our region.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Host</span>
            </motion.button>
            
            <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>View Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Host Highlights */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Host highlights</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">Superhost for 2 consecutive years</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Speaks Hindi, English, and local dialect</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Identity verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HostInfo;