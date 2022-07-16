# Sprint 2 - t09 - #include

## Goal

### We would like to complete the Itenerary Page, which will allow you to load in an Itinerary file and calculate distances between destinations. Add various features to our distance calculation. Throughout all of this we would like to add features to make our site stand out.
### Sprint Leader: William Scarbro

## Definition of Done

* Version in pom.xml should be `<version>2.0.0</version>` for your final build for deployment.
* Increment release `v2.0` created on GitHub with appropriate version number and name.
* Increment deployed for testing and demonstration on SPRINT2 assignment.
* Sprint Review and Restrospectives completed (team/sprint2.md)
* We would like to complete our four epics for this sprint. This will include completing the itinerary page and adding features to our distance calculator.


## Policies

#### Intra-Team Communication
* Team members collaborate to implement their assigned tasks.
* Changes are well documented, so everyone understands how the project is evolving.
### Inter-Team Communication
* Offer help to members of other teams and post quality questions to public forums. (Piazza)
#### Mobile First Design!
* Design for mobile, tablet, laptop, desktop (in that order).
* Use ReactStrap for a consistent interface (no HTML, CSS, style, etc.).
* Must adhere to the TripCo Interchange Protocol (TIP) for interoperability and testing.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits include a task/issue number.
* All commits include tests for the added or modified code.
* All tests pass.
#### Continuous Integration / Delivery 
* Master is never broken.  If broken, it is fixed immediately.
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

This sprint will complete the following Epics.

* #75 User: Enter latitudes and longitudes in the calculator using degree-minute-second and other formats.
* #76 User: the calculator data shouldn't go away when untis change.
* #78 User: Show me a map and itinerary for my trip
* #86 Create Options field for the custom units

![Server Class Diagram](https://github.com/csucs314s19/t09/blob/master/team/images/ServerDiagramWithItinerary.jpg)
## Client Component Hierarchy
![Client Component Hierarchy](https://github.com/csucs314s19/t09/blob/master/team/images/client%20component%20hierarchy.jpg)

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | *value* |
| Tasks |  11   | *value* | 
| Story Points |  15  | *value* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 2/11 | none | #79-#90 | Difficult to define tasks without better idea of what needs to be done for each epic. Task names are vague. | 
| 2/13 | none | #79-#90 | Figuring out the format for the file version of itineraries.|
| 2/18 | #90,part of #103 | #79-#89 | Properly using API libraries, completing itinerary design (coordination) |
| 2/20 | Geolocation and Server support for Itinerary | Map of Itinerary and fs Bug | fs Bug: unable to use fs library. Prevents Itinerary from loading from file. |
| 2/22 | Different Longitude and latitude | Map of Itinerary, saving data from the calculator | Properly testing the Restful API |
| 2/25 | Other formats for longitude and latitude | API bug fix, Map of itinerary | Many epics still to complete before Friday |
| 2/27 | API_bug fixed, Magellan-coords bug fixed | Testing | Need to pass test cases for Travis to build |


## Review (focus on solution and technology)

In this sprint, we built the itinerary page. On the client side, this page allows users to load a json trip file and creates a map of the locations on the trip. Tools we used on the client for the itinerary page were google leaflets to display the map and Reactstrap to build the page structure. Server support for this page calculates the distance between each leg of the trip through a RESTfulAPI request. We also made an update to the calculator that allows different latitude and longitude formats. This was done through use of the Magellan Coords library.

#### Completed epics in Sprint Backlog 

These Epics were completed.

* User: The calculator data shouldn't go away when the units change: Saved calculator data between page visits)
* User: Enter latitudes and longitudes in the calculator using degree-minute-second and other formats: Added other valid formats such as DMS
* Create map for calculator page: Added map that represents the points of interest
* Show me a map and Itinerary for my trip: Added map to itinerary page with points on 
* User: I want to know where I am on the map: Added user location data to home page map

#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* Let me change my itinerary
* Let me choose from different map backgrounds

#### What went well
In this Sprint the design of our pages and overall structure of our additions was successful. On the server side we added a TIPItinerary and TestTIPItinerary that successfully handled distance calculations. On the client side we build an Itinerary page with a map and interactive buttons.


#### Problems encountered and resolutions
In this Sprint our team struggled with using new technologies. On our server, the TIP response was initially not set up correctly and it was unable to handle itinerary distance calculations for check2. On our client we struggled with using to correct libraries and assigning dependancies. We also had problems with conforming to the specified test cases on the client because of discrepencies between the functionality of the client and what was being tested. 


## Retrospective (focus on people, process, tools)

In this sprint, we overcame challenges and pushed through our goals. We got unstuck from problems an individual was facing by working as a team. 

#### What we changed this sprint

Our changes for this sprint included an increase in our out of class meeting frequency, better initial planning on ZenHub, and a improvement on our communication (mainly asking for more help when necessary)

#### What we did well

We internally gave and recieved a large amount of help during the sprint, which helped us quickly push through when one member got stuck. 

Our out of class meetings were more frequent and were massivly productive. During that time we were able to communicate quickly and efficiently.

#### What we need to work on

Our communication between our original pairs is significantly better then our communication as a whole team. 

A consequence of giving and recieving more help was that our branches got more messy, and it became tougher to keep track of what changes were made in which branch.

We could also give/recieve more help with other teams.


#### What we will change next sprint 

We will increase our out of class meeting frequency, especially early on in the sprint. This will hopefully give us an early boost to productivity that we can benifit from. 

We will make efforts to communicate better as a whole group.
