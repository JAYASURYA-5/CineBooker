package com.example.server.controller;

import com.example.server.model.Theater;
import com.example.server.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/theaters")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080", "http://localhost:3000"})
public class TheaterController {
    
    @Autowired
    private TheaterRepository theaterRepository;
    
    @GetMapping
    public ResponseEntity<List<Theater>> getAllTheaters() {
        List<Theater> theaters = theaterRepository.findAll();
        return ResponseEntity.ok(theaters);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Theater> getTheaterById(@PathVariable Long id) {
        Optional<Theater> theater = theaterRepository.findById(id);
        return theater.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Theater>> getTheatersByCity(@PathVariable String city) {
        List<Theater> theaters = theaterRepository.findByCity(city);
        return ResponseEntity.ok(theaters);
    }
    
    @PostMapping
    public ResponseEntity<Theater> createTheater(@RequestBody Theater theater) {
        Theater savedTheater = theaterRepository.save(theater);
        return ResponseEntity.ok(savedTheater);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Theater> updateTheater(@PathVariable Long id, @RequestBody Theater theaterDetails) {
        Optional<Theater> theater = theaterRepository.findById(id);
        if (theater.isPresent()) {
            Theater t = theater.get();
            t.setName(theaterDetails.getName());
            t.setLocation(theaterDetails.getLocation());
            t.setCity(theaterDetails.getCity());
            t.setState(theaterDetails.getState());
            t.setPhoneNumber(theaterDetails.getPhoneNumber());
            t.setTotalScreens(theaterDetails.getTotalScreens());
            t.setAmenities(theaterDetails.getAmenities());
            Theater updatedTheater = theaterRepository.save(t);
            return ResponseEntity.ok(updatedTheater);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTheater(@PathVariable Long id) {
        if (theaterRepository.existsById(id)) {
            theaterRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
