package com.tripco.t09.misc;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;

public class TestNearestNeighbor {

  private Map<String, Object> TopLeft;
  private Map<String, Object> BottomLeft;
  private Map<String, Object> TopRight;
  private Map<String, Object> BottomRight;

  @Before
  public void createLocationsForTestCases() {
    TopLeft = createLocationMap("41", "-109",
        "Top Left");
    BottomLeft = createLocationMap("37", "-109",
        "Bottom Left");
    TopRight = createLocationMap("41", "-102", "Top Right");
    BottomRight = createLocationMap("37", "-102", "Bottom Right");

  }

  private Map<String, Object> createLocationMap(String latitude, String longitude, String name) {
    Map<String, Object> location = new HashMap<>();
    location.put("latitude", latitude);
    location.put("longitude", longitude);
    location.put("name", name);
    return location;
  }

  private void assertEqualsLists(List<Map<String, Object>> expected,
      List<Map<String, Object>> actual) {
    assertEquals(actual.size(), expected.size());
    for (int i = 0; i < actual.size(); i++) {
      String actualName = (String) actual.get(i).get("name");
      String expectedName = (String) expected.get(i).get("name");
      assertEquals(expectedName, actualName);

      String actualLat = (String) actual.get(i).get("latitidue");
      String expectedLat = (String) expected.get(i).get("latitude");
      assertEquals(expectedLat, actualLat);

      String actualLon = (String) actual.get(i).get("longitude");
      String expectedLon = (String) expected.get(i).get("longitude");
      assertEquals(expectedLon, actualLon);
    }
  }


  @Test
  public void testColoradoCross() {
    ArrayList<Map<String, Object>> input = new ArrayList<>();
    input.add(TopLeft);
    input.add(BottomRight);
    input.add(TopRight);
    input.add(BottomLeft);

    List<Map<String, Object>> expected = new ArrayList<>();
    expected.add(TopLeft);
    expected.add(BottomLeft);
    expected.add(BottomRight);
    expected.add(TopRight);

    List<Map<String, Object>> actual = NearestNeighbor.optimize(input);
    assertEquals(expected, actual);
  }
}
