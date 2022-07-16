package com.tripco.t09.TIP;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;

public class TestTIPFind {

  boolean completeTests = true;
  boolean onTravis = false;
  List<Map<String, Object>> filters = new ArrayList<>();

  @Before
  public void checkForDev() {
    String travis = System.getenv("TRAVIS");
    if (travis != null && travis.equals("true")) {
      onTravis = true;
    }
    String isDevelopment = System.getenv("CS314_ENV");
    if (isDevelopment != null && isDevelopment.equals("testingOff")) {
      completeTests = false;
    }
  }


  @Test
  public void testGetCount() {
    if (!completeTests) {
      System.out.println("TestTIPFind was not executed (Database not enabled)");
      return;
    }
    TIPFind tp;
    try {
      tp = new TIPFind(3, "Denver", filters, 5);
      int expected = 30;
      if (onTravis) {
        expected = 25;
      }
      tp.buildResponse();
      int actual = tp.found;
      assertEquals("The entries in the test database subset with Denver limit 5", expected, actual);
    } catch (Exception e) {
      System.out.println(e);
      return;
    }
  }

  @Test
  public void testNonAlphaNum(){
    if (!completeTests){
      return;
    }
    TIPFind tp;
    try{
      tp = new TIPFind(3, "Denv'r",filters, 5);
      int expected = 30;
      if (onTravis) {
        expected = 25;
      }
      tp.buildResponse();
      int actual = tp.found;
      assertEquals("The entries in the test database subset with Denv_r limit 5", expected, actual);
    } catch (Exception e){
      System.out.println(e);
    }
  }
  //    public void testMatching() {
//        ArrayList<Map<String, Object>> place = new ArrayList<>();
//        TIPFind tp = new TIPFind(3, "Denver", place, 6);
//        tp.buildResponse();
//        int expected = 26;
//        int actual = tp.found;
//        assertEquals("Testing the subset of the database with Hospital", expected, actual);
//    }


}
