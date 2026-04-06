export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Movie {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  duration: number; // minutes
  synopsis: string;
  cast: string[];
  director: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  featured: boolean;
}

export interface Theater {
  id: string;
  name: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  theaterId: string;
  rows: number;
  seatsPerRow: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  screenId: string;
  theaterId: string;
  theaterName: string;
  screenName: string;
  date: string;
  time: string;
  price: { regular: number; premium: number; vip: number };
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  category: 'regular' | 'premium' | 'vip';
  status: 'available' | 'booked' | 'selected';
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  movieTitle: string;
  posterUrl: string;
  showtimeId: string;
  showDate: string;
  showTime: string;
  theaterName: string;
  screenName: string;
  seats: { row: string; number: number; category: string }[];
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  bookedAt: string;
}
