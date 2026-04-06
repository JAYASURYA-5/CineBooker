package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "show_timing_id", nullable = false)
    private ShowTiming showTiming;
    
    @Column(nullable = false)
    private String bookingReference;
    
    @Column(nullable = false)
    private Integer numberOfSeats;
    
    @Column(nullable = false)
    private Double totalAmount;
    
    @Column(nullable = false)
    private String status; // CONFIRMED, CANCELLED, PENDING
    
    @Column(nullable = false)
    private LocalDateTime bookingDate;
    
    private LocalDateTime cancelledDate;
    
    @Column(columnDefinition = "LONGTEXT")
    private String seatsBooked; // JSON array of seat numbers
    
    private String paymentStatus; // PAID, PENDING, FAILED
}
