package com.example.covid.service;

import com.example.covid.model.medstf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.medstfRepository;

import java.util.List;

@Service
public class medstfService {
    @Autowired
    private  medstfRepository medstfRepository;
    public List<medstf> findAll(){
        return medstfRepository.findAll();

    }
}
