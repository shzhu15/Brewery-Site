package com.tripco.t09.misc;


import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class TestGreatCircleDistance {

  private static final Logger log = LoggerFactory.getLogger(TestGreatCircleDistance.class);
  private final float milesTokm = 1.60934F;
  private final float radiuskm = 6378.137F;
  private final float radiusMiles = radiuskm / milesTokm;
  private final int version = 1;
  private Map<String, Object> csu;
  private Map<String, Object> cu;
  private Map<String, Object> bejing;
  private Map<String, Object> southPole;
  private Map<String, Object> northPole;

  private static Long getDistance(Map origin, Map destination, float earthRadius) {
    try {
      return GreatCircleDistance.getDistance(origin, destination, earthRadius);
    } catch (Exception e) {
      log.info("GreatCircleDistance could not convert arguments to coordinates.");
      return 0L;
    }
  }

  @Before
  public void createLocationsForTestCases() {
    csu = createLocationMap("40.576179", "-105.080773",
        "Oval, Colorado State University, Fort Collins, Colorado, USA");
    cu = createLocationMap("40.007581", "-105.2746964",
        "University of Colorado, Boulder, Colorado, USA");
    bejing = createLocationMap("39.9385466", "116.1172774", "Bejing, China");
    northPole = createLocationMap("90", "0", "North Pole");
    southPole = createLocationMap("-90", "0", "South Pole");
  }

  private Map<String, Object> createLocationMap(String latitude, String longitude, String name) {
    Map<String, Object> location = new HashMap<>();
    location.put("latitude", latitude);
    location.put("longitude", longitude);
    location.put("name", name);
    return location;
  }
  @Test
  public void doubleTest(){
    Long expected = 0L;
    Long actual = -1L;
    try {
      actual = GreatCircleDistance.getDistance(csu, csu, 234.123);
    } catch (Exception e){
      log.info("GreatCircleDistance double test fail");
    }
    assertEquals("Same place but with double radius",expected,actual);
  }
  @Test
  public void testSameLocations() {
    Long expect = 0L;
    Long actual = getDistance(csu, csu, radiusMiles);
    assertEquals("origin and destination are the same", expect, actual);
  }

  @Test
  public void testCSUtoCU() {
    Long expect = 41L; //miles, actual is 40.6393493249
    Long actual = getDistance(csu, cu, radiusMiles);
    assertEquals("this distance from CSU to CU is approx. 40 miles", expect, actual);
  }

  @Test
  public void testCSUtoBejing() {
    Long expect = 6307L; //miles, actual is 6307.09995004176
    Long actual = getDistance(csu, bejing, radiusMiles);
    assertEquals("this distance from CSU to BEJING is approx. 6307", expect, actual);
  }

  @Test
  public void testmilimeters() {
    Long expect = 20015086193L;
    Long actual = getDistance(northPole, southPole, 6371000000F);
    assertEquals("The distance from the North Pole to the South Pole in mm:", expect, actual);
  }
}
