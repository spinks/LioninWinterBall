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

const Food: React.FC = () => {
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>{grid(vle, 'food')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Food;
