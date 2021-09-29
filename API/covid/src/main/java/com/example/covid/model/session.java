package com.example.covid.model;

public class session {
    private String respone;
    private String role;

    public session() {
    }

    public session(String respone, String role) {
        this.respone = respone;
        this.role = role;
    }

    public String getRespone() {
        return respone;
    }

    public void setRespone(String respone) {
        this.respone = respone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
