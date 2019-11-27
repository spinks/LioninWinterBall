import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonGrid
} from '@ionic/react';

import grid from '../../utilities/grid';
import AppContext from '../../AppContext';

const Schedule: React.FC = () => {
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>{grid(vle, 'schedule')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
