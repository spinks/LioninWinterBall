import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent
} from '@ionic/react';

const Schedule: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>HEllo there</p>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
