package com.example.covid.model;

public class checkphone {
    private Long response;
    private String role;

    public checkphone() {
    }

    public checkphone(Long response, String role) {
        this.response = response;
        this.role = role;
    }

    public Long getResponse() {
        return response;
    }

    public void setResponse(Long response) {
        this.response = response;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
