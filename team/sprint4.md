# Sprint 4 - t09 - #include

## Goal

### Worldwide!
### Sprint Leader: Sharon Zhu

## Definition of Done

* Version in pom.xml should be `<version>4.0.0</version>` for your final build for deployment.
* Increment release `v4.0` created on GitHub with appropriate version number and name.
* Increment `server-3.5.jar` deployed for testing and demonstration on CHECK4 assignment.
* Increment `server-4.0.jar` deployed for testing and demonstration on SPRINT4 assignment.
* Sprint Review, Restrospective, and Metrics completed (team/sprint4.md).


## Policies

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
* Code Coverage above 50%
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

* #144 validate all requests sent to the server and responses received by the client
* #142 Let me change my itinerary
* #176 Can trips be shorter?
* #175 Let me plan trips world wide
* #231 Itinerary Cleanup
* #236 API TIP Changes
* #157 Let me choose different map backgrounds
* #149 Give me a friendly message if something goes wrong

Last sprint we bit off more than we can chew, so this sprint we decide to scale down the amount of epics we will complete.
We will first finish off most of the sprint 3 epics, along with cleanup the mess that is our itinerary page. Afterwards we
plan to complete 2 of the sprint 4 epics, and maybe another epic if we have time.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 8 | 8 |
| Tasks |  18  | 24 | 
| Story Points |  23  | 22 | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/1 | *none*| #150,#233,#232,#240 | *none* | 
| 4/3 | #240,#238 | #233,#232,#150,#237 | *none* |
| 4/5 | *none* | #233,#237,#150,#241,#238 | *none* |
| 4/8 | #233,#237,#238 | #232,#150,#241,#244 | *none* |
| 4/10 | #232,#244 | #166,#150,#241,#258 | *none* |
| 4/12 | #166,#170,#241,#258 | #150,#243,#251,#235 | *none* |
| 4/15 | #243,#251,#235 | #236,#239,#240,#150 | *none* |
| 4/17 | #236,#239,#240,#242,#148 | #237,#150,#181,#180 | *none* |



## Review (focus on solution and technology)

In this sprint, we expanded upon the database by changing it from just Colorado to the world and a new TIP element to further improve on the trip distance. The server can now handle requests for two-opt. When planning a trip how, it can be further optimized using the two-opt Algorithm to make the trip even shorter. We also implemented JSON Schema validation on the server and the client. We also rehauled/rebuilt the itinerary so less windows/information is display at a single time.

#### Completed epics in Sprint Backlog 

These Epics were completed.

* #144 validate all requests sent to the server and responses received by the client
* #142 Let me change my itinerary
* #176 Can trips be shorter?
* #175 Let me plan trips world wide
* #231 Itinerary Cleanup
* #236 API TIP Changes
* #157 Let me choose different map backgrounds
* #275I would like to highlight certain places on the map

#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* #149 Give me a friendly message if something goes wrong


#### What went well

The itinerary page rebuilt was sucessfully done and look better than the previous one. The new itinerary page makes it easier to code/manage the itinerary file since we move several elements to their own file. On the server side we added an improvement on the TIPfind with expanding the database and added two-opt to the distances request that successfully improve on the trip by making it shorter.


#### Problems encountered and resolutions

By redesigning and rebuilding the itinerary page we ran into many bugs and broke the itinerary test. But because we were rebuilding the page we in the end fix the many bugs. We unbroke the itinerary by removing the elements like the map, and legs tests to their own file to be test on.

## Retrospective (focus on people, process, tools)

In this sprint, we worked together very well as a team with helping each other out. Some of us slack off for the first half of the sprint, but pulled it back together at the end. Towards the end, after acknowledging that we fail with communication we greatly improve our communication.

#### What we changed this sprint

Our changes for this sprint included having a better planning session with not over planning the amount of work we could do. This sprint we also move the work load around, so different teammates were working on the server and the client.

#### What we did well

We completed what we planned to do, and even finished a couple more epics. We had productive out of class meeting where we went over issues we were having, what have finished, and where to go next.

#### What we need to work on

We could improve on keeping on top of github and zenhub. And for some of us, start work on the sprint earlier rather than later. We also need to help or get help from other teams more, as we are still somewhat stuck in the mindset that we can't work together. Our communication with each other went bad, we started to communicate less with each other, and not response sometimes. We solution this by created a group chat instead of just depending on slack for communication. Also pull requests on github would sometimes stay open for days. We solve this by ask in the group chat to reply if a pull request is put up.

#### What we will change next sprint 

We will change workload/timing so that we can get more done earlier in the sprint instead of a last minute rush. We will keep on top of our communication using slack and the group chat instead of just depending on slack for communication. We will also try to keep onto of github and zenhub next sprint instead of not doing anything until the end.
