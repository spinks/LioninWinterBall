import React from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid
} from '@ionic/react';

import Grid from '../../utilities/grid';

const BallInformation: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Information and Help</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <Grid pageKey="home/ballInformation" />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BallInformation;
