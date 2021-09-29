package com.example.covid;

public class adminExistException extends RuntimeException{
    public adminExistException(String username){
        super("Username already exist");

    }
}
