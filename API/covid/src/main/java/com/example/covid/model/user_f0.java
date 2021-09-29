package com.example.covid.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
public class user_f0 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private Long temp;
    @Column
    private Long heart_rate;
    @Column
    private Long tlc;
    @Column
    private Long spo2;
    @ManyToOne
    @JoinColumn(name="area_id",insertable = false,updatable = false)
    private treatment_area treatment_area;
    private Long area_id;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id",insertable = false,updatable = false)
    private user user;
    private Long user_id;

    public user_f0() {
    }

    public user_f0(Long id, Long user_id, Long temp, Long heart_rate, Long tlc, Long spo2, com.example.covid.model.treatment_area treatment_area, Long area_id) {
        this.id = id;
        this.user_id = user_id;
        this.temp = temp;
        this.heart_rate = heart_rate;
        this.tlc = tlc;
        this.spo2 = spo2;
        this.treatment_area = treatment_area;
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

    public Long getTemp() {
        return temp;
    }

    public void setTemp(Long temp) {
        this.temp = temp;
    }

    public Long getHeart_rate() {
        return heart_rate;
    }

    public void setHeart_rate(Long heart_rate) {
        this.heart_rate = heart_rate;
    }

    public Long getTlc() {
        return tlc;
    }

    public void setTlc(Long tlc) {
        this.tlc = tlc;
    }

    public Long getSpo2() {
        return spo2;
    }

    public void setSpo2(Long spo2) {
        this.spo2 = spo2;
    }

    public com.example.covid.model.treatment_area getTreatment_area() {
        return treatment_area;
    }

    public void setTreatment_area(com.example.covid.model.treatment_area treatment_area) {
        this.treatment_area = treatment_area;
    }

    public Long getArea_id() {
        return area_id;
    }

    public void setArea_id(Long area_id) {
        this.area_id = area_id;
    }
}
