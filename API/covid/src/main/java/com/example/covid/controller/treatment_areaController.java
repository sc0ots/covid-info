package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.treatment_area;
import com.example.covid.model.user_f0;
import com.example.covid.repository.treatment_areaRepository;

import com.example.covid.repository.user_f0Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/treatmentarea")
public class treatment_areaController {
    private final treatment_areaRepository repository;
    private final user_f0Repository repository1;
    treatment_areaController(treatment_areaRepository repository,user_f0Repository repository1){
        this.repository=repository;
        this.repository1=repository1;
    }
    @GetMapping("/show")
    public List<treatment_area> showQuarantineArea(){
        return repository.findAll();

    }
    @GetMapping("/treatmentlist")
    public List<String> quarantine_areaList(){

        return repository.getAllNames();

    }
    @PostMapping("/")
    public treatment_area newtreatment_area(@RequestBody treatment_area newentry) {

        return repository.save(newentry);
    }
    @GetMapping("/{id}")
    treatment_area one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new adminNotFoundException(id));
    }
    @GetMapping("getuserlistbyareaid/{id}")
    List<user_f0> getuserlistbyareaid(@PathVariable Long id){
        return repository1.findAllByArea_id(id);
    }
    @PutMapping("/{id}")
    treatment_area edittreatment_area(@RequestBody treatment_area newentry, @PathVariable Long id) {

        return repository.findById(id)
                .map(treatment_area -> {
                    treatment_area.setName(newentry.getName());
                    treatment_area.setAddress(newentry.getAddress());


                    return repository.save(treatment_area);
                })
                .orElseGet(() -> {
                    newentry.setId(id);
                    return repository.save(newentry);
                });
    }
    @DeleteMapping("/{id}")
    void deletetreatmentarea(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
