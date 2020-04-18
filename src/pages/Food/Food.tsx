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
  IonCardTitle
} from '@ionic/react';

import Grid from '../../utilities/grid';

const Food: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard
                class="grid-card card-white-header"
                button
                routerLink="/Food/dining"
                color="light"
              >
                <img src="/assets/food/dining_tent.jpg" alt="" />
                <IonCardHeader>
                  <IonCardTitle>Dining Menu</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <Grid pageKey="food" />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Food;
