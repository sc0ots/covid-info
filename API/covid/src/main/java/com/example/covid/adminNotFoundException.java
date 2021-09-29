package com.example.covid;

public class adminNotFoundException extends RuntimeException{
    public adminNotFoundException(Long id){
        super("Could not find entry"+id);

    }
}
