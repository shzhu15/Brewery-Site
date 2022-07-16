package com.tripco.t09.misc;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

public class TwoOpt {

  private final static long radius = 3958L;

  //Takes an array of Map<String, Object> and returns a list of Map<String, Object>
  //NOT CURRENTLY USED
  public static List<Map<String, Object>> toList(Map<String, Object>[] arr) {

    return null;
  }

  //Takes a list of maps and turns it into a string []
  //NOT CURRENTLY USED
  public static String[] listToArray(List<Map<String, Object>> list) {

    return null;
  }

  //Reverses two entries in the array at index i and k
  public static int[] TwoOptReverse(int[] pos, int i, int k) {
    int temp;
    while (i < k) {
      temp = pos[i];
      pos[i] = pos[k];
      pos[k] = temp;
      //places.set(i, places.get(k));
      //places.set(k, temp);
      i++;
      k--;
    }
    return null;
  }

  //Takes a list of Map<String, Object>, runs it through nearest neighbor algorithm then optimizes the result
  //Returns a List of Map<String, Objects>
  public static List<Map<String, Object>> optimize(List<Map<String, Object>> places){
    return optimize(places, new DistanceMemo());
  }

  public static List<Map<String, Object>> optimize(List<Map<String, Object>> places, DistanceMemo distanceMemo ) {
    places = NearestNeighbor.optimize(places,distanceMemo);
    distanceMemo = new DistanceMemo();
    distanceMemo.initialize(places);

    int[] pos = new int[places.size()];
    for (int i=0; i<places.size(); i++){
      pos[i]=i;
    }
    int n = places.size();
    long delta = 0;
    boolean improvement = true;
    while (improvement) {
      improvement = false;
      for (int i = 0; i < n - 3; i++) {
        for (int k = i + 2; k < n - 1; k++) {
          try {
            delta = -distanceMemo.getDistance(pos[i],pos[i+1]) - distanceMemo.getDistance(pos[k],pos[k+1]) + distanceMemo.getDistance(pos[i],pos[k]) + distanceMemo.getDistance(pos[i+1],pos[k+1]);

          } catch (Exception e) {
            e.printStackTrace();
          }
          if (delta < 0) {
            TwoOptReverse(pos, i + 1, k);
            improvement = true;
          }
        }
      }
    }
    places = correctPlaces(places, pos);
    return places;
  }
  private static List<Map<String, Object>> correctPlaces(List<Map<String, Object>> places, int[] pos){
    List<Map<String, Object>> ret = new ArrayList<Map<String, Object>>();
    for (int i=0; i<pos.length; i++){
      ret.add(places.get(pos[i]));
    }
    if (ret.size()!=places.size()){
      System.out.println("somewhere a place was not found.");
    }
    return ret;
  }
}
