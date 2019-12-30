import React, { useState, useEffect } from 'react';
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

import * as firebase from 'firebase/app';
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
 * @param {boolean} fire if the function should write to firebase
 */
async function saveTable(table: Table, fire: boolean = true) {
  let status = 'OK';
  const tableString = JSON.stringify(table);
  const tableInfo = JSON.parse(tableString);
  await Storage.set({
    key: 'savedTable',
    value: JSON.stringify(table)
  }).catch(() => {
    status = 'Document Error';
  });
  if (fire) {
    if (!fb.auth().currentUser) {
      status = 'Not yet authenticated';
      return status;
    }
    for (let i = tableInfo.size + 1; i < 12 + 1; i++) {
      delete tableInfo[i];
    }
    tableInfo.id = fb.auth().currentUser!.uid;
    tableInfo.timestamp = firebase.firestore.FieldValue.serverTimestamp();
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

/**
 * Saves table submission time to storage
 * @param {number} time as a string
 */
async function saveTableTime(time: number) {
  console.log('setting saved time', time);
  Storage.set({
    key: 'savedTableTime',
    value: time.toString()
  });
}

/**
 * Gets table time from storage
 * @return {Promise<any>} time
 * if false then no submit time has been previously set
 */
async function getSavedTableTime(): Promise<any> {
  let time = '';
  await Storage.get({ key: 'savedTableTime' }).then(ret => {
    time = JSON.parse(ret.value || JSON.stringify(false));
    console.log('getting saved time', time);
  });
  return time;
}

const DiningEnter: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(
    'Your table has been submitted, bring the UID to sign-up'
  );
  const [alertTitle, setAlertTitle] = useState('Table Submitted');

  const [tableInfo] = useState(savedTable);
  const [fullTable, setFullTable] = useState(tableInfo.size === 12);
  const [uid, setUid] = useState('Not yet authenticated');

  const [tableTime, setTableTime] = useState();

  useEffect(() => {
    // runs once on component mount (due to empty array second arg)
    getSavedTableTime().then(t => {
      if (t) {
        setTableTime(t);
      }
    });
    // some warnings about not passing the functions to useEffect?
    // eslint-disable-next-line
  }, []);

  /**
   * Handles form submission
   * @param {any} e event
   * @param {boolean} fire wether to save to firebase
   */
  function handleSubmit(
    e: { target: any; preventDefault?: any },
    fire: boolean = true
  ): any {
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

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
    saveTable(tableInfo, fire).then(s => {
      if (s !== 'OK') {
        setAlertText(
          'If the issue persists please contact the LiWB team <br/>' +
            'If it is a firebase error you may have tried to submit more than once in 15 minutes, try again later'
        );
        setAlertTitle(s);
      } else {
        if (!fire) {
          setAlertText(
            'Table information saved, you can return at a later time to submit'
          );
          setAlertTitle('Table Saved');
        } else {
          setAlertText(
            'Your table has been submitted, bring the UID to sign-up'
          );
          setAlertTitle('Table Submitted');
          setTableTime(Date.now());
          saveTableTime(Date.now());
        }
      }
      setShowAlert(true);
    });
  }

  fb.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUid(user.uid);
    }
  });

  /**
   * Returns a diner info card
   * @param {number} num
   * @param {title} title
   * @return {any} card element
   */
  function dinerCard(num: number, title: string = ''): any {
    title = title || 'Diner ' + num.toString();
    return (
      <IonCard class="card-white-header" color="light">
        <IonCardHeader>
          <IonCardSubtitle>{title}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent class="ion-no-padding">
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              type="text"
              name={num.toString() + '_name'}
              value={tableInfo[num]['name']}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              name={num.toString() + '_email'}
              value={tableInfo[num]['email']}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              CIS Username (NA if not student)
            </IonLabel>
            <IonInput
              type="text"
              name={num.toString() + '_cis'}
              value={tableInfo[num]['cis']}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">College (or guest)</IonLabel>
            <IonInput
              type="text"
              name={num.toString() + '_college'}
              value={tableInfo[num]['college']}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Wine Choice</IonLabel>
            <IonInput
              type="number"
              name={num.toString() + '_wine'}
              value={tableInfo[num]['wine']}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="floating">
              Dietary Requirements (optional)
            </IonLabel>
            <IonInput
              type="text"
              name={num.toString() + '_dietary'}
              value={tableInfo[num]['dietary']}
            ></IonInput>
          </IonItem>
        </IonCardContent>
      </IonCard>
    );
  }

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
        <form onSubmit={handleSubmit} id="diningForm">
          <IonCard class="card-white-header" color="light" id="top">
            <IonCardHeader>
              Enter your table information below and be sure to submit, bring
              your UID to sign-up. Your UID is as follows.
              <h5 style={{ textAlign: 'center' }}>{uid}</h5>
              You can only submit your table changes once every 15 minutes.
              <br />
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonButton
                      expand="block"
                      onClick={() => {
                        handleSubmit(
                          { target: document.getElementById('diningForm') },
                          false
                        );
                      }}
                    >
                      Save
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      expand="block"
                      disabled={
                        fb.auth().currentUser === null ||
                        (tableTime && Date.now() <= tableTime + 15 * 60000)
                      }
                      type="submit"
                    >
                      Submit
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardHeader>
          </IonCard>
          <IonCard class="card-white-header" color="light">
            <IonCardHeader class="ion-no-padding">
              <IonRadioGroup>
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
          {dinerCard(1, 'Head of Table')}
          {dinerCard(2)}
          {dinerCard(3)}
          {dinerCard(4)}
          {dinerCard(5)}
          {dinerCard(6)}
          {fullTable && (
            <React.Fragment>
              {dinerCard(7)} {dinerCard(8)} {dinerCard(9)}
              {dinerCard(10)}
              {dinerCard(11)}
              {dinerCard(12)}
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
