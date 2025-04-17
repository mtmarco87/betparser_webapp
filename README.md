# BetParser WebApp

BetParser WebApp is a modern Angular application for analyzing live betting odds. Built for sports betting enthusiasts and analysts, it provides real-time insights into SureBets and ValueBets, helping users identify profitable opportunities.

## Disclaimer

This software is provided for educational and research purposes only. The authors of this project do not condone or encourage any illegal activities, including but not limited to unauthorized data scraping or infringement of intellectual property rights.

All trademarks, logos, and brand names mentioned in this project (e.g., Bwin, Bet365, William Hill, Sisal, Eurobet, etc.) are the property of their respective owners. The use of these names is for identification purposes only and does not imply endorsement or affiliation.

By using this software, you agree that the authors are not liable for any misuse or legal consequences arising from its use. It is your responsibility to ensure compliance with all applicable laws and regulations in your jurisdiction.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Live Demo](#live-demo)
5. [Environment Setup](#environment-setup)
   - [Prerequisites](#prerequisites)
   - [Setup Steps](#setup-steps)
   - [Configuration](#configuration)
6. [Usage](#usage)
   - [How to Run](#how-to-run)
7. [Development](#development)
   - [Angular Framework](#angular-framework)
   - [IDE Configuration](#ide-configuration)
8. [Acknowledgments](#acknowledgments)
9. [Support](#support)
10. [License](#license)

## Project Overview

BetParser WebApp is a tool designed to empower sports betting enthusiasts and analysts by providing actionable insights into live betting odds. By leveraging Firebase for real-time data synchronization, the app ensures users can access up-to-date information on SureBets and ValueBets. Additionally, its integration with [BetParser Crawler](https://github.com/mtmarco87/betparser_crawler) allows seamless access to parsed betting data, creating a unified ecosystem for betting analysis. Built with Angular, the app prioritizes responsiveness and ease of use, making it suitable for both casual users and professional analysts.

## Features

- **Live Odds Analysis**: View and analyze live betting odds in real-time.
- **SureBets and ValueBets Detection**: Automatically identify profitable betting opportunities.
- **Firebase Integration**: Seamlessly sync and access shared data.

## Screenshots

Here are some screenshots of the BetParser WebApp in action:

![Home Page](assets/screenshots/webapp-1.png)

### Live Odds Analysis

![Live Odds Analysis 1](assets/screenshots/webapp-2.png)
![Live Odds Analysis 2](assets/screenshots/webapp-3.png)

### SureBets Detection

![SureBets Detection](assets/screenshots/webapp-4.png)

## Live Demo

Check out the latest working version of the app here:  
[BetParser WebApp](https://parser-b8114.firebaseapp.com/)

## Environment Setup

### Prerequisites

1. Install a package manager:

   - [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable) (recommended)
   - [Node-NPM](https://nodejs.org/it/download/)

2. Install global tools:

   ```bash
   yarn global add @angular/cli firebase-tools
   # or
   npm install -g @angular/cli firebase-tools
   ```

3. Verify global tools:
   Ensure Angular CLI and Firebase CLI are installed globally.  
   Use the following commands to check versions:

   ```bash
   ng version
   firebase --version
   ```

   Required versions:

   - **Angular CLI**: Version >= 8
   - **Firebase CLI**: Version > 7.5

### Setup Steps

- Install dependencies:  
  Open a terminal in the project folder and run:

  ```bash
  yarn install
  # or
  npm install
  ```

### Configuration

1. Firebase DB:  
   This app requires the same Firebase DB used by [BetParser Crawler](https://github.com/mtmarco87/betparser_crawler). Ensure you configure the following files with the Firebase DB settings (API key, domain, URL, etc.):

   - `src/environment/environment.ts`
   - `src/environment/environment.prod.ts`

> **Note**: The shared Firebase DB contains the `parsed_bets` collection, which stores the parsed betting data.

2. Google Maps (Optional):  
   To enable Google Maps features, replace the `YOUR_MAPS_API_KEY` placeholder in `src/index.html` with your Google Maps API key.

3. Firebase WebApp Deployment (Optional):  
   Deploy the app to Firebase using these commands:

   ```bash
   ng build --prod
   firebase login --interactive
   firebase deploy
   ```

   Additional configuration may be required to set up the target project/cloud storage on Firebase.

## Usage

### How to Run

Run the following command to start the application:

```bash
ng serve
```

Navigate to http://localhost:4200/. The app will automatically reload when source files are modified.

## Development

### Angular Framework

#### Development Server

Run the following command to start a development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload when source files are modified.

#### Code Scaffolding

Generate a new component, directive, or other Angular elements using:

```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

#### Build

Build the project with:

```bash
ng build
```

For a production build, use:

```bash
ng build --prod
```

#### Running Unit Tests

Execute unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

#### Running End-to-End Tests

Execute end-to-end tests via [Protractor](http://www.protractortest.org/):

```bash
ng e2e
```

#### Further Help

To get more help on the Angular CLI, use:

```bash
ng help
```

Or visit the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### IDE Configuration

1. **Recommended IDE**:  
   [Visual Studio Code](https://code.visualstudio.com/) (freeware).

2. **Install VS Code Extensions**:  
   Add these extensions for a better development experience:
   - Angular Files (quick scaffolding)
   - Angular Language Service (template support)
   - Angular Snippets (powerful snippets)
   - Debugger for Chrome
   - HTML Format

## Acknowledgments

Special thanks to [Creative Tim](https://www.creative-tim.com) for the Black Dashboard Angular UI template.  
While heavily reworked, the app's graphical charm is due to their amazing design.

## Support

If you find this project useful, consider supporting its development:

- ⭐ Star the repository to show your appreciation.
- 💬 Share feedback or suggestions by opening an issue.
- ☕ [Buy me a coffee](https://buymeacoffee.com/mtmarco87) to support future updates and improvements.
- 🔵 BTC Address: `bc1qzy6e99pkeq00rsx8jptx93jv56s9ak2lz32e2d`
- 🟣 ETH Address: `0x38cf74ED056fF994342941372F8ffC5C45E6cF21`

## License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for more details.
