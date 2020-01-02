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
          {grid(vle, 'food')}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Food;
