import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonGrid
} from '@ionic/react';

import Grid from '../../utilities/grid';

const Schedule: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <Grid pageKey="schedule" />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
