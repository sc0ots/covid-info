package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.pcr;
import com.example.covid.model.travel_history;
import com.example.covid.model.treatment_area;
import com.example.covid.model.user_f1;
import com.example.covid.repository.pcrRepository;
import com.example.covid.repository.userRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/pcrs")
public class pcrController {
    private final pcrRepository repository;

    pcrController(pcrRepository repository){
        this.repository=repository;

    }
    @GetMapping("/show")
    public List<pcr> showPcr(){
        return repository.findAll();

    }
    @GetMapping("/search")
    public List<pcr> search(@RequestParam String name){
        return repository.findAllByUserName(name);

    }
    @PostMapping("/")
    public pcr newtreatment_area(@RequestBody pcr newentry) {
        newentry.setTime(Timestamp.valueOf(LocalDateTime.now()));
        return repository.save(newentry);
    }
    @GetMapping("/{id}")
    pcr one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new adminNotFoundException(id));
    }
    @GetMapping("/getbyuserid/{user_id}")
    List<pcr> getbyuserid(@PathVariable Long user_id) {

        return repository.findAllByUser_id(user_id);
    }
    @PutMapping("/{id}")
    pcr editpcr(@RequestBody pcr newentry, @PathVariable Long id) {

        return repository.findById(id)
                .map(pcr -> {
                    pcr.setResult(newentry.getResult());
                    pcr.setTime(newentry.getTime());
                    pcr.setUser_id(newentry.getUser_id());
                    return repository.save(pcr);
                })
                .orElseGet(() -> {
                    newentry.setId(id);
                    return repository.save(newentry);
                });
    }
    @DeleteMapping("/{id}")
    void deletepcr(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
