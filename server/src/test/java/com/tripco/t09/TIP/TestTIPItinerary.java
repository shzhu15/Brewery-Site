package com.tripco.t09.TIP;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;

public class TestTIPItinerary {

  private final float earthRadiusKm = (6371F);
  private final float earthRadiusmm = (float) (earthRadiusKm * Math.pow(10, 6));
  private final float earthRadiusMi = 3959F;
  private final int version = 2;
  private Map<String, Object> csu, cu, bejing, northPole, southPole;
  private Map<String, Object> options;

  @Before
  public void createLocationsForTestCases() {
    //by default tests are done in KM
    csu = createLocationMap("40.576179", "-105.080773",
        "Oval, Colorado State University, Fort Collins, Colorado, USA");
    cu = createLocationMap("40.007581", "-105.2746964",
        "University of Colorado, Boulder, Colorado, USA");
    bejing = createLocationMap("39.9385466", "116.1172774", "Bejing, China");
    northPole = createLocationMap("90", "0", "North Pole");
    southPole = createLocationMap("-90", "0", "South Pole");
    options = new HashMap<>();
    options.put("title", "Test Itinerary");
    options.put("earthRadius", earthRadiusKm);
  }

  private Map<String, Object> createLocationMap(String latitude, String longitude, String name) {
    Map<String, Object> location = new HashMap<>();
    location.put("latitude", latitude);
    location.put("longitude", longitude);
    location.put("name", name);
    return location;
  }

  private TIPItinerary createItinerary(List<Map<String, Object>> locations) {
    return new TIPItinerary(version, options, locations);
  }

  private void testTIPItinerary(TIPItinerary tipI, List<Long> expected) {
    try {
      tipI.buildResponse();
      List<Long> returned = tipI.getDistances();
      assertEquals("Number of returned distances does not match expected.", returned.size(),
          expected.size());

      for (int i = 0; i < expected.size(); i++) {
        assertEquals("Returned distance does not match expected.", expected.get(i),
            returned.get(i));
      }
    } catch (Exception e) {
      System.out.println(e);
    }
  }

  @Test
  public void testOneLocation() {
    ArrayList<Map<String, Object>> arr = new ArrayList<>();
    arr.add(csu);
    TIPItinerary myItinerary = createItinerary(arr);
    ArrayList<Long> expected = new ArrayList<>();
    expected.add(0L);
    testTIPItinerary(myItinerary, expected);
  }

  @Test
  public void testTwoLocationsButSame() {
    ArrayList<Map<String, Object>> arr = new ArrayList<>();
    arr.add(csu);
    arr.add(csu);
    TIPItinerary myItinerary = createItinerary(arr);
    ArrayList<Long> expected = new ArrayList<>();
    expected.add(0L);
    expected.add(0L);
    testTIPItinerary(myItinerary, expected);
  }

  @Test
  public void testTwoLocations() {
    ArrayList<Map<String, Object>> arr = new ArrayList<>();
    arr.add(csu);
    arr.add(cu);
    TIPItinerary myItinerary = createItinerary(arr);
    ArrayList<Long> expected = new ArrayList<>();
    expected.add(65L);
    expected.add(65L);
    testTIPItinerary(myItinerary, expected);
  }

  @Test
  public void testThreeLocations() {
    ArrayList<Map<String, Object>> arr = new ArrayList<>();
    arr.add(csu);
    arr.add(cu);
    arr.add(northPole);
    TIPItinerary myItinerary = createItinerary(arr);
    ArrayList<Long> expected = new ArrayList<>();
    expected.add(65L);
    expected.add(5559L);
    expected.add(5496L);
    //csu -> cu, cu -> northPole, northPole -> csu
    testTIPItinerary(myItinerary, expected);
  }

  @Test
  public void testmmRadius() {
    ArrayList<Map<String, Object>> arr = new ArrayList<>();
    arr.add(southPole);
    arr.add(northPole);
    Map<String, Object> optionsmm = new HashMap<>();
    optionsmm.put("title", "test itinerary using mm");
    optionsmm.put("earthRadius", earthRadiusmm);
    TIPItinerary myItinerary = new TIPItinerary(version, optionsmm, arr);
    ArrayList<Long> expected = new ArrayList<>();
    expected.add(20015086193L);
    expected.add(20015086193L);
    testTIPItinerary(myItinerary, expected);
  }

  @Test
  public void testFromTripcoRepo() {
    ArrayList<Map<String, Object>> arr = new ArrayList<>();
    Map<String, Object> denver, boulder, ftCollins;
    denver = createLocationMap("39.7392", "-104.9903", "Denver");
    boulder = createLocationMap("40.01499", "-105.27055", "boulder");
    ftCollins = createLocationMap("40.585258", "-105.084419", "fort Collins");
    arr.add(denver);
    arr.add(boulder);
    arr.add(ftCollins);
    Map<String, Object> optionsMi = new HashMap<>();
    optionsMi.put("title", "test itinerary using mm");
    optionsMi.put("earthRadius", earthRadiusMi);
    TIPItinerary myI = new TIPItinerary(version, optionsMi, arr);
    ArrayList<Long> expected = new ArrayList<>();
    expected.add(24L);
    expected.add(41L);
    expected.add(59L);
    testTIPItinerary(myI, expected);
  }

  @Test
  public void testNoLocations() {
    ArrayList<Map<String, Object>> arr = new ArrayList<>();
    TIPItinerary myItinerary = createItinerary(arr);
    ArrayList<Long> expected = new ArrayList<>();
    testTIPItinerary(myItinerary, expected);
  }

}
