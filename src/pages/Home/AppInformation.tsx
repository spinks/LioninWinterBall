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

const AppInformation: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>App Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard class="card-white-header grid-card" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Team</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <strong>Ben Spinks</strong> - Head Developer
                  <br />
                  <a href="mailto:benjamin.j.spinks@durham.ac.uk">
                    benjamin.j.spinks@durham.ac.uk
                  </a>
                  <br />
                  With junior developers <br />
                  Alasdair Cooper and Jonathan Hauenstein
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="card-white-header grid-card" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Business Enquiries</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  This app was built with flexibility and adaptability in mind,
                  and as such it can be easily changed to suit any potential
                  needs that future events may have.
                  <br /> <br />
                  If you would like to have an app for your ball or event and
                  wish to build on this infrastructure contact Ben Spinks.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard class="card-white-header grid-card" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Technology Stack</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Built on Ionic React with capacitor <br />
                  Using a Firebase CMS
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AppInformation;
