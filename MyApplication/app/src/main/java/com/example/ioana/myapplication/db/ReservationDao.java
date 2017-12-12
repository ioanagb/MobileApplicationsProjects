package com.example.ioana.myapplication.db;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import com.example.ioana.myapplication.model.Reservation;

import java.util.List;


/**
 * Created by Ioana on 12/11/2017.
 */

@Dao //mark the class as a data access object
public interface ReservationDao {
    @Query("select * from Reservation")
    List<Reservation> findAll();

    @Insert
    void save(Reservation... reservations);

    @Update
    void update(Reservation... reservations);

    @Delete
    void delete(Reservation... reservations);
}
