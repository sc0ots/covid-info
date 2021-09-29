package com.example.covid.service;

import com.example.covid.model.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.userRepository;

import java.util.List;

@Service
public class userService {
    @Autowired
    private userRepository userRepository;
    public List<user> findAll(){
        return userRepository.findAll();

    }
}
