package com.example.server.controller;

import com.example.server.model.Seat;
import com.example.server.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080", "http://localhost:3000"})
public class SeatController {
    
    @Autowired
    private SeatRepository seatRepository;
    
    @GetMapping
    public ResponseEntity<List<Seat>> getAllSeats() {
        List<Seat> seats = seatRepository.findAll();
        return ResponseEntity.ok(seats);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable Long id) {
        Optional<Seat> seat = seatRepository.findById(id);
        return seat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/show-timing/{showTimingId}")
    public ResponseEntity<List<Seat>> getSeatsByShowTiming(@PathVariable Long showTimingId) {
        List<Seat> seats = seatRepository.findByShowTimingId(showTimingId);
        return ResponseEntity.ok(seats);
    }
    
    @GetMapping("/show-timing/{showTimingId}/available")
    public ResponseEntity<List<Seat>> getAvailableSeatsByShowTiming(@PathVariable Long showTimingId) {
        List<Seat> seats = seatRepository.findByShowTimingIdAndIsBooked(showTimingId, false);
        return ResponseEntity.ok(seats);
    }
    
    @PostMapping
    public ResponseEntity<Seat> createSeat(@RequestBody Seat seat) {
        Seat savedSeat = seatRepository.save(seat);
        return ResponseEntity.ok(savedSeat);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Seat> updateSeat(@PathVariable Long id, @RequestBody Seat seatDetails) {
        Optional<Seat> seat = seatRepository.findById(id);
        if (seat.isPresent()) {
            Seat s = seat.get();
            s.setIsBooked(seatDetails.getIsBooked());
            s.setSeatType(seatDetails.getSeatType());
            Seat updatedSeat = seatRepository.save(s);
            return ResponseEntity.ok(updatedSeat);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
