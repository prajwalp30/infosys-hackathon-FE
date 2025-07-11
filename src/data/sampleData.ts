import { Homestay, User, Review } from '../types';

export const sampleUsers: User[] = [
  {
    id: '1',
    email: 'priya@example.com',
    name: 'Priya Sharma',
    phone: '+91 9876543210',
    avatar: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'host',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    email: 'rajesh@example.com',
    name: 'Rajesh Kumar',
    phone: '+91 9876543211',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'host',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '3',
    email: 'anjali@example.com',
    name: 'Anjali Patel',
    phone: '+91 9876543212',
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'host',
    createdAt: '2024-02-01T10:00:00Z'
  }
];

export const sampleReviews: Review[] = [
  {
    id: '1',
    userId: '4',
    homestayId: '1',
    rating: 5,
    comment: 'Amazing experience! The family was so welcoming and the food was incredible.',
    createdAt: '2024-03-01T10:00:00Z',
    user: {
      id: '4',
      email: 'guest@example.com',
      name: 'Amit Singh',
      role: 'guest',
      createdAt: '2024-02-15T10:00:00Z'
    }
  },
  {
    id: '2',
    userId: '5',
    homestayId: '1',
    rating: 4,
    comment: 'Beautiful location and authentic rural experience. Highly recommended!',
    createdAt: '2024-03-05T10:00:00Z',
    user: {
      id: '5',
      email: 'guest2@example.com',
      name: 'Kavya Nair',
      role: 'guest',
      createdAt: '2024-02-20T10:00:00Z'
    }
  }
];

export const sampleHomestays: Homestay[] = [
  {
    id: '1',
    hostId: '1',
    title: 'Green Valley Homestay',
    description: 'Experience authentic village life surrounded by lush green hills and coffee plantations. Wake up to the sounds of nature and enjoy traditional home-cooked meals with our family.',
    location: {
      village: 'Madikeri',
      district: 'Kodagu',
      state: 'Karnataka',
      coordinates: [12.4244, 75.7382]
    },
    images: [
      '/courtyard-of-south-indian-village.webp',
      '/Single-Floor-Village-Homes.webp',
      '/courtyard-of-south-indian-village.webp'
    ],
    amenities: ['WiFi', 'Home-cooked meals', 'Nature walks', 'Coffee plantation tour', 'Traditional activities'],
    pricing: {
      perNight: 2500,
      currency: 'INR'
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    capacity: {
      guests: 4,
      rooms: 2
    },
    rating: 4.8,
    reviews: sampleReviews.slice(0, 2),
    host: sampleUsers[0],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    hostId: '2',
    title: 'Backwater Bliss Homestay',
    description: 'Discover the serene beauty of Kerala backwaters in our traditional homestay. Enjoy canoe rides, fishing, and authentic Kerala cuisine prepared by our family.',
    location: {
      village: 'Kummakonam',
      district: 'Kottayam',
      state: 'Kerala',
      coordinates: [9.5916, 76.5222]
    },
    images: [
      '/Single-Floor-Village-Homes.webp',
      '/courtyard-of-south-indian-village.webp',
      '/Single-Floor-Village-Homes.webp'
    ],
    amenities: ['Canoe rides', 'Fishing', 'Kerala cuisine', 'Village walks', 'Ayurvedic treatments'],
    pricing: {
      perNight: 3000,
      currency: 'INR'
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    capacity: {
      guests: 6,
      rooms: 3
    },
    rating: 4.9,
    reviews: [],
    host: sampleUsers[1],
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '3',
    hostId: '3',
    title: 'Himalayan Heights Homestay',
    description: 'Escape to the tranquil Himalayan foothills and experience mountain village life. Perfect for trekking enthusiasts and nature lovers seeking peace.',
    location: {
      village: 'Nainital',
      district: 'Nainital',
      state: 'Uttarakhand',
      coordinates: [29.3803, 79.4636]
    },
    images: [
      '/courtyard-of-south-indian-village.webp',
      '/Single-Floor-Village-Homes.webp',
      '/courtyard-of-south-indian-village.webp'
    ],
    amenities: ['Trekking guides', 'Mountain views', 'Organic farming', 'Meditation sessions', 'Local handicrafts'],
    pricing: {
      perNight: 2000,
      currency: 'INR'
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    capacity: {
      guests: 4,
      rooms: 2
    },
    rating: 4.7,
    reviews: [],
    host: sampleUsers[2],
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '4',
    hostId: '1',
    title: 'Desert Oasis Homestay',
    description: 'Experience the magic of Rajasthan desert in our traditional haveli. Enjoy camel rides, folk music, and authentic Rajasthani hospitality.',
    location: {
      village: 'Khuri',
      district: 'Jaisalmer',
      state: 'Rajasthan',
      coordinates: [26.9157, 70.9083]
    },
    images: [
      '/Single-Floor-Village-Homes.webp',
      '/courtyard-of-south-indian-village.webp',
      '/Single-Floor-Village-Homes.webp'
    ],
    amenities: ['Camel rides', 'Folk music', 'Desert safari', 'Traditional crafts', 'Rajasthani cuisine'],
    pricing: {
      perNight: 3500,
      currency: 'INR'
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    capacity: {
      guests: 8,
      rooms: 4
    },
    rating: 4.6,
    reviews: [],
    host: sampleUsers[0],
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '5',
    hostId: '2',
    title: 'Tribal Heritage Homestay',
    description: 'Immerse yourself in tribal culture and traditions in the heart of Odisha. Learn about indigenous crafts, participate in tribal dances, and enjoy organic tribal cuisine.',
    location: {
      village: 'Rayagada',
      district: 'Rayagada',
      state: 'Odisha',
      coordinates: [19.1672, 83.4156]
    },
    images: [
      '/courtyard-of-south-indian-village.webp',
      '/Single-Floor-Village-Homes.webp',
      '/courtyard-of-south-indian-village.webp'
    ],
    amenities: ['Tribal dance workshops', 'Handicraft learning', 'Organic farming', 'Forest walks', 'Traditional healing'],
    pricing: {
      perNight: 1800,
      currency: 'INR'
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    capacity: {
      guests: 6,
      rooms: 3
    },
    rating: 4.5,
    reviews: [],
    host: sampleUsers[1],
    createdAt: '2024-02-20T10:00:00Z'
  },
  {
    id: '6',
    hostId: '3',
    title: 'Spice Garden Homestay',
    description: 'Discover the aromatic world of Indian spices in our family-run spice plantation. Learn about spice cultivation, enjoy spice-infused meals, and take home fresh spices.',
    location: {
      village: 'Thekkady',
      district: 'Idukki',
      state: 'Kerala',
      coordinates: [9.5916, 77.1025]
    },
    images: [
      '/Single-Floor-Village-Homes.webp',
      '/courtyard-of-south-indian-village.webp',
      '/Single-Floor-Village-Homes.webp'
    ],
    amenities: ['Spice plantation tours', 'Cooking classes', 'Wildlife spotting', 'Boat rides', 'Ayurvedic spa'],
    pricing: {
      perNight: 2800,
      currency: 'INR'
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    capacity: {
      guests: 5,
      rooms: 2
    },
    rating: 4.7,
    reviews: [],
    host: sampleUsers[2],
    createdAt: '2024-02-25T10:00:00Z'
  }
];