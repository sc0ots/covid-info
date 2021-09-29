package com.example.covid.service;

import com.example.covid.model.quarantine_area;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.quarantine_areaRepository;

import java.util.List;

@Service
public class quarantine_areaService {
    @Autowired
    private quarantine_areaRepository quarantine_areaRepository;
    public List<quarantine_area> findAll(){
        return quarantine_areaRepository.findAll();

    }
}
