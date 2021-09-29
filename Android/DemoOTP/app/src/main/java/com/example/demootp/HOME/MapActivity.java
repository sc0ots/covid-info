package com.example.demootp.HOME;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.DatePicker;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.example.demootp.API.ApiService;
import com.example.demootp.R;
import com.example.demootp.SessionApp.SesionManagement;
import com.example.demootp.model.Check;
import com.example.demootp.model.Quarantine;
import com.example.demootp.model.Travel;
import com.example.demootp.model.Treatment;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.libraries.places.api.Places;
import com.google.android.libraries.places.api.model.AutocompletePrediction;
import com.google.android.libraries.places.api.model.AutocompleteSessionToken;
import com.google.android.libraries.places.api.net.PlacesClient;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
public class MapActivity extends AppCompatActivity implements OnMapReadyCallback {
    private GoogleMap mMap;
    private FusedLocationProviderClient mFused;
    private PlacesClient placesClient;
    private List<AutocompletePrediction> autocompletePredictionList;
    private List<Quarantine> quarantineList;
    private List<Treatment> treatmentList;
    private List<Travel> travelList;
    private Location mLastKnownLocation;
    private LocationCallback locationCallback;
    private View mapview;
    private Geocoder geocoder;
    private final float DEFAULT_ZOOM = 16;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        mapview = mapFragment.getView();
        mFused = LocationServices.getFusedLocationProviderClient(MapActivity.this);
        Places.initialize(MapActivity.this, "AIzaSyCuBiBEgfNE6NOB5JF65cj5_Ty44AIDmQQ");
        placesClient = Places.createClient(this);
        AutocompleteSessionToken token = AutocompleteSessionToken.newInstance();
    }
    @SuppressLint("MissingPermission")
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        mMap.setMyLocationEnabled(true);
        mMap.getUiSettings().setMyLocationButtonEnabled(true);
        geocoder = new Geocoder(this);
        ApiService.apiServiceUser.getQuarantine().enqueue(new Callback<List<Quarantine>>() {
            @Override
            public void onResponse(Call<List<Quarantine>> call, Response<List<Quarantine>> response) {
                quarantineList = new ArrayList<>();
                quarantineList.addAll(response.body());
                for (int i = 0; i < quarantineList.size(); i++) {
                    String a = quarantineList.get(i).getAddress();
                    try {
                        List<Address> addresses = geocoder.getFromLocationName(a + "", 1);
                        if (addresses.size() > 0) {
                            Address address = addresses.get(0);
                            LatLng latLn = new LatLng(address.getLatitude(), address.getLongitude());
                            MarkerOptions markerOptions7 = new MarkerOptions().position(latLn).title(quarantineList.get(i).getName() + " " + quarantineList.get(i).getAddress()).icon(BitmapFromVector(getApplication(), R.drawable.ic_locationwarning));
                            mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLn, 15));
                            mMap.addMarker(markerOptions7).showInfoWindow();
                        }

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Quarantine>> call, Throwable t) {

            }
        });
        ApiService.apiServiceUser.getTreatment().enqueue(new Callback<List<Treatment>>() {
            @Override
            public void onResponse(Call<List<Treatment>> call, Response<List<Treatment>> response) {
                treatmentList = new ArrayList<>();
                treatmentList.addAll(response.body());
                for (int i = 0; i < treatmentList.size(); i++) {
                    String a = treatmentList.get(i).getAddress();
                    try {
                        List<Address> addresses = geocoder.getFromLocationName(a + "", 1);
                        if (addresses.size() > 0) {
                            Address address = addresses.get(0);
                            LatLng latLn1 = new LatLng(address.getLatitude(), address.getLongitude());
                            MarkerOptions markerOptions6 = new MarkerOptions().position(latLn1).title(treatmentList.get(i).getName() + " " + treatmentList.get(i).getAddress()).icon(BitmapFromVector(getApplication(), R.drawable.ic_hospital));
                            mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLn1, 15));
                            mMap.addMarker(markerOptions6).showInfoWindow();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                }
            }

            @Override
            public void onFailure(Call<List<Treatment>> call, Throwable t) {

            }
        });
        ApiService.apiServiceUser.gettravelall().enqueue(new Callback<List<Travel>>() {
            @Override
            public void onResponse(Call<List<Travel>> call, Response<List<Travel>> response) {
                travelList = new ArrayList<>();
                travelList.addAll(response.body());
                for (int i = 0; i < travelList.size(); i++) {
                    String a = travelList.get(i).getAddress();
                    try {
                        List<Address> addresses = geocoder.getFromLocationName(a + "", 1);
                        if (addresses.size() > 0) {
                            Address address = addresses.get(0);
                            LatLng latLn8 = new LatLng(address.getLatitude(), address.getLongitude());
                            MarkerOptions markerOptions8 = new MarkerOptions().position(latLn8).title(travelList.get(i).getAddress()).icon(BitmapFromVector(getApplication(), R.drawable.ic_travellocation));
                            mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLn8, 15));
                            mMap.addMarker(markerOptions8).showInfoWindow();
                        }

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Travel>> call, Throwable t) {
                Toast.makeText(getApplication(), "fails", Toast.LENGTH_SHORT).show();
            }
        });
        if (mapview != null && mapview.findViewById(Integer.parseInt("1")) != null) {
            View locationButton = ((View) mapview.findViewById(Integer.parseInt("1")).getParent()).findViewById(Integer.parseInt("2"));
            RelativeLayout.LayoutParams layoutParams = (RelativeLayout.LayoutParams) locationButton.getLayoutParams();
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_LEFT, 0);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM, RelativeLayout.TRUE);
            layoutParams.setMargins(0, 0, 40, 180);
        }
        //check if gps os enabled or not add then request user to enable is
        com.google.android.gms.location.LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(5000);
        locationRequest.setFastestInterval(2500);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder().addLocationRequest(locationRequest);
        SettingsClient settingsClient = LocationServices.getSettingsClient(MapActivity.this);
        Task<LocationSettingsResponse> task = settingsClient.checkLocationSettings(builder.build());
        task.addOnSuccessListener(MapActivity.this, new OnSuccessListener<LocationSettingsResponse>() {
            @Override
            public void onSuccess(LocationSettingsResponse locationSettingsResponse) {
                getDeviceLocation();
            }
        });
        task.addOnFailureListener(MapActivity.this, new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                if (e instanceof ResolvableApiException) {
                    ResolvableApiException resolvable = (ResolvableApiException) e;
                    try {
                        resolvable.startResolutionForResult(MapActivity.this, 51);
                    } catch (IntentSender.SendIntentException sendIntentException) {
                        sendIntentException.printStackTrace();
                    }
                }
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 51) {
            if (resultCode == RESULT_OK) {
                getDeviceLocation();
            }
        }
    }

    @SuppressLint("MissingPermission")
    private void getDeviceLocation() {
        mFused.getLastLocation().addOnCompleteListener(new OnCompleteListener<Location>() {
            @Override
            public void onComplete(@NonNull Task<Location> task) {
                if (task.isSuccessful()) {
                    mLastKnownLocation = task.getResult();
                    if (mLastKnownLocation != null) {

                    } else {
                        LocationRequest locationRequest = LocationRequest.create();
                        locationRequest.setInterval(5000);
                        locationRequest.setFastestInterval(2500);
                        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
                        locationCallback = new LocationCallback() {
                            @Override
                            public void onLocationResult(LocationResult locationResult) {
                                super.onLocationResult(locationResult);
                                if (locationResult == null) {
                                    return;
                                }
                                mLastKnownLocation = locationResult.getLastLocation();
                                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(mLastKnownLocation.getLatitude(), mLastKnownLocation.getLongitude()), DEFAULT_ZOOM));
                                mFused.removeLocationUpdates(locationCallback);

                            }
                        };
                        mFused.requestLocationUpdates(locationRequest, locationCallback, null);
                    }
                } else {
                    Toast.makeText(getApplication(), "unable to get last Location", Toast.LENGTH_SHORT).show();
                }
            }
        });

    }

    private BitmapDescriptor BitmapFromVector(Context context, int vectorResId) {
        // below line is use to generate a drawable.
        Drawable vectorDrawable = ContextCompat.getDrawable(context, vectorResId);

        // below line is use to set bounds to our vector drawable.
        vectorDrawable.setBounds(0, 0, vectorDrawable.getIntrinsicWidth(), vectorDrawable.getIntrinsicHeight());

        // below line is use to create a bitmap for our
        // drawable which we have added.
        Bitmap bitmap = Bitmap.createBitmap(vectorDrawable.getIntrinsicWidth(), vectorDrawable.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);

        // below line is use to add bitmap in our canvas.
        Canvas canvas = new Canvas(bitmap);

        // below line is use to draw our
        // vector drawable in canvas.
        vectorDrawable.draw(canvas);

        // after generating our bitmap we are returning our bitmap.
        return BitmapDescriptorFactory.fromBitmap(bitmap);
    }
}