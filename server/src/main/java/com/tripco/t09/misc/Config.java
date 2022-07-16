package com.tripco.t09.misc;

import java.util.List;
import java.util.Arrays;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

public class Config {
    public static int version=5;
    public static List<String> placeAttributes = Arrays.asList("latitude", "longitude", "name","id","municipality","altitude","region","country","continent");
    public static List<String> optimizations =  Arrays.asList("none", "short","shorter");
    public static List<Map<String,Object>> filters;
    static {
        filters = new ArrayList<>();

        Map<String, Object> types = new HashMap<>();
        types.put("name","type");
        List<String> typeValues = Arrays.asList("airport","heliport","balloonport","closed");
        types.put("values",typeValues);
        filters.add(types);

        Database db = new Database();
        List<String> countryValues = db.getCountries();
        Map<String,Object> country = new HashMap<>();
        country.put("name","country");
        country.put("values",countryValues);
        filters.add(country);
    }
}
