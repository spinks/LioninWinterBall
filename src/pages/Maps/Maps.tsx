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
import {toggleImage} from '../../App';

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
        <IonCard color="dark" class="always-dark">
          <img id='map' src='/assets/map/map.png' alt="" onLoad={()=>toggleImage('map','/assets/map/map',true)} />
          <IonCardHeader>
            <IonCardTitle>Map</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
