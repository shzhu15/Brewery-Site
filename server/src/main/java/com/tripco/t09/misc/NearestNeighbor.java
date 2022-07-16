package com.tripco.t09.misc;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class NearestNeighbor {

  private final static long radius = 3958L; //radius doesn't matter

  public static List<Map<String, Object>> optimize(List<Map<String, Object>> places){
    return optimize(places, new DistanceMemo());
  }
  public static List<Map<String, Object>> optimize(List<Map<String, Object>> places, DistanceMemo distanceMemo) {
    if (places.size() == 0 || places.size() == 1) {
      return places; //edge case handled immediatly
    }

    //long[][]distances = calculateDistanceTable(places);
    distanceMemo.initialize(places);

    long currentShortest = Long.MAX_VALUE;
    List<Map<String, Object>> result = new ArrayList<>();
    for (int i = 0; i < places.size(); i++) {
      List<Map<String, Object>> current = orderedNNA(places, i,distanceMemo);
      long distance = findDistanceofPath(current);
      if (distance < currentShortest) {
        result = current;
        currentShortest = distance;
      }
    }
    return result;
  }

  private static List<Map<String, Object>> orderedNNA(List<Map<String, Object>> places, int start, DistanceMemo distanceMemo) {
    //calls NNAlgorithm and returns an ordered list with proper starting point

    int[] visitOrder = NNAlgorithm(places, start,distanceMemo);
    ArrayList<Map<String, Object>> result = new ArrayList<Map<String, Object>>(places.size());
    for (Map<String, Object> place : places) {
      result.add(place);
    }

    //shift over to the start
    int posOrig = visitOrder[0]-1;
    for (int i = 0; i < places.size(); i++) {
      result.set((visitOrder[i] - posOrig - 1 + places.size()) % places.size(), places.get(i));
    }

    return result;
  }

  public static long findDistanceofPath(List<Map<String, Object>> orderedPlaces) {
    long result = 0;
    for (int i = 0; i < (orderedPlaces.size() - 1); i++) {
      try {
        result += GreatCircleDistance
            .getDistance(orderedPlaces.get(i), orderedPlaces.get(i + 1), radius);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    try {
      result += GreatCircleDistance
          .getDistance(orderedPlaces.get(orderedPlaces.size() - 1), orderedPlaces.get(0), radius);
    } catch (Exception e) {
      System.out.println("problem with last loop");
    }
    return result;
  }

  private static int[] NNAlgorithm(List<Map<String, Object>> places, int start, DistanceMemo distanceMemo)
      throws IllegalArgumentException {
    int[] visited = new int[places
        .size()]; //0 is unvisited, else it contains what time it is visited at
    int time = 1;
    int current = start;
    visited[start] = time;
    time++;
    int numberToVisit=places.size()-1;


    while (numberToVisit>0) {
      //find current's nearest unvisited neighbor
      long shortestDistance = Long.MAX_VALUE;
      int closestNeighbor = -1;

      for (int i = 0; i < visited.length; i++) {
        int neighborColor = visited[i];
        if (neighborColor == 0) { //iterates through all unvisited places
          long distance = 0;
          try {
            distance = distanceMemo.getDistance(current,i);
          } catch (Exception e) {
            e.printStackTrace();
          }
          if (shortestDistance > distance) { //we found the shortest neighbor we've looked at so far
            shortestDistance = distance;
            closestNeighbor = i;
          }
        }
      }
      if (closestNeighbor==-1){
        System.out.println("number to visit "+numberToVisit);
      }
      //setting the next current
      current = closestNeighbor;
      visited[current] = time;
      numberToVisit--;
      time++;

    }

    //postprocessing
    return visited;
  }

  private static long[][] calculateDistanceTable(List<Map<String, Object>> places){
    long[][] distances = new long[places.size()][places.size()];
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
    return distances;
  }
}
