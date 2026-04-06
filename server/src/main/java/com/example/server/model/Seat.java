package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "show_timing_id", nullable = false)
    private ShowTiming showTiming;
    
    @Column(nullable = false)
    private String seatNumber;
    
    @Column(nullable = false)
    private String seatRow;
    
    @Column(nullable = false)
    private Integer seatColumn;
    
    private String seatType; // standard, premium, recliner
    
    @Column(nullable = false)
    private Boolean isBooked = false;
}
