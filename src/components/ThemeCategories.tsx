import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Waves, TreePine, Home, Flower, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ThemeCategories: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'farmstay',
      title: 'Farmstay',
      description: 'Experience rural farming life',
      icon: Home,
      image: '/Single-Floor-Village-Homes.webp',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'tribal',
      title: 'Tribal Village',
      description: 'Discover indigenous cultures',
      icon: Mountain,
      image: '/courtyard-of-south-indian-village.webp',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'nature',
      title: 'Nature Retreat',
      description: 'Reconnect with wilderness',
      icon: TreePine,
      image: '/Single-Floor-Village-Homes.webp',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'cultural',
      title: 'Cultural Experience',
      description: 'Immerse in local traditions',
      icon: Flower,
      image: '/courtyard-of-south-indian-village.webp',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'backwater',
      title: 'Backwater Stay',
      description: 'Serene waterside experiences',
      icon: Waves,
      image: '/Single-Floor-Village-Homes.webp',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'desert',
      title: 'Desert Village',
      description: 'Explore arid landscapes',
      icon: Sun,
      image: '/courtyard-of-south-indian-village.webp',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/stays?category=${categoryId}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Explore by Theme
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your perfect rural adventure from our curated collection of unique experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
              onClick={() => handleCategoryClick(category.id)}
            >
              {/* Background Image */}
              <div className="relative h-64">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="mb-4">
                  <category.icon className="w-8 h-8 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  <span>Explore</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Browse all our unique rural experiences.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/stays')}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            View All Categories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ThemeCategories;