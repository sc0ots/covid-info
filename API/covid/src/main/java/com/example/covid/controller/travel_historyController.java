package com.example.covid.controller;

import com.example.covid.adminNotFoundException;
import com.example.covid.model.travel_history;
import com.example.covid.model.user_f0;
import com.example.covid.model.user_f1;
import com.example.covid.repository.travel_historyRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/travel_histories")
public class travel_historyController {


        private final travel_historyRepository repository;

        travel_historyController(travel_historyRepository repository){
            this.repository=repository;

        }
        @GetMapping("/show")
        public List<travel_history> showTravelHistory(){
            return repository.findAll();

        }

    @GetMapping("/search")
    public List<travel_history> search(@RequestParam String name,@RequestParam Date datefrom, @RequestParam Date dateto){
            if(datefrom==null && dateto==null){
                return repository.findAllByUserName(name);


        }

        return repository.findAllByUserNameAndDateBetween(name,datefrom,dateto);

    }
        @PostMapping("/")
        public travel_history newtravel_history(@RequestBody travel_history newentry) {

            return repository.save(newentry);
        }
        @GetMapping("/{id}")
        travel_history one(@PathVariable Long id) {

            return repository.findById(id)
                    .orElseThrow(() -> new adminNotFoundException(id));
        }

    @GetMapping("/getbyuserid/{user_id}")
    List<travel_history> getbyuserid(@PathVariable Long user_id) {

        return repository.findAllByUser_id(user_id);
    }

        @PutMapping("/{id}")
        travel_history edittravel_history(@RequestBody travel_history newentry, @PathVariable Long id) {

            return repository.findById(id)
                    .map(travel_history -> {
                        travel_history.setAddress(newentry.getAddress());
                        travel_history.setDate(newentry.getDate());
                        travel_history.setUser_id(newentry.getUser_id());

                        return repository.save(travel_history);
                    })
                    .orElseGet(() -> {
                        newentry.setId(id);
                        return repository.save(newentry);
                    });
        }
        @DeleteMapping("/{id}")
        void deletetravel_history(@PathVariable Long id) {
            repository.deleteById(id);
        }
}
