package com.example.covid.repository;


import com.example.covid.model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface userRepository extends JpaRepository<user, Long> {
    List<user> findByPhone(Long phone);
    @Query("Select m from user m where m.name like ?1")
    List<user> findAllByName(String name);
    List<user> findByStatus(Long status);
    Long countByStatus(Long status);

}
