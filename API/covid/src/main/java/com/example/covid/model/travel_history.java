package com.example.covid.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table
public class travel_history {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id",insertable = false,updatable = false)
    private user user;
    private Long user_id;
    @Column
    private String address;
    @Column
    private Date date;

    public travel_history() {
    }

    public travel_history(Long id, com.example.covid.model.user user, Long user_id, String address, Date date) {
        this.id = id;
        this.user = user;
        this.user_id = user_id;
        this.address = address;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public com.example.covid.model.user getUser() {
        return user;
    }

    public void setUser(com.example.covid.model.user user) {
        this.user = user;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

