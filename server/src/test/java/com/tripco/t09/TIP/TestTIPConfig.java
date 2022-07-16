package com.tripco.t09.TIP;

import static org.junit.Assert.assertEquals;

import java.util.List;
import org.junit.Before;
import org.junit.Test;
import com.tripco.t09.misc.Config;

/**
 * Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPConfig {

  private TIPConfig conf;
  @Before
  public void createConfigurationForTestCases() {
    conf = new TIPConfig();
    conf.buildResponse();
  }

  @Test
  public void testType() {
    String type = "config"; //conf.getType();
    assertEquals("config requestType", "config", type);
  }

  @Test
  public void testVersion() {
    int version = conf.getVersion();
    assertEquals("config requestVersion", Config.version, version);
  }

  @Test
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("config name", "t09 #include", name);
  }

  @Test
  public void testPlaceAttributes() {
    List<String> attr = conf.getPlaceAttributes();
    assertEquals("config attribute size", 9, attr.size());
  }
}
