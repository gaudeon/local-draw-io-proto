# Local draw.io prototype

## Vision
The goal of this repository is to provide a convenient, shared and versioned resource to represent and track diagrams.

## The Diagrams
The most important part is the diagram data. Stored in [draw.io](http://draw.io/) XML format in the diagrams subfolder. This data can be imported into draw.io's online tool and updated. Then it is recommended to export the changes and save them back here.

Alternatively this repo also contains a localized package of tools to edit the diagrams. This is composed of a simple custom coded client/server for saving diagram data on top of a local draw.io server all using docker-compose!

## Local Tool Prerequisites

This app uses docker/docker-compose to build run the necessary services to support the application. 

## Running the Local Tool

In order to start this application you must: 

1. (first time or rebuilds only) `make build`

2. Run `make start`

3. Then, browse to the web app at `https://localhost:3000`

Note: this is a react app using react dev server, spinup of the dev server could take several minutes. Especially if node modules are being installed for the first time.

## Stopping the Local Tool

When you are done you will want to stop application services by running:

`make stop`

## Directory Structure

./
- etc/ - the location of dockerfiles needed for docker compose
- client - the location of the davinci react client for embedded draw io manipulation of diagrams
- server - the location of the davinci node express server for diagram management
- diagrams - the location of the architecture diagrams themselves
