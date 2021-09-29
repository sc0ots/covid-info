package com.example.demootp.HOME;

import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.AdapterAndroid.AdapterDaily;
import com.example.demootp.AdapterAndroid.AdapterTravel;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.Travel;
import com.example.demootp.model.User;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link SkFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SkFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public SkFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment SkFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static SkFragment newInstance(String param1, String param2) {
        SkFragment fragment = new SkFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    private CheckBox cbcough, cbfever, cbbreath, cbtired, cbstrong;
    private Button btnsenddayli;
    private ArrayList<Daily> modelClassArrayList;
    private AdapterDaily adapter;
    private RecyclerView recyclerViewdaily;
    private LinearLayout liner1, liner2, liner3, liner4, liner5;
    Dialog dialog;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_sk, container, false);
        dialog = new Dialog(getContext());
        cbfever = v.findViewById(R.id.dailyfever);
        cbcough = v.findViewById(R.id.dailyCough);
        cbstrong = v.findViewById(R.id.dailyHealth);
        cbbreath = v.findViewById(R.id.dailyShort);
        cbtired = v.findViewById(R.id.dailytire);
        btnsenddayli = v.findViewById(R.id.send_daily);
        liner1 = v.findViewById(R.id.linerFeve);
        liner2 = v.findViewById(R.id.linerFeve1);
        liner3 = v.findViewById(R.id.linerFeve2);
        liner4 = v.findViewById(R.id.linerFeve3);
        recyclerViewdaily = v.findViewById(R.id.rycyclerviewdaily);
        modelClassArrayList = new ArrayList<>();
        recyclerViewdaily.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new AdapterDaily(getContext(), modelClassArrayList);
        recyclerViewdaily.setAdapter(adapter);
        adapter.notifyDataSetChanged();
        cbtired.setChecked(false);
        cbcough.setChecked(false);
        cbfever.setChecked(false);
        cbbreath.setChecked(false);
        cbstrong.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if (b == true) {

                    cbfever.setEnabled(false);
                    cbbreath.setEnabled(false);
                    cbcough.setEnabled(false);
                    cbtired.setEnabled(false);
                    cbtired.setChecked(false);
                    cbcough.setChecked(false);
                    cbfever.setChecked(false);
                    cbbreath.setChecked(false);
                    liner1.setBackgroundColor(Color.parseColor("#F6F1F1"));
                    liner2.setBackgroundColor(Color.parseColor("#F6F1F1"));
                    liner3.setBackgroundColor(Color.parseColor("#F6F1F1"));
                    liner4.setBackgroundColor(Color.parseColor("#F6F1F1"));
                } else {
                    cbfever.setEnabled(true);
                    cbbreath.setEnabled(true);
                    cbcough.setEnabled(true);
                    cbtired.setEnabled(true);
                    liner1.setBackgroundColor(Color.parseColor("#EAE3E3"));
                    liner2.setBackgroundColor(Color.parseColor("#EAE3E3"));
                    liner3.setBackgroundColor(Color.parseColor("#EAE3E3"));
                    liner4.setBackgroundColor(Color.parseColor("#EAE3E3"));
                }


            }
        });

        SesionManagement sesionManagement = new SesionManagement(getActivity());
        int sdt = sesionManagement.getSession();
        ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                int id = Integer.parseInt(response.body().getResponse());
                //post daily
                btnsenddayli.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Daily daily = new Daily();
                        daily.setUser_id(id);
                        daily.setIs_cough(cbcough.isChecked() ? true : false);
                        daily.setIs_fever(cbfever.isChecked() ? true : false);
                        daily.setIs_breath(cbbreath.isChecked() ? true : false);
                        daily.setIs_tired(cbtired.isChecked() ? true : false);
                        daily.setIs_strong(cbstrong.isChecked() ? true : false);
                        ApiService.apiServiceUser.postdaily(daily).enqueue(new Callback<Daily>() {
                            @Override
                            public void onResponse(Call<Daily> call, Response<Daily> response) {
                                cbtired.setChecked(false);
                                cbcough.setChecked(false);
                                cbfever.setChecked(false);
                                cbbreath.setChecked(false);
                                cbstrong.setChecked(false);
                                openDialog();

                            }

                            @Override
                            public void onFailure(Call<Daily> call, Throwable t) {
                                Toast.makeText(getActivity(), "loi", Toast.LENGTH_SHORT).show();

                            }
                        });
                    }
                });

            }

            @Override
            public void onFailure(Call<Check> call, Throwable t) {

            }
        });
        showdaily();


        return v;
    }

    private void showdaily() {
        SesionManagement sesionManagement = new SesionManagement(getActivity());
        int sdt = sesionManagement.getSession();
        ApiService.apiServiceUser.getID(sdt).enqueue(new Callback<Check>() {
            @Override
            public void onResponse(Call<Check> call, Response<Check> response) {
                int id = Integer.parseInt(response.body().getResponse());
                Handler mHandler = new Handler();
                Runnable run = new Runnable() {
                    @Override
                    public void run() {
                        ApiService.apiServiceUser.getdaily(id).enqueue(new Callback<List<Daily>>() {
                            @Override
                            public void onResponse(Call<List<Daily>> call, Response<List<Daily>> response) {
                                modelClassArrayList.clear();
                                modelClassArrayList.addAll(response.body());
                                adapter.notifyDataSetChanged();
                            }

                            @Override
                            public void onFailure(Call<List<Daily>> call, Throwable t) {
                                Toast.makeText(getContext(), "fails", Toast.LENGTH_SHORT).show();
                            }
                        });
                        mHandler.postDelayed(this, 1000);
                    }
                };
                run.run();


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
                dialog.dismiss();
            }
        });
        dialog.show();

    }
}