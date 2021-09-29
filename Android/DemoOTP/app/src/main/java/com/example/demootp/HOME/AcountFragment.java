package com.example.demootp.HOME;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.example.demootp.R;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link AcountFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class AcountFragment extends Fragment {


    LinearLayout accountid, travel, linerPCR, linerMap, linerTermsUser1,linerbook;
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public AcountFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment AcountFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static AcountFragment newInstance(String param1, String param2) {
        AcountFragment fragment = new AcountFragment();
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

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View v = inflater.inflate(R.layout.fragment_acount, container, false);
        accountid = v.findViewById(R.id.accountID);
        travel = v.findViewById(R.id.linerTravel);
        linerPCR = v.findViewById(R.id.linePCR);
        linerMap = v.findViewById(R.id.linerMap);
        linerbook = v.findViewById(R.id.SSKAccout);
        linerTermsUser1 = v.findViewById(R.id.linerTermsUser1);

        linerMap.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getActivity(), MapActivity.class));
            }
        }); linerbook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getActivity(), SoSucKhoeActivity.class));
            }
        });
        linerTermsUser1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getActivity(), TermsUserActivity.class));
            }
        });
        linerPCR.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getActivity(), PCRActivity.class));
            }
        });
        accountid.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getActivity(), DetailsUserActivity.class));
            }
        });
        travel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getActivity(), TravelActivity.class));
            }
        });
        return v;
    }
}