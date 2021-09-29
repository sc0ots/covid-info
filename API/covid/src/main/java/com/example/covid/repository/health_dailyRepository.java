package com.example.covid.repository;

import com.example.covid.model.health_daily;
import com.example.covid.model.health_dcl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface health_dailyRepository extends JpaRepository<health_daily,Long> {

    List<health_daily> findAllByUser_id(Long user_id);

    List<health_daily> findAllByUserName(String name);
}
