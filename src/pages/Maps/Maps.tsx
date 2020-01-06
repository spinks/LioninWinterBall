import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import React from 'react';

import { useSwipeable } from 'react-swipeable';

import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
let deviceInfo = {};
Device.getInfo().then(r => {
  deviceInfo = r;
});

const Maps: React.FC = (props: any) => {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      if ('platform' in deviceInfo && deviceInfo['platform'] === 'android') {
        props.history.replace('schedule');
      }
    }
  });
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen {...handlers}>
        {/* <IonImg src="/assets/map.png"></IonImg> */}
        <IonCard color="dark">
          <img src="/assets/map/map.png" alt="" />
          <IonCardHeader>
            <IonCardTitle>Map</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
