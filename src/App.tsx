import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { musicalNotes, restaurant, navigate, home, time } from 'ionicons/icons';

/* Page directory */
import * as Home from './pages/Home/index';
import * as Music from './pages/Music/index';
import * as Food from './pages/Food/index';
import * as Maps from './pages/Maps/index';
import * as Schedule from './pages/Schedule/index';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import AppContext from './AppContext';

import fb from './Firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

toggleDarkTheme(prefersDark.matches);

// Listen for changes to the prefers-color-scheme media query
prefersDark.addListener(mediaQuery => toggleDarkTheme(mediaQuery.matches));

// Add or remove the "dark" class based on if the media query matches
/**
 * @param {any} shouldAdd
 */
function toggleDarkTheme(shouldAdd: boolean | undefined) {
  document.body.classList.toggle('dark', shouldAdd);
}

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [value, loading, error] = useDocumentData(
    fb
      .firestore()
      .collection('master')
      .doc('liwb')
  );
  return (
    <AppContext.Provider value={[value, loading, error]}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              {/* Home */}
              <Route path="/home" component={Home.Home} exact={true} />
              <Route
                path="/home/ballInformation"
                component={Home.BallInformation}
                exact={true}
              />
              <Route
                path="/home/sponsors"
                component={Home.Sponsors}
                exact={true}
              />
              <Route
                path="/home/appInformation"
                component={Home.AppInformation}
                exact={true}
              />
              <Route
                path="/home/diningEnter"
                component={Home.DiningEnter}
                exact={true}
              />
              {/* Music */}
              <Route path="/music" component={Music.Music} exact={true} />
              <Route path="/music/disco" component={Music.Disco} exact={true} />
              {/* Food */}
              <Route path="/food" component={Food.Food} exact={true} />
              <Route path="/food/dining" component={Food.Dining} exact={true} />
              {/* Maps */}
              <Route path="/maps" component={Maps.Maps} exact={true} />
              {/* Schedule */}
              <Route
                path="/schedule"
                component={Schedule.Schedule}
                exact={true}
              />
              {/* Entry Point */}
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" translucent>
              <IonTabButton tab="music" href="/music">
                <IonIcon icon={musicalNotes} />
                {/* <IonLabel>Music</IonLabel> */}
              </IonTabButton>
              <IonTabButton tab="food" href="/food">
                <IonIcon icon={restaurant} />
              </IonTabButton>
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="schedule" href="/schedule">
                <IonIcon icon={time} />
              </IonTabButton>
              <IonTabButton tab="maps" href="/maps">
                <IonIcon icon={navigate} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
