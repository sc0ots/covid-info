package com.example.covid.repository;

import com.example.covid.model.health_dcl;
import com.example.covid.model.pcr;
import com.example.covid.model.travel_history;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface health_dclRepository extends JpaRepository<health_dcl,Long> {

    List<health_dcl> findAllByUser_id(Long user_id);
    @Query("Select m from health_dcl m where m.user.name like ?1")
    List<health_dcl> findAllByUserName(String name);
}
