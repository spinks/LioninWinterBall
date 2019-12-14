import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonSpinner
} from '@ionic/react';

import GridCard from './card';

/**
 * Generate an Ionic Card grid array from Firebase Array (map) for a certiain page
 * @param {Array} VLEArray The firestore loading array
 * @param {string} pagekey The page that needs to be queried from the doc
 * @return {any} The formated grid
 */
export default function grid(VLEArray: Array<any>, pagekey: string): any {
  const [value, loading, error] = VLEArray;
  return (
    <React.Fragment>
      {error && (
        <IonRow>
          <IonCol>
            <IonCard class="grid-card card-white-header" color="light">
              <IonCardContent>Error: {JSON.stringify(error)}</IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
      {loading && (
        <IonRow>
          <IonCol>
            <IonCard class="grid-card card-white-header" color="light">
              <IonCardContent class="ion-text-center">
                <IonSpinner />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
      {value && (
        <React.Fragment>
          {Object.keys(value[pagekey])
            .sort()
            .map(key => {
              const item = value[pagekey][key];
              if (!item['0']) {
                // item is one leveled (0 and 1 are column positions)
                return (
                  <IonRow key={key}>
                    <IonCol>
                      <GridCard {...item} />
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
                      <GridCard {...item['0']} />
                    </IonCol>
                    <IonCol>
                      <GridCard {...item['1']} />
                    </IonCol>
                  </IonRow>
                );
              }
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
