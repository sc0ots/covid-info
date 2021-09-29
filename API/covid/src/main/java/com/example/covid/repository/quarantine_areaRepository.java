package com.example.covid.repository;

import com.example.covid.model.quarantine_area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface quarantine_areaRepository extends JpaRepository<quarantine_area,Long> {
    @Query("select q.id,q.name from quarantine_area q")
    List<String> getAllNames();

}
