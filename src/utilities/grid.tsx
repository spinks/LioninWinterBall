import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonSpinner
} from '@ionic/react';

import Card from './card';

import AppContext from '../AppContext';

const Grid: React.FC<{ pageKey: string }> = (props) => {
  const pageKey = props.pageKey;
  const [value, loading, error] = Object.values(React.useContext(AppContext));

  return (
    <React.Fragment>
      {error && (
        <IonRow>
          <IonCol>
            <IonCard color="light">
              <IonCardContent>Error: {JSON.stringify(error)}</IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
      {loading && (
        <IonRow>
          <IonCol>
            <IonCard color="light">
              <IonCardContent class="ion-text-center">
                <IonSpinner />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
      {value && !(pageKey in value) && (
        <IonRow>
          <IonCol>
            <IonCard color="light">
              <IonCardContent class="ion-text-center">
                Content unavailable. If the issue persists contact the event team.
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
      {value && pageKey in value && (
        <React.Fragment>
          {Object.keys(value[pageKey])
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map((key) => {
                const item = value[pageKey][key];
                if (!item['0']) {
                // item is one leveled (0 and 1 are column positions)
                  return (
                    <IonRow key={key}>
                      <IonCol>
                        <Card {...item} />
                      </IonCol>
                    </IonRow>
                  );
                } else {
                // item is 2 cards for the row
                // 0 is left 1 is right
                  item['0']['smallTitle'] = true;
                  item['1']['smallTitle'] = true;
                  return (
                    <IonRow key={key}>
                      <IonCol>
                        <Card {...item['0']} />
                      </IonCol>
                      <IonCol>
                        <Card {...item['1']} />
                      </IonCol>
                    </IonRow>
                  );
                }
              })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Grid;
