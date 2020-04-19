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

import Grid from '../../utilities/grid';

const Music: React.FC = () => {
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
                class="grid-card"
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
          <Grid pageKey="music" />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Music;
