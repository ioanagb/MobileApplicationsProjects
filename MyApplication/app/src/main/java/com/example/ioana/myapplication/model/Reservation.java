package com.example.ioana.myapplication.model;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;


/**
 * Created by Ioana on 11/13/2017.
 */

@Entity
public class Reservation implements Serializable{

    @PrimaryKey(autoGenerate = true)
    private Long copyId;
    private String title;
    private String author;
    //private String estimatedArrivalTime;


    public Reservation(){}
    public Reservation withCopyId(Long copyId){
        this.copyId = copyId;
        return this;
    }
    public Reservation withTitle(String title){
        this.title = title;
        return this;
    }

    public Reservation withAuthor(String author){
        this.author = author;
        return this;
    }

    /*public Reservation withEstimatedArrivalTime(String time){
        this.estimatedArrivalTime = time;
        return this;
    }*/

    public Long getCopyId(){return copyId;}
    public String getTitle() {return title;}
    public String getAuthor() {return  author;}
    //public String getEstimatedArrivalTime() {return estimatedArrivalTime;}
    //public void setEstimatedArrivalTime(String estimatedArrivalTime) {this.estimatedArrivalTime = estimatedArrivalTime;}
    public void setCopyId(Long copyId) {this.copyId = copyId;}
    public void setTitle(String title) {this.title = title;}
    public void setAuthor(String author) {this.author = author;}
    @Override
    public String toString() {
        return "Reservation{" +
                "copyId='" + copyId + '\'' +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                //", estimatedArrivalTime='" + estimatedArrivalTime + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Reservation other = (Reservation) o;

        return new EqualsBuilder()
                .append(copyId, other.getCopyId())
                .append(title,other.getTitle())
                .append(author,other.getAuthor())
                //.append(estimatedArrivalTime,other.getEstimatedArrivalTime())
                .build();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(copyId)
                .append(title)
                .append(author)
                //.append(estimatedArrivalTime)
                .build();
    }
}
