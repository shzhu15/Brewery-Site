package com.tripco.t09.TIP;

import com.tripco.t09.misc.GreatCircleDistance;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Defines the TIP distance object.
 *
 * For use with restful API services, An object is created from the request JSON by the MicroServer
 * using GSON. The buildResponse method is called to determine the distance. The MicroServer
 * constructs the response JSON from the object using GSON.
 *
 * For unit testing purposes, An object is created using the constructor below with appropriate
 * parameters. The buildResponse method is called to determine the distance. The getDistance method
 * is called to obtain the distance value for comparisons.
 */
public class TIPDistance extends TIPHeader {

  private final transient Logger log = LoggerFactory.getLogger(TIPDistance.class);
  private Map origin;
  private Map destination;
  private float earthRadius;
  private Long distance;


  TIPDistance(int version, Map<String, Object> origin, Map<String, Object> destination,
      float earthRadius) {
    this();
    this.requestVersion = version;
    this.origin = origin;
    this.destination = destination;
    this.earthRadius = earthRadius;

    this.distance = 0L;

  }


  private TIPDistance() {
    this.requestType = "distance";
    this.requestVersion = 3;
  }


  @Override
  public void buildResponse() throws Exception {
    this.distance = getDistance();
    log.trace("buildResponse -> {}", this);
  }

  Long getDistance() throws Exception {
    return GreatCircleDistance.getDistance(origin, destination, earthRadius);
  }

  @Override
  public String toString() {
    return "< TIPDistance, distance: " + distance + ">";
  }
}
