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
  IonCardContent,
  IonSpinner
} from '@ionic/react';
import React from 'react';
import Countdown from 'react-countdown';
import List from '../../utilities/list';

import AppContext from '../../AppContext';
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

const HeaderCard: React.FC = () => {
  const [value, loading, error] = Object.values(React.useContext(AppContext));

  return (
    <React.Fragment>
      {error && (
        <IonCard color="light">
          <IonCardContent>Error: {JSON.stringify(error)}</IonCardContent>
        </IonCard>
      )}
      {loading && (
        <IonCard color="light">
          <IonCardContent class="ion-text-center">
            <IonSpinner />
          </IonCardContent>
        </IonCard>
      )}
      {value && !('home/headerCard' in value) && (
        <IonCard color="light">
          <IonCardContent class="ion-text-center">
            Content unavailable. If the issue persists contact LiWB.
          </IonCardContent>
        </IonCard>
      )}
      {value && 'home/headerCard' in value && (
        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle>
              {htmlToReactParser.parse(value['home/headerCard']['subtitle'])}
            </IonCardSubtitle>
            <IonCardTitle>
              <React.Fragment>
                {typeof value['home/headerCard']['title'] === 'object' &&
                  value['home/headerCard']['title']['countdown'] === true && (
                  <Countdown
                    date={new Date(value['home/headerCard']['title']['date'])}
                    renderer={(props) => {
                      if (props.completed) {
                        // Render a completed state
                        return (
                          <React.Fragment>
                            {htmlToReactParser.parse(
                                value['home/headerCard']['title']['completed']
                            )}
                          </React.Fragment>
                        );
                      } else {
                        // Render a countdown
                        return (
                          <React.Fragment>
                            {props.days > 0 && (
                              <React.Fragment>
                                {props.days}{' '}
                                {props.days === 1 ?
                                    'Day Left!' :
                                    'Days Left!'}
                              </React.Fragment>
                            )}
                            {props.days === 0 && (
                              <React.Fragment>
                                {props.hours === 0 && 'Less than an hour!'}
                                {props.hours !== 0 && (
                                  <React.Fragment>
                                    {props.hours}{' '}
                                    {props.hours === 1 ?
                                        'Hour Left!' :
                                        'Hours Left!'}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        );
                      }
                    }}
                  />
                )}
                {typeof value['home/headerCard']['title'] === 'string' &&
                  htmlToReactParser.parse(value['home/headerCard']['title'])}
              </React.Fragment>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ paddingTop: '0px' }}>
            {htmlToReactParser.parse(value['home/headerCard']['body'])}
          </IonCardContent>
        </IonCard>
      )}
    </React.Fragment>
  );
};

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Summer Solstice Ball</IonTitle>
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

        <HeaderCard />

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
