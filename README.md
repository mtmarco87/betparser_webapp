# BetParser WebApp

BetParser WebApp is connected to the same FireBase DB of (BetParser Crawler)[https://bitbucket.org/marcotrinastich/betparser_crawler], where parsed betting odds and any information is written.

This WebApp is an Angular application, that allows to view and analyze live updated betting odds. The application is also able to scan for SureBets and ValueBets, and to propose valuable betting information to the user.


## Live Demo Page
You can visit the latest working version of BetParser WebApp on: https://parser-b8114.firebaseapp.com/

## Environment Setup

### Install Libraries (node modules)

To prepare the environment, the first thing we need to do is to install the libraries.
There are 2 ways to fulfill this task:

1) NPM - node package manager
2) Yarn package manager

We suggest to use Yarn, since the configuration of the source code has been made using this tool.

Choosen the package manager, we have to follow these steps:

1) Install the choosen package manager ((Yarn)[https://yarnpkg.com/lang/en/docs/install/#windows-stable] or (Node-NPM)[https://nodejs.org/it/download/])

2) Install all the project libs - open a terminal/cmd window on the project folder and run: `yarn install` (or `npm install`)

3) Install global tools - open a terminal again and run: `yarn global add @angular/cli` (or `npm install -g @angular/cli`), to install globally the Angular CLI (ver >= 8), and `yarn global add firebase-tools` (or `npm install -g firebase-tools`), to install globally the FireBase CLI (ver > 7.5)

4) Check the section below for the usage of the Angular CLI, and on the internet for more information about the FireBase CLI. The FireBase CLI is extremely useful if one wants not only read the crawler data from the shared FireBase DB, but also wants to deploy the WebApp directly on the FireBase cloud web storage.

## IDE Configuration

1) Choose your favourite IDE between e.g. Visual Studio Code or WebStorm (suggested VS Code, freeware)

2) If using VS Code it comes really in a handy to add some extensions:
	
	- Angular Files (quick scaffolding)
	- Angular Language Service (angular templates support)
	- Angular Snippets (extremely powerful snippets)
	- Debugger for Chrome
	- HTML Format

## Application Configuration

1) FireBase DB: the most important files that need to be modified to get the app running are: `src/environment/environment.ts` and `src/environment/environment.prod.ts`. Inside this files it has to be inserted the FireBase DB configuration (api key, domain, etc.)

2) Google Maps (optional): to enable some extra feature (google maps) is possible to modify `src/index.html` and replace the `YOUR_MAPS_API_KEY` placeholder with your Google Maps API key

3) FireBase WebApp Deploy (optional): if you'd like to be able to deploy your web app to FireBase, you can use the following commands:

	- `ng build --prod`, first of all to get a final build of your app
	- `firebase login --interactive`, to login in interactive mode to your FireBase account
	- `firebase deploy`, to start the deploy of the latest version of your webapp
	- some further configuration may be needed to set up the target project/cloud web storage on FireBase

## UX Template	

A big thanks goes to Creative Tim (www.creative-tim.com) with his amazing Black Dashboard Angular UI template.

We did a lot of reworks, so much that the interface is quite different now, but the graphical charm of this app is completely due to his job.

## Extra: Angular Framework Usage

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.
