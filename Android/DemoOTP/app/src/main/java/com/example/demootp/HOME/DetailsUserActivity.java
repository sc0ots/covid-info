package com.example.demootp.HOME;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.LOGIN.CreateUserActivity;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.User;
import com.whiteelephant.monthpicker.MonthPickerDialog;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetailsUserActivity extends AppCompatActivity {

    private CheckBox checkput;
    private EditText putname, putaddress, putphone, putcmnd, putyear;
    private RadioButton rbnamput, rbnuput;
    private Button btnupdate;
    Dialog dialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details_user);
        dialog = new Dialog(DetailsUserActivity.this);
        anhxa();
        btnupdate.setEnabled(false);
        checkput.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if (b == true) {
                    btnupdate.setEnabled(true);
                } else {
                    btnupdate.setEnabled(false);
                }
            }
        });

        putyear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final Calendar today = Calendar.getInstance();
                MonthPickerDialog.Builder builder = new MonthPickerDialog.Builder(DetailsUserActivity.this, new MonthPickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(int selectedMonth, int selectedYear) {
                        putyear.setText(String.valueOf(selectedYear));
                    }
                }, today.get(Calendar.YEAR), today.get(Calendar.MONTH));
                builder.setActivatedMonth(Calendar.JULY).setMinYear(1800)
                        .setActivatedYear(today.get(Calendar.YEAR))
                        .setMaxYear(today.get(Calendar.YEAR))
                        .setTitle("Select Year").showYearOnly().build().show();
            }
        });
        SesionManagement sesionManagement = new SesionManagement(DetailsUserActivity.this);
        int sdt = sesionManagement.getSession();
        ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                int id = Integer.parseInt(response.body().getResponse());
                //GetUser
                ApiService.apiServiceUser.showUser(id).enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {

                        putname.setText(response.body().getName());
                        putcmnd.setText(response.body().getCitizen_id() + "");
                        putyear.setText(response.body().getYob() + "");
                        putaddress.setText(response.body().getAddress());
                        putphone.setText(response.body().getPhone() + "");
                        if (response.body().isGender() == false) {
                            rbnuput.setChecked(true);
                        } else {
                            rbnamput.setChecked(true);
                        }

                        btnupdate.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                                User user = new User();
                                user.setName(putname.getText().toString());
                                user.setCitizen_id(Integer.parseInt(putcmnd.getText().toString().trim()));
                                user.setGender(rbnamput.isChecked() ? true : false);
                                user.setYob(Integer.parseInt(putyear.getText().toString()));
                                user.setPhone(Integer.parseInt(putphone.getText().toString()));
                                user.setAddress(putaddress.getText().toString());

                                //putUser
                                ApiService.apiServiceUser.putUser(id, user).enqueue(new Callback<User>() {
                                    @Override
                                    public void onResponse(Call<User> call, Response<User> response) {

                                        putname.setText(response.body().getName());
                                        putcmnd.setText(response.body().getCitizen_id() + "");
                                        putyear.setText(response.body().getYob() + "");
                                        putaddress.setText(response.body().getAddress());
                                        putphone.setText(response.body().getPhone() + "");
                                        if (response.body().isGender() == false) {
                                            rbnuput.setChecked(true);
                                        } else {
                                            rbnamput.setChecked(true);
                                        }
                                        result();
                                        Toast.makeText(getApplication(), "Update User OK", Toast.LENGTH_SHORT).show();
                                    }

                                    @Override
                                    public void onFailure(Call<User> call, Throwable t) {
                                        Toast.makeText(getApplication(), "Fails connect", Toast.LENGTH_SHORT).show();
                                    }
                                });

                            }
                        });

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

    private void result() {

        dialog.setContentView(R.layout.dialogssupdate);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        CardView ok = dialog.findViewById(R.id.btnokupdate);
        ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
            }
        });
        dialog.show();

    }

    private void anhxa() {
        btnupdate = findViewById(R.id.btnUpdate);
        putname = findViewById(R.id.textnameput);
        putyear = findViewById(R.id.textyearput);
        putcmnd = findViewById(R.id.textcitizen_idput);
        putaddress = findViewById(R.id.textaddressput);
        putphone = findViewById(R.id.textphoneput);
        rbnamput = findViewById(R.id.rbNamput);
        rbnuput = findViewById(R.id.rbNuput);
        checkput = findViewById(R.id.checkUpdate);

    }
}