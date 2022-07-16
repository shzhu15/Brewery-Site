package com.tripco.t09.TIP;

import com.tripco.t09.misc.Config;
import com.tripco.t09.misc.Database;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class TIPFind extends TIPHeader {

  private final transient Logger log = LoggerFactory.getLogger(TIPFind.class);
  String match;
  List<Map<String, Object>> narrow;
  Integer limit;
  Integer found;
  List<Map<String, Object>> places;
  transient Database database;


  public TIPFind(int version, String match, List<Map<String, Object>> narrow, Integer limit) {
    this();
    this.requestVersion = version;
    this.match = match;
    this.narrow = narrow;
    this.limit = limit;
    this.narrow = narrow;
    database = new Database();
  }

  private TIPFind() {
    this.requestVersion = Config.version;
    this.requestType = "find";
  }

  @Override
  public void buildResponse() throws Exception {
    database = new Database();
    places = searchDatabase(this.match, this.limit);
    found = countDatabase(this.match);
    log.trace("buildResponse -> {}", this);
  }


  public int countDatabase(String match) throws Exception {
    return database.countInWorld(match, narrow);
  }

  public List<Map<String, Object>> searchDatabase(String match, Integer limit) throws Exception {
    return database.searchInWorld(match, limit, narrow);
  }
}

