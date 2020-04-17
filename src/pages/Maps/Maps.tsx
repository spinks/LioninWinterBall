import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg
} from '@ionic/react';
import React from 'react';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Maps: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TransformWrapper>
          <TransformComponent>
            <IonImg src="/assets/map/map.png" alt="map"></IonImg>
          </TransformComponent>
        </TransformWrapper>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
