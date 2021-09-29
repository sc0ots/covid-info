package com.example.demootp.HOME;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.text.method.LinkMovementMethod;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.demootp.API.ApiService;
import com.example.demootp.AdapterAndroid.Adapter;
import com.example.demootp.R;
import com.example.demootp.model.ModelClass;

import org.eazegraph.lib.charts.PieChart;
import org.eazegraph.lib.models.PieModel;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link HomeFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class HomeFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public HomeFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment HomeFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static HomeFragment newInstance(String param1, String param2) {
        HomeFragment fragment = new HomeFragment();
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

    TextView mfilter, seedetails;
    Spinner spinner;
    String[] types = {"Ca nhiễm", "Tử vong", "Khỏi bệnh", "Đang chưa trị"};
    private List<ModelClass> modelClasslist;
    private List<ModelClass> modelClasslist2;
    PieChart mpiechart;
    private RecyclerView recyclerView;
    Adapter adapter;
    LinearLayout ttVN, ttTG;
    CardView carkbyt, carhdyt;
    TextView mtodaytotal, mtotal, mactive, mrecovered, mtodayrecovered, mdeaths, mtodaydeaths,txtthongtin;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        //anhxa
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        mactive = view.findViewById(R.id.activecase);
        txtthongtin= view.findViewById(R.id.txtthongtin);

        mdeaths = view.findViewById(R.id.totaldeath);
        mtodaydeaths = view.findViewById(R.id.todaydeath);
        mrecovered = view.findViewById(R.id.recoveredcase);
        mtodayrecovered = view.findViewById(R.id.todayrecovered);
        mtotal = view.findViewById(R.id.totalcase);
        mtodaytotal = view.findViewById(R.id.todaytotal);
        mpiechart = view.findViewById(R.id.piechart);
        ttVN = view.findViewById(R.id.ttVN);
        ttTG = view.findViewById(R.id.ttTD);
        seedetails = view.findViewById(R.id.seedetails);
        spinner = view.findViewById(R.id.spinner);
        mfilter = view.findViewById(R.id.filter);
        recyclerView = view.findViewById(R.id.rycyclerview);
        carhdyt = view.findViewById(R.id.carhdyt);
        carkbyt = view.findViewById(R.id.carkbyt);
        modelClasslist = new ArrayList<>();
        modelClasslist2 = new ArrayList<>();

        carkbyt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getActivity(), khaibaoYTeActivity.class));
            }
        });

        carhdyt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
            Uri uri = Uri.parse("https://ncovi.vnpt.vn/views/huongdan.html");
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
            }
        });

        seedetails.setMovementMethod(LinkMovementMethod.getInstance());
        seedetails.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW);
                browserIntent.setData(Uri.parse("https://ncovi.vnpt.vn/views/ncovi_detail.html"));
                startActivity(browserIntent);
            }
        });


        spinnerAPI();
        CallAPI();
        ttTG.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                callApitg();
                ttVN.setBackground(getActivity().getDrawable(R.drawable.country_code_drawble));
                ttTG.setBackground(getActivity().getDrawable(R.drawable.country_code_drawble1));
                txtthongtin.setText("Thông tin Thế giới");
            }
        });
        ttVN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ttVN.setBackground(getActivity().getDrawable(R.drawable.country_code_drawble1));
                ttTG.setBackground(getActivity().getDrawable(R.drawable.country_code_drawble));
                txtthongtin.setText("Thông tin việt nam");
                CallAPI();
            }
        });


        return view;
    }


    private void spinnerAPI() {
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                String item = types[i];
                mfilter.setText(item);
                adapter.filter(item);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        ArrayAdapter arrayAdapter = new ArrayAdapter(this.getActivity(), android.R.layout.simple_spinner_dropdown_item, types);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);
        ApiService.apiServicetg.getcountrydata().enqueue(new Callback<List<ModelClass>>() {
            @Override
            public void onResponse(Call<List<ModelClass>> call, Response<List<ModelClass>> response) {
                modelClasslist2.addAll(response.body());
                adapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Call<List<ModelClass>> call, Throwable t) {

            }
        });
        adapter = new Adapter(getContext(), modelClasslist2);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setHasFixedSize(true);
        recyclerView.setAdapter(adapter);

    }

    private void callApitg() {
        ApiService.apiServicetg.apiThegioi().enqueue(new Callback<ModelClass>() {
            @Override
            public void onResponse(Call<ModelClass> call, Response<ModelClass> response) {
                ModelClass modelClass = response.body();
                mactive.setText(modelClass.getActive());
                mtodaydeaths.setText(("+" + modelClass.getTodayDeaths()));
                mtodayrecovered.setText(("+" + modelClass.getTodayRecovered()));
                mtodaytotal.setText(("+" + modelClass.getTodayCases()));
                mtotal.setText((modelClass.getCases()));
                mdeaths.setText((modelClass.getDeaths()));
                mrecovered.setText((modelClass.getRecovered()));
                // Graph
                int active, total, recovered, deaths;
                active = Integer.parseInt(modelClass.getActive());
                total = Integer.parseInt(modelClass.getCases());
                recovered = Integer.parseInt(modelClass.getRecovered());
                deaths = Integer.parseInt(modelClass.getDeaths());
                mpiechart.clearChart();
                mpiechart.addPieSlice(new PieModel("Ca nhiễm", total, Color.parseColor("#FFB701")));
                mpiechart.addPieSlice(new PieModel("Đang chưa Trị", active, Color.parseColor("#FF4CAF50")));
                mpiechart.addPieSlice(new PieModel("Khỏi bệnh", recovered, Color.parseColor("#38ACCD")));
                mpiechart.addPieSlice(new PieModel("Tủ vong", deaths, Color.parseColor("#F55c47")));
                mpiechart.startAnimation();

            }

            @Override
            public void onFailure(Call<ModelClass> call, Throwable t) {

                //test call Fails
                //Toast.makeText(getContext(), "call api fails", Toast.LENGTH_LONG).show();
            }
        });

    }


    private void CallAPI() {

        ApiService.apiService.apiVietNam("true", "true").enqueue(new Callback<ModelClass>() {
            @Override
            public void onResponse(Call<ModelClass> call, Response<ModelClass> response) {
                ModelClass modelClass = response.body();
                mactive.setText(modelClass.getActive());
                mtodaydeaths.setText(("+" + modelClass.getTodayDeaths()));
                mtodayrecovered.setText(("+" + modelClass.getTodayRecovered()));
                mtodaytotal.setText(("+" + modelClass.getTodayCases()));
                mtotal.setText((modelClass.getCases()));
                mdeaths.setText((modelClass.getDeaths()));
                mrecovered.setText((modelClass.getRecovered()));
                // Graph
                int active, total, recovered, deaths;
                active = Integer.parseInt(modelClass.getActive());
                total = Integer.parseInt(modelClass.getCases());
                recovered = Integer.parseInt(modelClass.getRecovered());
                deaths = Integer.parseInt(modelClass.getDeaths());
                mpiechart.clearChart();
                mpiechart.addPieSlice(new PieModel("Ca nhiễm", total, Color.parseColor("#FFB701")));
                mpiechart.addPieSlice(new PieModel("Đang chữa trị", active, Color.parseColor("#FF4CAF50")));
                mpiechart.addPieSlice(new PieModel("Khỏi bệnh", recovered, Color.parseColor("#38ACCD")));
                mpiechart.addPieSlice(new PieModel("Tử vong", deaths, Color.parseColor("#F55c47")));
                mpiechart.startAnimation();

            }

            @Override
            public void onFailure(Call<ModelClass> call, Throwable t) {

                //test call Fails
                //Toast.makeText(getContext(), "call api fails", Toast.LENGTH_LONG).show();
            }
        });
    }
}