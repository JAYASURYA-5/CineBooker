package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "show_timings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowTiming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;
    
    @ManyToOne
    @JoinColumn(name = "theater_id", nullable = false)
    private Theater theater;
    
    private String showDate;
    
    private String showTime;
    
    private Double ticketPrice;
    
    private Integer availableSeats;
    
    private Integer totalSeats;
    
    private String screenNumber;
    
    private String format; // 2D, 3D, IMAX
}
