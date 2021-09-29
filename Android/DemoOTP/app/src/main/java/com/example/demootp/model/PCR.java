package com.example.demootp.model;

import java.sql.Timestamp;

public class PCR {
    private String result;
    private Timestamp time;

    public PCR() {
    }

    public PCR(String result, Timestamp time) {
        this.result = result;
        this.time = time;
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
