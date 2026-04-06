package com.example.server.controller;

import com.example.server.model.ShowTiming;
import com.example.server.repository.ShowTimingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/show-timings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080", "http://localhost:3000"})
public class ShowTimingController {
    
    @Autowired
    private ShowTimingRepository showTimingRepository;
    
    @GetMapping
    public ResponseEntity<List<ShowTiming>> getAllShowTimings() {
        List<ShowTiming> showTimings = showTimingRepository.findAll();
        return ResponseEntity.ok(showTimings);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ShowTiming> getShowTimingById(@PathVariable Long id) {
        Optional<ShowTiming> showTiming = showTimingRepository.findById(id);
        return showTiming.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ShowTiming>> getShowTimingsByMovie(@PathVariable Long movieId) {
        List<ShowTiming> showTimings = showTimingRepository.findByMovieId(movieId);
        return ResponseEntity.ok(showTimings);
    }
    
    @GetMapping("/theater/{theaterId}")
    public ResponseEntity<List<ShowTiming>> getShowTimingsByTheater(@PathVariable Long theaterId) {
        List<ShowTiming> showTimings = showTimingRepository.findByTheaterId(theaterId);
        return ResponseEntity.ok(showTimings);
    }
    
    @PostMapping
    public ResponseEntity<ShowTiming> createShowTiming(@RequestBody ShowTiming showTiming) {
        ShowTiming savedShowTiming = showTimingRepository.save(showTiming);
        return ResponseEntity.ok(savedShowTiming);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ShowTiming> updateShowTiming(@PathVariable Long id, @RequestBody ShowTiming showTimingDetails) {
        Optional<ShowTiming> showTiming = showTimingRepository.findById(id);
        if (showTiming.isPresent()) {
            ShowTiming st = showTiming.get();
            st.setShowDate(showTimingDetails.getShowDate());
            st.setShowTime(showTimingDetails.getShowTime());
            st.setTicketPrice(showTimingDetails.getTicketPrice());
            st.setAvailableSeats(showTimingDetails.getAvailableSeats());
            st.setTotalSeats(showTimingDetails.getTotalSeats());
            st.setScreenNumber(showTimingDetails.getScreenNumber());
            st.setFormat(showTimingDetails.getFormat());
            ShowTiming updatedShowTiming = showTimingRepository.save(st);
            return ResponseEntity.ok(updatedShowTiming);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShowTiming(@PathVariable Long id) {
        if (showTimingRepository.existsById(id)) {
            showTimingRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
