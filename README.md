# Project Setup Guide

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
