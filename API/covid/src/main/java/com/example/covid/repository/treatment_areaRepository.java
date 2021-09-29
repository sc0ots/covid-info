package com.example.covid.repository;

import com.example.covid.model.treatment_area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface treatment_areaRepository extends JpaRepository<treatment_area,Long> {
    @Query("select q.id,q.name from treatment_area q")
    List<String> getAllNames();
}
