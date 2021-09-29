package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.checkphone;
import com.example.covid.model.medstf;
import com.example.covid.model.session;
import com.example.covid.repository.medstfRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/medstf")

public class medstfController {
    private final medstfRepository repository;
    medstfController(medstfRepository repository){
        this.repository=repository;

    }
    @GetMapping("/show")
    public List<medstf> showMedstf(){
        return repository.findAll();

    }
    @GetMapping("/getidfromusername/{username}")
    public checkphone getidfromphone(@PathVariable String username,checkphone checkphone){
        checkphone.setResponse(repository.findByUsername(username).get(0).getId());

        return checkphone;
    }
    @GetMapping("/search")
    public List<medstf> search(@RequestParam String name){
        return repository.findByName(name);

    }
    @PostMapping("/")
    public medstf newMedstf(@RequestBody medstf newmedstf) {
        if(repository.findByUsername(newmedstf.getUsername()).isEmpty()) {
            return repository.save(newmedstf);
        }
        return newmedstf;
    }


    @GetMapping("/logout")
    public checkphone logout(HttpSession session,checkphone checkphone){
        session.invalidate();
        checkphone.setResponse(Long.valueOf(1));
        return checkphone;

    }
    @GetMapping("/{id}")
    medstf one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new adminNotFoundException(id));
    }
    @PutMapping("/{id}")
    medstf editMedstf(@RequestBody medstf newmedstf, @PathVariable Long id) {

        return repository.findById(id)
                .map(medstf -> {
                    medstf.setUsername(newmedstf.getUsername());
                    medstf.setPassword(newmedstf.getPassword());
                    medstf.setMedical_lícense(newmedstf.getMedical_lícense());
                    medstf.setName(newmedstf.getName());
                    medstf.setDob(newmedstf.getDob());

                        return repository.save(medstf);

                })
                .orElseGet(() -> {
                    newmedstf.setId(id);
                    return repository.save(newmedstf);
                });
    }
    @DeleteMapping("/{id}")
    void deleteMedstff(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
