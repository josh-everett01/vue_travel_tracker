# Travel Tracker

> Travel Tracker is a web application built with Vue.js which manages and tracks different trips for users and travel agents, by consuming and posting to an external API.

[Vue Travel Tracker Live Link](https://josh-everett01.github.io/vue_travel_tracker/)
This project was created by [Joshua Everett](https://github.com/josh-everett01)

## Table of contents

- [Overview](#overview)
- [Setup](#setup)
- [Tech Stack](#tech-stack)
- [Learning Objectives](#learning-objectives)
- [Credits](#credits)
- [Contact](#contact)

## Overview

Travel Tracker utilizes the fetch API to gather data from multiple endpoints:

|     Description      |                                                               URL                                                               | Method |                                                                                          Required Properties for Request                                                                                           |                                           Sample Successful Response                                            |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
|  Get all travelers   |                          https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers                           |  GET   |                                                                                                        none                                                                                                        |                       object with travelers property containing an array of all travelers                       |
| Get single traveler  | https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/<id> where<id> will be a number of a traveler’s id |  GET   |                                                                                                        none                                                                                                        |                                        object of single traveler’s info                                         |
|    Get all trips     |                              https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips                               |  GET   |                                                                                                        none                                                                                                        |                         object with trips property containing an array of all travelers                         |
| Get all destinations |                       https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations                        |  GET   |                                                                                                        none                                                                                                        |                         object with trips property containing an array of all travelers                         |
|     Add new trip     |                              https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips                               |  POST  | {id: <number>, userID: <number>, destinationID: <number>, travelers: <number>, date: <string 'YYYY/MM/DD'>, duration: <number>, status: <string 'approved' or 'pending'>, suggestedActivities: <array of strings>} |    {message: 'Resource with id <id> successfully posted', newResource: <Object with trip info just posted>}     |
| Add new destination  |                       https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations                        |  POST  |                                {id: <number>, destination: <string>, estimatedLodgingCostPerDay: <number>, estimatedFlightCostPerPerson: <number>, image: <string>, alt: <string>}                                 | {message: 'Resource with id <id> successfully posted', newResource: <Object with destination info just posted>} |
|  Modify single trip  |                            https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip                            |  POST  |              {id: <number>, status:<String of 'approved' or 'pending', suggestedActivities: <Array of strings>} Only a status or a suggestedActivities property is required for a successful request               |          {message: 'Trip #<id> has been modified', updatedResource: <Object with newly updated data>}           |
|  Delete single trip  |                              https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips                               | DELETE |                                                                                                   {id: <Number>}                                                                                                   |                                             Trip # has been deleted                                             |

This project was created using an agile workflow implementing the issues being moved along a [Project Board](https://github.com/josh-everett01/travel_tracker/projects/1), and included a process in which I acted as a Junior Developer submitting pull requests at each iteration of the project. The Pull Request would then be reviewed by a Senior Developer who would offer instruction on areas that I needed to correct or restructure. I would then go back and correct the areas needing correcting, and the process would be repeated until that issue was complete.

This project is based on the open source Turing School curriculum located at: (https://frontend.turing.io/projects/travel-tracker.html)

A user is able to login as either an agent or traveler, and then they are able to view trips, make trip requests, and approve / delete trip requests depending on who is logged in.


#### To login as an agent use the following login information:

```
Username: agency
Password: travel2020
```

#### As an agent who is logged in you will:

- See any pending trips
- Be able to approve any pending trips
- See any trips happening on today's date
- Be able to click on "Agent Tools" to search for a traveler and then approve or delete any trips for that traveler

##### To approve a pending trip:

1. Locate the trip you would like to approve in the PENDING TRIPS section
2. Click APPROVE
3. You will see a SUCCESS message
4. The trip will no longer be in the PENDING TRIPS section upon refreshing and logging back in as agent OR logging out and logging back in as agent

##### To search for a traveler and approve / delete pending trip:

1. Click "Agent Tools / Traveler Search"
2. Search for the traveler by name in the search field
3. Click SHOW TRAVELER
4. Any PENDING trips will be shown first in the list of this travelers trips
5. To APPROVE the trip, click APPROVE
6. To DELETE the trip, click DELETE
7. Depending on the choice above the trip will now be showing as either APPROVED in the travelers list of UPCOMING TRIPS or will no longer be showing at all if it was DELETED

#### To login as any one of 50 travelers use the following login information:

```
Username: traveler1 (1 represents any valid traveler ID from the Travelers
Endpoint)
(https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers)
Password: travel2020
```

#### As a logged in traveler, you will:

- See your upcoming trips
- See your past trips
- Be able to make a trip request

##### To create a trip request:

1. Fill in the appropriate fields (destination, number of travelers, start date, and end date) and click CALCULATE
2. The trip information will then be displayed on the screen. Click CONFIRM to send the post request to the API.
3. The requested trip will be shown in your PENDING TRIPS section the next time you login.
4. Refresh the page and log back in OR click LOGOUT and then log back as the same traveler to see the new trip in the PENDING TRIPS section

![Initial Styling of project](https://i.imgur.com/bUlVubK.jpg)

## Setup

```
- Fork and/or clone this repo from the Travel Tracker Repo from:									(https://github.com/josh-everett01/travel_tracker)
- Navigate to the directory in your terminal
- $ npm install 
- $ npm run dev
- You should see a message in your terminal along the lines of:
"Project is running at http://localhost:8080/"
- Open your browser to http://localhost:8080/
- You should now be able to see and interact with the project
```
```
$ npm deploy will build and deploy project to gh-pages.
- If you have travisCI enabled the project will be automatically deployed to gh-pages upon successful pull request > merge to master
```

## Tech Stack

- Vue.js / JavaScript
- Sass / CSS3
- HTML5
- TravisCI to lint PR's and then to deploy to gh-pages upon PR approval / merge of PR
- GitHub Pages
- Hound Code Reviewer for Pull Requests 
- Vue.js Webpack Template (For a detailed explanation on how the template works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).)

## Learning Objectives

#### The purpose of my building this project was to build an application that would:

##### - Facilitate the movement of data to-and-from an API endpoint

- This was done by using JavaScript to authenticate user login, to fetch trip/destination data, and to post / delete trips via their appropriate endpoints.

##### - Display the data to a user

- To do this I created a User Interface that allowed the data to be rendered visibily for the user to view and understand. This was done using HTML / CSS / and JavaScript.

##### - Allow the user to interact with the data

- Once a user logs in via a login form they are then able to interact with the data by either making a trip request as a traveler or having the ability to approve pending trips, search for a traveler, and approve / deny trips for a traveler as an agent.

##### - Be fully responsive on all devices

- This was done by using media queries to make sure the page is rendered correctly when viewed on different devices.

##### - Facilitate my better understanding of some of the concepts associated with having a job in the web development field

- This was done by using a project board to keep track of the tasks associated with the project and to track the progress of the project. Every task had an issue created and that issue would then go through the process of being checked out, worked on, reviewed, and then approved to be merged into the project.

- I would reach out to either an online group or a mentor for guidance when I reached a point where I could not progress any further due to not being able to find the answer on my own.

- Through this project I have learned how to use git to my advantage in many ways. Most notably and what took the most practice was my learning to squash my commits into one clean-and-readable commit and then rebase to master. This helps the reviewer when reviewing pull requests.

## Credits

#### I would not have been able to finish this project without the assistance of:

- [Rob Stringer](https://github.com/Mycobee) reviewing pull requests, and providing support and guidance on all aspects of this project.
- [Colin McDonnell](https://github.com/colinmcdonnell) providing support and guidance with multiple Vue / JavaScript and CSS issues during this project.
- The group @ [JavaScript Tutoring](https://javascripttutoring.slack.com) providing support and offered assistance during this project.
- [Mozilla JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [W3 Schools JavaScript Documentation](https://www.w3schools.com/js/default.asp)
- The Contributors to the [Turing Schools Open Source Curriculum](https://frontend.turing.io/projects/travel-tracker.html)
- The contributors to the [Vue.js webpack template](http://vuejs-templates.github.io/webpack/)

## Contact

Created by [Joshua Everett](https://jeverett.tech) - feel free to contact me!

