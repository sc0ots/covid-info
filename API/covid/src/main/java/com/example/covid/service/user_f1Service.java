package com.example.covid.service;

import com.example.covid.model.user_f1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.user_f1Repository;

import java.util.List;

@Service
public class user_f1Service {
    @Autowired
    private user_f1Repository user_f1Repository;
    public List<user_f1> findAll(){
        return user_f1Repository.findAll();

    }
}
