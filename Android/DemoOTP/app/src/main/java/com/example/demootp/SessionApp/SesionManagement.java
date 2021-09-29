package com.example.demootp.SessionApp;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.demootp.model.Session;

public class SesionManagement {
    SharedPreferences sharedPreferences;
    SharedPreferences.Editor editor;
    String SHARED_PREF_NAME= "session";
    String SESSION_KEY = " session_user";
    public SesionManagement(Context context){

        sharedPreferences= context.getSharedPreferences(SHARED_PREF_NAME ,context.MODE_PRIVATE);
        editor = sharedPreferences.edit();

    }
    public void saveSession(Session session){

        int phone = session.getPhone();
        editor.putInt(SESSION_KEY , phone).commit();
        //save ss of user whenever user is login in
    }
    public  int getSession(){
        //return  user whose ss is save
        return sharedPreferences.getInt(SESSION_KEY, -1);

    }
}
