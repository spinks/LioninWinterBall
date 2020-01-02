import React from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';

import grid from '../../utilities/grid';
import AppContext from '../../AppContext';

const AppInformation: React.FC = () => {
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>App Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          {grid(vle, 'home/appInformation')}
          <IonRow>
            <IonCol>
              <IonCard class="card-white-header grid-card" color="light">
                <IonCardContent>
                  <a href="https://lioninwinterball.now.sh/policy.html">
                    Privacy Policy and Terms and Conditions
                  </a>
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
