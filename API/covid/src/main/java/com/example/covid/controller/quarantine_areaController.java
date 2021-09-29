package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.medstf;
import com.example.covid.model.quarantine_area;
import com.example.covid.model.user_f0;
import com.example.covid.model.user_f1;
import com.example.covid.repository.quarantine_areaRepository;
import com.example.covid.repository.user_f1Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/quarantinearea")
public class quarantine_areaController {
    private final quarantine_areaRepository repository;
    private final user_f1Repository repository1;
    quarantine_areaController(quarantine_areaRepository repository,user_f1Repository repository1){
        this.repository=repository;
        this.repository1=repository1;
    }
    @GetMapping("/show")
    public List<quarantine_area> showQuarantineArea(){
        return repository.findAll();

    }
    @GetMapping("/quarantinelist")
    public List<String> quarantine_areaList(){
        return repository.getAllNames();
    }
    @PostMapping("/")
    public quarantine_area newquarantine_area( @RequestBody quarantine_area newquarantine_area) {

        return repository.save(newquarantine_area);
    }
    @GetMapping("getuserlistbyareaid/{id}")
    List<user_f1> getuserlistbyareaid(@PathVariable Long id){
        return repository1.findAllByArea_id(id);
    }
    @GetMapping("/{id}")
    quarantine_area one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new adminNotFoundException(id));
    }
    @PutMapping("/{id}")
    quarantine_area editQuarantineArea(@RequestBody quarantine_area newquarantine_area, @PathVariable Long id) {

        return repository.findById(id)
                .map(quarantine_area -> {
                    quarantine_area.setName(newquarantine_area.getName());
                    quarantine_area.setAddress(newquarantine_area.getAddress());


                    return repository.save(quarantine_area);
                })
                .orElseGet(() -> {
                    newquarantine_area.setId(id);
                    return repository.save(newquarantine_area);
                });
    }
    @DeleteMapping("/{id}")
    void deleteQuarantineArea(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
