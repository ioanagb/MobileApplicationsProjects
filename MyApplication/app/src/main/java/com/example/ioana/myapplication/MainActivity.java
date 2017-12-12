package com.example.ioana.myapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.example.ioana.myapplication.activities.ListReservationsActivity;
import com.example.ioana.myapplication.activities.MakeReservationActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void makeReservationAction(View view){
        Intent intent = new Intent(this,MakeReservationActivity.class);
        startActivity(intent);
    }
    public void listReservationsAction(View view) {
        Intent intent = new Intent(this,ListReservationsActivity.class);
        startActivity(intent);
    }
}
