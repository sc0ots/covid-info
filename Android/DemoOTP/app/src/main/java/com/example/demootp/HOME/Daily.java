package com.example.demootp.HOME;

import java.sql.Timestamp;

public class Daily {
    private int user_id;
    boolean is_cough,is_fever, is_breath,is_tired,is_strong;
    private Timestamp timestamp;

    public Daily() {
    }

    public Daily(int user_id, boolean is_cough, boolean is_fever, boolean is_breath, boolean is_tired, boolean is_strong, Timestamp timestamp) {
        this.user_id = user_id;
        this.is_cough = is_cough;
        this.is_fever = is_fever;
        this.is_breath = is_breath;
        this.is_tired = is_tired;
        this.is_strong = is_strong;
        this.timestamp = timestamp;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public boolean isIs_cough() {
        return is_cough;
    }

    public void setIs_cough(boolean is_cough) {
        this.is_cough = is_cough;
    }

    public boolean isIs_fever() {
        return is_fever;
    }

    public void setIs_fever(boolean is_fever) {
        this.is_fever = is_fever;
    }

    public boolean isIs_breath() {
        return is_breath;
    }

    public void setIs_breath(boolean is_breath) {
        this.is_breath = is_breath;
    }

    public boolean isIs_tired() {
        return is_tired;
    }

    public void setIs_tired(boolean is_tired) {
        this.is_tired = is_tired;
    }

    public boolean isIs_strong() {
        return is_strong;
    }

    public void setIs_strong(boolean is_strong) {
        this.is_strong = is_strong;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }


}
