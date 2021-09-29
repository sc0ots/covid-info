package com.example.covid.repository;

import com.example.covid.model.pcr;
import com.example.covid.model.travel_history;
import com.example.covid.model.user_f0;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface travel_historyRepository extends JpaRepository<travel_history,Long> {
    List<travel_history> findAllByUser_id(Long user_id);

    List<travel_history> findAllByUserName(String name);

    List<travel_history> findByDateBetween(Date datefrom, Date dateto);

    List<travel_history> findAllByUserNameAndDateBetween(String name, Date datefrom, Date dateto);
}
