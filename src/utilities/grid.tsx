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
    <div>
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
        <div>
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
                        {item['body'] && (
                          <IonCardContent>{item['body']}</IonCardContent>
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
                        {left['body'] && (
                          <IonCardContent>{left['body']}</IonCardContent>
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
                        {right['body'] && (
                          <IonCardContent>{right['body']}</IonCardContent>
                        )}
                      </IonCard>
                    </IonCol>
                  </IonRow>
                );
              }
            })}
        </div>
      )}
    </div>
  );
}
