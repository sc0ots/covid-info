package com.example.covid.service;

import com.example.covid.model.health_dcl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.health_dclRepository;

import java.util.List;

@Service
public class health_dclService {
    @Autowired
    private health_dclRepository health_dclRepository;
    public List<health_dcl> findAll(){
        return health_dclRepository.findAll();

    }
}
