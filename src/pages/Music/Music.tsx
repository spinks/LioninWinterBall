import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonPopover,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import React, { useState } from 'react';
import MusicPopover from '../../components/musicpopover';

interface MusicProps {}

const Music: React.FC<MusicProps> = () => {
  // const [showPopover, setShowPopover] = useState(false);
  // const [popoverEvent, setPopoverEvent] = useState();

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
                routerLink="/Food/details"
              >
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardSubtitle>Headliner</IonCardSubtitle>
                  <IonCardTitle> Artist 1</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard
                class="grid-card card-white-header"
                button
                routerLink="/Food/details"
              >
                <IonCardHeader>
                  <IonCardSubtitle>request songs</IonCardSubtitle>
                  <IonCardTitle> Silent Disco</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              {/* <IonCard
                className="grid-card"
                color="dark"
                button
                onClick={presentPopover}
              >
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardSubtitle>Headliner</IonCardSubtitle>
                  <IonCardTitle> Artist 1</IonCardTitle>
                </IonCardHeader>
              </IonCard> */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Artist2</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">
                    A really long artist name
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Artist3</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Artist 4</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Artist 5</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard class="grid-card card-white-header">
                <img src="/assets/shapes.svg" alt="" />
                <IonCardHeader>
                  <IonCardTitle class="grid-med-title">Artist 6</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      {/* <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <MusicPopover dismiss={() => setShowPopover(false)} />
      </IonPopover> */}
    </IonPage>
  );
};

export default Music;
