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
        <div style={{ height: '100%', alignItems: 'center', display: 'flex' }}>
          <TransformWrapper>
            <TransformComponent>
              <IonImg
                src="/assets/map/map.png"
                alt="map"
                style={{ height: '95vh', objectFit: 'contain' }}
              ></IonImg>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
