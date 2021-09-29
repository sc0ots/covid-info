package com.example.demootp.LOGIN;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.chaos.view.PinView;
import com.example.demootp.API.ApiService;
import com.example.demootp.HOME.ResultActivity;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.Session;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;

import java.util.concurrent.TimeUnit;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class OTP_Screen extends AppCompatActivity {
    PinView otpnumber;
    CardView confirmOtp, restOTP;
    private static final String TAG = MainActivity.class.getName();

    FirebaseAuth mAuth;
    private String mPhonenumber;
    private String mverificationId;
    private PhoneAuthProvider.ForceResendingToken mForceResendingToken;

    private TextView timer,textView1;
    private CountDownTimer countDownTimer;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_otp_screen);
        getdata();
        mAuth = FirebaseAuth.getInstance();
        otpnumber = findViewById(R.id.pinview);
        confirmOtp = findViewById(R.id.confirmOTP);
        textView1 = findViewById(R.id.textview1);
        restOTP = findViewById(R.id.restotp);
        timer = findViewById(R.id.timer);

        textView1.setText("Mã xác thực (OTP) đã được gửi đến số điện thoại : "+"0"+Integer.parseInt(getIntent().getStringExtra("checkphone")));
        countDownTimer = new CountDownTimer(300000, 1000) {
            @Override
            public void onTick(long l) {
                timer.setText(String.valueOf((int) l / 1000));
            }
            @Override
            public void onFinish() {
                FirebaseAuth.getInstance().signOut();
            }
        };
        countDownTimer.start();
        confirmOtp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String strotp = otpnumber.getText().toString().trim();
                if (strotp.isEmpty() == false) {
                    onClickVerifyOTP(strotp);
                    return;
                }
                Toast.makeText(getApplication(), "Mã OTP không được để trống", Toast.LENGTH_LONG).show();
            }
        });

        restOTP.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                countDownTimer.start();
                onClickRestOTP();
            }

        });//set countdown timer

    }
    private void getdata() {
        mPhonenumber = getIntent().getStringExtra("strphone");
        mverificationId = getIntent().getStringExtra("verificationId");
    }
    private void onClickVerifyOTP(String strotp) {
        PhoneAuthCredential credential = PhoneAuthProvider.getCredential(mverificationId, strotp);
        signInWithPhoneAuthCredential(credential);
    }

    private void onClickRestOTP() {

        PhoneAuthOptions options =
                PhoneAuthOptions.newBuilder(mAuth)
                        .setPhoneNumber(mPhonenumber)       // Phone number to verify
                        .setTimeout(60L, TimeUnit.SECONDS) // Timeout and unit
                        .setActivity(this)                 // Activity (for callback binding)
                        .setForceResendingToken(mForceResendingToken)
                        .setCallbacks(new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
                            @Override
                            public void onVerificationCompleted(@NonNull PhoneAuthCredential phoneAuthCredential) {
                                signInWithPhoneAuthCredential(phoneAuthCredential);

                            }

                            @Override
                            public void onVerificationFailed(@NonNull FirebaseException e) {
                            }

                            @Override
                            public void onCodeSent(@NonNull String verificationId, @NonNull PhoneAuthProvider.ForceResendingToken forceResendingToken) {
                                super.onCodeSent(verificationId, forceResendingToken);
                                mverificationId = verificationId;
                                mForceResendingToken = forceResendingToken;
                            }
                        })
                        // OnVerificationStateChangedCallbacks
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
                            Log.d(TAG, "signInWithCredential: success");
                            FirebaseUser user = task.getResult().getUser();
                            // Update UI
                            //gotoOTP success
                            gotoReslt();

                        } else {
                            // Sign in failed, display a message and update the UI
                            Log.w(TAG, "signInWithCredential:failure", task.getException());
                            if (task.getException() instanceof FirebaseAuthInvalidCredentialsException) {
                                // The verification code entered was invalid
                                Toast.makeText(getApplication(), " Enter OTP", Toast.LENGTH_SHORT).show();
                            }
                        }
                    }
                });
    }

    private void gotoReslt() {
        int a = Integer.parseInt(getIntent().getStringExtra("checkphone"));
        ApiService.apiServiceUser.chekphone(a).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                if(response.body().getResponse().equals("1")){
                    Intent intent = new Intent(OTP_Screen.this,CreateUserActivity.class);
                    intent.putExtra("phone",String.valueOf(a));
                    startActivity(intent);

                }else {
                    //login save ss
                    Session session = new Session();
                    session.setPhone(a);
                    SesionManagement sesionManagement = new SesionManagement(OTP_Screen.this);
                    sesionManagement.saveSession(session);
                    //move
                    Intent intent = new Intent(OTP_Screen.this, ResultActivity.class);
                    intent.putExtra("phone",String.valueOf(a));
                    intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    startActivity(intent);
                  finish();
                }
            }

            @Override
            public void onFailure(Call<Check> call, Throwable t) {

            }
        });


    }
}