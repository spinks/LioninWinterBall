import React from 'react';
import {
  IonSpinner,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon
} from '@ionic/react';
import {
  logoInstagram,
  logoFacebook,
  star,
  informationCircleOutline,
  cog
} from 'ionicons/icons';

/**
 * Generate an list array from Firebase Array (map) for a certiain page
 * @param {Array} VLEArray The firestore loading array
 * @param {string} pageKey The page that needs to be queried from the doc
 * @return {any} The formated grid
 */
export default function list(VLEArray: Array<any>, pageKey: string): any {
  const [value, loading, error] = VLEArray;
  return (
    <React.Fragment>
      {error && (
        <IonItem>
          <IonLabel>Error: {JSON.stringify(error)}</IonLabel>
        </IonItem>
      )}
      {loading && (
        <IonItem>
          <IonLabel class="ion-text-center">
            <IonSpinner />
          </IonLabel>
        </IonItem>
      )}
      {value && !(pageKey in value) && (
        <IonItem>
          <IonLabel>
            Content unavailable. If the issue persists contact LiWB.
          </IonLabel>
        </IonItem>
      )}
      {value && pageKey in value && (
        <React.Fragment>
          {Object.keys(value[pageKey])
            .sort()
            .map(key => {
              const item = value[pageKey][key];
              if (item['type'] === 'header') {
                // item is one leveled (0 and 1 are column positions)
                return (
                  <IonListHeader key={key}>
                    <IonLabel>{item['body']}</IonLabel>
                  </IonListHeader>
                );
              } else {
                if (
                  item['icon'] === 'logoInstagram' ||
                  item['icon'] === logoInstagram
                ) {
                  item['icon'] = logoInstagram;
                } else if (
                  item['icon'] === 'logoFacebook' ||
                  item['icon'] === logoFacebook
                ) {
                  item['icon'] = logoFacebook;
                } else if (
                  item['icon'] === 'informationCircleOutline' ||
                  item['icon'] === informationCircleOutline
                ) {
                  item['icon'] = informationCircleOutline;
                } else if (item['icon'] === 'cog' || item['icon'] === cog) {
                  item['icon'] = cog;
                } else {
                  item['icon'] = star;
                }
                if (item['router']) {
                  return (
                    <IonItem routerLink={item['router']} key={key}>
                      <IonLabel>{item['body']}</IonLabel>
                      <IonIcon icon={item['icon']} size="large" slot="start" />
                    </IonItem>
                  );
                } else {
                  return (
                    <IonItem href={item['href']} target="_blank" key={key}>
                      <IonLabel>{item['body']}</IonLabel>
                      <IonIcon icon={item['icon']} size="large" slot="start" />
                    </IonItem>
                  );
                }
              }
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
