import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, Heart, Search, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBecomeHostClick = () => {
    if (user?.role === 'host') {
      navigate('/dashboard/host');
    } else {
      navigate('/dashboard/host');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
             className="flex items-center space-x-2 cursor-pointer"
             onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VillageStay</span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/stays" className="text-gray-700 hover:text-green-600 transition-colors">
              Explore
            </Link>
            <Link to="/#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">
              How it works
            </Link>
            <button 
              onClick={handleBecomeHostClick}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {user?.role === 'host' ? 'Host Dashboard' : 'Become a Host'}
            </button>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-700 hover:text-green-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <img
                    src={user.avatar || `https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="text-sm text-gray-700 hover:text-green-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t"
          >
            <nav className="flex flex-col space-y-4">
              <Link to="/stays" className="text-gray-700 hover:text-green-600 transition-colors">
                Explore
              </Link>
              <Link to="/#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">
                How it works
              </Link>
              <button 
                onClick={handleBecomeHostClick}
                className="text-left text-gray-700 hover:text-green-600 transition-colors"
              >
                {user?.role === 'host' ? 'Host Dashboard' : 'Become a Host'}
              </button>
              <Link to="/contact" className="text-left text-gray-700 hover:text-green-600 transition-colors">
                About
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center space-x-2 text-left"
                  >
                    <img
                      src={user.avatar || `https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=100`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </button>
                  <button
                    onClick={logout}
                    className="text-left text-sm text-gray-700 hover:text-green-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors self-start"
                >
                  Sign in
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;