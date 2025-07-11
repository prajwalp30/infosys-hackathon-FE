import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, Wifi, Coffee, Car, Mountain, Users, Home } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange, isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    priceRange: [500, 5000],
    amenities: [] as string[],
    accommodationType: '',
    language: '',
    rating: 0
  });

  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'meals', label: 'Home-cooked meals', icon: Coffee },
    { id: 'transport', label: 'Local transport', icon: Car },
    { id: 'nature', label: 'Nature walks', icon: Mountain },
    { id: 'guide', label: 'Local guide', icon: Users }
  ];

  const accommodationTypes = [
    { id: 'hut', label: 'Traditional Hut' },
    { id: 'cottage', label: 'Cottage' },
    { id: 'tent', label: 'Tent' },
    { id: 'house', label: 'Village House' }
  ];

  const languages = [
    { id: 'hindi', label: 'Hindi' },
    { id: 'english', label: 'English' },
    { id: 'tamil', label: 'Tamil' },
    { id: 'bengali', label: 'Bengali' },
    { id: 'marathi', label: 'Marathi' }
  ];

  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [500, 5000],
      amenities: [],
      accommodationType: '',
      language: '',
      rating: 0
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:relative lg:bg-transparent">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        className="bg-white h-full w-80 p-6 overflow-y-auto lg:h-auto lg:w-full lg:shadow-lg lg:rounded-xl"
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-green-600 hover:text-green-700 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Price Range (per night)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">₹{filters.priceRange[0]}</span>
                <span className="text-sm text-gray-600">₹{filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="space-y-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <amenity.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Accommodation Type */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Accommodation Type</h3>
            <div className="space-y-2">
              {accommodationTypes.map((type) => (
                <label key={type.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodationType"
                    value={type.id}
                    checked={filters.accommodationType === type.id}
                    onChange={(e) => handleFilterChange('accommodationType', e.target.value)}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <Home className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Language Spoken</h3>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Any language</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.rating >= rating
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchFilters;