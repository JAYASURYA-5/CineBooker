import React, { createContext, useContext, useState } from 'react';
import { Booking, Seat } from '@/types';
import { mockBookings } from '@/data/movies';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  selectedSeats: Seat[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
  bookedSeatIds: Set<string>;
}

const BookingContext = createContext<BookingContextType>({} as BookingContextType);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const bookedSeatIds = new Set(
    bookings.flatMap(b => b.seats.map(s => `${s.row}${s.number}`))
  );

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, selectedSeats, setSelectedSeats, bookedSeatIds }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
