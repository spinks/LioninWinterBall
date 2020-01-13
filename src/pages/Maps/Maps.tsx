import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg
} from '@ionic/react';
import React from 'react';

const Maps: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src="/assets/map/map.png" alt="map"></IonImg>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
