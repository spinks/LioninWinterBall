import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonViewDidEnter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { musicalNotes, restaurant, navigate, home, time } from 'ionicons/icons';
import Home from './pages/Home';
import Music from './pages/Music';
import Food from './pages/Food';
import Maps from './pages/Maps';
import Schedule from './pages/Schedule';
import Details from './pages/Details';

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

// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

const App: React.FC = () => {
  useIonViewDidEnter(() => {
    // does not seem to be working
    window.screen.orientation.lock('portrait');
    console.log('ionViewDidEnter event fired');
  });
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/music" component={Music} exact={true} />
            <Route path="/food" component={Food} exact={true} />
            <Route path="/food/details" component={Details} />
            <Route path="/maps" component={Maps} exact={true} />
            <Route path="/schedule" component={Schedule} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/home" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
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
  );
};

export default App;
