package com.example.server.repository;

import com.example.server.model.Theater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TheaterRepository extends JpaRepository<Theater, Long> {
    Theater findByName(String name);
    List<Theater> findByCity(String city);
}
