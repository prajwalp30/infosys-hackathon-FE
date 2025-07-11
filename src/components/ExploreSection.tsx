import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Grid, Map } from 'lucide-react';
import { sampleHomestays } from '../data/sampleData';
import { Homestay } from '../types';
import HomestayCard from './HomestayCard';
import HomestayDetails from './HomestayDetails';

interface ExploreSectionProps {
  onBooking: (homestay: Homestay) => void;
}

const ExploreSection: React.FC<ExploreSectionProps> = ({ onBooking }) => {
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filteredHomestays, setFilteredHomestays] = useState(sampleHomestays);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      const filtered = sampleHomestays.filter(homestay =>
        homestay.title.toLowerCase().includes(term.toLowerCase()) ||
        homestay.location.village.toLowerCase().includes(term.toLowerCase()) ||
        homestay.location.state.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredHomestays(filtered);
    } else {
      setFilteredHomestays(sampleHomestays);
    }
  };

  return (
    <section id="explore" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Explore Rural Homestays
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover authentic village experiences across India's most beautiful rural destinations
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by village, state, or homestay name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:border-green-600 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
                <span>Filters</span>
              </button>
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
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredHomestays.length} homestays found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Homestay Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHomestays.map((homestay) => (
              <HomestayCard
                key={homestay.id}
                homestay={homestay}
                onSelect={setSelectedHomestay}
              />
            ))}
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive map view coming soon!</p>
                <p className="text-sm text-gray-500 mt-2">
                  This will show all homestays on an interactive map
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredHomestays.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No homestays found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all available homestays
            </p>
            <button
              onClick={() => handleSearch('')}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Show All Homestays
            </button>
          </div>
        )}
      </div>

      {/* Homestay Details Modal */}
      <HomestayDetails
        homestay={selectedHomestay!}
        isOpen={!!selectedHomestay}
        onClose={() => setSelectedHomestay(null)}
        onBooking={onBooking}
      />
    </section>
  );
};

export default ExploreSection;