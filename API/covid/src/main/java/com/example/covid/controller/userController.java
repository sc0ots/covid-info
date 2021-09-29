package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.admin;
import com.example.covid.model.checkphone;
import com.example.covid.model.session;
import com.example.covid.model.countuser;
import com.example.covid.model.user;
import com.example.covid.model.user_f1;
import com.example.covid.model.user_f0;
import com.example.covid.repository.userRepository;
import com.example.covid.repository.user_f1Repository;
import com.example.covid.repository.user_f0Repository;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/users")

public class userController {

        private final userRepository repository;
    private final user_f1Repository repository1;
    private final user_f0Repository repository2;

    userController(userRepository repository,user_f1Repository repository1,user_f0Repository repository2){
            this.repository=repository;
            this.repository1=repository1;
            this.repository2=repository2;


    }
    @GetMapping("/showUsers")
    public List<user> showUser(){
        return repository.findAll();
    }
    @GetMapping("/search")
    public List<user> search(@RequestParam String username){
        return repository.findAllByName(username);

    }
    @GetMapping("/count")
    public countuser countuser(countuser countuser){
        countuser.setUser(repository.countByStatus(Long.valueOf(0)));
        countuser.setUserf1(repository.countByStatus(Long.valueOf(1)));
        countuser.setUserf0(repository.countByStatus(Long.valueOf(2)));
        return countuser;
    }

    @PostMapping("/")
    public user newuser(@RequestBody user newentry) {
        if(repository.findByPhone(newentry.getPhone()).isEmpty()){
            return repository.save(newentry);
        }
            return newentry;
        }
    @GetMapping ("/login")
    public checkphone login(@RequestParam Long phone, HttpSession session,checkphone checkphone) {
        if(repository.findByPhone(phone).isEmpty()){
            checkphone.setResponse(Long.valueOf(0));
            return checkphone;
        }else
        {
            checkphone.setResponse(Long.valueOf(1));
            session.setAttribute("user",phone);
            return checkphone;
        }
    }
    @GetMapping("/checkphone")
    public checkphone checkphone(@RequestParam Long phone,checkphone checkphone){
        if(repository.findByPhone(phone).isEmpty()){
            checkphone.setResponse(Long.valueOf(1));
            return checkphone;

        }
        checkphone.setResponse(Long.valueOf(0));
        return checkphone;
    }
    @GetMapping("/getidfromphone/{phone}")
    public checkphone getidfromphone(@PathVariable Long phone,checkphone checkphone){

        checkphone.setResponse(repository.findByPhone(phone).get(0).getId());
            return checkphone;
    }
    @GetMapping("/getbystatus/{status}")
    public List<user> getbystatus(@PathVariable Long status){
        return repository.findByStatus(status);
    }
    @GetMapping("/getsession")
    public session getsession(HttpSession session, session newsession){

           String s = session.getAttribute("user").toString();
           newsession.setRespone(s);
        return newsession;
    }

        @GetMapping("/{id}")
        user one(@PathVariable Long id) {

            return repository.findById(id)
                    .orElseThrow(() -> new adminNotFoundException(id));
        }

        @PutMapping("/{id}")
        user edituser(@RequestBody user newentry, @PathVariable Long id) {

            return repository.findById(id)
                    .map(user -> {
                        user.setName(newentry.getName());
                        user.setAddress(newentry.getAddress());
                        user.setCitizen_id(newentry.getCitizen_id());
                        user.setGender(newentry.getGender());
                        user.setPhone(newentry.getPhone());
                        user.setYob(newentry.getYob());
                            return repository.save(user);

                    })
                    .orElseGet(() -> {
                        newentry.setId(id);
                        return repository.save(newentry);
                    });
        }
        @PutMapping("/vac1/{id}")
        user editvac1(@RequestBody user newentry, @PathVariable Long id){
            return repository.findById(id)
                    .map(user -> {
                        user.setVac1(newentry.getVac1());
                        user.setDate1(newentry.getDate1());
                        user.setVac_status(Long.valueOf(1));
                        return repository.save(user);

                    })
                    .orElseGet(() -> {
                        newentry.setId(id);
                        return repository.save(newentry);
                    });

        }
    @PutMapping("/vac2/{id}")
    user editvac2(@RequestBody user newentry, @PathVariable Long id){
        return repository.findById(id)
                .map(user -> {
                    user.setVac2(newentry.getVac2());
                    user.setDate2(newentry.getDate2());
                    user.setVac_status(Long.valueOf(2));
                    return repository.save(user);

                })
                .orElseGet(() -> {
                    newentry.setId(id);
                    return repository.save(newentry);
                });

    }
        @DeleteMapping("/{id}")
        void deleteuser(@PathVariable Long id) {
            repository.deleteById(id);
        }
}
