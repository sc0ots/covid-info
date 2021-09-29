package com.example.covid.repository;

import com.example.covid.model.medstf;
import com.example.covid.model.user_f0;
import com.example.covid.model.user_f1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface user_f1Repository extends JpaRepository<user_f1,Long> {
    @Transactional
    @Modifying
    @Query("delete from user_f1 u where u.day_end < :date ")
    void deleteAllByDay_endBefore(@Param("date") Date date);

    Optional<user_f1> findByUser_id(Long user_id);


    List<user_f1> findAllByUserName(String name);
    @Query("Select m from user_f1 m where m.area_id = ?1")
    List<user_f1> findAllByArea_id(Long id);
    @Transactional
    @Modifying
    void deleteByUser_id(Long user_id);
    @Query("select u from user_f1 u where u.day_end < :date ")
    List<user_f1> findAllByDay_endBefore( Date date);

}
