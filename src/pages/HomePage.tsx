import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedStays from '../components/FeaturedStays';
import ThemeCategories from '../components/ThemeCategories';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import BecomeHostCTA from '../components/BecomeHostCTA';
import HostOnboardingModal from '../components/HostOnboardingModal';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showHostOnboarding, setShowHostOnboarding] = useState(false);

  const handleSearch = (searchData: any) => {
    const params = new URLSearchParams();
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.checkIn) params.append('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.append('checkOut', searchData.checkOut);
    if (searchData.guests) params.append('guests', searchData.guests.toString());
    
    navigate(`/stays?${params.toString()}`);
  };

  const handleExploreClick = () => {
    navigate('/stays');
  };

  const handleBecomeHostClick = () => {
    setShowHostOnboarding(true);
  };

  return (
    <div>
      <Hero 
        onSearch={handleSearch}
        onExploreClick={handleExploreClick}
        onBecomeHostClick={handleBecomeHostClick}
      />
      <FeaturedStays />
      <ThemeCategories />
      <TestimonialsCarousel />
      <BecomeHostCTA onBecomeHostClick={handleBecomeHostClick} />
      
      <HostOnboardingModal
        isOpen={showHostOnboarding}
        onClose={() => setShowHostOnboarding(false)}
      />
    </div>
  );
};

export default HomePage;