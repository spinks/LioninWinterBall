import React from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';

const BallInformation: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Ball Information and Help</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard class="card-white-header grid-card" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Emergency Information</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  For medical emergencies refer to the First Aiders located in
                  the Porters' Lodge. For other emergencies visit the Porters'
                  Lodge for further assistance.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="card-white-header grid-card" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Emergency Evacuation</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  In the unlikely event of an emergency, please evacuate via the
                  nearest emergency exit. These are located at the main college
                  gates or the side gate next to the Rectory Building. Then
                  proceed to the assembly point on Palace Green. Do not stay to
                  collect any personal belongings.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="card-white-header grid-card" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Security</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Entry to the college is only permitted with a valid Lion in
                  Winter Ball 2020 wristband. If you are asked by security or a
                  member of the Lion in Winter Ball team to show your wristband
                  and you are unable to you will be asked to leave the college
                  and charged a ticket fee.
                  <br />
                  <br />
                  Behave respectfully at all times, giving respect to the
                  buildings and belongings of others. Poor behavior may result
                  in being escorted from the college with no refund. You may
                  also be asked to cover the cost of damages incurred.
                  <br />
                  <br />
                  Do not bring your own alcohol onto the licensed premises, the
                  whole college. Your alcohol will be confiscated.
                  <br />
                  <br />
                  Drugs and violence are not tolerated and will result in
                  further action.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BallInformation;
