import React from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid
} from '@ionic/react';

import grid from '../../utilities/grid';
import AppContext from '../../AppContext';

const BallInformation: React.FC = () => {
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Information and Help</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>{grid(vle, 'home/ballInformation')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BallInformation;
