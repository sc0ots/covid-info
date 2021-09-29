package com.example.demootp.AdapterAndroid;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.example.demootp.HOME.Daily;
import com.example.demootp.R;
import com.example.demootp.model.ModelClass;
import com.example.demootp.model.Travel;

import java.util.ArrayList;

public class AdapterTravel extends RecyclerView.Adapter<AdapterTravel.TravelViewHolder> {

    Context context;
    ArrayList<Travel> travelArrayList;

    public AdapterTravel(Context context, ArrayList<Travel> travelArrayList) {
        this.context = context;
        this.travelArrayList = travelArrayList;

    }
    @NonNull
    @Override
    public AdapterTravel.TravelViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.layout_item_travel,null,false);
        return new TravelViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdapterTravel.TravelViewHolder holder, int position) {
        Travel travel = travelArrayList.get(position);
        holder.traddress.setText("Bạn đã đến   "+travel.getAddress()+"  vào ngày:  " + travel.getDate());

    }

    @Override
    public int getItemCount() {
        return travelArrayList.size();
    }

    public class TravelViewHolder extends RecyclerView.ViewHolder {
        TextView traddress;
        public TravelViewHolder(@NonNull View itemView) {
            super(itemView);
            traddress = itemView.findViewById(R.id.traveladdress);


        }
    }
}
