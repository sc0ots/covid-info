package com.example.covid.service;

import com.example.covid.model.treatment_area;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.treatment_areaRepository;

import java.util.List;

@Service
public class treatment_areaService {
    @Autowired
    private treatment_areaRepository treatment_areaRepository;
    public List<treatment_area> findAll(){
return treatment_areaRepository.findAll();

    }
}
