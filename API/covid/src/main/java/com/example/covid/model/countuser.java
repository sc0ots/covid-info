package com.example.covid.model;

public class countuser {
    private Long user;
    private Long userf1;
    private Long userf0;

    public countuser(Long user, Long userf1, Long userf0) {
        this.user = user;
        this.userf1 = userf1;
        this.userf0 = userf0;
    }

    public countuser() {
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getUserf1() {
        return userf1;
    }

    public void setUserf1(Long userf1) {
        this.userf1 = userf1;
    }

    public Long getUserf0() {
        return userf0;
    }

    public void setUserf0(Long userf0) {
        this.userf0 = userf0;
    }
}
