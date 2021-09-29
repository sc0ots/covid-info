package com.example.demootp.model;

import java.sql.Date;

public class User {
    int id;
    String name;
    int citizen_id;
    boolean gender;
    int yob;
    String address;

    int phone;
    int status;
    int  vac_status;
    String vac1;
    Date date1;
    String vac2;
    Date date2;

    public User() {
    }

    public User(int id, String name, int citizen_id, boolean gender, int yob, String address, int phone, int status, int vac_status, String vac1, Date date1, String vac2, Date date2) {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCitizen_id() {
        return citizen_id;
    }

    public void setCitizen_id(int citizen_id) {
        this.citizen_id = citizen_id;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public int getYob() {
        return yob;
    }

    public void setYob(int yob) {
        this.yob = yob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getVac_status() {
        return vac_status;
    }

    public void setVac_status(int vac_status) {
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
}
