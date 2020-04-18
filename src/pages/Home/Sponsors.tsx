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

const Sponsors: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Sponsors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <Grid pageKey="home/sponsors" />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Sponsors;
