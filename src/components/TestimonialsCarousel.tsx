import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Our stay at the Green Valley Homestay was absolutely magical! The family welcomed us with such warmth, and the traditional meals were incredible. We learned to make local dishes and even helped with the coffee harvest. This is exactly what authentic travel should be like.',
      stayLocation: 'Coorg, Karnataka',
      date: 'March 2024'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi, NCR',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The backwater homestay in Kerala exceeded all our expectations. Waking up to the sound of birds and the gentle lapping of water was pure bliss. The host family treated us like their own children, and we left with hearts full of memories and stomachs full of amazing food!',
      stayLocation: 'Kottayam, Kerala',
      date: 'February 2024'
    },
    {
      id: 3,
      name: 'Anjali Patel',
      location: 'Ahmedabad, Gujarat',
      avatar: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'VillageStay connected us with the most wonderful tribal community in Odisha. We participated in their traditional dances, learned about their crafts, and gained a deep appreciation for their way of life. It was educational, fun, and deeply moving.',
      stayLocation: 'Rayagada, Odisha',
      date: 'January 2024'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      location: 'Jaipur, Rajasthan',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The desert homestay was an adventure of a lifetime! Camel rides at sunset, sleeping under the stars, and listening to folk tales around the fire. The hospitality was beyond words, and we felt like we were part of the family by the time we left.',
      stayLocation: 'Jaisalmer, Rajasthan',
      date: 'December 2023'
    },
    {
      id: 5,
      name: 'Kavya Nair',
      location: 'Bangalore, Karnataka',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The spice plantation homestay was a sensory delight! We learned about different spices, their medicinal properties, and even took a cooking class. The peaceful environment and the knowledge we gained made this trip unforgettable.',
      stayLocation: 'Thekkady, Kerala',
      date: 'November 2023'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Stories from Our Travelers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover what makes VillageStay special through the experiences of our community
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8 lg:p-12"
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Avatar and Info */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 rounded-full mx-auto lg:mx-0 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {testimonials[currentIndex].location}
                    </p>
                    <div className="flex items-center justify-center lg:justify-start space-x-1 mb-2">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Stayed in {testimonials[currentIndex].stayLocation}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonials[currentIndex].date}
                    </p>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1">
                    <Quote className="w-8 h-8 text-green-600 mb-4 mx-auto lg:mx-0" />
                    <blockquote className="text-lg text-gray-700 leading-relaxed italic text-center lg:text-left">
                      "{testimonials[currentIndex].text}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
            <div className="text-gray-600">Village Homestays</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;