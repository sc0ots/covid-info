package com.example.covid.controller;
import com.example.covid.adminExistException;
import com.example.covid.adminNotFoundException;
import com.example.covid.model.admin;
import com.example.covid.model.session;
import com.example.covid.model.checkphone;
import com.example.covid.repository.adminRepository;
import com.example.covid.repository.medstfRepository;
import com.example.covid.service.adminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/admins")

public class adminController {
    private final adminRepository repository;
    private final medstfRepository repository1;
    adminController(adminRepository repository,medstfRepository repository1){
        this.repository=repository;
        this.repository1=repository1;

    }

    @GetMapping("/show")
    public List<admin> showAdmin(){
        return repository.findAll();

    }
    @PostMapping ("/")
    public admin newAdmin( @RequestBody admin newadmin) {

            return repository.save(newadmin);

    }
    @GetMapping ("/login")
    public checkphone login( HttpSession session,@RequestParam String username, @RequestParam String password,checkphone checkphone) {
        if(repository.findByUsernameAndPassword(username,password).isEmpty()==false){
            checkphone.setResponse(Long.valueOf(1));
            checkphone.setRole("admin");
            session.setAttribute("username",username);
            session.setAttribute("role","admin");
            return checkphone;
        }else if(repository1.findByUsernameAndPassword(username,password).isEmpty()==false){
            checkphone.setResponse(Long.valueOf(1));
            checkphone.setRole("medical");
            session.setAttribute("username",username);
            session.setAttribute("role","medical");
            return checkphone;
        }else {
            checkphone.setResponse(Long.valueOf(0));
            return checkphone;
        }
    }
    @GetMapping("/getsession")
    public session getsession(HttpSession session,session newsession){
        String s = session.getAttribute("username").toString();
        newsession.setRespone(s);
        newsession.setRole(session.getAttribute("role").toString());
        return newsession;
    }
    @GetMapping("/logout")
    public checkphone logout(HttpSession session,checkphone checkphone){
        session.invalidate();
        checkphone.setResponse(Long.valueOf(1));
        return checkphone;

    }
    @GetMapping("/getidfromusername/{username}")
    public checkphone getidfromphone(@PathVariable String username,checkphone checkphone){

        checkphone.setResponse(repository.findByUsername(username).get(0).getId());
        return checkphone;
    }
    @GetMapping("/{id}")
    admin one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new adminNotFoundException(id));
    }
    @PutMapping("/{id}")
    admin editAdmin(@RequestBody admin newadmin, @PathVariable Long id) {

        return repository.findById(id)
                .map(admin -> {
                    admin.setUsername(newadmin.getUsername());
                    admin.setPassword(newadmin.getPassword());

                        return repository.save(admin);

                })
                .orElseGet(() -> {
                    newadmin.setId(id);
                    return repository.save(newadmin);
                });
    }

}
