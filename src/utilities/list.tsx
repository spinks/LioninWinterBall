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

import AppContext from '../AppContext';

const List: React.FC<{ pageKey: string }> = (props) => {
  const pageKey = props.pageKey;
  const [value, loading, error] = Object.values(React.useContext(AppContext));

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
            Content unavailable. If the issue persists contact the event team.
          </IonLabel>
        </IonItem>
      )}
      {value && pageKey in value && (
        <React.Fragment>
          {Object.keys(value[pageKey])
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map((key) => {
                const item = value[pageKey][key];
                if (item['type'] === 'header') {
                // item is one leveled (0 and 1 are column positions)
                  return (
                    <IonListHeader key={key}>
                      {item['body']}
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
                      <IonItem routerLink={item['router']} key={key} lines='none'>
                        <IonLabel>{item['body']}</IonLabel>
                        <IonIcon icon={item['icon']} size="medium" slot="start" />
                      </IonItem>
                    );
                  } else {
                    return (
                      <IonItem href={item['href']} target="_blank" key={key} lines='none'>
                        <IonLabel>{item['body']}</IonLabel>
                        <IonIcon icon={item['icon']} size="medium" slot="start" />
                      </IonItem>
                    );
                  }
                }
              })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default List;
