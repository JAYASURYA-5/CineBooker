package com.example.server.service;

import com.example.server.model.*;
import com.example.server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ShowTimingRepository showTimingRepository;
    
    @Autowired
    private SeatRepository seatRepository;
    
    public Booking createBooking(Long userId, Long showTimingId, List<String> seatNumbers, Double totalAmount) {
        Optional<User> user = userRepository.findById(userId);
        Optional<ShowTiming> showTiming = showTimingRepository.findById(showTimingId);
        
        if (!user.isPresent() || !showTiming.isPresent()) {
            throw new IllegalArgumentException("Invalid user or show timing");
        }
        
        // Mark seats as booked
        for (String seatNumber : seatNumbers) {
            Seat seat = seatRepository.findBySeatNumberAndShowTimingId(seatNumber, showTimingId);
            if (seat != null && !seat.getIsBooked()) {
                seat.setIsBooked(true);
                seatRepository.save(seat);
            }
        }
        
        Booking booking = new Booking();
        booking.setUser(user.get());
        booking.setShowTiming(showTiming.get());
        booking.setBookingReference("CB" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setNumberOfSeats(seatNumbers.size());
        booking.setTotalAmount(totalAmount);
        booking.setStatus("CONFIRMED");
        booking.setBookingDate(LocalDateTime.now());
        booking.setSeatsBooked(String.join(",", seatNumbers));
        booking.setPaymentStatus("PAID");
        
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Booking cancelBooking(Long bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setStatus("CANCELLED");
            b.setCancelledDate(LocalDateTime.now());
            return bookingRepository.save(b);
        }
        throw new IllegalArgumentException("Booking not found");
    }
}
