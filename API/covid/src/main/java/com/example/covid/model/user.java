package com.example.covid.model;

import javax.persistence.*;
import java.sql.*;
import java.time.Year;
import java.util.Set;

@Entity
@Table
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String name;

    @Column
    private Long citizen_id;
    @Column
    private Boolean gender;
    @Column
    private Long yob;
    @Column
    private String address;
    @Column()
    private Long phone;
    @Column
    private Long status;
    @Column
    private Long vac_status;
    @Column
    private String vac1;
    @Column
    private Date date1;
    @Column
    private String vac2;
    @Column
    private Date date2;


    public user() {
    }

    public user(Long id, String name, Long citizen_id, Boolean gender, Long yob, String address, Long phone, Long status, Long vac_status, String vac1, Date date1, String vac2, Date date2) {
        this.id = id;
        this.name = name;
        this.citizen_id = citizen_id;
        this.gender = gender;
        this.yob = yob;
        this.address = address;
        this.phone = phone;
        this.status = status;
        this.vac_status = vac_status;
        this.vac1 = vac1;
        this.date1 = date1;
        this.vac2 = vac2;
        this.date2 = date2;
    }

    public Long getVac_status() {
        return vac_status;
    }

    public void setVac_status(Long vac_status) {
        this.vac_status = vac_status;
    }

    public String getVac1() {
        return vac1;
    }

    public void setVac1(String vac1) {
        this.vac1 = vac1;
    }

    public Date getDate1() {
        return date1;
    }

    public void setDate1(Date date1) {
        this.date1 = date1;
    }

    public String getVac2() {
        return vac2;
    }

    public void setVac2(String vac2) {
        this.vac2 = vac2;
    }

    public Date getDate2() {
        return date2;
    }

    public void setDate2(Date date2) {
        this.date2 = date2;
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

    public Long getCitizen_id() {
        return citizen_id;
    }

    public void setCitizen_id(Long citizen_id) {
        this.citizen_id = citizen_id;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public Long getYob() {
        return yob;
    }

    public void setYob(Long yob) {
        this.yob = yob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }
}
