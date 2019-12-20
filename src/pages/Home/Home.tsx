import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonGrid,
  IonCardContent,
  IonText,
  IonCol
} from '@ionic/react';
import {
  logoInstagram,
  logoFacebook,
  star,
  informationCircleOutline
} from 'ionicons/icons';
import React from 'react';
import Countdown from 'react-countdown-now';

import { useSwipeable } from 'react-swipeable';

const Home: React.FC = (props: any) => {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      props.history.replace('food');
      // props.history.replace('food');
    },
    onSwipedLeft: () => {
      props.history.replace('schedule');
    }
  });

  // Countdown renderer
  const ballDate = new Date('Mar 6, 2020 19:00:00').getTime();
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
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
          {days} Days {hours}:{minutes}:{seconds}
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
      <IonContent fullscreen {...handlers}>
        <IonGrid>
          <IonRow class="ion-justify-content-center ion-padding-top">
            <img
              src={'/assets/lions/lion.png'}
              height="120"
              alt="lion logo"
            ></img>
          </IonRow>
        </IonGrid>

        <IonCard class="card-white-header" color="light">
          {/* <img src="/assets/lions/lion_background.jpg" alt="" /> */}
          <IonCardHeader>
            <IonCardSubtitle>Take me to ...</IonCardSubtitle>
            <IonCardTitle>
              {<Countdown date={ballDate} renderer={renderer} />}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Discover the artists playing on the night. <br /> Explore the wide
            range of food and entertainment.
          </IonCardContent>
        </IonCard>

        <IonCard class="card-white-header" color="light">
          <IonCardContent class="ion-no-padding">
            <IonList>
              <IonListHeader>
                <IonLabel>Follow us on social media</IonLabel>
              </IonListHeader>
              <IonItem
                href="https://www.instagram.com/lioninwinterball/"
                target="_blank"
              >
                <IonLabel>Instagram</IonLabel>
                <IonIcon icon={logoInstagram} size="large" slot="start" />
              </IonItem>
              <IonItem
                href="https://www.facebook.com/liwb2020/"
                target="_blank"
              >
                <IonLabel>Facebook</IonLabel>
                <IonIcon icon={logoFacebook} size="large" slot="start" />
              </IonItem>

              <IonListHeader>
                <IonLabel>Our Sponsors</IonLabel>
              </IonListHeader>
              <IonItem routerLink="/Home/Sponsors">
                <IonIcon slot="start" icon={star} />
                <IonLabel>Sponsors</IonLabel>
              </IonItem>

              <IonListHeader>
                <IonLabel>Information</IonLabel>
              </IonListHeader>
              <IonItem routerLink="/Home/BallInformation">
                <IonIcon
                  slot="start"
                  color="medium"
                  icon={informationCircleOutline}
                />
                <IonLabel>Ball Information and Help</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonRow>
          <IonCol class="ion-text-center ">
            <IonText color="ion-primary-light" class="font-small">
              App by Ben Spinks
            </IonText>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
