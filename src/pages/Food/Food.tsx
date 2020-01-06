import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonHeader,
  IonToolbar,
  IonTitle
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

const Food: React.FC = (props: any) => {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      if ('platform' in deviceInfo && deviceInfo['platform'] === 'android') {
        props.history.replace('music');
      }
    },
    onSwipedLeft: () => {
      if ('platform' in deviceInfo && deviceInfo['platform'] === 'android') {
        props.history.replace('home');
      }
    }
  });
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen {...handlers}>
        <IonGrid>{grid(vle, 'food')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Food;
