import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';

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
                routerLink="/Food/Dining"
              >
                <img src="/assets/food/dining_tent.jpg" alt="dining tent" />
                <IonCardHeader card-white-header>
                  <IonCardSubtitle>the main event</IonCardSubtitle>
                  <IonCardTitle> Dining Menu</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Food 2</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Food 3</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Food 4</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Food 5</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Food;
