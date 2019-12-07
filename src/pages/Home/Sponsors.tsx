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

const Sponsors: React.FC = () => {
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Sponsors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>{grid(vle, 'home/sponsors')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Sponsors;
