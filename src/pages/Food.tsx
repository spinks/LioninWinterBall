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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard
                className="grid-card"
                color="dark"
                button
                routerLink="/Food/details"
              >
                <img src="/assets/food/dining_tent.jpg" alt="" />
                <IonCardHeader>
                  <IonCardSubtitle>the main event</IonCardSubtitle>
                  <IonCardTitle> Dinner</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle className="grid-med-title">Food 2</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle className="grid-med-title">Food 3</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle className="grid-med-title">Food 4</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle className="grid-med-title">Food 5</IonCardTitle>
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
