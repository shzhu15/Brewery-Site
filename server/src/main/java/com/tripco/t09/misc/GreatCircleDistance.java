package com.tripco.t09.misc;

import java.util.Map;

/**
 * Determines the distance between geographic coordinates.
 */
public class GreatCircleDistance {

  public static long getDistance(Map origin, Map destination, Number earthRadius) throws Exception {
    Coordinate orig = new Coordinate(origin);
    Coordinate dest = new Coordinate(destination);

    double changeDeg = Math.acos(
        Math.sin(orig.garlat()) * Math.sin(dest.garlat()) + Math.cos(orig.garlat()) * Math
            .cos(dest.garlat()) * Math.cos(dest.garlon() - orig.garlon()));
    //haversine formula

    double distance = multiply(changeDeg, earthRadius);
    return round(distance);
  }

  private static Long round(double distance) {
    Long ld = (long) (distance);
    if (distance - ld > 0.5) {
      return ld + 1L;
    }
    return ld;
  }

  private static double multiply(double changeDeg, Number er) throws Exception {
    if (er instanceof Double) {
      return changeDeg * er.doubleValue();
    }
    if (er instanceof Long) {
      return changeDeg * er.longValue();
    }
    if (er instanceof Float) {
      return changeDeg * er.floatValue();
    }
    throw new IllegalArgumentException("earthRadius Number type not supported." + er.getClass());
    //Maybe add support for BigDouble and BigInteger
  }

  static class Coordinate {

    Double latitude;
    Double longitude;


    public Coordinate(Map map) throws Exception {
      latitude = getDoubleFromObject(map.get("latitude"));
      longitude = getDoubleFromObject(map.get("longitude"));
      if ((latitude == null) || (longitude == null)) {
        throw new IllegalArgumentException(
            "Distance cannot be calculated with given inputs. Please enter numeric values.");
      }
    }

    private Double getDoubleFromObject(Object o) {
      if (o instanceof String) {
        return Double.valueOf((String) (o));
      }
      if (o instanceof Double) {
        return (Double) (o);
      }
      return null;
    }

    //converts degrees to radian
    private double dtr(double degrees) {
      return degrees / 360 * 2 * Math.PI;
    }

    //Get As Radian
    public double garlat() {
      return dtr(latitude);
    }

    public double garlon() {
      return dtr(longitude);
    }
  }
}
