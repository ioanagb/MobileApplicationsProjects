package com.example.ioana.myapplication.activities;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.example.ioana.myapplication.R;
import com.example.ioana.myapplication.db.AppDatabase;
import com.example.ioana.myapplication.db.ReservationDao;
import com.example.ioana.myapplication.db.DatabaseProvider;
import com.example.ioana.myapplication.model.Reservation;
import java.util.List;

public class ListReservationsActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {
    List<Reservation> reservations;
    ReservationDao reservationDao;
    ReservationAdapter reservationAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_reservations);
        ListView myList = (ListView) findViewById(R.id.listView);

        AppDatabase db = DatabaseProvider.getInstance(getApplicationContext());
        reservationDao = db.getReservationDao();
        reservations = reservationDao.findAll();

        reservationAdapter = new ReservationAdapter(this,reservations);
        myList.setAdapter(reservationAdapter);
        myList.setOnItemClickListener(this);
    }

    @Override
    protected void onResume(){ //when an activity restarts, this method is executed first
        super.onResume();
        reservations.clear();
        reservations.addAll(reservationDao.findAll());
        reservationAdapter.notifyDataSetChanged();
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Intent intent = new Intent(this,DetailedViewActivity.class);
        Reservation clickedReservation = reservations.get(position);
        intent.putExtra("reservation", clickedReservation);
        startActivity(intent);
    }

    private class ReservationAdapter extends ArrayAdapter<Reservation> { //ArrayAdapter provides views for an AdapterView; returns a view for wach object in the collection
        private final List<Reservation> values;
        private final Context context;

        ReservationAdapter(Context context,List<Reservation> values) {
            super(context, -1, values);
            this.values = values;
            this.context = context;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent){
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE); //instantiates a layout XML file into its view
            View rowView = inflater.inflate(R.layout.row_layout,parent,false);
            TextView reservationTitle = rowView.findViewById(R.id.reservation_title);
            TextView reservationAuthor = rowView.findViewById(R.id.reservation_author);

            reservationTitle.setText(values.get(position).getTitle());
            reservationAuthor.setText(values.get(position).getAuthor());

            return rowView;
            //is called when a new row is added, when then list is notified changed
        }
    }
}

//Adapter = bridge between an AdapterView and data for that view