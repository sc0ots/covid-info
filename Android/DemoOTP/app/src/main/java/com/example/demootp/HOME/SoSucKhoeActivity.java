package com.example.demootp.HOME;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.User;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.journeyapps.barcodescanner.BarcodeEncoder;

import java.text.SimpleDateFormat;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SoSucKhoeActivity extends AppCompatActivity {
    private TextView sname, sphone, sday1, sday2, smonth1, smonth2, snamevac1, snamevac2;
    private ImageView qrss;
    private LinearLayout linervac1, linervac2;
    private ScrollView backgroundcolo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_so_suc_khoe);
        anhxa();


        SesionManagement sesionManagement = new SesionManagement(SoSucKhoeActivity.this);
        int sdt = sesionManagement.getSession();
        ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                int id = Integer.parseInt(response.body().getResponse());
                //GetUser
                ApiService.apiServiceUser.showUser(id).enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {

                        String a = "Ho va ten: " + response.body().getName() + "\n"
                                + "Nam Sinh : " + response.body().getYob() + "\n" +
                                "Can cuoc cong dan : " + response.body().getCitizen_id() + "\n" +
                                "Dia chi : " + response.body().getAddress() + "\n" +
                                "So dien thoai : 0" + response.body().getPhone() + "\n" +
                                "So lan tiem vaccine : " + response.body().getVac_status();


                        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
                        try {
                            BitMatrix bitMatrix = multiFormatWriter.encode(a, BarcodeFormat.QR_CODE, 800, 800);
                            BarcodeEncoder barcodeEncoder = new BarcodeEncoder();
                            Bitmap bitmap = barcodeEncoder.createBitmap(bitMatrix);
                            qrss.setImageBitmap(bitmap);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        sname.setText(response.body().getName());
                        sphone.setText(response.body().getCitizen_id() + "");
                        sphone.setText("0" + response.body().getPhone());
                        if (response.body().getVac_status() == 0) {
                            backgroundcolo.setBackgroundColor(Color.parseColor("#DFDFDF"));
                            linervac1.setVisibility(View.INVISIBLE);
                            linervac2.setVisibility(View.INVISIBLE);
                            return;
                        }
                        if (response.body().getVac_status() == 1) {
                            backgroundcolo.setBackgroundColor(Color.parseColor("#F3FA90"));
                            SimpleDateFormat dinhdang = new SimpleDateFormat("MM/yyyy");
                            sday1.setText("0"+response.body().getDate1().getDay());
                            snamevac1.setText(response.body().getVac1());
                            snamevac2.setText(response.body().getVac2());
                            smonth1.setText(dinhdang.format(response.body().getDate1()));
                            smonth2.setText(dinhdang.format(response.body().getDate2()));
                            linervac1.setVisibility(View.VISIBLE);
                            linervac2.setVisibility(View.VISIBLE);
                            return;
                        }
                        if (response.body().getVac_status() == 2) {
                            backgroundcolo.setBackgroundColor(Color.parseColor("#7FE668"));
                            SimpleDateFormat dinhdang = new SimpleDateFormat("MM/yyyy");
                            sday1.setText("0"+response.body().getDate1().getDay());
                            snamevac1.setText(response.body().getVac1());
                            smonth1.setText(dinhdang.format(response.body().getDate1()));
                            sday2.setText("0"+response.body().getDate2().getDay());
                            snamevac2.setText(response.body().getVac2());
                            linervac1.setVisibility(View.VISIBLE);
                            linervac2.setVisibility(View.VISIBLE);
                            return;
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
    }


    private void anhxa() {
        sname = findViewById(R.id.SSKname);
        sphone = findViewById(R.id.SSKPhone);
        sday1 = findViewById(R.id.sskNgay);
        sday2 = findViewById(R.id.sskNgay2);
        smonth1 = findViewById(R.id.sskThangnam);
        smonth2 = findViewById(R.id.sskThangnam2);
        snamevac1 = findViewById(R.id.namevaccine1);
        snamevac2 = findViewById(R.id.namevaccine2);
        linervac1 = findViewById(R.id.vaccine1);
        linervac2 = findViewById(R.id.vaccine2);
        backgroundcolo = findViewById(R.id.mainSSK);
        qrss = findViewById(R.id.qrcode);
    }
}