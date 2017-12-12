package com.example.ioana.myapplication.db;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.RoomDatabase;

import com.example.ioana.myapplication.model.Reservation;


/**
 * Created by Ioana on 12/11/2017.
 */

@Database(entities = {Reservation.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase{
    public abstract ReservationDao getReservationDao();
}

/*
     Class annotated with @Database:
        -abstract, extends RoomDatabase.
        -contain 1 abstract method: 0 args & ret a class annotated with @Dao.
*/