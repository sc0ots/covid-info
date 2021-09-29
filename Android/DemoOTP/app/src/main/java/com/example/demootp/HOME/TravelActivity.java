package com.example.demootp.HOME;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.AdapterAndroid.AdapterTravel;
import com.example.demootp.AdapterAndroid.adapternew;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.ModelClass1;
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

public class TravelActivity extends AppCompatActivity {
    private ArrayList<Travel> modelClassArrayList;
    private AdapterTravel adapter;
    private Button btnCreatetravel;
    private TextView texttravel, txtdatetravel;
    Dialog dialog;
    private RecyclerView travelrecyclerViewr;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_travel);
        travelrecyclerViewr = findViewById(R.id.travelrecyclerview);
        dialog = new Dialog(TravelActivity.this);
        texttravel = findViewById(R.id.texttravel);
        txtdatetravel = findViewById(R.id.texttravel1);
        btnCreatetravel = findViewById(R.id.btncreattravel);
        modelClassArrayList = new ArrayList<>();
        travelrecyclerViewr.setLayoutManager(new LinearLayoutManager(this));
        adapter = new AdapterTravel(this, modelClassArrayList);
        travelrecyclerViewr.setAdapter(adapter);
        adapter.notifyDataSetChanged();

        SesionManagement sesionManagement = new SesionManagement(TravelActivity.this);
        int sdt = sesionManagement.getSession();
        ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                int id = Integer.parseInt(response.body().getResponse());
                //ShowAllTravel
                Handler mHandler = new Handler();
                Runnable run = new Runnable() {
                    @Override
                    public void run() {

                        ApiService.apiServiceUser.gettravel(id).enqueue(new Callback<List<Travel>>() {
                            @Override
                            public void onResponse(Call<List<Travel>> call, Response<List<Travel>> response) {
                                modelClassArrayList.clear();
                                modelClassArrayList.addAll(response.body());
                                adapter.notifyDataSetChanged();
                            }

                            @Override
                            public void onFailure(Call<List<Travel>> call, Throwable t) {
                                Toast.makeText(getApplication(), "fails", Toast.LENGTH_SHORT).show();
                            }
                        });


                        mHandler.postDelayed(this, 0);
                    }
                };
                run.run();


                //post Travel
                txtdatetravel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        final Calendar calendar = Calendar.getInstance();
                        int yearnow = calendar.get(Calendar.YEAR);
                        int monthNow = calendar.get(Calendar.MONTH);
                        final int dateNow = calendar.get(Calendar.DAY_OF_MONTH);
                        Locale id = new Locale("in", "ID");
                        final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd", id);
                        DatePickerDialog datePickerDialog = new DatePickerDialog(TravelActivity.this, new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                                calendar.set(i, i1, i2);
                                txtdatetravel.setText(simpleDateFormat.format(calendar.getTime()));
                            }
                        }, yearnow, monthNow, dateNow);
                        datePickerDialog.setTitle("Select Date");
                        datePickerDialog.show();
                    }
                });

                btnCreatetravel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        // Calendar calendar = Calendar.getInstance();
                        //    SimpleDateFormat dinhdang = new SimpleDateFormat("yyyy-MM-dd");



                        if(texttravel.getText().toString().length() == 0){
                            Toast.makeText(getApplication(), "Vui lòng nhập địa chỉ", Toast.LENGTH_SHORT).show();
                            return;
                        }   if(txtdatetravel.getText().toString().length() == 0){
                            Toast.makeText(getApplication(), "Vui lòng nhập ngày tháng", Toast.LENGTH_SHORT).show();
                            return;
                        }
                        Travel travel = new Travel();
                        travel.setUser_id(id);
                        travel.setAddress(texttravel.getText().toString().trim());
                        travel.setDate(txtdatetravel.getText().toString());
                        ApiService.apiServiceUser.postTravel(travel).enqueue(new Callback<Travel>() {
                            @Override
                            public void onResponse(Call<Travel> call, Response<Travel> response) {
                                openDialog();

                            }

                            @Override
                            public void onFailure(Call<Travel> call, Throwable t) {
                                Toast.makeText(getApplication(), "fails", Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                });
            }

            @Override
            public void onFailure(Call<Check> call, Throwable t) {

            }
        });
    }

    private void openDialog() {
        dialog.setContentView(R.layout.dialogss);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        CardView ok = dialog.findViewById(R.id.btnok);
        ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                texttravel.setText("");
                txtdatetravel.setText("");

                dialog.dismiss();
            }
        });
        dialog.show();

    }
}