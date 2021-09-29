package com.example.covid.model;

import javax.persistence.*;
import java.sql.Date;

import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table
public class health_dcl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id",insertable = false,updatable = false)
    private user user;
    private Long user_id;
    @Column
    private Boolean is_travel;
    @Column
    private Boolean is_fever;
    @Column
    private Boolean is_cough;
    @Column
    private Boolean is_nobreath;
    @Column
    private Boolean is_pnue;
    @Column
    private Boolean is_throat;
    @Column
    private Boolean is_tire;
    @Column
    private Boolean is_contact_f0;

    @Column
    private Boolean is_contact_suspect;
    @Column
    private Boolean have_chronic;
    @Column
    private Boolean have_heart_pressure;
    @Column
    private Boolean have_hiv_immu;
    @Column
    private Boolean have_transplant;
    @Column
    private Boolean have_diabetes;
    @Column
    private Boolean have_cancer;
    @Column
    private Boolean have_prenant;
    @Column
    private Timestamp time;



    public health_dcl() {
    }

    public health_dcl(Long id, com.example.covid.model.user user, Long user_id, Boolean is_travel, Boolean is_fever, Boolean is_cough, Boolean is_nobreath, Boolean is_pnue, Boolean is_throat, Boolean is_tire, Boolean is_contact_f0 , Boolean is_contact_suspect, Boolean have_chronic, Boolean have_heart_pressure, Boolean have_hiv_immu, Boolean have_transplant, Boolean have_diabetes, Boolean have_cancer, Boolean have_prenant, Timestamp time) {
        this.id = id;
        this.user = user;
        this.user_id = user_id;

        this.is_travel = is_travel;
        this.is_fever = is_fever;
        this.is_cough = is_cough;
        this.is_nobreath = is_nobreath;
        this.is_pnue = is_pnue;
        this.is_throat = is_throat;
        this.is_tire = is_tire;
        this.is_contact_f0 = is_contact_f0;
        this.is_contact_suspect = is_contact_suspect;

        this.have_chronic = have_chronic;
        this.have_heart_pressure = have_heart_pressure;
        this.have_hiv_immu = have_hiv_immu;
        this.have_transplant = have_transplant;
        this.have_diabetes = have_diabetes;
        this.have_cancer = have_cancer;
        this.have_prenant = have_prenant;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getHave_chronic() {
        return have_chronic;
    }

    public void setHave_chronic(Boolean have_chronic) {
        this.have_chronic = have_chronic;
    }

    public Boolean getHave_heart_pressure() {
        return have_heart_pressure;
    }

    public void setHave_heart_pressure(Boolean have_heart_pressure) {
        this.have_heart_pressure = have_heart_pressure;
    }

    public Boolean getHave_hiv_immu() {
        return have_hiv_immu;
    }

    public void setHave_hiv_immu(Boolean have_hiv_immu) {
        this.have_hiv_immu = have_hiv_immu;
    }

    public Boolean getHave_transplant() {
        return have_transplant;
    }

    public void setHave_transplant(Boolean have_transplant) {
        this.have_transplant = have_transplant;
    }

    public Boolean getHave_diabetes() {
        return have_diabetes;
    }

    public void setHave_diabetes(Boolean have_diabetes) {
        this.have_diabetes = have_diabetes;
    }

    public Boolean getHave_cancer() {
        return have_cancer;
    }

    public void setHave_cancer(Boolean have_cancer) {
        this.have_cancer = have_cancer;
    }

    public Boolean getHave_prenant() {
        return have_prenant;
    }

    public void setHave_prenant(Boolean have_prenant) {
        this.have_prenant = have_prenant;
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

    public Boolean getIs_travel() {
        return is_travel;
    }

    public void setIs_travel(Boolean is_travel) {
        this.is_travel = is_travel;
    }

    public Boolean getIs_fever() {
        return is_fever;
    }

    public void setIs_fever(Boolean is_fever) {
        this.is_fever = is_fever;
    }

    public Boolean getIs_cough() {
        return is_cough;
    }

    public void setIs_cough(Boolean is_cough) {
        this.is_cough = is_cough;
    }

    public Boolean getIs_nobreath() {
        return is_nobreath;
    }

    public void setIs_nobreath(Boolean is_nobreath) {
        this.is_nobreath = is_nobreath;
    }

    public Boolean getIs_pnue() {
        return is_pnue;
    }

    public void setIs_pnue(Boolean is_pnue) {
        this.is_pnue = is_pnue;
    }

    public Boolean getIs_throat() {
        return is_throat;
    }

    public void setIs_throat(Boolean is_throat) {
        this.is_throat = is_throat;
    }

    public Boolean getIs_tire() {
        return is_tire;
    }

    public void setIs_tire(Boolean is_tire) {
        this.is_tire = is_tire;
    }

    public Boolean getIs_contact_f0() {
        return is_contact_f0;
    }

    public void setIs_contact_f0(Boolean is_contact_f0) {
        this.is_contact_f0 = is_contact_f0;
    }



    public Boolean getIs_contact_suspect() {
        return is_contact_suspect;
    }

    public void setIs_contact_suspect(Boolean is_contact_suspect) {
        this.is_contact_suspect = is_contact_suspect;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
}
