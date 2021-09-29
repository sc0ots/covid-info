package com.example.demootp.HOME;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.AdapterAndroid.AdapterPCR;
import com.example.demootp.AdapterAndroid.AdapterTravel;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.PCR;
import com.example.demootp.model.Travel;
import com.example.demootp.model.User;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PCRActivity extends AppCompatActivity {
    private ArrayList<PCR> modelClassArrayList;
    private AdapterPCR adapter;
    private TextView pcrname,pcrsdt;

    private RecyclerView pcrrecyclerview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pcractivity);

        pcrrecyclerview = findViewById(R.id.PCRrecyclerview);
        pcrname = findViewById(R.id.PCRName);
        pcrsdt = findViewById(R.id.PCRSDT);

        modelClassArrayList = new ArrayList<>();
        pcrrecyclerview.setLayoutManager(new LinearLayoutManager(this));
        adapter = new AdapterPCR(this, modelClassArrayList);
        pcrrecyclerview.setAdapter(adapter);
        adapter.notifyDataSetChanged();

        SesionManagement sesionManagement = new SesionManagement(PCRActivity.this);
        int sdt = sesionManagement.getSession();
        ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                int id = Integer.parseInt(response.body().getResponse());
                //ShowAllTravel
                //GetUser
                ApiService.apiServiceUser.showUser(id).enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {

                        pcrname.setText(response.body().getName());
                        pcrsdt.setText("0"+response.body().getPhone());
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {

                    }
                });

                        ApiService.apiServiceUser.getPcr(id).enqueue(new Callback<List<PCR>>() {
                            @Override
                            public void onResponse(Call<List<PCR>> call, Response<List<PCR>> response) {
                                modelClassArrayList.addAll(response.body());
                                adapter.notifyDataSetChanged();
                            }

                            @Override
                            public void onFailure(Call<List<PCR>> call, Throwable t) {

                            }
                        });
            }

            @Override
            public void onFailure(Call<Check> call, Throwable t) {

            }
        });
    }
}