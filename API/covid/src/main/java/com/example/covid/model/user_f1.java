package com.example.covid.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table
public class user_f1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id",insertable = false,updatable = false)
    private user user;
    private Long user_id;
    @Column
    private Date day_start;
    @Column
    private Date day_end;
    @ManyToOne
    @JoinColumn(name="area_id",insertable = false,updatable = false)
    private quarantine_area quarantine_area;
    private Long area_id;

    public user_f1() {
    }

    public user_f1(Long id, com.example.covid.model.user user, Long user_id, Date day_start, Date day_end, com.example.covid.model.quarantine_area quarantine_area, Long area_id) {
        this.id = id;
        this.user = user;
        this.user_id = user_id;
        this.day_start = day_start;
        this.day_end = day_end;
        this.quarantine_area = quarantine_area;
        this.area_id = area_id;
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

    public Date getDay_start() {
        return day_start;
    }

    public void setDay_start(Date day_start) {
        this.day_start = day_start;
    }

    public Date getDay_end() {
        return day_end;
    }

    public void setDay_end(Date day_end) {
        this.day_end = day_end;
    }

    public com.example.covid.model.quarantine_area getQuarantine_area() {
        return quarantine_area;
    }

    public void setQuarantine_area(com.example.covid.model.quarantine_area quarantine_area) {
        this.quarantine_area = quarantine_area;
    }

    public Long getArea_id() {
        return area_id;
    }

    public void setArea_id(Long area_id) {
        this.area_id = area_id;
    }
}
