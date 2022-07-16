package com.tripco.t09.TIP;

public abstract class TIPHeader {

  protected Integer requestVersion;
  protected String requestType;

  public abstract void buildResponse() throws Exception;

  @Override
  public String toString() {
    return "<TIPHeader, Request Version: " + requestVersion + ", Request Type: " + requestType
        + ">";
  }
}
