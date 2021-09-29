package com.example.covid.model;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table
public class health_daily {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id",insertable = false,updatable = false)
    private user user;
    private Long user_id;
    @Column
    private Timestamp timestamp;

    @Column
    private Boolean is_cough;
    @Column
    private Boolean is_fever;
    @Column
    private Boolean is_breath;
    @Column
    private Boolean is_tired;
    @Column
    private Boolean is_strong;

    public health_daily() {
    }

    public health_daily(Long id, com.example.covid.model.user user, Long user_id, Timestamp timestamp, Boolean is_cough, Boolean is_fever, Boolean is_breath, Boolean is_tired, Boolean is_strong) {
        this.id = id;
        this.user = user;
        this.user_id = user_id;
        this.timestamp = timestamp;
        this.is_cough = is_cough;
        this.is_fever = is_fever;
        this.is_breath = is_breath;
        this.is_tired = is_tired;
        this.is_strong = is_strong;
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

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean getIs_cough() {
        return is_cough;
    }

    public void setIs_cough(Boolean is_cough) {
        this.is_cough = is_cough;
    }

    public Boolean getIs_fever() {
        return is_fever;
    }

    public void setIs_fever(Boolean is_fever) {
        this.is_fever = is_fever;
    }

    public Boolean getIs_breath() {
        return is_breath;
    }

    public void setIs_breath(Boolean is_breath) {
        this.is_breath = is_breath;
    }

    public Boolean getIs_tired() {
        return is_tired;
    }

    public void setIs_tired(Boolean is_tired) {
        this.is_tired = is_tired;
    }

    public Boolean getIs_strong() {
        return is_strong;
    }

    public void setIs_strong(Boolean is_strong) {
        this.is_strong = is_strong;
    }
}
