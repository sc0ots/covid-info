package com.example.covid.controller;
import com.example.covid.adminNotFoundException;
import com.example.covid.model.health_daily;
import com.example.covid.model.health_dcl;
import com.example.covid.repository.health_dailyRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/health_daily")

public class health_dailyController {
    private final health_dailyRepository repository;
    health_dailyController(health_dailyRepository repository){
        this.repository=repository;

    }
    @GetMapping("/show")
    public List<health_daily> showhealthdcl(){
        return repository.findAll();

    }
    @GetMapping("/search")
    public List<health_daily> search(@RequestParam String name){
        return repository.findAllByUserName(name);

    }
    @PostMapping("/")
    public health_daily newtreatment_area(@RequestBody health_daily newentry) {

        newentry.setTimestamp((Timestamp.valueOf(LocalDateTime.now())));
        return repository.save(newentry);
    }
    @GetMapping("/{id}")
    health_daily one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new adminNotFoundException(id));
    }
    @GetMapping("/getbyuserid/{user_id}")
    List<health_daily> getbyuserid(@PathVariable Long user_id) {

        return repository.findAllByUser_id(user_id);
    }

    @DeleteMapping("/{id}")
    void deletehealth_dcl(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
