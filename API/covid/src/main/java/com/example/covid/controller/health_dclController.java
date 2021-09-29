package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.health_dcl;
import com.example.covid.model.travel_history;
import com.example.covid.model.user_f1;
import com.example.covid.repository.health_dclRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/health_dcls")
public class health_dclController {


        private final health_dclRepository repository;

    health_dclController(health_dclRepository repository){
            this.repository=repository;

        }
        @GetMapping("/show")
        public List<health_dcl> showhealthdcl(){
            return repository.findAll();

        }
    @GetMapping("/search")
    public List<health_dcl> search(@RequestParam String name){
        return repository.findAllByUserName(name);

    }
        @PostMapping("/")
        public health_dcl newtreatment_area(@RequestBody health_dcl newentry) {
            newentry.setTime(Timestamp.valueOf(LocalDateTime.now()));
            return repository.save(newentry);
        }
        @GetMapping("/{id}")
        health_dcl one(@PathVariable Long id) {

            return repository.findById(id)
                    .orElseThrow(() -> new adminNotFoundException(id));
        }
    @GetMapping("/getbyuserid/{user_id}")
    List<health_dcl> getbyuserid(@PathVariable Long user_id) {

        return repository.findAllByUser_id(user_id);
    }
        @PutMapping("/{id}")
        health_dcl edithealth_dcl(@RequestBody health_dcl newentry, @PathVariable Long id) {

            return repository.findById(id)
                    .map(health_dcl -> {
                        health_dcl.setIs_travel(newentry.getIs_travel());
                        health_dcl.setIs_tire(newentry.getIs_tire());
                        health_dcl.setIs_throat(newentry.getIs_throat());
                        health_dcl.setIs_pnue(newentry.getIs_pnue());
                        health_dcl.setIs_nobreath(newentry.getIs_nobreath());
                        health_dcl.setIs_cough(newentry.getIs_cough());
                        health_dcl.setIs_fever(newentry.getIs_fever());
                        health_dcl.setIs_contact_f0(newentry.getIs_contact_f0());
                        health_dcl.setIs_contact_suspect(newentry.getIs_contact_suspect());

                        health_dcl.setHave_chronic(newentry.getHave_chronic());
                        health_dcl.setHave_cancer(newentry.getHave_cancer());
                        health_dcl.setHave_diabetes(newentry.getHave_diabetes());
                        health_dcl.setHave_hiv_immu(newentry.getHave_hiv_immu());
                        health_dcl.setHave_heart_pressure(newentry.getHave_heart_pressure());
                        health_dcl.setHave_transplant(newentry.getHave_transplant());
                        health_dcl.setHave_prenant(newentry.getHave_prenant());
                        health_dcl.setTime(newentry.getTime());
                        health_dcl.setUser_id(newentry.getUser_id());
                        return repository.save(health_dcl);
                    })
                    .orElseGet(() -> {
                        newentry.setId(id);
                        return repository.save(newentry);
                    });
        }
        @DeleteMapping("/{id}")
        void deletehealth_dcl(@PathVariable Long id) {
            repository.deleteById(id);
        }
}
