package com.example.covid.repository;

import com.example.covid.model.medstf;
import com.example.covid.model.user_f0;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface user_f0Repository extends JpaRepository<user_f0,Long> {

    Optional<user_f0> findByUser_id(Long user_id);

    List<user_f0> findAllByUserName(String name);
    @Query("Select m from user_f0 m where m.area_id = ?1")
    List<user_f0> findAllByArea_id(Long id);

}
