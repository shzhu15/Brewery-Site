package com.tripco.t09.misc;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;

public class TestTwoOpt {

  //Five random points in Colorado that make a Pentagon
  private Map<String, Object> One;
  private Map<String, Object> Two;
  private Map<String, Object> Three;
  private Map<String, Object> Four;
  private Map<String, Object> Five;

  //Four corners of Colorado
  private Map<String, Object> CO1;
  private Map<String, Object> CO2;
  private Map<String, Object> CO3;
  private Map<String, Object> CO4;

  //18 Random points in Kansas
  private Map<String, Object> KS1;
  private Map<String, Object> KS2;
  private Map<String, Object> KS3;
  private Map<String, Object> KS4;
  private Map<String, Object> KS5;
  private Map<String, Object> KS6;
  private Map<String, Object> KS7;
  private Map<String, Object> KS8;
  private Map<String, Object> KS9;
  private Map<String, Object> KS10;
  private Map<String, Object> KS11;
  private Map<String, Object> KS12;
  private Map<String, Object> KS13;
  private Map<String, Object> KS14;
  private Map<String, Object> KS15;
  private Map<String, Object> KS16;
  private Map<String, Object> KS17;
  private Map<String, Object> KS18;


  @Before
  public void createLocationsForTestCases() {
    One = createLocationMap("40.38", "-105.50", "One");
    Two = createLocationMap("39.82", "-107.43", "Two");
    Three = createLocationMap("38.95", "-106.44", "Three");
    Four = createLocationMap("39.03", "-104.41", "Four");
    Five = createLocationMap("39.91", "-104.26", "Five");

    CO1 = createLocationMap("40.99", "-109.05", "NW");
    CO2 = createLocationMap("37", "-109.04", "SW");
    CO3 = createLocationMap("37", "-102.04", "SE");
    CO4 = createLocationMap("41", "-102.05", "NE");

    KS1 = createLocationMap("39.41", "-101.38", "One");
    KS2 = createLocationMap("38.56", "-101.49", "Two");
    KS3 = createLocationMap("39.03", "-100.30", "Three");
    KS4 = createLocationMap("39.67", "-100.54", "Four");
    KS5 = createLocationMap("39.62", "-98.89", "Five");
    KS6 = createLocationMap("38.22", "-100.15", "Six");
    KS7 = createLocationMap("37.95", "-101.62", "Seven");
    KS8 = createLocationMap("37.49", "-100.75", "Eight");
    KS9 = createLocationMap("37.67", "-99.63", "Nine");
    KS10 = createLocationMap("38.30", "-99.29", "Ten");
    KS11 = createLocationMap("39.10", "-99.05", "Eleven");
    KS12 = createLocationMap("39.31", "-98.48", "Twelve");
    KS13 = createLocationMap("39.78", "-97.70", "Thirteen");
    KS14 = createLocationMap("38.47", "-97.81", "Fourteen");
    KS15 = createLocationMap("37.62", "-98.90", "Fifteen");
    KS16 = createLocationMap("37.67", "-97.16", "Sixteen");
    KS17 = createLocationMap("39.28", "-96.30", "Seventeen");
    KS18 = createLocationMap("39.77", "-96.68", "Eighteen");


  }

  private Map<String, Object> createLocationMap(String latitude, String longitude, String name) {
    Map<String, Object> location = new HashMap<>();
    location.put("latitude", latitude);
    location.put("longitude", longitude);
    location.put("name", name);
    return location;
  }


  //Tests a route with only two points (shouldn't change)
  @Test
  public void testTwoPoints() {
    ArrayList<Map<String, Object>> input = new ArrayList<>();
    input.add(One);
    input.add(Two);

    List<Map<String, Object>> expected = new ArrayList<>();
    expected.add(One);
    expected.add(Two);

    List<Map<String, Object>> actual = TwoOpt.optimize(input);
    assertEquals(expected, actual);
  }

  //Tests the corners of Colorado out of order.
  //Nearest Neighbor covers this case. NO change is required from 2-opt
  @Test
  public void testSquare() {
    ArrayList<Map<String, Object>> input = new ArrayList<>();
    input.add(CO1);
    input.add(CO3);
    input.add(CO2);
    input.add(CO4);

    List<Map<String, Object>> expected = new ArrayList<>();
    expected.add(CO1);
    expected.add(CO2);
    expected.add(CO3);
    expected.add(CO4);

    List<Map<String, Object>> actual = TwoOpt.optimize(input);
    assertEquals("Square test: ",expected, actual);
  }


  //Tests a Pentagon with the points out of order.
  //NNA handles this too 2-opt shouldn't make any changes
  //@Test
  public void testPentagon() {
    ArrayList<Map<String, Object>> input = new ArrayList<>();
    input.add(One);
    input.add(Two);
    input.add(Four);
    input.add(Three);
    input.add(Five);

    List<Map<String, Object>> expected = new ArrayList<>();
    expected.add(One);
    expected.add(Five);
    expected.add(Four);
    expected.add(Three);
    expected.add(Two);

    List<Map<String, Object>> actual = TwoOpt.optimize(input);
    assertEquals(expected, actual);
  }

  //@Test
  public void testKSRandom() {
    ArrayList<Map<String, Object>> input = new ArrayList<>();
    input.add(KS1);
    input.add(KS5);
    input.add(KS11);
    input.add(KS18);
    input.add(KS4);
    input.add(KS9);
    input.add(KS3);
    input.add(KS14);
    input.add(KS2);
    input.add(KS6);
    input.add(KS15);
    input.add(KS7);
    input.add(KS12);
    input.add(KS13);
    input.add(KS8);
    input.add(KS17);
    input.add(KS10);
    input.add(KS16);

    long beforeNNA = NearestNeighbor.findDistanceofPath(input);
    long afterNNA = NearestNeighbor.findDistanceofPath(NearestNeighbor.optimize(input));
    long afterTwoOpt = NearestNeighbor.findDistanceofPath(TwoOpt.optimize(input));

    assertTrue("Kansas test: TwoOpt is shorter than nearest neighbor. ",afterNNA > afterTwoOpt);
    System.out.println("end kansas test");
  }
}
