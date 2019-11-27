import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonSpinner,
  IonCardSubtitle
} from '@ionic/react';

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
            <IonCard class="grid-card card-white-header">
              <IonCardContent>Error: {JSON.stringify(error)}</IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      )}
      {loading && (
        <IonRow>
          <IonCol>
            <IonCard class="grid-card card-white-header">
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
                      <IonCard
                        class="grid-card card-white-header"
                        button={item['router'] || item['href']}
                        routerLink={item['router']}
                        href={item['href']}
                      >
                        {item['img'] && <img src={item['img']} alt="" />}
                        {(item['title'] || item['subtitle']) && (
                          <IonCardHeader>
                            {item['subtitle'] && (
                              <IonCardSubtitle>
                                {item['subtitle']}
                              </IonCardSubtitle>
                            )}
                            {item['title'] && (
                              <IonCardTitle>{item['title']}</IonCardTitle>
                            )}
                          </IonCardHeader>
                        )}
                        {item['body'] && !item['title'] && (
                          <IonCardContent>{item['body']}</IonCardContent>
                        )}
                        {item['body'] && item['title'] && (
                          <IonCardContent style={{ paddingTop: '0px' }}>
                            {item['body']}
                          </IonCardContent>
                        )}
                      </IonCard>
                    </IonCol>
                  </IonRow>
                );
              } else {
                // item is 2 cards for the row
                const left = item['0'];
                const right = item['1'];
                return (
                  <IonRow key={key}>
                    <IonCol>
                      <IonCard
                        class="grid-card card-white-header"
                        button={left['router'] || left['href']}
                        routerLink={left['router']}
                        href={left['href']}
                      >
                        {left['img'] && <img src={left['img']} alt="" />}
                        {(left['title'] || left['subtitle']) && (
                          <IonCardHeader>
                            {left['subtitle'] && (
                              <IonCardSubtitle>
                                {left['subtitle']}
                              </IonCardSubtitle>
                            )}
                            {left['title'] && (
                              <IonCardTitle class="grid-med-title">
                                {left['title']}
                              </IonCardTitle>
                            )}
                          </IonCardHeader>
                        )}
                        {left['body'] && !left['title'] && (
                          <IonCardContent>{left['body']}</IonCardContent>
                        )}
                        {left['body'] && left['title'] && (
                          <IonCardContent style={{ paddingTop: '0px' }}>
                            {left['body']}
                          </IonCardContent>
                        )}
                      </IonCard>
                    </IonCol>
                    <IonCol>
                      <IonCard
                        class="grid-card card-white-header"
                        button={right['router'] || right['href']}
                        routerLink={right['router']}
                        href={right['href']}
                      >
                        {right['img'] && <img src={right['img']} alt="" />}
                        {(right['title'] || right['subtitle']) && (
                          <IonCardHeader>
                            {right['subtitle'] && (
                              <IonCardSubtitle>
                                {right['subtitle']}
                              </IonCardSubtitle>
                            )}
                            {right['title'] && (
                              <IonCardTitle class="grid-med-title">
                                {right['title']}
                              </IonCardTitle>
                            )}
                          </IonCardHeader>
                        )}
                        {right['body'] && !right['title'] && (
                          <IonCardContent>{right['body']}</IonCardContent>
                        )}
                        {right['body'] && right['title'] && (
                          <IonCardContent style={{ paddingTop: '0px' }}>
                            {right['body']}
                          </IonCardContent>
                        )}
                      </IonCard>
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
