
# connect-4-pratilipi

## Description
This app contains rest-apis for connect4 game (**Pratilipi** backend hiring challenge).

## Tech stack
node, express & mongoDB

## Repository
https://github.com/theyashwantsoni/connect-4-pratilipi

## Demo
https://intense-refuge-04341.herokuapp.com/

## Build
### Local ENV
 1. mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
 2. node index.js

### Docker
 - docker build -t <-app-name> .
 - docker run -p <-port-external>:<port-internal> <-app-name>
### Docker-compose
 - docker-compose build
 - docker-compose up -d


## Api Endpoints
According to the problem statement & diffculty levels this app contains two types of api endpoints.

Baseurl : 127.0.0.1:3000 or https://intense-refuge-04341.herokuapp.com/

---
headers:

Access-Control-Allow-Origin: *
Content-Type:application/json; charset=utf-8 

---
Response Format

status: (200, 201, 400, 500)

body: Object

messege: string

---


**With MongoDB**
 1) Welcome API
 
| URL |  <-baseurl>/ |
|--|--|
| Method |  GET|
| description | Welcome messege |

 

2)Start API

| URL |  <-baseurl>/db/start |
|--|--|
| Method |  GET|
| description | To start a new game |

3)Move API

| URL |  <-baseurl>/db/move/:gameid/:column |
|--|--|
| Method |  GET|
| description | To start a valid move |
| gameid | *gameid* is a unique id (_id from start api) |
| column | *column* is a number (1 - 7) |

whenever a user wins by making a valid move, this api will return a response with winner name.

---

 **Without MongoDB**

**1) <-baseurl>/**
		**Method**: GET; 
		**description**: Welcome messege

**2)<-baseurl>/start**
**Method**: GET; 
**description**: To start a new game

**3) <-baseurl>/move/:gameid/:column**
**Method**: GET; 
**description**: To create a valid game.
here, *gameid* is a unique id (_id from start api)
and *column* is a number (1 - 7)

---

**Clear API(Common for both)**

| URL |  <-baseurl>/clear |
|--|--|
| Method |  DELETE |
| description | To delete all the existing game boards |
