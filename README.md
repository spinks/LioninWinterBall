# Lion in Winter Ball App
App built on the ionic react framework, to be deployed to iOS and Android for the Lion in Winter Ball for Hatfield College.

To get an initial grip of the structure of the repository and how to develop the app, it is best to have a read of the [ionic documentation](https://ionicframework.com/docs/intro) (particularly [scaffolding](https://ionicframework.com/docs/building/scaffolding) for the structure.) 

## Set Up Development environment
`npm install` to install all required packages. 
Dev dependencies, such as `eslint`, `prettier`, and the `capacitorcli` (command line interface) will also be installed. 

When writing code you should be linting, and following the style rules (these are thrown as errors in `eslint`. For example VSCode extensions such as [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) will streamline this process, but you can use any alternatives. The rulesets given in the repository will ensure consistency.

### Components
Certain functionalities are already implemented on various pages, which may be useful for the ball.

**Countdown** [react-countdown-now](https://www.npmjs.com/package/react-countdown-now). Provides countdown to a set date (ball, ticket release, etc). The renderer method seen in `home.tsx` is how the remaining time is displayed.

## Modifying Content
Trivial changes to content can be made, simply be editing the `tsx` files for each page. New page formats and such can be built from the components at [ionic components](https://ionicframework.com/docs/components). You are of course able to build any other functionality, using react JS primitives.

### Theming
You are able to have individual css pages imported per page, but for consistency it is probably easier to keep them all in the variables.css file. If you have different bespoke styles for a certain page then keep that within a specific css file.

## Building
The app's mobile builds are made with capacitor (see [building-your-app](https://capacitor.ionicframework.com/docs/basics/building-your-app)).

See [capacitor getting-started](https://capacitor.ionicframework.com/docs/getting-started) for extended basic information, then for ionic start up information see [capacitor ionic getting started](https://capacitor.ionicframework.com/docs/getting-started/with-ionic/).

You shouldn't need to run `ionic integrations enable capacitor` but if you are encountering issues, you could check that it is enabled via `ionic integrations list` and checking capacitor's status.

You will then need to initialise the capacitor module with `npx cap init`. You will need to choose an app name (for example LioninWinterBall*2020*) and an appID (we use `com.hatfield.liwb2020`).

Then following the capacitor docs, you will build the app with ionic `ionic build` add platforms:
```
npx cap add ios
npx cap add android
```
and build, run, and deploy with:
```
npx cap open ios
npx cap open android
```

To update these builds (for testing for example) you will need to again build the ionic app with `ionic build` and sync with `npx cap sync`.

You may want to lock the screen orientation of your app, this is best done in the dedicated development studios, for instance the screen orientation options within Xcode when deploying.

### Device Native Dependencies
For Cordova and Ionic Native plugins see [using plugins](https://capacitor.ionicframework.com/docs/cordova/using-cordova-plugins/)

### iOS
To build for iOS, you need a Mac with Xcode.
For compatibility with capacitor you need to install `cocoapods`.
```
sudo gem install cocoapods 
```

Within Xcode you should modify assets such as the loading splash screen, app icon, and other pertinent details.

For deployment instructions see [iOS distribution](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/).

## Firebase
For your usage case you may want to use Firebase, as these components are already configured in this project it is probably the most convenient method for content management and notification pushes (and one of the most widespread technologies for this purpose anyways).

For reference these 
