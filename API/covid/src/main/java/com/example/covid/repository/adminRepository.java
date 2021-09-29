package com.example.covid.repository;

import com.example.covid.model.admin;
import com.example.covid.model.medstf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface adminRepository extends JpaRepository<admin, Long> {
List<admin> findByUsernameAndPassword(String username, String password);
    List<admin> findByUsername(String username);
}
