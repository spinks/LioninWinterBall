import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonGrid,
  IonCardContent
} from '@ionic/react';
import React from 'react';
import Countdown from 'react-countdown-now';
import List from '../../utilities/list';

const Home: React.FC = () => {
  // Countdown renderer
  const ballDate = new Date('Mar 6, 2020 19:00:00').getTime();
  const renderer = ({
    days,
    hours,
    completed
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // Render a completed state
      return 'On now!';
    } else {
      // Render a countdown
      return (
        <span>
          {days > 0 && <span>{days} Days</span>}
          {days === 0 && <span>{hours} Hours</span>} Left!
        </span>
      );
    }
  };
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Lion in Winter Ball</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow class="ion-justify-content-center ion-padding-top">
            <img
              src={'/assets/lions/lion.png'}
              height="120"
              alt="lion logo"
            ></img>
          </IonRow>
        </IonGrid>

        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle>Take me to Neverland</IonCardSubtitle>
            <IonCardTitle>
              {<Countdown date={ballDate} renderer={renderer} />}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ paddingTop: '0px' }}>
            Discover the artists playing on the night. <br /> Explore the wide
            range of food and entertainment.
          </IonCardContent>
        </IonCard>

        <IonCard color="light">
          <IonCardContent class="ion-no-padding">
            <IonList>
              <List pageKey="home" />
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
