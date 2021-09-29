package com.example.demootp.model;

import java.sql.Date;

public class Travel {


    private  int user_id;
    private String address;
    private String date;

    public Travel() {
    }

    public Travel(int user_id, String address, String date) {
        this.user_id = user_id;
        this.address = address;
        this.date = date;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
