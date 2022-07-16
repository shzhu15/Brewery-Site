package com.tripco.t09.misc;

import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.*;
import java.util.*;
import com.tripco.t09.misc.Config;

//Significant code sourced from tripco repository (https://github.com/csucs314s19/tripco/blob/master/guides/database/DatabaseGuide.md)
public class Database{
    //URLs
    static final String travisUrl="jdbc:mysql://127.0.0.1/cs314";
    static final String devUrl="jdbc:mysql://127.0.0.1:56247/cs314";
    static final String prodUrl="jdbc:mysql://faure.cs.colostate.edu/cs314";

    private final static String myDriver = "com.mysql.jdbc.Driver";
    private String password="eiK5liet1uej";

    //Users
    private final static String travisUser = "travis";
    private final static String user = "cs314-db";
    private String myUser;

    String myUrl;
    public Database(){
        //Taken from database guide on tripco repository
        String isTravis = System.getenv("TRAVIS");
        if (isTravis != null && isTravis.equals("true")){
            myUrl = travisUrl;
            myUser = travisUser;
            password = null;
        } else {
            myUser=user;
            String isDevelopment = System.getenv("CS314_ENV");
            if (isDevelopment != null && isDevelopment.equals("development")) {
                myUrl = devUrl;
            } else {
                myUrl = prodUrl;
            }
        }
        //System.out.println(this);
    }
    public List<Map<String, Object>> searchInWorld(String match, Integer limit, List<Map<String, Object>> filters) throws Exception{
        Query query = new Query(match,filters,limit,"World");
        return search(query);
    }
    public List<Map<String, Object>> searchInColorado(String match, Integer limit, List<Map<String, Object>> filters) throws Exception{
        Query query = new Query(match,filters,limit,"Colorado");
        return search(query);
    }
    public List<Map<String, Object>> search(Query query) throws Exception{
        String search = query.formatSearch();
        System.out.println("SEARCH: "+search);
        ArrayList<Map<String,Object>> places = new ArrayList<>();
        String[] placeAttr = new String[Config.placeAttributes.size()];
        Config.placeAttributes.toArray(placeAttr);
        return queryDatabase(search,placeAttr);
    }
    public Integer countInWorld(String match, List<Map<String, Object>> filters) throws Exception{
        Query query = new Query(match,filters,0,"World");
        System.out.println(query.formatCount());
        return countDatabase(query.formatCount());
    }
    public Integer countInColorado(String match, List<Map<String, Object>> filters) throws Exception{
        Query query = new Query(match, filters, 0, "Colorado");
        return countDatabase(query.formatCount());
    }

    private List<Map<String,Object>> extractMaps(ResultSet rsQuery, String[] attributes) throws Exception{
        ArrayList<Map<String,Object>> rows = new ArrayList<>();
        while (rsQuery.next()){
            Map<String,Object> current = new HashMap<>();
            for (String attr: attributes){
                current.put(attr,rsQuery.getString(attr));
            }
            rows.add(current);
        }
        return rows;
    }

    private List<Map<String,Object>> queryDatabase(String search, String[] attributes){
        try  {
            Class.forName(myDriver);
            // connect to the database and query
            try (Connection conn = DriverManager.getConnection(myUrl, myUser, password);
                 Statement stQuery = conn.createStatement();
                 ResultSet rsQuery = stQuery.executeQuery(search)
            ) {
                return extractMaps(rsQuery,attributes);
            }
        } catch (Exception e){
            System.err.println("[Database Query] Exception: "+e.getMessage());
        }
        System.out.println("[Database Query] error, returning null");
        return null;
    }

