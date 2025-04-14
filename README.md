# BetParser WebApp

BetParser WebApp is an Angular application designed to analyze live betting odds. It connects to the same Firebase database as [BetParser Crawler](https://github.com/mtmarco87/betparser_crawler), where parsed betting odds and related information are stored.

### Key Features:

- **Live Odds Analysis**: View and analyze live betting odds in real-time.
- **SureBets and ValueBets Detection**: Automatically identify profitable betting opportunities.
- **Firebase Integration**: Access shared data from a Firebase database.

## Table of Contents

1. [Live Demo](#live-demo)
2. [Environment Setup](#environment-setup)
3. [IDE Configuration](#ide-configuration)
4. [Application Configuration](#application-configuration)
5. [UX Template](#ux-template)
6. [Angular Framework Usage](#angular-framework-usage)
7. [License](#license)

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
   - **Angular CLI**: Version >= 8
   - **Firebase CLI**: Version > 7.5

### Steps to Set Up

1. **Install Dependencies**:  
   Open a terminal in the project folder and run:

   ```bash
   yarn install
   # or
   npm install
   ```

2. **Verify Global Tools**:  
   Ensure Angular CLI and Firebase CLI are installed globally.  
   Use the following commands to check versions:

   ```bash
   ng version
   firebase --version
   ```

3. **Learn More**:
   - [Angular CLI Documentation](https://angular.io/cli)
   - [Firebase CLI Documentation](https://firebase.google.com/docs/cli)

## IDE Configuration

1. **Choose an IDE**:  
   Recommended: [Visual Studio Code](https://code.visualstudio.com/) (freeware).

2. **Install VS Code Extensions**:  
   Add these extensions for a better development experience:
   - Angular Files (quick scaffolding)
   - Angular Language Service (template support)
   - Angular Snippets (powerful snippets)
   - Debugger for Chrome
   - HTML Format

## Application Configuration

1. **Firebase DB**:  
   Update the following files with your Firebase DB configuration (API key, domain, etc.):

   - `src/environment/environment.ts`
   - `src/environment/environment.prod.ts`

2. **Google Maps (Optional)**:  
   To enable Google Maps features, replace the `YOUR_MAPS_API_KEY` placeholder in `src/index.html` with your Google Maps API key.

3. **Firebase WebApp Deployment (Optional)**:  
   Deploy the app to Firebase using these commands:
   ```bash
   ng build --prod
   firebase login --interactive
   firebase deploy
   ```
   Additional configuration may be required to set up the target project/cloud storage on Firebase.

## UX Template

Special thanks to [Creative Tim](https://www.creative-tim.com) for the Black Dashboard Angular UI template.  
While heavily reworked, the app's graphical charm is due to their amazing design.

## Angular Framework Usage

### Development Server

Run the following command to start a development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload when source files are modified.

### Code Scaffolding

Generate a new component, directive, or other Angular elements using:

```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Build

Build the project with:

```bash
ng build
```

For a production build, use:

```bash
ng build --prod
```

### Running Unit Tests

Execute unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Running End-to-End Tests

Execute end-to-end tests via [Protractor](http://www.protractortest.org/):

```bash
ng e2e
```

### Further Help

To get more help on the Angular CLI, use:

```bash
ng help
```

Or visit the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for more details.
