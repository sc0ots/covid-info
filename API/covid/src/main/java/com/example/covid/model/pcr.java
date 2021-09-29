package com.example.covid.model;

import javax.persistence.*;
import java.sql.Timestamp;
@Entity
@Table
public class pcr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id",insertable = false,updatable = false)
    private user user;
    private Long user_id;
    @Column
    private String result;
    @Column
    private Timestamp time;

    public pcr() {
    }

    public pcr(Long id, com.example.covid.model.user user, Long user_id, String result, Timestamp time) {
        this.id = id;
        this.user = user;
        this.user_id = user_id;
        this.result = result;
        this.time = time;
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

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
}
