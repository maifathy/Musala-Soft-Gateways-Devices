### Gateways and realted devices Single Page App

## Table of Contents
* [Introduction](#introduction)
* [Setup](#setup)
* [Launch](#launch)
* [Expected Output](#expected-output)

## Introduction
 A simple interface to preview the available gateways and their devices.
 A REST API to connect to database is used.

## Technologies
 * MongoDB
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

## Launch
To launch this web, in your npm console:

```
$ cd ../gatways-devices
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
