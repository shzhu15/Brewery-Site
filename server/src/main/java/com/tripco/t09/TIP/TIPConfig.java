package com.tripco.t09.TIP;

import com.tripco.t09.misc.Config;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * This class defines the Config response that provides the client with server specific
 * configuration information.
 *
 * When used with restful API services, An object is created from the request JSON by the
 * MicroServer using GSON. The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *
 * When used for testing purposes, An object is created using the constructor below. The
 * buildResponse method is called to set the configuration information. The getDistance method is
 * called to obtain the distance value for comparisons.
 */
public class TIPConfig extends TIPHeader {

  private final transient Logger log = LoggerFactory.getLogger(TIPConfig.class);
  private String serverName;
  private List<String> placeAttributes;
  private List<String> optimizations;
  private List<Map<String,Object>> filters;


  public TIPConfig() {
    this.requestType = "config";
    this.requestVersion = Config.version;
    this.optimizations = Config.optimizations;
  }


  @Override
  public void buildResponse() {
    this.serverName = "t09 #include";
    this.placeAttributes = Config.placeAttributes;
    this.filters = Config.filters;
    log.trace("buildResponse -> {}", this);
  }

  String getServerName() {
    return this.serverName;
  }

  public int getVersion(){
    return requestVersion;
  }

  List<String> getPlaceAttributes() {
    return this.placeAttributes;
  }

  @Override
  public String toString() {
    String ret = "< TIPConfig, Server Name:" + serverName + ", Place Attributes: ";
    for (String s : placeAttributes) {
      ret += "\n    " + s;
    }
    return ret += "\n>";
  }

}
