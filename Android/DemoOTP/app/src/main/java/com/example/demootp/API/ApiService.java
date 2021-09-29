package com.example.demootp.API;

import com.example.demootp.HOME.Daily;
import com.example.demootp.model.Check;
import com.example.demootp.model.ModelClass;
import com.example.demootp.model.PCR;
import com.example.demootp.model.Quarantine;
import com.example.demootp.model.Travel;
import com.example.demootp.model.Treatment;
import com.example.demootp.model.User;
import com.example.demootp.model.healthDCLS;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    ApiService apiService = new Retrofit.Builder().baseUrl("https://disease.sh/v3/covid-19/countries/").addConverterFactory(GsonConverterFactory.create(gson)).build().create(ApiService.class);
    ApiService apiServicetg = new Retrofit.Builder().baseUrl("https://corona.lmao.ninja/v2/").addConverterFactory(GsonConverterFactory.create(gson)).build().create(ApiService.class);
    ApiService apiServiceUser = new Retrofit.Builder().baseUrl("http://192.168.1.6:8080/covid/").addConverterFactory(GsonConverterFactory.create(gson)).build().create(ApiService.class);

    // GET thong tin covid
    @GET("countries")
    Call<List<ModelClass>> getcountrydata();
    @GET("all")
    Call<ModelClass> apiThegioi();
    @GET("vietnam")
    Call<ModelClass> apiVietNam(@Query("yesterday") String yesterday_key, @Query("strict") String strict_key);
    //ApiUser
    @POST("users/")
    Call<User> AddUser(@Body User user);
    @GET("users/{id}")
    Call<User> showUser(@Path("id") int id_key);
    @GET("users/getidfromphone/{phonenumber}")
    Call<Check> getID(@Path("phonenumber") int phonenumber_key);
    @GET("users/checkphone")
    Call<Check> chekphone(@Query("phone") int phone_key);
    @PUT("users/{id}")
    Call<User> putUser(@Path("id")int Id_Key, @Body User user);
    //health_DCLS
    @POST("health_dcls/")
    Call<healthDCLS> posthealthdcls(@Body healthDCLS healthDCLS);
    @POST("health_daily/")
    Call<Daily> postdaily(@Body Daily daily);
    @GET("health_daily/getbyuserid/{userid}")
    Call<List<Daily>> getdaily(@Path("userid") int userid_key);
    //travel

    @GET("travel_histories/show")
    Call<List<Travel>> gettravelall();
    @GET("travel_histories/getbyuserid/{id}")
    Call<List<Travel>> gettravel(@Path("id") int id_key);
    @POST("travel_histories/")
    Call<Travel> postTravel(@Body Travel travel);
    //show map
    @GET("quarantinearea/show")
    Call<List<Quarantine>> getQuarantine();
    @GET("treatmentarea/show")
    Call<List<Treatment>> getTreatment();
    //pcr
    @GET("pcrs/getbyuserid/{id}")
    Call<List<PCR>> getPcr(@Path("id") int id);
}
