import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, DollarSign, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface BecomeHostCTAProps {
  onBecomeHostClick: () => void;
}

const BecomeHostCTA: React.FC<BecomeHostCTAProps> = ({ onBecomeHostClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Extra Income',
      description: 'Generate sustainable income by sharing your village home with travelers'
    },
    {
      icon: Users,
      title: 'Meet New People',
      description: 'Connect with travelers from around the world and share your culture'
    },
    {
      icon: Heart,
      title: 'Share Your Heritage',
      description: 'Showcase the beauty and traditions of your village to appreciative guests'
    },
    {
      icon: Home,
      title: 'Easy to Start',
      description: 'Simple onboarding process with full support from our team'
    }
  ];

  const handleBecomeHostClick = () => {
    if (user?.role === 'host') {
      navigate('/dashboard/host');
    } else {
      onBecomeHostClick();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Share Your Village, Earn with Pride
            </h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Join our community of rural hosts and help travelers discover the authentic beauty of village life. 
              Turn your home into a source of income while preserving and sharing your cultural heritage.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.slice(0, 2).map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-green-100">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBecomeHostClick}
              className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <span>{user?.role === 'host' ? 'Go to Dashboard' : 'Start Hosting Today'}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-green-100 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white border-opacity-20"
        >
          <div className="text-center text-white">
            <div className="text-3xl font-bold mb-2">₹15,000</div>
            <div className="text-green-100">Average monthly earnings</div>
          </div>
          <div className="text-center text-white">
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-green-100">Host satisfaction rate</div>
          </div>
          <div className="text-center text-white">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-green-100">Support from our team</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeHostCTA;