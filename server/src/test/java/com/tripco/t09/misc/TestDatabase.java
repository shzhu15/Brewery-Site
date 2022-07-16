package com.tripco.t09.misc;

import com.tripco.t09.misc.Database;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;
import java.util.Arrays;
import static org.junit.Assert.assertEquals;

public class TestDatabase{
    Database db;
    List<Map<String,Object>> filters;
    boolean onTravis=false;
    boolean completeTests=true;
    @Before
    public void setUpDatabase(){
        db = new Database();
        filters = new ArrayList<>();
        String travis = System.getenv("TRAVIS");
        if (travis != null && travis.equals("true")){
            onTravis = true;
        }
        String isDevelopment = System.getenv("CS314_ENV");
        if (isDevelopment!=null && isDevelopment.equals("testingOff")){
            completeTests=false;
            System.out.println("Testing off. Database tests not run");
        }
    }

    @Test
    public void coloradoTest(){
        if (!completeTests){
            return;
        }
        String match = "Denver";
        int count;
        try {
            count = db.countInColorado(match,filters);
            int correct = 26;
            if (onTravis)
                correct=25;
            assertEquals("count in colorado where name like 'Denver'",count,correct);

        }catch(Exception e){
            System.out.println("[TESTDATABASE]: "+e);
        }
    }
    @Test
    public void filterTest(){
        if(!completeTests){
            return;
        }
        String match = "Denver";
        Map<String, Object> filter = new HashMap<>();
        filter.put("name","type");
        filter.put("values",Arrays.asList("Airport","Heliport"));
        filters.add(filter);
        try{
            int count = db.countInWorld(match,filters);
            int correct = 29;
            if (onTravis)
                correct=24;
            assertEquals("count in world where name is like 'Denver' and with filters 'Airport' and 'Heliport'",correct,count);
        } catch(Exception e){
            System.out.println("[TEST DATABASE]: "+e);
        }
        filters.clear();
    }
    @Test
    public void getCountriesTest() {
        if (!completeTests)
            return;
          List<String> countries = db.getCountries();
//        for (String s : countries){
//            System.out.println(s);
//        }
        int count =countries.size();
        int correct = 247;
        if (onTravis)
            correct=1;
        assertEquals("number of countries",correct,count);
    }

}