package com.example.demootp.AdapterAndroid;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.demootp.R;
import com.example.demootp.model.PCR;
import com.example.demootp.model.Travel;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class AdapterPCR  extends RecyclerView.Adapter<AdapterPCR.PCRViewHolder>{
    Context context;
    ArrayList<PCR> pcrArrayList;

    public AdapterPCR(Context context, ArrayList<PCR> pcrArrayList) {
        this.context = context;
        this.pcrArrayList = pcrArrayList;

    }
    @NonNull
    @Override
    public PCRViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.lv_item_pcr,null,false);
        return new PCRViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PCRViewHolder holder, int position) {
        PCR pcr = pcrArrayList.get(position);
        holder.pcrid.setText((position+1)+"");
        holder.pcrname.setText(pcr.getResult()+"");
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        holder.pcrdate.setText(sdf.format(pcr.getTime())+"");

    }

    @Override
    public int getItemCount() {
        return pcrArrayList.size();
    }


    public class PCRViewHolder extends RecyclerView.ViewHolder {
        TextView pcrid,pcrname,pcrdate;

        public PCRViewHolder(@NonNull View itemView) {
            super(itemView);

            pcrid = itemView.findViewById(R.id.pcrId);
            pcrname = itemView.findViewById(R.id.pcrResult);
            pcrdate = itemView.findViewById(R.id.pcrDate);
        }
    }
}
