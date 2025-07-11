import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, Map, SlidersHorizontal } from 'lucide-react';
import { sampleHomestays } from '../data/sampleData';
import { Homestay } from '../types';
import SearchFilters from '../components/SearchFilters';
import StayCard from '../components/StayCard';
import MapView from '../components/MapView';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredStays, setFilteredStays] = useState<Homestay[]>(sampleHomestays);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '1');

  useEffect(() => {
    let filtered = [...sampleHomestays];

    // Filter by location
    if (location) {
      filtered = filtered.filter(stay =>
        stay.location.village.toLowerCase().includes(location.toLowerCase()) ||
        stay.location.state.toLowerCase().includes(location.toLowerCase()) ||
        stay.title.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by guest capacity
    if (guests) {
      filtered = filtered.filter(stay => stay.capacity.guests >= guests);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricing.perNight - b.pricing.perNight;
        case 'price-high':
          return b.pricing.perNight - a.pricing.perNight;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredStays(filtered);
  }, [location, guests, sortBy]);

  const handleFilterChange = (filters: any) => {
    let filtered = [...sampleHomestays];

    // Apply location filter
    if (location) {
      filtered = filtered.filter(stay =>
        stay.location.village.toLowerCase().includes(location.toLowerCase()) ||
        stay.location.state.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter(stay =>
        stay.pricing.perNight >= filters.priceRange[0] &&
        stay.pricing.perNight <= filters.priceRange[1]
      );
    }

    // Apply amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(stay =>
        filters.amenities.some((amenity: string) =>
          stay.amenities.some(stayAmenity =>
            stayAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    // Apply accommodation type filter
    if (filters.accommodationType) {
      filtered = filtered.filter(stay =>
        stay.title.toLowerCase().includes(filters.accommodationType.toLowerCase())
      );
    }

    setFilteredStays(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {location ? `Stays in ${location}` : 'All Stays'}
            </h1>
            <p className="text-gray-600">
              {filteredStays.length} stays found
              {checkIn && checkOut && ` for ${checkIn} - ${checkOut}`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-green-600 transition-colors lg:hidden"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Results */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStays.map((stay) => (
                  <motion.div
                    key={stay.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StayCard stay={stay} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <MapView stays={filteredStays} onStaySelect={(stay) => navigate(`/stay/${stay.id}`)} />
            )}

            {filteredStays.length === 0 && (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No stays found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;