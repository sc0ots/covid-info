package com.example.covid.controller;

import com.example.covid.model.medstf;
import com.example.covid.model.user;
import com.example.covid.model.user_f0;
import com.example.covid.model.user_f1;
import com.example.covid.repository.userRepository;
import com.example.covid.repository.user_f1Repository;
import org.apache.tomcat.jni.Local;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/user_f1s")
public class user_f1Controller {

        private final user_f1Repository repository;
        private final userRepository repository1;

    user_f1Controller(user_f1Repository repository, userRepository repository1){
            this.repository=repository;
            this.repository1=repository1;
        }
        @GetMapping("/show")
        public List<user_f1> showuser_f1(){
            return repository.findAll();

        }
        @PostMapping("/")
        public user_f1 newuser_f1(@RequestBody user_f1 newentry) {
            user user =repository1.findById(newentry.getUser_id()).get();
            newentry.setDay_start(Date.valueOf(LocalDate.now()));
            newentry.setDay_end(Date.valueOf(LocalDate.now().plusDays(21)));
            user.setStatus(Long.valueOf(1));
            return repository.save(newentry);
        }
        @GetMapping("/{id}")
        user_f1 one(@PathVariable Long id) {

            return repository.findById(id).get();
        }
    @GetMapping("/search")
    public List<user_f1> search(@RequestParam String name){
        return repository.findAllByUserName(name);

    }
    @GetMapping("/getbyuserid/{user_id}")
    user_f1 getbyuserid(@PathVariable Long user_id) {

        return repository.findByUser_id(user_id).get();
    }
    @GetMapping("/deleteoverdue")
    void deleteoverdue(){

       List <user_f1> user_f1s =  repository.findAllByDay_endBefore(Date.valueOf(LocalDate.now()));
        for (user_f1 u:user_f1s
             ) {
            repository1.findById(u.getUser().getId()).get().setStatus(Long.valueOf(0));
        }


        repository.deleteAllByDay_endBefore(Date.valueOf(LocalDate.now()));
    }
        @PutMapping("/{id}")
        user_f1 edituser_f1(@RequestBody user_f1 newentry, @PathVariable Long id) {

            return repository.findById(id)
                    .map(user_f1 -> {
                        user_f1.setArea_id(newentry.getArea_id());
                        user_f1.setDay_start(newentry.getDay_start());
                        user_f1.setDay_end(newentry.getDay_end());
                        user_f1.setUser_id(newentry.getUser_id());
                        return repository.save(user_f1);
                    })
                    .orElseGet(() -> {
                        newentry.setId(id);
                        return repository.save(newentry);
                    });
        }
        @DeleteMapping("/{id}")
        void deletef1(@PathVariable Long id) {

            user user =repository1.findById(repository.findById(id).get().getUser_id()).get();
            user.setStatus(Long.valueOf(0));
            repository.deleteById(id);

        }
}
