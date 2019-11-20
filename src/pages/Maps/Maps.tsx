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

const Maps: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
