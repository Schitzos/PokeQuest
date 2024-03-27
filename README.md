# Project Setup Guide

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Schitzos_PokeQuest&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Schitzos_PokeQuest&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Schitzos_PokeQuest&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Schitzos_PokeQuest&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Schitzos_PokeQuest&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Schitzos_PokeQuest&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Schitzos_PokeQuest&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Schitzos_PokeQuest)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest) [![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=Schitzos_PokeQuest)
 
## Introduction

This guide will walk you through the steps to set up and run the project. The project is built using React Native v0.73.2 and requires Node.js version 18 or above, as well as Java version 17.

## Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Installation

1. Clone the repository to your local machine:
2. Navigate to the project directory:
3. Install project dependencies:

    ```bash
    npm install
    ```
4. On your root folder, add file .env and put this value for the env

   ```bash
   BASE_URL = 'https://pokeapi.co/api/v2'
   ```

   if you running on macOS, it will auto install pod, please make sure you have pod installed on your maching

## Running the Project

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
