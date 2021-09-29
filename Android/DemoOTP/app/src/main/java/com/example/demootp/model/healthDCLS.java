package com.example.demootp.model;

public class healthDCLS {
    private int user_id;
    private boolean is_travel,is_fever,is_cough,is_nobreath,is_pnue,is_throat,is_tire,is_contact_f0,is_contact_suspect,have_chronic,have_heart_pressure,have_hiv_immu,have_transplant,have_diabetes,have_cancer,have_prenant;

    public healthDCLS() {
    }

    public healthDCLS(int user_id, boolean is_travel, boolean is_fever, boolean is_cough, boolean is_nobreath, boolean is_pnue, boolean is_throat, boolean is_tire, boolean is_contact_f0, boolean is_contact_suspect, boolean have_chronic, boolean have_heart_pressure, boolean have_hiv_immu, boolean have_transplant, boolean have_diabetes, boolean have_cancer, boolean have_prenant) {
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
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public boolean isIs_travel() {
        return is_travel;
    }

    public void setIs_travel(boolean is_travel) {
        this.is_travel = is_travel;
    }

    public boolean isIs_fever() {
        return is_fever;
    }

    public void setIs_fever(boolean is_fever) {
        this.is_fever = is_fever;
    }

    public boolean isIs_cough() {
        return is_cough;
    }

    public void setIs_cough(boolean is_cough) {
        this.is_cough = is_cough;
    }

    public boolean isIs_nobreath() {
        return is_nobreath;
    }

    public void setIs_nobreath(boolean is_nobreath) {
        this.is_nobreath = is_nobreath;
    }

    public boolean isIs_pnue() {
        return is_pnue;
    }

    public void setIs_pnue(boolean is_pnue) {
        this.is_pnue = is_pnue;
    }

    public boolean isIs_throat() {
        return is_throat;
    }

    public void setIs_throat(boolean is_throat) {
        this.is_throat = is_throat;
    }

    public boolean isIs_tire() {
        return is_tire;
    }

    public void setIs_tire(boolean is_tire) {
        this.is_tire = is_tire;
    }

    public boolean isIs_contact_f0() {
        return is_contact_f0;
    }

    public void setIs_contact_f0(boolean is_contact_f0) {
        this.is_contact_f0 = is_contact_f0;
    }

    public boolean isIs_contact_suspect() {
        return is_contact_suspect;
    }

    public void setIs_contact_suspect(boolean is_contact_suspect) {
        this.is_contact_suspect = is_contact_suspect;
    }

    public boolean isHave_chronic() {
        return have_chronic;
    }

    public void setHave_chronic(boolean have_chronic) {
        this.have_chronic = have_chronic;
    }

    public boolean isHave_heart_pressure() {
        return have_heart_pressure;
    }

    public void setHave_heart_pressure(boolean have_heart_pressure) {
        this.have_heart_pressure = have_heart_pressure;
    }

    public boolean isHave_hiv_immu() {
        return have_hiv_immu;
    }

    public void setHave_hiv_immu(boolean have_hiv_immu) {
        this.have_hiv_immu = have_hiv_immu;
    }

    public boolean isHave_transplant() {
        return have_transplant;
    }

    public void setHave_transplant(boolean have_transplant) {
        this.have_transplant = have_transplant;
    }

    public boolean isHave_diabetes() {
        return have_diabetes;
    }

    public void setHave_diabetes(boolean have_diabetes) {
        this.have_diabetes = have_diabetes;
    }

    public boolean isHave_cancer() {
        return have_cancer;
    }

    public void setHave_cancer(boolean have_cancer) {
        this.have_cancer = have_cancer;
    }

    public boolean isHave_prenant() {
        return have_prenant;
    }

    public void setHave_prenant(boolean have_prenant) {
        this.have_prenant = have_prenant;
    }
}
