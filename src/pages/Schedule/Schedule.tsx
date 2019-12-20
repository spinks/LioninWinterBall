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

import { useSwipeable } from 'react-swipeable';

const Schedule: React.FC = (props: any) => {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      props.history.replace('home');
    },
    onSwipedLeft: () => {
      props.history.replace('maps');
    }
  });
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen {...handlers}>
        <IonGrid>{grid(vle, 'schedule')}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
