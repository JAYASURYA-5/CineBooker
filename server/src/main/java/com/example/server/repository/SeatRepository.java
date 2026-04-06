package com.example.server.repository;

import com.example.server.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByShowTimingId(Long showTimingId);
    Seat findBySeatNumberAndShowTimingId(String seatNumber, Long showTimingId);
    List<Seat> findByShowTimingIdAndIsBooked(Long showTimingId, Boolean isBooked);
}
