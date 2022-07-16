package com.tripco.t09.TIP;

import static junit.framework.TestCase.fail;
import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;

/**
 * Verifies the operation of the TIP distance class and its buildResponse method.
 */
public class TestTIPDistance {

  /* Radius and location values shared by test cases */
  private final float earthRadiusKm = (6371F);
  private final float earthRadiusmm = (float) (earthRadiusKm * Math.pow(10, 6));
  private final float earthRadiusMi = 3959F;
  private final int version = 2;
  private Map<String, Object> csu, cu, bejing, northPole, southPole;
  private Map<String, Object> options;

  @Before
  public void createLocationsForTestCases() {
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

  @Test
  public void testOriginDestinationSame() {
    TIPDistance trip = new TIPDistance(version, csu, csu, earthRadiusMi);
    try {
      trip.buildResponse();
      Long expect = 0L;
      Long actual = trip.getDistance();
      assertEquals("origin and destination are the same", expect, actual);
    } catch (Exception e) {
      fail();
    }
  }

  @Test
  public void testLargeDistanceKm() {
    TIPDistance trip = new TIPDistance(version, northPole, southPole, earthRadiusKm);
    try {
      trip.buildResponse();
      Long expect = 20015L;
      Long actual = trip.getDistance();
      assertEquals("The distance from the north pole to the south pole in mm", expect, actual);

    } catch (Exception e) {
      fail();
    }
  }

  @Test
  public void testLargeDistanceMM() {
    TIPDistance trip = new TIPDistance(version, northPole, southPole, earthRadiusmm);
    try {
      trip.buildResponse();
      Long expect = 20015086193L;
      Long actual = trip.getDistance();
      assertEquals("The distance from the north pole to the south pole in mm", expect, actual);

    } catch (Exception e) {
      fail();
    }
  }

}
