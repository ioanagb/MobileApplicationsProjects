package com.example.ioana.myapplication.db;

import android.arch.persistence.room.Room;
import android.content.Context;

/**
 * Created by Ioana on 12/11/2017.
 */

public class DatabaseProvider {
    private static AppDatabase appDatabase = null;

    public static AppDatabase getInstance(Context context){
        if(appDatabase == null){
            appDatabase = Room.databaseBuilder(context, AppDatabase.class, "androidDB")
                    .allowMainThreadQueries()
                    .build();
        }
        return appDatabase;
    }
}
