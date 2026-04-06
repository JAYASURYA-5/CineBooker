package com.example.server.repository;

import com.example.server.model.ShowTiming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ShowTimingRepository extends JpaRepository<ShowTiming, Long> {
    List<ShowTiming> findByMovieId(Long movieId);
    List<ShowTiming> findByTheaterId(Long theaterId);
    List<ShowTiming> findByMovieIdAndShowDate(Long movieId, String showDate);
    List<ShowTiming> findByTheaterIdAndShowDate(Long theaterId, String showDate);
}
