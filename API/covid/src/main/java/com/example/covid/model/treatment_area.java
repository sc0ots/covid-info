package com.example.covid.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
public class treatment_area {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String name;
    @Column
    private String address;


    public treatment_area() {
    }

    public treatment_area(Long id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
