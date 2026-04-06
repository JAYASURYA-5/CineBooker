package com.example.server.controller;

import com.example.server.model.Movie;
import com.example.server.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080", "http://localhost:3000"})
public class MovieController {
    
    @Autowired
    private MovieRepository movieRepository;
    
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieRepository.save(movie);
        return ResponseEntity.ok(savedMovie);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movieDetails) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            Movie m = movie.get();
            m.setTitle(movieDetails.getTitle());
            m.setDescription(movieDetails.getDescription());
            m.setGenre(movieDetails.getGenre());
            m.setDuration(movieDetails.getDuration());
            m.setReleaseDate(movieDetails.getReleaseDate());
            m.setDirector(movieDetails.getDirector());
            m.setCast(movieDetails.getCast());
            m.setRating(movieDetails.getRating());
            m.setImageUrl(movieDetails.getImageUrl());
            m.setLanguage(movieDetails.getLanguage());
            m.setCertification(movieDetails.getCertification());
            Movie updatedMovie = movieRepository.save(m);
            return ResponseEntity.ok(updatedMovie);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