    private Integer countDatabase(String search){
        try  {
            Class.forName(myDriver);
            // connect to the database and query
            try (Connection conn = DriverManager.getConnection(myUrl, myUser, password);
                 Statement stQuery = conn.createStatement();
                 ResultSet rsQuery = stQuery.executeQuery(search)
            ) {
                rsQuery.next();
                return rsQuery.getInt(1);
            }
        } catch (Exception e){
            System.err.println("[Database Count] Exception: "+e.getMessage());
        }
        System.out.println("[Database Count] error, returning null");
        return null;
    }
    public List<String> getCountries(){
        String search = "SELECT name FROM country;";
        try{
            Class.forName(myDriver);
            try (Connection conn = DriverManager.getConnection(myUrl, myUser, password);
                Statement stQuery = conn.createStatement();
                ResultSet rsQuery = stQuery.executeQuery(search)
            ) {
                List<String> names = new ArrayList<>();
                while(rsQuery.next()){
                    names.add(rsQuery.getString("name"));
                }
                return names;
            }
        } catch (Exception e){
            System.err.println("[Database Count] Exception: "+e);
        }
        return null;
    }
}
class Query {
    //static String[] tables = {"continent", "country", "region", "world"};
    List<Map<String, Object>> filters;
    String match;
    int limit;
    Searchable searchable;
    public Query(String match, List<Map<String, Object>> filters, int limit, String scope){
        this.filters=filters;
        this.match=cleanMatch(match);
        this.limit=limit;
        if (this.limit>50)
            this.limit=50;
        if (scope.equals("Colorado"))
            searchable = new Colorado(this.match);
        if (scope.equals("World"))
            searchable = new World(this.match);
    }
    private String cleanMatch(String match){
        for (int i=0; i<match.length(); i++){
            if (!isAlphanumeric(match.charAt(i))){
                match=match.substring(0,i)+'_'+match.substring(i+1);
            }
        }
        return match;
    }
    private boolean isAlphanumeric(char c){
        boolean passed = (c >= 'a' && c <= 'z') ||
                (c >= 'A' && c <= 'Z') ||
                (c >= '0' && c <= '9');
        return passed;
    }
    public String formatSearch() throws Exception{
        String format = "SELECT "+searchable.getSelection();
        format+=searchable.formatSearch();
        format+=formatFilters(filters);
        if (limit!=0)
            format+=" LIMIT "+limit;
        return format+";";
    }
    public String formatCount() throws Exception{
        String format = "SELECT count(*) ";
        format+=searchable.formatSearch();
        format+=formatFilters(filters);
        return format;
    }

    private static String formatFilters(List<Map<String, Object>> filters) throws Exception {
        Iterator<Map<String, Object>> filterIterator = filters.iterator();
        String format="";
        String and="";
        while(filterIterator.hasNext()){
            Filter fil = new Filter(filterIterator.next());
            format += and + fil;
            and=" AND ";
        }
        return format;
    }
    PreparedStatement prepQuery(Connection conn){
        //for (int i=0; i<searchable.matchOccurence)
        return null;
    }
    abstract class Searchable {
        //final String selection;
        String match;
        int matchOccurence;
        abstract String formatSearch();
        abstract String getSelection();
        Searchable(String match){
            this.match=match;
        }
    }
    class World extends Searchable {
        final String selection = " world.id," +
                " world.name," +
                " world.municipality," +
                " region.name AS region," +
                " country.name AS country," +
                " continent.name AS continent," +
                " world.longitude," +
                " world.latitude," +
                " world.altitude ";
        World(String match){
            super(match);
            this.matchOccurence=4;
        }
        String getSelection(){return selection;}
        String formatSearch(){
            String phrase = "'%"+match+"%'";
            String search = "FROM continent " +
                "INNER JOIN country ON continent.id = country.continent " +
                "INNER JOIN region ON country.id = region.iso_country " +
                "INNER JOIN world ON region.id = world.iso_region " +
                "WHERE (country.name LIKE "+ phrase +
                " OR region.name LIKE "+ phrase +
                " OR world.name LIKE "+ phrase +
                " OR world.municipality LIKE "+ phrase;
            return search+ ") ";
        }
    }
    class Colorado extends Searchable {
        final String selection = "*";
        String[] columnsToSearch = {"name","municipality"};
        Colorado(String match){
            super(match);
            this.matchOccurence=columnsToSearch.length;
        }
        String getSelection(){return selection;}
        String formatSearch(){

            String searchParams =" FROM colorado WHERE ";
            String or="";
            for(String col: columnsToSearch) {
                searchParams += or + col + " like '%" + match + "%'";
                or = " OR ";
            }
            return searchParams;
        }
    }
}
 class Filter {
    String name;
    String[] values;
    public Filter(Map<String, Object> map) throws Exception{
        this(map.get("name"),map.get("values"));
    }
    public Filter(Object name, Object values) throws Exception{
        if (!(name instanceof String) || (!(values instanceof String[]) && !(values instanceof List)))
            throw new IllegalArgumentException("Invalid Filter: values not String[] or List");
        this.name = (String)(name);
        if (values instanceof List) {
            Object[] objs = ((List<String>) (values)).toArray();
            this.values = new String[objs.length];
            for (int i=0; i<objs.length; i++){
                if ( !(objs[i] instanceof String) )
                    throw new IllegalArgumentException("Invalid Filter: values list contains !string element");
                this.values[i] = (String)(objs[i]);
            }
        }else
            this.values = (String[])(values);
    }
    @Override
    public String toString(){
        String format=" AND (";
        for(int i=0; i<values.length; i++){
            format+=name+" LIKE '%"+values[i]+"%' ";
            if (i!=values.length-1)
                format+=" OR ";
        }
        return format+") ";
    }
}
