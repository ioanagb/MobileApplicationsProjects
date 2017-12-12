package com.example.ioana.myapplication.activities;

import android.app.TimePickerDialog;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.Toast;

import com.example.ioana.myapplication.R;
import com.example.ioana.myapplication.db.AppDatabase;
import com.example.ioana.myapplication.db.DatabaseProvider;
import com.example.ioana.myapplication.db.ReservationDao;
import com.example.ioana.myapplication.model.Reservation;

import java.util.Calendar;

public class MakeReservationActivity extends AppCompatActivity implements TimePickerDialog.OnTimeSetListener, View.OnClickListener {
    private static final String[] TO = {"ioana_gb@yahoo.com"};
    private static final String SUBJECT = "New Reservation";

    private ReservationDao reservationDao;
    private Calendar calendar;
    private EditText authorET;
    private EditText titleET;
    private EditText estimatedArrivalTimeET;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_make_reservation);

        titleET = (EditText) findViewById(R.id.titleEditText);
        authorET = (EditText) findViewById(R.id.authorEditText);
        estimatedArrivalTimeET = (EditText) findViewById(R.id.estimatedArrivalTimeEditText);
        calendar=Calendar.getInstance();
        estimatedArrivalTimeET.setOnClickListener(this);

        AppDatabase appDatabase = DatabaseProvider.getInstance(getApplicationContext());
        reservationDao = appDatabase.getReservationDao();
        Log.i("create make res","aa");
    }

    public void makeReservation(View view){
        reservationDao.save(new Reservation()
                .withTitle(titleET.getText().toString())
                .withAuthor(authorET.getText().toString())
                //.withEstimatedArrivalTime(estimatedArrivalTimeET.getText().toString())
                );
        finish();
    }

    /*public void makeReservation(View view) {
        Log.i("entered make","");
        String preparedEmailBody;
        preparedEmailBody = prepareEmailBody();
        Intent email = new Intent(Intent.ACTION_SEND);
        email.setData(Uri.parse("mailto:"));
        email.setType("text/plain");
        email.putExtra(Intent.EXTRA_EMAIL, TO);
        email.putExtra(Intent.EXTRA_SUBJECT, SUBJECT);
        email.putExtra(Intent.EXTRA_TEXT, preparedEmailBody);
        try {
            startActivity(Intent.createChooser(email, "Send email."));
            finish();
            Log.i("finished","ll");
        }
        catch (android.content.ActivityNotFoundException ex){
            Toast.makeText(MakeReservationActivity.this,"no email",Toast.LENGTH_SHORT).show();
        }
    }*/

    public String prepareEmailBody() {
        EditText tE= (EditText) findViewById(R.id.titleEditText);
        EditText aE= (EditText) findViewById(R.id.authorEditText);
        String title = String.valueOf(tE.getText());
        String author = String.valueOf(aE.getText());
        return new StringBuilder()
                .append("Title: ").append(title).append("\n")
                .append("Author: ").append(author).append("\n")
                .toString();
    }

    @Override
    public void onTimeSet(TimePicker timePicker, int i, int i1) {
        this.estimatedArrivalTimeET.setText(new StringBuilder()
                .append(i)
                .append(":")
                .append(i1)
        );
        Log.i("time in onTimeSet",this.estimatedArrivalTimeET.getText().toString());
    }

    @Override
    public void onClick(View view) {
        calendar = Calendar.getInstance();
        TimePickerDialog timePickerDialog = new TimePickerDialog(MakeReservationActivity.this, this,
                calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE), true);
        timePickerDialog.show();
    }
}
