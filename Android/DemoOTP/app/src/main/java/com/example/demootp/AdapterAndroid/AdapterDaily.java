package com.example.demootp.AdapterAndroid;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.example.demootp.HOME.Daily;
import com.example.demootp.R;
import com.example.demootp.model.ModelClass1;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class AdapterDaily extends RecyclerView.Adapter<AdapterDaily.DailyViewHolder>{

    Context context;
    ArrayList<Daily> dailyArrayList;

    public AdapterDaily(Context context, ArrayList<Daily> dailyArrayList) {
        this.context = context;
        this.dailyArrayList = dailyArrayList;

    }

    @NonNull
    @Override
    public AdapterDaily.DailyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
      View view = LayoutInflater.from(context).inflate(R.layout.layout_item_daily,null,false);
        return new DailyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdapterDaily.DailyViewHolder holder, int position) {
       Daily currentItem = dailyArrayList.get(position);
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat formattimer = new SimpleDateFormat("HH:mm");
        holder.dailydate.setText(sdf.format(currentItem.getTimestamp())+"");
        holder.dailytimer.setText(formattimer.format(currentItem.getTimestamp().getTime())+"");
        if (currentItem.isIs_strong()==true){
            holder.dailycartext.setText("An toàn");
            holder.dailyhealth.setText("Bình thường");
            holder.carddaily.setCardBackgroundColor(Color.parseColor("#44AE2C"));
        }else {
            String a,b,c,d;
            a="Ho ,";
            b="Sốt,";
            c="Khó thở";
            d=",Đau người,mệt mỏi";
            holder.dailycartext.setText("Nguy cơ nhiễm bệnh");
            holder.carddaily.setCardBackgroundColor(Color.parseColor("#F9A825"));
            if (currentItem.isIs_cough() == false){
                 a = "";

            }if (currentItem.isIs_fever()==false){
                b="";

            }
            if (currentItem.isIs_breath()==false){
                c="";

            }
            if (currentItem.isIs_tired()==false){
                d="";

            }
            holder.dailyhealth.setText(a+""+b+""+c+""+d);
        }

    }

    @Override
    public int getItemCount() {
        return dailyArrayList.size();
    }

    public class DailyViewHolder extends RecyclerView.ViewHolder {
        TextView dailydate,dailytimer,dailycartext,dailyhealth;
        CardView carddaily;
        public DailyViewHolder(@NonNull View itemView) {
            super(itemView);
            dailydate = itemView.findViewById(R.id.datedaily);
            dailytimer = itemView.findViewById(R.id.timedaily);
            dailycartext = itemView.findViewById(R.id.dailycovid);
            dailyhealth = itemView.findViewById(R.id.txthealthdaily);
            carddaily = itemView.findViewById(R.id.carddaily);

        }
    }
}
