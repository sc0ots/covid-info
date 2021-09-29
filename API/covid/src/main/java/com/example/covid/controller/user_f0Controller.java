package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.user;
import com.example.covid.model.user_f0;
import com.example.covid.model.user_f1;
import com.example.covid.repository.user_f0Repository;
import com.example.covid.repository.userRepository;
import com.example.covid.repository.user_f1Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/user_f0s")
public class user_f0Controller {


        private final user_f0Repository repository;
        private final userRepository repository1;
        private final user_f1Repository repository2;

        user_f0Controller(user_f0Repository repository, userRepository repository1,user_f1Repository repository2){
            this.repository=repository;
            this.repository1=repository1;
            this.repository2=repository2;
        }
        @GetMapping("/show")
        public List<user_f0> showuser_f0(){
            return repository.findAll();

        }
    @GetMapping("/search")
    public List<user_f0> search(@RequestParam String name){
        return repository.findAllByUserName(name);

    }
        @PostMapping("/")
        public user_f0 newuser_f0(@RequestBody user_f0 newentry) {

            user user =repository1.findById(newentry.getUser_id()).get();
            if(user.getStatus()==1){

            Long user_id = newentry.getUser_id();
                repository2.deleteByUser_id(user_id);

            }user.setStatus(Long.valueOf(2));
            return repository.save(newentry);
        }
        @GetMapping("/{id}")
        user_f0 one(@PathVariable Long id) {

            return repository.findById(id).get();
        }
    @GetMapping("/getbyuserid/{user_id}")
    user_f0 getbyuserid(@PathVariable Long user_id) {

        return repository.findByUser_id(user_id).get();
    }
        @PutMapping("/{id}")
        user_f0 edituser_f0(@RequestBody user_f0 newentry, @PathVariable Long id) {

            return repository.findById(id)
                    .map(user_f0 -> {
                        user_f0.setArea_id(newentry.getArea_id());
                        user_f0.setHeart_rate(newentry.getHeart_rate());
                        user_f0.setSpo2(newentry.getSpo2());
                        user_f0.setTemp(newentry.getTemp());
                        user_f0.setTlc(newentry.getTlc());
                        user_f0.setUser_id(newentry.getUser_id());

                        return repository.save(user_f0);
                    })
                    .orElseGet(() -> {
                        newentry.setId(id);
                        return repository.save(newentry);
                    });
        }
        @DeleteMapping("/{id}")
        void deletef0(@PathVariable Long id) {

            user user =repository1.findById(repository.findById(id).get().getUser_id()).get();
            user.setStatus(Long.valueOf(0));
            repository.deleteById(id);

        }
}
