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
import android.widget.RadioButton;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.healthDCLS;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TokhaiYteActivity extends AppCompatActivity {

    private CheckBox cancer, chronic, diabetes, pressure, hiv, prenant, transplant, cough, fever, nobreath, pune, throat, tire, cbcheckyte;
    private Button btnkhaibao;
    private RadioButton rbyestravel, rbnotravel, rbyescontactf0, rbnof0, rbyesspu, rbnospu;
    Dialog dialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tokhai_yte);
        anhxa();
        btnkhaibao.setEnabled(false);
        rbnotravel.setChecked(true);
        rbnof0.setChecked(true);
        rbnospu.setChecked(true);
        dialog = new Dialog(TokhaiYteActivity.this);

        cbcheckyte.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if (b == true) {
                    btnkhaibao.setEnabled(true);
                }else {
                    btnkhaibao.setEnabled(false);
                }
            }
        });


        btnkhaibao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                SesionManagement sesionManagement = new SesionManagement(TokhaiYteActivity.this);
                int sdt = sesionManagement.getSession();
                ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
                    @Override
                    public void onResponse(Call<Check> call, Response<Check> response) {
                        int id = Integer.parseInt(response.body().getResponse());
                        healthDCLS healthDCLS = new healthDCLS();
                        healthDCLS.setUser_id(id);
                        healthDCLS.setIs_travel(rbyestravel.isChecked() ? true : false);
                        healthDCLS.setIs_fever(fever.isChecked() ? true : false);
                        healthDCLS.setIs_cough(cough.isChecked() ? true : false);
                        healthDCLS.setIs_nobreath(nobreath.isChecked() ? true : false);
                        healthDCLS.setIs_pnue(pune.isChecked() ? true : false);
                        healthDCLS.setIs_throat(throat.isChecked() ? true : false);
                        healthDCLS.setIs_tire(tire.isChecked() ? true : false);
                        healthDCLS.setIs_contact_f0(rbyescontactf0.isChecked() ? true : false);
                        healthDCLS.setIs_contact_suspect(rbyesspu.isChecked() ? true : false);
                        healthDCLS.setHave_chronic(chronic.isChecked() ? true : false);
                        healthDCLS.setHave_heart_pressure(pressure.isChecked() ? true : false);
                        healthDCLS.setHave_hiv_immu(hiv.isChecked() ? true : false);
                        healthDCLS.setHave_transplant(transplant.isChecked() ? true : false);
                        healthDCLS.setHave_diabetes(diabetes.isChecked() ? true : false);
                        healthDCLS.setHave_cancer(cancer.isChecked() ? true : false);
                        healthDCLS.setHave_prenant(prenant.isChecked() ? true : false);

                        ApiService.apiServiceUser.posthealthdcls(healthDCLS).enqueue(new Callback<com.example.demootp.model.healthDCLS>() {
                            @Override
                            public void onResponse(Call<com.example.demootp.model.healthDCLS> call, Response<com.example.demootp.model.healthDCLS> response) {
                            result();                            }
                            @Override
                            public void onFailure(Call<com.example.demootp.model.healthDCLS> call, Throwable t) {
                                Toast.makeText(getApplication(), "Create Health DCLS Fails", Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                    @Override
                    public void onFailure(Call<Check> call, Throwable t) {
                    }
                });
            }
        });
    }

    private void result() {

            dialog.setContentView(R.layout.dialogsstye);
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            CardView ok = dialog.findViewById(R.id.btnokyte);
            ok.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    startActivity(new Intent(TokhaiYteActivity.this,ResultActivity.class));
                    dialog.dismiss();
                }
            });
            dialog.show();



    }

    private void anhxa() {
        cancer = findViewById(R.id.cbCancer);
        chronic = findViewById(R.id.cbchronic);
        diabetes = findViewById(R.id.cbdiabetes);
        pressure = findViewById(R.id.cbheart);
        hiv = findViewById(R.id.cbhiv);
        prenant = findViewById(R.id.cbpregnant);
        transplant = findViewById(R.id.cbtransplant);
        cough = findViewById(R.id.cbCough);
        fever = findViewById(R.id.cbFever);
        nobreath = findViewById(R.id.cbShort);
        pune = findViewById(R.id.cbPneumonia);
        throat = findViewById(R.id.cbthroat);
        tire = findViewById(R.id.cbTired);
        cbcheckyte = findViewById(R.id.btncheckYTe);
        btnkhaibao = findViewById(R.id.btnkhaibao);
        rbyestravel = findViewById(R.id.yestravel);
        rbyesspu = findViewById(R.id.yescontactspu);
        rbyescontactf0 = findViewById(R.id.yescontactf0);
        rbnospu = findViewById(R.id.nocontactspu);
        rbnof0 = findViewById(R.id.nocontactf0);
        rbnotravel = findViewById(R.id.notravel);
    }
}