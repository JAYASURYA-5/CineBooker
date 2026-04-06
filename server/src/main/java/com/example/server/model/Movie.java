package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    private String description;
    
    private String genre;
    
    private Double duration;
    
    private String releaseDate;
    
    private String director;
    
    private String cast;
    
    private Double rating;
    
    private String imageUrl;
    
    private String language;
    
    private String certification;
}
