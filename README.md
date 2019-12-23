<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Lion in Winter Ball App](#lion-in-winter-ball-app)
  - [Set Up Development environment](#set-up-development-environment)
  - [Modifying Content](#modifying-content)
    - [Theming](#theming)
  - [Building](#building)
    - [Device Native Dependencies](#device-native-dependencies)
    - [iOS](#ios)
  - [Firebase](#firebase)
    - [One Document](#one-document)
    - [Document Reading and Implementing](#document-reading-and-implementing)
      - [Document](#document)
        - [Notify](#notify)
      - [Implementing](#implementing)
  - [Silent Disco](#silent-disco)
  - [Additional Notes](#additional-notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Lion in Winter Ball App

App built on the ionic react framework, to be deployed to iOS and Android for the Lion in Winter Ball for Hatfield College.

To get an initial grip of the structure of the repository and how to develop the app, it is best to have a read of the [ionic documentation](https://ionicframework.com/docs/intro) (particularly [scaffolding](https://ionicframework.com/docs/building/scaffolding) for the structure.)

## Set Up Development environment

`npm install` to install all required packages.
Dev dependencies, such as `eslint`, `prettier`, and the `capacitorcli` (command line interface) will also be installed.

When writing code you should be linting, and following the style rules (these are thrown as errors in `eslint`. For example VSCode extensions such as [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) will streamline this process, but you can use any alternatives. The rule-sets given in the repository will ensure consistency.

When developing using `ionic serve` and running in a chrome is a much faster approach, and allows live reloading.

## Modifying Content

Trivial changes to content can be made, simply be editing the `tsx` files for each page. New page formats and such can be built from the components at [ionic components](https://ionicframework.com/docs/components). You are of course able to build any other functionality, using react JS primitives.

**Countdown** [react-countdown-now](https://www.npmjs.com/package/react-countdown-now). Provides countdown to a set date (ball, ticket release, etc). The renderer method seen in `home.tsx` is how the remaining time is displayed.

Much of the functionality is inbuilt into the grid system which is described in depth in the firestore section below.

### Theming

You are able to have individual css pages imported per page, but for consistency it is probably easier to keep them all in the variables.css file. If you have different bespoke styles for a certain page then keep that within a specific css file.

## Building

The app's mobile builds are made with capacitor (see [building-your-app](https://capacitor.ionicframework.com/docs/basics/building-your-app)).

See [capacitor getting-started](https://capacitor.ionicframework.com/docs/getting-started) for extended basic information, then for ionic start up information see [capacitor ionic getting started](https://capacitor.ionicframework.com/docs/getting-started/with-ionic/).

You shouldn't need to run `ionic integrations enable capacitor` but if you are encountering issues, you could check that it is enabled via `ionic integrations list` and checking capacitor's status.

You will then need to initialise the capacitor module with `npx cap init`. You will need to choose an app name (for example LioninWinterBall*2020*) and an appID (we use `com.hatfield.liwb`).

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

To update these builds (for testing for example) you will need to again build the ionic app with `ionic build` and sync with `npx cap sync` (or just `npx cap copy` for non-package changes).

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

For your usage case you may want to use Firebase, as these components are already configured in this project it is probably the most convenient method for content management and notification pushes (and one of the most widespread technologies for this purpose anyway).

The implementation of the Firebase Firestore Content Management System, as found in this app is detailed below.

After creating a Firebase project you want to initialise the Firestore database; from the console's navigation pane, select Database, then click Create database for Cloud Firestore (for location pick the most sensible server).

After this within the [FirebaseConfig.tsx](./src/FirebaseConfig.tsx) file in the `src` folder, you need to update the config object. This is done as follows (copied from Firestore documentation):

1. Sign in to Firebase, then open your project.
2. Click the Settings icon, then select Project settings.
3. In the Your apps card, select the nickname of the app for which you need a config object.
   - If not yet configured create a **web** app.
4. Select Config from the Firebase SDK snippet pane.
5. Copy the config object snippet, then add it to your app (example FirebaseConfig file shown below.)

```tsx
export default {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};
```

#### One Document

This portion is rather implementation specific, but we found it best fitted our needs for the ball. As Firebase charges per document read it is optimal to minimise these, so as to stay under the free plans limit of 50,000 reads per day. The way this is done is by simply having _maps_ all under one master document. Maps are essentially JSON objects and allow nesting any other number of maps beneath them. The limit to this is that there is a maximum of 20,000 _ID's_ per document, and that it is less efficient to read the whole document, however, for the purposes of a ball app, the possibility that you exceed 20,000 ids, or need to perform very frequent updates (which would need efficient reading) is low (if you want to learn more see [maps, arrays, subcollections](https://youtu.be/o7d5Zeic63s) and [firestore pricing](https://youtu.be/6NegFl9p_sE).)

The existing infrastructure is based on this one document philosophy (feel free to change but you will have to update the utilities).

#### Document Reading and Implementing

In [Firebase.tsx](./src/Firebase.tsx) the firebase app is initialised and a **document reference** to the master document is created and exported. (When naming your database files you can copy the **master/liwb** **collection/document** naming convention.)

To read from this document and implement the data we use the `react-firebase-hooks/firestore` library (as it has the cleanest interface). Should you want to stick with the IonGrid->IonCard layout as seen in this app there is a very useful grid function in [utilities/grid.tsx](./src/utilities/grid.tsx). If you do not want to stick with this app design philosophy or change how the firestore db is structured this can serve as a guide on how to generate the page contents from a firebase document array (from the `react-firebase-hooks` library).

Here is a walk-through (as implemented) of using the IonGrid->IonCard structure with a firestore db, and how to structure the document.

##### Document

At the top level of the document you should have maps, with their IDs as the page (or content group) names. For example we have map IDs `music, food, maps, schedule` and so on.

You should also have a string called `visibility` set to `public` (this is for the rules if you copy the format seen later in the silent disco section)

If you then want this page (content) to be formatted into a grid of cards (and make use of the grid utility) the second level (within each page map) should be maps with numbers as IDs, `"0"`, `"1"`, and so on, these represent the rows of the grid.

Within these numbered row maps: either:

- **A** — the set of card fields (actual content described later) or
- **B** — maps with IDs `"0"` and `"1"`, these represent the left and right hand columns respectively. Within these two column maps you also have the card fields.

Card fields (all are strings unless otherwise noted):

- `title` — the large card title
- `subtitle` — the smaller card subtitle
- `img` — a link (either relative within the app, or absolute to a web URL) to an image to be displayed on the card
- `body` — the body-text for the card
- `router` — a link to navigate to another page within the app, as listed in the IonRouterOutlet component in [App.tsx](./src/App.tsx)
- `href` — a full web link to navigate a user out of the app to a webpage
- `popup` — a string for a more detailed pop up window which comes up when the card is pressed (html styling can be done within this string, such as `<br/>` and `<strong></strong>`). This popup will also use the `title` variable for its header.
- `notify` — a map: see below

###### Notify

Cards can also have a notify field. The presence of a notify field will add the small icon in the corner allowing custom alerts per card locally. If you implement a notifier on a card it is **essential** that all the following components of the `notify` map are filled out correctly.

The notify field is a map, the sub fields of the map are as follows (again all are strings unless otherwise noted):

- `id` — a `number`: it is important that you choose unique numbers for each notification, as they will clash otherwise. (This can however be used to allow toggling the same notification from different cards, if you want this behaviour)
- `title` — the notification title
- `body` — the content of the notification
- `datetime` — A date time string that can be parsed through the javascript [Date function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), example: `2019-12-12T10:00:00Z`. This is the time at which the notification is set for.

Note if you update these after they have been released to users the scheduled notification will not change unless they cancel and re-enable the notification.

##### Implementing

In the [App.tsx](./src/App.tsx) the **master document reference** is read once, this is then stored in the app context, and passed to all children (`AppContext.Provider`), again minimising reads.

Within a page component the following imports,

```tsx
// grid utility
import grid from '../../utilities/grid';
// read in the app context document data
import AppContext from '../../AppContext';
```

And within the functional component, the following line

```tsx
const vle = Object.values(React.useContext(AppContext));
```

And then within an IonGrid, the following snippet

```tsx
{
  grid(vle, 'music');
}
// where music is the ID of the top level map that you want to format
```

The notifier chips can also be implemented on static cards with:

```tsx
<NotifyChip
  {...{
    id: 12,
    datetime: '2019-12-12T10:00:00Z',
    body: 'test notification body content',
    title: 'This is a notification'
  }}
/>
```

## Silent Disco

_foreword:_ The song request system has been built with the premise that each user gets one song request, this can be changed although with some effort.

The system uses the Spotify API to search songs, with those choices being published to a firebase collection.

To set up this system for use there are a few components which need to be configured.

**Spotify Api** - you need to create a new app on the Spotify developer portal.

Then create a serverless function, deployed with Zeit (for example), which performs the post request to Spotify to get tokens. The function then returns this token to the app. This ensures the security of the client secret. For example of this ask Ben Spinks.

**Firebase Firestore** - you need to:

1. On the console goto auth, enable anonymous authentication
2. Create a `songs` collection
3. Set up write rules, your database rules file should look something like:

```
match /databases/{database}/documents {
  service cloud.firestore {
    match /songs/{userId} {
      allow write, update, create: if request.auth.uid == userId
    }
    match /{document=**} {
      allow read: if (resource.data.visibility == 'public')
    }
  }
}
```

If you have a large amount of song requests be cautious of using the firebase console to look at them, as every user song push or page refresh will perform **a lot** of reads, definitely do not leave it open for extended periods.

## Additional Notes

On routing, if using `router='somepage/subpage'` if the router value matches _exactly_ the capitalisation of the route as declared in the IonRouterOutlet then it will stay on the sub-page when swapping between tabs. If it is not exact (ie `router='Somepage/subpage`) the link will still work, and it will reset back to the parent tab page on going to a different tab and back. Pressing the tab icon for the parent page from within a sub-page will always navigate you back to the parent page.
