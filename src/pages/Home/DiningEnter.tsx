import React, { useState } from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonLabel,
  IonItem,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonAlert
} from '@ionic/react';

import fb from '../../Firebase';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const sanitizeHtml = require('sanitize-html');

interface Table {
  [key: string]: any;
  size: number;
}

/**
 * Saves selected tract to storage and FS
 * @param {any} table
 */
async function saveTable(table: Table) {
  let status = 'OK';
  const tableString = JSON.stringify(table);
  const tableInfo = JSON.parse(tableString);
  await Storage.set({
    key: 'savedTable',
    value: JSON.stringify(table)
  }).catch(() => {
    status = 'Document Error';
  });
  if (fb.auth().currentUser) {
    for (let i = tableInfo.size + 1; i < 12 + 1; i++) {
      delete tableInfo[i];
    }
    tableInfo.id = fb.auth().currentUser!.uid;
    await fb
      .firestore()
      .collection('tables')
      .doc(fb.auth().currentUser!.uid)
      .set(tableInfo)
      .catch(err => {
        status = 'Firebase Error: ' + err.message;
      });
  }
  return status;
}

let savedTable: any = {};
/**
 * Sets loadedTrack global constant to stored track
 */
async function getSavedTable() {
  await Storage.get({ key: 'savedTable' }).then(ret => {
    savedTable = JSON.parse(ret.value || JSON.stringify(defaultTable));
  });
}
// code in the main page is one once on app startup
// this has to be run before the component mounts
getSavedTable();

