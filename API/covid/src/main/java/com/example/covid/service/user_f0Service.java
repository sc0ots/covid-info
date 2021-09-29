package com.example.covid.service;

import com.example.covid.model.user_f0;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.user_f0Repository;

import java.util.List;

@Service
public class user_f0Service {
    @Autowired
    private user_f0Repository user_f0Repository;
    public List<user_f0> findAll(){
        return user_f0Repository.findAll();

    }



}
