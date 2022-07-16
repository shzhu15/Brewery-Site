package com.tripco.t09.misc;

import com.tripco.t09.misc.GreatCircleDistance;
import java.util.List;
import java.util.Map;

public class DistanceMemo{

    Long[][] distances;
    static Long radius = 3958L;
    boolean initialized;
    public DistanceMemo() {
        initialized = false;
    }
    public void initialize(List<Map<String, Object>> places){
        if (!initialized) {
            distances = new Long[places.size()][places.size()];
            for (int i = 0; i < places.size(); i++) {
                for (int j = i; j < places.size(); j++) {
                    long dist = 0;
                    try {

                        dist = GreatCircleDistance.getDistance(places.get(i), places.get(j), radius);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    distances[i][j] = dist;
                    distances[j][i] = dist;
                }
            }
            initialized=true;
        }

    }
    public Long getDistance(int i, int j){
        return distances[i][j];
    }
    public String toString(){
        String ret="";
        for (int i=0; i<distances.length; i++){
            for (int j=0; j<distances[i].length; j++){
                ret+=distances[i][j]+", ";
            }
            ret+="\n";
        }
        return ret;
    }
}