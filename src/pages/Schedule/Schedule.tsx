import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonGrid
} from '@ionic/react';

import grid from '../../utilities/grid';
import AppContext from '../../AppContext';

import { useSwipeable } from 'react-swipeable';

import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
let deviceInfo = {};
Device.getInfo().then(r => {
  deviceInfo = r;
});

const Schedule: React.FC = (props: any) => {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      if ('platform' in deviceInfo && deviceInfo['platform'] === 'android') {
        props.history.replace('home');
      }
    },
    onSwipedLeft: () => {
      if ('platform' in deviceInfo && deviceInfo['platform'] === 'android') {
        props.history.replace('maps');
      }
    }
  });
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen {...handlers}>
        <IonGrid>{grid(vle, 'schedule')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
