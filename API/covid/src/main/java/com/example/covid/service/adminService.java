package com.example.covid.service;

import com.example.covid.model.admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.covid.repository.adminRepository;

import java.util.List;

@Service
public class adminService {
    @Autowired
    private adminRepository adminRepository;
    public List<admin> findAll(){
        return adminRepository.findAll();

    }
    public void save(admin admin){adminRepository.save(admin);}
}
