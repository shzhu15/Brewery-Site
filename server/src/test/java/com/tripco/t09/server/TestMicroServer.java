package com.tripco.t09.server;

import static org.junit.Assert.assertEquals;

import com.tripco.t09.server.MicroServer;
import com.tripco.t09.server.WebApplication;
import org.junit.Before;
import org.junit.Test;


public class TestMicroServer {
    MicroServer ms;
    @Before
    public void initialize(){
        //ms = new MicroServer(8088);
    }
    @Test
    public void testWebAppValidPortGetSP(){
        String[] args = {"410000"};
        WebApplication.main(args);
        //AssertEquals("Test server port reader",serverPort,31400);
    }
    @Test
    public void testWebAppInvalidPort(){
        String[] args = {"70000"};
        WebApplication.main(args);
        //boolean valid = WebApplication.validTcpIpPortNumber(portNumber);
        //AssertEquals("Test server port validator",valid,true);
    }

}