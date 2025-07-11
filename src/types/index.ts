export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'guest' | 'host';
  createdAt: string;
}

export interface Homestay {
  id: string;
  hostId: string;
  title: string;
  description: string;
  location: {
    village: string;
    district: string;
    state: string;
    coordinates: [number, number];
  };
  images: string[];
  amenities: string[];
  pricing: {
    perNight: number;
    currency: string;
  };
  availability: {
    startDate: string;
    endDate: string;
  };
  capacity: {
    guests: number;
    rooms: number;
  };
  rating: number;
  reviews: Review[];
  host: User;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  homestayId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
}

export interface Booking {
  id: string;
  userId: string;
  homestayId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  homestay: Homestay;
}