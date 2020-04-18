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

const Dining: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Dining Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <Grid pageKey="food/dining" />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dining;
