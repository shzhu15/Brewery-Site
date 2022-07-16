package com.tripco.t09.TIP;


import com.tripco.t09.misc.GreatCircleDistance;
import com.tripco.t09.misc.NearestNeighbor;
import com.tripco.t09.misc.Config;
import com.tripco.t09.misc.TwoOpt;
import com.tripco.t09.misc.DistanceMemo;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class TIPItinerary extends TIPHeader {

  private final transient Logger log = LoggerFactory.getLogger(TIPItinerary.class);
  Map<String, Object> options;
  List<Map<String, Object>> places;
  List<Long> distances;


  TIPItinerary(int version, Map<String, Object> options, List<Map<String, Object>> places) {
    this();
    this.requestVersion = version;
    this.options = options;
    this.places = places;
  }

  private TIPItinerary() {
    this.requestVersion = Config.version;
    this.requestType = "itinerary";
  }

  @Override
  public void buildResponse() throws Exception {
    this.places = getOptimized();
    this.distances = getDistances();
    log.trace("buildResponse -> {}", this);
  }

  private Number parseForNumber(Object o) throws Exception {
    if (o instanceof String) {
      return Double.parseDouble((String) (o));
    }
    if (o instanceof Number) {
      return (Number) (o);
    }
    throw new IllegalArgumentException("earthRadius type cannot be converted to Double: " + o);
  }

  public List<Map<String, Object>> getOptimized() throws Exception {
    Object optimize = options.get("optimization");
    if (optimize == null) {
      return this.places;
    }

    if (!(optimize instanceof String)) {
      throw new Exception();
    }

    if (optimize.equals("none")) {
      return this.places;
    }
    if (optimize.equals("short")) {
      return NearestNeighbor.optimize(this.places);
    }
    if (optimize.equals("shorter")){
      return TwoOpt.optimize(this.places);
    }
    throw new Exception("Optimization not recognized.");
  }

  public List<Long> getDistances() throws Exception {
    ArrayList<Long> dists = new ArrayList<>();
    Number earthRadius = parseForNumber(options.get("earthRadius"));

    //This covers case where places has only one element. It returns a single distance of length 0
    for (int i = 0; i < places.size(); i++) {
      dists.add(GreatCircleDistance
          .getDistance(places.get(i), places.get((i + 1) % places.size()), earthRadius));
    }
    return dists;
  }
}
