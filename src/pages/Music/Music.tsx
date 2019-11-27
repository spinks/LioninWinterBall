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
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import React from 'react';

import grid from '../../utilities/grid';
import master from '../../Firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

interface MusicProps {}

const Music: React.FC<MusicProps> = () => {
  // const [showPopover, setShowPopover] = useState(false);
  // const [popoverEvent, setPopoverEvent] = useState();

  const [value, loading, error] = useDocumentDataOnce(master);
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
                <IonCardHeader>
                  <IonCardSubtitle>request songs</IonCardSubtitle>
                  <IonCardTitle> Silent Disco</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          {grid([value, loading, error], 'music')}
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
