package com.example.covid.repository;

import com.example.covid.model.pcr;
import com.example.covid.model.travel_history;
import com.example.covid.model.user_f0;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface pcrRepository extends JpaRepository<pcr,Long> {

    List<pcr> findAllByUser_id(Long user_id);

    List<pcr> findAllByUserName(String name);
}
