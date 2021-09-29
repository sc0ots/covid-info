package com.example.demootp.LOGIN;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.HOME.ResultActivity;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Session;
import com.example.demootp.model.User;
import com.whiteelephant.monthpicker.MonthPickerDialog;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CreateUserActivity extends AppCompatActivity {
    Button btnCreate;
    EditText name, year, cmnd, address, phone;
    RadioButton rbnam, rbnu, rb0, rb1, rb2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_user);
        anhxa();
        year.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final Calendar today = Calendar.getInstance();
                MonthPickerDialog.Builder builder = new MonthPickerDialog.Builder(CreateUserActivity.this, new MonthPickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(int selectedMonth, int selectedYear) {
                        year.setText(String.valueOf(selectedYear));
                    }
                }, today.get(Calendar.YEAR), today.get(Calendar.MONTH));
                builder.setActivatedMonth(Calendar.JULY).setMinYear(1800)
                        .setActivatedYear(today.get(Calendar.YEAR))
                        .setMaxYear(today.get(Calendar.YEAR))
                        .setTitle("Chọn năm sinh").showYearOnly().build().show();
            }
        });
        Intent intent = getIntent();
        phone.setText(intent.getStringExtra("phone"));
        btnCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (name.getText().toString().trim().length() >= 70 || name.getText().toString().trim().length() < 3) {
                    Toast.makeText(getApplication(), "Tên không hợp lệ(tên có 4-70 ký tự)", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (year.getText().toString().trim().length() == 0) {
                    Toast.makeText(getApplication(), "Năm Sinh không được để trống", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (!rbnam.isChecked() && !rbnu.isChecked()) {
                    Toast.makeText(getApplication(), "Vui lòng chọn giới tính", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (cmnd.getText().toString().trim().length() >= 20 || name.getText().toString().trim().length() <= 7) {
                    Toast.makeText(getApplication(), "Số CMT/CCCD/Hộ chiếu không hợp lệ", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (address.getText().toString().trim().length() == 0) {
                    Toast.makeText(getApplication(), "Vui lòng nhập địa chỉ", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (phone.getText().toString().trim().length() == 0) {
                    Toast.makeText(getApplication(), "Vui lòng nhập số điện thoại", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (!rb1.isChecked() && !rb0.isChecked() && !rb2.isChecked()) {
                    Toast.makeText(getApplication(), "Vui lòng chọn trang thái hiện tại", Toast.LENGTH_SHORT).show();
                    return;
                }
                User user = new User();
                user.setName(name.getText().toString().trim());
                user.setAddress(address.getText().toString().trim());
                user.setCitizen_id(Integer.parseInt(cmnd.getText().toString().trim()));
                user.setPhone(Integer.parseInt(phone.getText().toString().trim()));
                user.setGender(rbnam.isChecked() ? true : false);
                user.setYob(Integer.parseInt(year.getText().toString().trim()));
                user.setStatus(rb0.isChecked() ? 0 : rb1.isChecked() ? 1 : 2);
                ApiService.apiServiceUser.AddUser(user).enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {
                        // Intent intent = new Intent(CreateUserActivity.this, ResultActivity.class);
                        // intent.putExtra("phonenumber",phone.getText().toString().trim() );
                        // startActivity(intent);

                        Session session = new Session();
                        session.setPhone(Integer.parseInt(phone.getText().toString().trim()));
                        SesionManagement sesionManagement = new SesionManagement(CreateUserActivity.this);
                        sesionManagement.saveSession(session);
                        //move
                        gotoResult();
                        Toast.makeText(getApplication(), intent.getStringExtra("phone"), Toast.LENGTH_LONG).show();
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                        Toast.makeText(getApplication(), "Tọa tài khoản lỗi", Toast.LENGTH_SHORT).show();
                    }

                    private void gotoResult() {
                        Intent intent = new Intent(CreateUserActivity.this, ResultActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                        startActivity(intent);
                        finish();
                    }
                });

            }

        });
    }

    private void anhxa() {
        btnCreate = findViewById(R.id.btnCreate);
        name = findViewById(R.id.textname);
        year = findViewById(R.id.textyear);
        cmnd = findViewById(R.id.textcitizen_id);
        address = findViewById(R.id.textaddress);
        phone = findViewById(R.id.textphone);
        rbnam = findViewById(R.id.rbNam);
        rb0 = findViewById(R.id.rb0);
        rbnu = findViewById(R.id.rbNu);
        rb2 = findViewById(R.id.rb2);
        rb1 = findViewById(R.id.rb1);
    }

}