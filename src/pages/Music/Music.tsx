import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
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
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard
                class="grid-card card-white-header"
                button
                routerLink="/Music/disco"
                color="light"
              >
                <IonCardHeader>
                  <IonCardSubtitle>Request Songs</IonCardSubtitle>
                  <IonCardTitle>Silent Disco</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          {grid(vle, 'music')}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Music;
