package com.example.covid.model;

import javax.persistence.*;
import java.sql.*;

@Entity
@Table
public class medstf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String name;
    @Column
    private Date dob;
    @Column
    private String medical_lícense;
    @Column
    private String username;
    @Column
    private String password;

    public medstf(Long id, String name, Date dob, String medical_lícense, String username, String password) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.medical_lícense = medical_lícense;
        this.username = username;
        this.password = password;
    }

    public medstf() {
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

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getMedical_lícense() {
        return medical_lícense;
    }

    public void setMedical_lícense(String medical_lícense) {
        this.medical_lícense = medical_lícense;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
