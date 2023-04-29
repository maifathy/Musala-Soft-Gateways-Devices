### Gateways and realted devices Single Page App

## Table of Contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Setup](#setup)
* [Test](#test)
* [Launch](#launch)
* [Expected Output](#expected-output)
* [To-do](#todo)

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

   Another shared database is available, to use it, in .env file
   Update DB_URL to be:
   ```
   DB_URL='mongodb+srv://admin:admin@gateways.zz1nq.mongodb.net/test';
   ```
 
 * Node.js & express
 * React framework & redux toolkit & styled_components

## Setup
To run this project, install it locally using npm:

```
$ cd ../Musala-Soft-Gateways-Devices/backend
$ npm install
$ cd ../Musala-Soft-Gateways-Devices/frontend
$ npm install
```
The above commands will install the dependencies for both backend server and frontend server.

## Test
in cmd:

Backend test
```
$ cd ../Musala-Soft-Gateways-Devices/backend
$ npm run test
```
Frontend test, real database transactions is used, after each test call, the database collections are going to be cleared.
```
$ cd ../Musala-Soft-Gateways-Devices/frontend
$ npm run test
```

## Launch
To launch in browser, in your npm console:

```
$ cd ../Musala-Soft-Gateways-Devices/backend
$ npm run start
$ cd ../Musala-Soft-Gateways-Devices/frontend
$ npm run start
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

## TO-DO
Layout issues specially the messages used to get feedback for the user, need imporovements.

Enhance React Unit Tests.
