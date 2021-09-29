package com.example.covid.model;
import javax.persistence.*;
import java.util.Set;
@Entity
@Table
public class admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String username;
    @Column
    private String password;

    public admin(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public admin() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
