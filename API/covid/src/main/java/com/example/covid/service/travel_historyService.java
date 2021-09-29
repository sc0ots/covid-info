package com.example.covid.service;

import com.example.covid.model.travel_history;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.travel_historyRepository;

import java.util.List;

@Service
public class travel_historyService {
    @Autowired
    private travel_historyRepository travel_historyRepository;
    public List<travel_history> findAll(){
        return travel_historyRepository.findAll();

    }
}
