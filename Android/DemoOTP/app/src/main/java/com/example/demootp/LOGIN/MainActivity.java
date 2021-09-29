package com.example.demootp.LOGIN;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.example.demootp.HOME.ResultActivity;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;

import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getName();
    FirebaseAuth mAuth;
    CardView continuebtn;
    TextInputEditText number;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        continuebtn = findViewById(R.id.next);
        number = findViewById(R.id.number);

        progressBar = findViewById(R.id.progressBar);


        mAuth = FirebaseAuth.getInstance();
        mAuth.getFirebaseAuthSettings().setAppVerificationDisabledForTesting(false);
        continuebtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (number.getText().toString().trim().length() == 0) {
                    Toast.makeText(getApplication(), "Số điện thoại không được để trống", Toast.LENGTH_LONG).show();
                    return;
                }
                if (number.getText().toString().trim().length() < 3 || number.getText().toString().trim().length() > 12) {
                    Toast.makeText(getApplication(), "Số điện thoại không đúng định dạng", Toast.LENGTH_LONG).show();
                    return;
                }
                String strphone = "+84"+number.getText().toString().trim();
                progressBar.setVisibility(View.VISIBLE);
                continuebtn.setVisibility(View.INVISIBLE);
                onClickVerifyPhonenumber(strphone);
            }
        });

    }

    private void onClickVerifyPhonenumber(String strphone) {

        PhoneAuthOptions options =
                PhoneAuthOptions.newBuilder(mAuth)
                        .setPhoneNumber(strphone)       // Phone number to verify
                        .setTimeout(60L, TimeUnit.SECONDS) // Timeout and unit
                        .setActivity(this)                 // Activity (for callback binding)
                        .setCallbacks(new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
                            @Override
                            public void onVerificationCompleted(@NonNull PhoneAuthCredential phoneAuthCredential) {
                                signInWithPhoneAuthCredential(phoneAuthCredential);
                                progressBar.setVisibility(View.GONE);
                                continuebtn.setVisibility(View.VISIBLE);
                            }

                            @Override
                            public void onVerificationFailed(@NonNull FirebaseException e) {
                                progressBar.setVisibility(View.GONE);
                                continuebtn.setVisibility(View.VISIBLE);
                                Toast.makeText(getApplication(), "Verification Failed", Toast.LENGTH_SHORT).show();
                            }

                            @Override
                            public void onCodeSent(@NonNull String verificationId, @NonNull PhoneAuthProvider.ForceResendingToken forceResendingToken) {
                                super.onCodeSent(verificationId, forceResendingToken);
                                progressBar.setVisibility(View.GONE);
                                continuebtn.setVisibility(View.VISIBLE);
                                gotoEnterOTP(strphone, verificationId);
                                finish();
                            }
                        })          // OnVerificationStateChangedCallbacks
                        .build();
        PhoneAuthProvider.verifyPhoneNumber(options);
    }

    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential) {
        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d(TAG, "signInWithCredential:success");

                            FirebaseUser user = task.getResult().getUser();
                            // Update UI
                            //gotoOTP success
                            gotoReslt();

                        } else {
                            // Sign in failed, display a message and update the UI
                            Log.w(TAG, "signInWithCredential:failure", task.getException());
                            if (task.getException() instanceof FirebaseAuthInvalidCredentialsException) {
                                // The verification code entered was invalid
                                Toast.makeText(getApplication(), "The verification code entered was invalid", Toast.LENGTH_SHORT).show();
                            }
                        }
                    }
                });
    }

    private void gotoReslt() {
        startActivity(new Intent(MainActivity.this, ResultActivity.class));
        finish();
    }

    private void gotoEnterOTP(String strphone, String verificationId) {
        Intent intent = new Intent(MainActivity.this, OTP_Screen.class);
        intent.putExtra("strphone", strphone);
        intent.putExtra("checkphone", number.getText().toString().trim());
        intent.putExtra("verificationId", verificationId);
        startActivity(intent);

    }

    private void gotoResult() {
        Intent intent = new Intent(MainActivity.this, ResultActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
    }

    @Override
    protected void onStart() {
        super.onStart();
        //check
        checksession();
    }

    private void checksession() {
        SesionManagement sesionManagement = new SesionManagement(MainActivity.this);

        int isUserLoggedin= sesionManagement.getSession();
        if(isUserLoggedin!= -1){
            gotoResult();
        }
    }


}