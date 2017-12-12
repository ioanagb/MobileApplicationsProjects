package com.example.ioana.myapplication.activities;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;

import com.example.ioana.myapplication.R;
import com.example.ioana.myapplication.db.DatabaseProvider;
import com.example.ioana.myapplication.db.ReservationDao;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;

import com.example.ioana.myapplication.model.Reservation;

import java.util.ArrayList;
import java.util.List;

public class DetailedViewActivity extends AppCompatActivity  {

    ReservationDao reservationDao;
    private Long copyId;
    private EditText titleET;
    private EditText authorET;
    private PieChart pieChart;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detailed_view);
        initEditTexts();

        Intent intent = getIntent();

        Reservation reservation = (Reservation) intent.getSerializableExtra("reservation"); //retrieve sextended data from the intent
        doEditTextSetText(reservation);
        //titleET.setOnClickListener(this);
        reservationDao = DatabaseProvider.getInstance(getApplicationContext()).getReservationDao();

        //pieChart = (PieChart)findViewById(R.id.details_chart);
        setPieChart();
    }

    private Reservation makeReservationFromCurrentState(){
        return new Reservation()
                .withCopyId(copyId)
                .withTitle(titleET.getText().toString())
                .withAuthor(authorET.getText().toString());
    }

    public void updateReservation(View view) {
        reservationDao.update(makeReservationFromCurrentState());
        finish();
    }

    public void deleteReservation(View view) {
        reservationDao.delete(makeReservationFromCurrentState());
        finish();
    }

    private void initEditTexts() {
        pieChart = (PieChart) findViewById(R.id.details_chart);
        titleET = (EditText) findViewById(R.id.titleEditText);
        authorET = (EditText) findViewById(R.id.authorEditText);
    }

    private void doEditTextSetText(Reservation reservation) {
        copyId = reservation.getCopyId();
        titleET.setText(reservation.getTitle());
        authorET.setText(reservation.getAuthor());
    }

    private void setPieChart() {
        List<PieEntry> entries = new ArrayList<>(2);
        entries.add(new PieEntry((float) getNrOfAllReservations(),"Number of all reservations"));
        entries.add(new PieEntry((float) getNrOfAllReservationsWithThisAuthor(),"Number of reservations with this author"));
        PieDataSet pieDataSet = new PieDataSet(entries, "Reservations");

        List<Integer> colors = new ArrayList<>();
        colors.add(Color.GREEN);
        colors.add(Color.RED);
        pieDataSet.setColors(colors);

        PieData pieData = new PieData(pieDataSet);
        pieChart.setData(pieData);
    }
    private int getNrOfAllReservations(){
        return reservationDao.findAll().size();
    }

    private int getNrOfAllReservationsWithThisAuthor(){
        int nr=0;
        List<Reservation> reservations = reservationDao.findAll();
        for(Reservation reservation:reservations){
            if(reservation.getAuthor().equals(authorET.getText().toString()))
                nr++;
        }
        return nr;
    }
}
