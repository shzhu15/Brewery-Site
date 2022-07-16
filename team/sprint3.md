# Sprint 3 - t09 - #include

## Goal

### Shorter trips to more places!
### Sprint Leader: Will Domier

## Definition of Done

* Version in pom.xml should be `<version>3.0.0</version>` for your final build for deployment.
* Increment release `v3.0` created on GitHub with appropriate version number and name.
* Increment `server-3.0.jar` deployed for testing and demonstration on SPRINT3 assignment.
* Sprint Review, Restrospective, and Metrics completed (team/sprint3.md).


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
* Code Coverage above 40%
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

* *#32: I may need my distances in other units*
* *#140: Data shouldn't go away when I change tabs*
* *#142: Make my trip shorter*
* *#144: Validate all requests sent to the server and responses received by the client*
* *#149: Give me a friendly message if something goes wrong*
* *#157: Let me choose different map backgrounds*
* *#173: Let me save a map of my trip for later viewing*



## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 7 | 4 |
| Tasks |  28  | 20 | 
| Story Points |  40 | 33 | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 03/06 | #161 #139 #178 | #153 #86 #145| *none* | 
| 03/08 | #153 | #178 #86 | *none* | 
| 03/11 | #86 | #195 #159 #178 | *none* | 
| 03/25 | #195 #179 #32 | #151 #142 | *None* |
| 03/27 | #151 #143 #154 | #152 | *None* |


## Review (focus on solution and technology)

In this sprint, we implemented a database and a new TIP element to find
new locations for the trip. The server can handle find requests and the client
can send them. When planning a trip how, it can be optimized using the Nearest Neighbor Algorithm
to make it shorter. We also implemented JSON Schema validation on the server and the client.
We now also have a custom field in the options page so that the user can enter their own units
with a custom name and radius.


#### Completed epics in Sprint Backlog 

These Epics were completed.

* *#143: Make my trip shorter*
* *#32: I may need distances in other units*
* *#140 Data should not go away when I change tabs*
* *#173: Let me save a map of my trip for later viewing*

#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* *#157: Let me choose different map backgrounds*
* *#144: Validate all requests sent to the server and responses received by the client*
* *#149: Give me a friendly message if something goes wrong*
* *#142: Let me change my itinerary* | Everything was completed but adding new starting location.

#### What went well

Our database and the testing solutions made by were simple and easy to use and made 
setting it up on our personal machines very easy.


#### Problems encountered and resolutions

Becuase we bit off a little more than we could chew, some things were rushed and
we found some technical problems a little late in the sprint which slowed us down.


## Retrospective (focus on people, process, tools)

In this sprint, we worked together very well as a whole and there were good lines
of communication. Having spring break in the middle was a little bit of a blessing
and a curse because we were able to take a little bit of a breather but at the same
time we weren't getting much done and started to slack a little bit while we were 
away.

#### What we changed this sprint

Our changes for this sprint included more asking for help when we were stuck and it 
seemed like there was more willingness to ask for help on issues.

#### What we did well

We communicated well as a whole team. Our out of class meetings were very
efficient and we were able to get a lot of things done as a group.

#### What we need to work on

We could improve our estimations on how long things will take
and what epics entail. This will allow us to more accurately
decide what we will be able to finish and implement during the sprint.

#### What we will change next sprint 

We will change our planning. We will hopefully get the plannign right next
time so that there are no surprises or stress at the end.
