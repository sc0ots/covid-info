package com.example.demootp.HOME;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.TextView;

import com.example.demootp.API.ApiService;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class khaibaoYTeActivity extends AppCompatActivity {
    private TextView tname,tyear,taddress,tcitizenid;
    private RadioButton rbnamt,rbnut;
    private Button btntokhai;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_khaibao_yte);
        btntokhai = findViewById(R.id.btnkhaibao);
        tname = findViewById(R.id.getfullname);
        tyear = findViewById(R.id.getyear);
        taddress = findViewById(R.id.getaddress);
        tcitizenid = findViewById(R.id.getcitizenid);
        rbnamt= findViewById(R.id.rbNamget);
        rbnut = findViewById(R.id.rbNuget);


        SesionManagement sesionManagement = new SesionManagement(khaibaoYTeActivity.this);
        int sdt = sesionManagement.getSession();
        ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                int id =  Integer.parseInt(response.body().getResponse());
                ApiService.apiServiceUser.showUser(id).enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {

                        tname.setText(response.body().getName());
                        tcitizenid.setText(response.body().getCitizen_id()+"");
                        tyear.setText(response.body().getYob()+"");
                        taddress.setText(response.body().getAddress());
                        if(response.body().isGender()==false){
                            rbnut.setChecked(true);
                        }else {
                            rbnamt.setChecked(true);
                        }

                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {

                    }
                });
            }

            @Override
            public void onFailure(Call<Check> call, Throwable t) {

            }
        });
        btntokhai.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(khaibaoYTeActivity.this, TokhaiYteActivity.class));
            }
        });

    }
}