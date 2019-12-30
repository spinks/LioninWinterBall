import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';

import grid from '../../utilities/grid';
import AppContext from '../../AppContext';

const Music: React.FC = () => {
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Music</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>{grid(vle, 'music')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Music;
