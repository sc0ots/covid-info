package com.example.covid.repository;

import com.example.covid.model.admin;
import com.example.covid.model.medstf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface medstfRepository extends JpaRepository<medstf, Long> {
    List<medstf> findByUsernameAndPassword(String username, String password);
    @Query("Select m from medstf m where m.name like ?1")
    List<medstf> findByName(String name);
    List<medstf> findByUsername(String username);
}
