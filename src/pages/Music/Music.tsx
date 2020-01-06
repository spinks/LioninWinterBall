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
import AppContext from '../../AppContext';

import { useSwipeable } from 'react-swipeable';

import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
let deviceInfo = {};
Device.getInfo().then(r => {
  deviceInfo = r;
});

// interface MusicProps {}

const Music: React.FC = (props: any) => {
  // const [showPopover, setShowPopover] = useState(false);
  // const [popoverEvent, setPopoverEvent] = useState();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if ('platform' in deviceInfo && deviceInfo['platform'] === 'android') {
        props.history.replace('food');
      }
    }
  });
  const vle = Object.values(React.useContext(AppContext));
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Music</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen {...handlers}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard
                class="grid-card card-white-header"
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
          {grid(vle, 'music')}
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
