# Sprint 5 - *T9* - *#Include*

## Goal

### A Beautiful User Experience!
### Sprint Leader: Michael Chaney

## Definition of Done

* Version in pom.xml should be `<version>5.0.0</version>` for your final build for deployment.
* Increment release `v5.0` created on GitHub with appropriate version number and name.
* Increment `server-5.0.jar` deployed for testing and demonstration on SPRINT5 assignment.
* Sprint Review, Restrospective, and Metrics completed (team/sprint5.md).


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
* Each team member must complete Interop with another team and file an issue in the **class** repo with the results.
  * title is your team number and your name, 
  * labels should include Interop and the Team that you tested with, 
  * description should include a list of tests performed, noting any failures that occurred.

## Plan

This sprint will complete the following Epics.

* *#286 Get testing to 50%. We need to get our test coverage up to an adequite percentage
* *#283 Investigate and Fix API. We scored low on our API, so the goal is to figure out and fix what problems exist with it.
* *#280 Make application easier to use. Improvements on the user expereience.



## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 3 | 2 |
| Tasks |  28   | 26 | 
| Story Points |  28  | 27 | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/24 | #289, #289 | #287, #297, #282 | *none* | 
| 4/26 | #282, #297, #287 | #288, #304, #303 | *none* | 
| 4/29 | #288, #304, #303  | #301, #294 | *none* | 
| 5/1 | #301, #294, #300 | #307, #264 | *none* | 
| 5/3 | #307, #264 | #319, #295, #298, #291 | *none* |
|  5/6 | #319, #295, #298, #291 | #309, #320 | *none* |
|  5/8 | #309, #320 | #312, #323, #327 | *none* |



## Review (focus on solution and technology)

In this sprint, we reduced our technical debt and improved our UX to prepare for release. In order to reduce our technical debt one of the things we focused on was getting a higher testing coverage with Jest and JUnit. 

#### Completed epics in Sprint Backlog 

These Epics were completed.

* * #280 Make The Application Easier To Use. This epic focues on UX improvements to our website
* * #283 Investigate and Fix API. We had problems with our server last sprint, so this epic focused on each of those problems


#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* * #286 Get testing to 50%. We were not able to get our code coverage up to 50%

#### What went well

We worked more efficiently as a team. The itinerary page improved upon, to make the user experience better. And also we maded improvement to the api with fixing short and shorter. Along the way, we also cleaned up the code, deleting or rewriting bad code, and fixing many bugs that broke our UI. We also reduce our techical debt and improve the maintainability of serveral of our files.


#### Problems encountered and resolutions

We ran into problems testing some react elements that lowered our testing coverage. We also ran into issues with jest failing with certain test breaking jest. Also we are still confusing/not understanding jest and how to write jest test.


## Retrospective (focus on people, process, tools)

In this sprint, we collaborated on how improve our UI. We improved our process by making sure each pull request was associated with an issue. 

#### What we changed this sprint

Our changes for this sprint included changing the method of communication between our team from slack to a text chat as some of our members were having problems with the slack app. This improved the time til someone in the group would respond to you, and kept us all up to date on what was going on. 

#### What we did well

We collaborated better and worked better as a team. We did better at following the process. Also our communication improved significantly from the last sprint. This sprint we also worked on different areas from last sprint; different teammates work on the server and the client.

#### What we need to work on

We could improve in the velocity we work at. Increasing the amount of time spent on the project would have improved it. We also should have done more work in the first week of the sprint instead of having a last minute rush to get everything done in the last week of the sprint.

#### What we will change next sprint 

We will disband the team entirely and stop working, as this is the end of the class. 
