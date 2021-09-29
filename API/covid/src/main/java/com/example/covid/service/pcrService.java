package com.example.covid.service;

import com.example.covid.model.pcr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.pcrRepository;

import java.util.List;

@Service
public class pcrService {
    @Autowired
    private pcrRepository pcrRepository;
    public List<pcr> findAll(){
        return pcrRepository.findAll();

    }
}
