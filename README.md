### Gateways and realted devices Single Page App

## Table of Contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Setup](#setup)
* [Test](#test)
* [Launch](#launch)
* [Expected Output](#expected-output)

## Introduction
 A simple interface to preview the available gateways and their devices.
 A REST API to connect to database is used.

## Technologies
 * MongoDB
   To download installer: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/, after installation, 
   in your cmd, cd to:

   ```
   [PATH]/MongoDB/Server/5.0/bin/
   ```
   then type: 
   ```
   mongo
   ```

   The server now is working.

   To create the database:

   ```
   use Gateways
   ```
   Note: local database is important for test cases to be done.

   Another shared database is available, to use it, in ../utils/helpers.js.
   Update dbUrl to be:
   ```
   dbUrl = 'mongodb+srv://admin:admin@gateways.zz1nq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
   ```
 
 * Node.js & express
 * React framework & redux toolkit

## Setup
To run this project, install it locally using npm:

```
$ cd ../gatways-devices
$ npm install
$ cd ../gatways-devices/frontend
$ npm install
```
The above commands will install the dependencies for both backend server and frontend server.

## Test
in cmd:

```
$ cd ../gatways-devices
$ npm test
```

## Launch
To launch this web, in your npm console:

```
$ cd ../gatways-devices
$ npm start
$ cd ../gatways-devices/frontend
$ npm start
```
In your browser, go to: http://localhost:3000/

## Expected Output
A simple layout for Gateways will appear, at first no gateway.
User can add gateways directly from the form.

An updated list with available gateways will be shown. Each gateway, has a link to show devices in same layout.
User can add/remove devices.
User can click a single gateway to show its details (Used the api call instead of state of redux just to
  show the usage of it as required).

Redux is managing all adding of gateways and adding/removing of devices.