const DiningEnter: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(
    'Your table has been submitted, bring the UID to sign-up'
  );
  const [alertTitle, setAlertTitle] = useState('Table Submitted');

  const [tableInfo] = useState(savedTable);
  const [fullTable, setFullTable] = useState(tableInfo.size === 12);
  const [uid, setUid] = useState('Not yet authenticated');

  /**
   * Handles form submission
   * @param {any} e event
   */
  function handleSubmit(e: any): any {
    e.preventDefault();
    tableInfo['size'] = fullTable ? 12 : 6;
    for (let i = 1; i < tableInfo.size + 1; i++) {
      tableInfo[i] = {
        name: sanitizeHtml(e.target[i.toString() + '_name'].value),
        email: sanitizeHtml(e.target[i.toString() + '_email'].value),
        cis: sanitizeHtml(e.target[i.toString() + '_cis'].value),
        college: sanitizeHtml(e.target[i.toString() + '_college'].value),
        wine: sanitizeHtml(e.target[i.toString() + '_wine'].value),
        dietary: sanitizeHtml(e.target[i.toString() + '_dietary'].value)
      };
    }
    saveTable(tableInfo).then(s => {
      if (s !== 'OK') {
        setAlertText('If the issue persists please contact the LiWB team');
        setAlertTitle(s);
      } else {
        setAlertText('Your table has been submitted, bring the UID to sign-up');
        setAlertTitle('Table Submitted');
      }
      setShowAlert(true);
    });
  }

  fb.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUid(user.uid);
    }
  });

  return (
    <IonPage>
      <IonHeader
        translucent
        onClick={() => {
          document!.getElementById('top')!.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
          });
          // window.scrollTo(0, 0);
        }}
      >
        <IonToolbar>
          <IonTitle>Table Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ background: 'rgb(18, 39, 78)' }}>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertTitle}
          message={alertText}
        />
        <form onSubmit={handleSubmit}>
          <IonCard class="card-white-header" color="light" id="top">
            <IonCardHeader>
              Enter your table information below and be sure to submit, bring
              your UID to sign-up. Your UID is as follows.
              <h5 style={{ textAlign: 'center' }}>{uid}</h5>
              <br />
              <IonButton
                expand="block"
                disabled={fb.auth().currentUser === null}
                type="submit"
              >
                Submit
              </IonButton>
            </IonCardHeader>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader class="ion-no-padding">
              <IonRadioGroup style={{ '--ion-item-background': 'transparent' }}>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none">
                        <IonLabel>Full</IonLabel>
                        <IonRadio
                          slot="start"
                          checked={fullTable}
                          onClick={() => setFullTable(true)}
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem lines="none">
                        <IonLabel>Half Table</IonLabel>
                        <IonRadio
                          slot="start"
                          checked={!fullTable}
                          onClick={() => setFullTable(false)}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonRadioGroup>
            </IonCardHeader>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader>
              <IonCardSubtitle>Head of Table</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent class="ion-no-padding">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  name="1_name"
                  value={tableInfo[1]['name']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="1_email"
                  value={tableInfo[1]['email']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  CIS Username (NA if not student)
                </IonLabel>
                <IonInput
                  type="text"
                  name="1_cis"
                  value={tableInfo[1]['cis']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">College (or guest)</IonLabel>
                <IonInput
                  type="text"
                  name="1_college"
                  value={tableInfo[1]['college']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Wine Choice</IonLabel>
                <IonInput
                  type="number"
                  name="1_wine"
                  value={tableInfo[1]['wine']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Dietary Requirements (optional)
                </IonLabel>
                <IonInput
                  type="text"
                  name="1_dietary"
                  value={tableInfo[1]['dietary']}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader>
              <IonCardSubtitle>Diner 2</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent class="ion-no-padding">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  name="2_name"
                  value={tableInfo[2]['name']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="2_email"
                  value={tableInfo[2]['email']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  CIS Username (NA if not student)
                </IonLabel>
                <IonInput
                  type="text"
                  name="2_cis"
                  value={tableInfo[2]['cis']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">College (or guest)</IonLabel>
                <IonInput
                  type="text"
                  name="2_college"
                  value={tableInfo[2]['college']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Wine Choice</IonLabel>
                <IonInput
                  type="number"
                  name="2_wine"
                  value={tableInfo[2]['wine']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Dietary Requirements (optional)
                </IonLabel>
                <IonInput
                  type="text"
                  name="2_dietary"
                  value={tableInfo[2]['dietary']}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader>
              <IonCardSubtitle>Diner 3</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent class="ion-no-padding">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  name="3_name"
                  value={tableInfo[3]['name']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="3_email"
                  value={tableInfo[3]['email']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  CIS Username (NA if not student)
                </IonLabel>
                <IonInput
                  type="text"
                  name="3_cis"
                  value={tableInfo[3]['cis']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">College (or guest)</IonLabel>
                <IonInput
                  type="text"
                  name="3_college"
                  value={tableInfo[3]['college']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Wine Choice</IonLabel>
                <IonInput
                  type="number"
                  name="3_wine"
                  value={tableInfo[3]['wine']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Dietary Requirements (optional)
                </IonLabel>
                <IonInput
                  type="text"
                  name="3_dietary"
                  value={tableInfo[3]['dietary']}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader>
              <IonCardSubtitle>Diner 4</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent class="ion-no-padding">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  name="4_name"
                  value={tableInfo[4]['name']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="4_email"
                  value={tableInfo[4]['email']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  CIS Username (NA if not student)
                </IonLabel>
                <IonInput
                  type="text"
                  name="4_cis"
                  value={tableInfo[4]['cis']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">College (or guest)</IonLabel>
                <IonInput
                  type="text"
                  name="4_college"
                  value={tableInfo[4]['college']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Wine Choice</IonLabel>
                <IonInput
                  type="number"
                  name="4_wine"
                  value={tableInfo[4]['wine']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Dietary Requirements (optional)
                </IonLabel>
                <IonInput
                  type="text"
                  name="4_dietary"
                  value={tableInfo[4]['dietary']}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader>
              <IonCardSubtitle>Diner 5</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent class="ion-no-padding">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  name="5_name"
                  value={tableInfo[5]['name']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="5_email"
                  value={tableInfo[5]['email']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  CIS Username (NA if not student)
                </IonLabel>
                <IonInput
                  type="text"
                  name="5_cis"
                  value={tableInfo[5]['cis']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">College (or guest)</IonLabel>
                <IonInput
                  type="text"
                  name="5_college"
                  value={tableInfo[5]['college']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Wine Choice</IonLabel>
                <IonInput
                  type="number"
                  name="5_wine"
                  value={tableInfo[5]['wine']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Dietary Requirements (optional)
                </IonLabel>
                <IonInput
                  type="text"
                  name="5_dietary"
                  value={tableInfo[5]['dietary']}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader>
              <IonCardSubtitle>Diner 6</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent class="ion-no-padding">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  name="6_name"
                  value={tableInfo[6]['name']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="6_email"
                  value={tableInfo[6]['email']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  CIS Username (NA if not student)
                </IonLabel>
                <IonInput
                  type="text"
                  name="6_cis"
                  value={tableInfo[6]['cis']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">College (or guest)</IonLabel>
                <IonInput
                  type="text"
                  name="6_college"
                  value={tableInfo[6]['college']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Wine Choice</IonLabel>
                <IonInput
                  type="number"
                  name="6_wine"
                  value={tableInfo[6]['wine']}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Dietary Requirements (optional)
                </IonLabel>
                <IonInput
                  type="text"
                  name="6_dietary"
                  value={tableInfo[6]['dietary']}
                ></IonInput>
              </IonItem>
            </IonCardContent>
          </IonCard>
          {fullTable && (
            <React.Fragment>
              <IonCard class="card-white-header" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Diner 7</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="ion-no-padding">
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      name="7_name"
                      value={tableInfo[7]['name']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      name="7_email"
                      value={tableInfo[7]['email']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      CIS Username (NA if not student)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="7_cis"
                      value={tableInfo[7]['cis']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">College (or guest)</IonLabel>
                    <IonInput
                      type="text"
                      name="7_college"
                      value={tableInfo[7]['college']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Wine Choice</IonLabel>
                    <IonInput
                      type="number"
                      name="7_wine"
                      value={tableInfo[7]['wine']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      Dietary Requirements (optional)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="7_dietary"
                      value={tableInfo[7]['dietary']}
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <IonCard class="card-white-header" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Diner 8</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="ion-no-padding">
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      name="8_name"
                      value={tableInfo[8]['name']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      name="8_email"
                      value={tableInfo[8]['email']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      CIS Username (NA if not student)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="8_cis"
                      value={tableInfo[8]['cis']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">College (or guest)</IonLabel>
                    <IonInput
                      type="text"
                      name="8_college"
                      value={tableInfo[8]['college']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Wine Choice</IonLabel>
                    <IonInput
                      type="number"
                      name="8_wine"
                      value={tableInfo[8]['wine']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      Dietary Requirements (optional)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="8_dietary"
                      value={tableInfo[8]['dietary']}
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <IonCard class="card-white-header" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Diner 9</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="ion-no-padding">
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      name="9_name"
                      value={tableInfo[9]['name']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      name="9_email"
                      value={tableInfo[9]['email']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      CIS Username (NA if not student)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="9_cis"
                      value={tableInfo[9]['cis']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">College (or guest)</IonLabel>
                    <IonInput
                      type="text"
                      name="9_college"
                      value={tableInfo[9]['college']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Wine Choice</IonLabel>
                    <IonInput
                      type="number"
                      name="9_wine"
                      value={tableInfo[9]['wine']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      Dietary Requirements (optional)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="9_dietary"
                      value={tableInfo[9]['dietary']}
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <IonCard class="card-white-header" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Diner 10</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="ion-no-padding">
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      name="10_name"
                      value={tableInfo[10]['name']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      name="10_email"
                      value={tableInfo[10]['email']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      CIS Username (NA if not student)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="10_cis"
                      value={tableInfo[10]['cis']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">College (or guest)</IonLabel>
                    <IonInput
                      type="text"
                      name="10_college"
                      value={tableInfo[10]['college']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Wine Choice</IonLabel>
                    <IonInput
                      type="number"
                      name="10_wine"
                      value={tableInfo[10]['wine']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      Dietary Requirements (optional)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="10_dietary"
                      value={tableInfo[10]['dietary']}
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <IonCard class="card-white-header" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Diner 11</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="ion-no-padding">
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      name="11_name"
                      value={tableInfo[11]['name']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      name="11_email"
                      value={tableInfo[11]['email']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      CIS Username (NA if not student)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="11_cis"
                      value={tableInfo[11]['cis']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">College (or guest)</IonLabel>
                    <IonInput
                      type="text"
                      name="11_college"
                      value={tableInfo[11]['college']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Wine Choice</IonLabel>
                    <IonInput
                      type="number"
                      name="11_wine"
                      value={tableInfo[11]['wine']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      Dietary Requirements (optional)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="11_dietary"
                      value={tableInfo[11]['dietary']}
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <IonCard class="card-white-header" color="light">
                <IonCardHeader>
                  <IonCardSubtitle>Diner 12</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent class="ion-no-padding">
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      name="12_name"
                      value={tableInfo[12]['name']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      name="12_email"
                      value={tableInfo[12]['email']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      CIS Username (NA if not student)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="12_cis"
                      value={tableInfo[12]['cis']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">College (or guest)</IonLabel>
                    <IonInput
                      type="text"
                      name="12_college"
                      value={tableInfo[12]['college']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Wine Choice</IonLabel>
                    <IonInput
                      type="number"
                      name="12_wine"
                      value={tableInfo[12]['wine']}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">
                      Dietary Requirements (optional)
                    </IonLabel>
                    <IonInput
                      type="text"
                      name="12_dietary"
                      value={tableInfo[12]['dietary']}
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </React.Fragment>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default DiningEnter;

const defaultTable = {
  size: 12,
  1: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  2: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  3: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  4: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  5: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  6: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  7: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  8: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  9: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  10: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  11: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  },
  12: {
    name: '',
    email: '',
    cis: '',
    college: '',
    wine: null,
    dietary: ''
  }
};
