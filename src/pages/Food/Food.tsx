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

import { useSwipeable } from 'react-swipeable';

const Food: React.FC = (props: any) => {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      props.history.replace('music');
    },
    onSwipedLeft: () => {
      props.history.replace('home');
    }
  });
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen {...handlers}>
        <IonGrid>{grid(vle, 'food')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Food;
