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
  IonAlert,
  IonSelect,
  IonSelectOption,
  IonSpinner
} from '@ionic/react';

import firebase from 'firebase/app';
import fb from '../../Firebase';

import AppContext from '../../AppContext';

import { Storage } from '@capacitor/storage';

const sanitizeHtml = require('sanitize-html');

interface Table {
  [key: string]: any;
  size: number;
}

interface Wines {
  [key: string]: any;
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
      // deletes second 6 diners if table size is half
      delete tableInfo[i];
    }
    tableInfo.id = fb.auth().currentUser!.uid;
    tableInfo.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await fb
        .firestore()
        .collection('tables')
        .doc(fb.auth().currentUser!.uid)
        .set(tableInfo)
        .catch((err) => {
          status = 'Firebase Error: ' + err.message;
        });
  }
  return status;
}

const savedTable: any = {};
/**
 * Returns the table from storage
 * @return {Promise<Table>} table
 */
async function getSavedTable(): Promise<Table> {
  let t: Table = { size: 0 };
  await Storage.get({ key: 'savedTable' }).then((ret) => {
    t = JSON.parse(ret.value || JSON.stringify(defaultTable));
  });
  return t;
}

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
  await Storage.get({ key: 'savedTableTime' }).then((ret) => {
    time = JSON.parse(ret.value || JSON.stringify(false));
    console.log('getting saved time', time);
  });
  return time;
}

const DiningEnter: React.FC = () => {
  // vle array
  const [value, loading, error] = Object.values(React.useContext(AppContext));

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(
      'Your table has been submitted, bring the UID to sign-up'
  );
  const [alertTitle, setAlertTitle] = useState('Table Submitted');

  const [tableInfo, setTableInfo] = useState(savedTable);
  const [fullTable, setFullTable] = useState(savedTable.size === 12);
  const [uid, setUid] = useState('Not yet authenticated');

  const [tableTime, setTableTime] = useState(Number);

  useEffect(() => {
    // runs once on component mount (due to empty array second arg)
    getSavedTableTime().then((t) => {
      if (t) {
        setTableTime(t);
      }
    });
    getSavedTable().then((t) => {
      setTableInfo(t);
      setFullTable(t!['size'] === 12);
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
    saveTable(tableInfo, fire).then((s) => {
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
   * @param {Wines} wines
   * @param {string} title
   * @return {any} card element
   */
  function dinerCard(num: number, wines: Wines = {}, title: string = ''): any {
    title = title || 'Diner ' + num.toString();
    return (
      <IonCard color="light">
        <IonCardHeader>
          <IonCardSubtitle>{title}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent class="ion-no-padding">
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              type="text"
              name={num.toString() + '_name'}
              value={tableInfo[num] && tableInfo[num]['name']}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email (preferably Durham)</IonLabel>
            <IonInput
              type="email"
              name={num.toString() + '_email'}
              value={tableInfo[num] && tableInfo[num]['email']}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              CIS Username (NA if not student)
            </IonLabel>
            <IonInput
              type="text"
              name={num.toString() + '_cis'}
              value={tableInfo[num] && tableInfo[num]['cis']}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">College</IonLabel>
            <IonSelect
              placeholder="Select"
              name={num.toString() + '_college'}
              value={tableInfo[num] && tableInfo[num]['college']}
            >
              <IonSelectOption value="hatfield">
                Hatfield JCR Member
              </IonSelectOption>
              <IonSelectOption value="non-hatfield">
                Non-Hatfield
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Wine Choice</IonLabel>
            <IonSelect
              placeholder="Select"
              name={num.toString() + '_wine'}
              value={tableInfo[num] && tableInfo[num]['wine']}
            >
              <React.Fragment>
                {Object.keys(wines)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map((key) => {
                      return (
                        <IonSelectOption key={key} value={key}>
                          {key in wines && wines[key]}
                        </IonSelectOption>
                      );
                    })}
              </React.Fragment>
            </IonSelect>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">Dietary Requirements</IonLabel>
            <IonInput
              type="text"
              name={num.toString() + '_dietary'}
              value={tableInfo[num] && tableInfo[num]['dietary']}
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
          {value && !('home/signUp' in value) && (
            <IonCard color="light">
              <IonCardContent class="ion-text-center">
                Content unavailable. If the issue persists contact LiWB.
              </IonCardContent>
            </IonCard>
          )}
          {value && 'home/signUp' in value && (
            <React.Fragment>
              <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={alertTitle}
                message={alertText}
              />
              <form onSubmit={handleSubmit} id="diningForm">
                <IonCard color="light" id="top">
                  <IonCardHeader>
                    Enter your table information below and be sure to submit,
                    bring your UID to sign-up. Your UID is as follows.
                    <h5 style={{ textAlign: 'center' }}>{uid}</h5>
                    You can only submit your table changes once every 15
                    minutes.
                    <br />
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonButton
                            expand="block"
                            onClick={() => {
                              handleSubmit(
                                  {
                                    target: document.getElementById('diningForm')
                                  },
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
                              (tableTime &&
                                Date.now() <= tableTime + 15 * 60000) ||
                              false
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
                <IonCard color="light">
                  <IonCardHeader class="ion-no-padding">
                    <IonRadioGroup
                      value={fullTable}
                      onIonChange={(e) => setFullTable(e.detail.value)}
                    >
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonItem lines="none">
                              <IonLabel>Full</IonLabel>
                              <IonRadio slot="start" value={true} />
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem lines="none">
                              <IonLabel>Half Table</IonLabel>
                              <IonRadio slot="start" value={false} />
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonRadioGroup>
                  </IonCardHeader>
                </IonCard>
                {dinerCard(1, value['home/signUp']['wine'], 'Head of Table')}
                {dinerCard(2, value['home/signUp']['wine'])}
                {dinerCard(3, value['home/signUp']['wine'])}
                {dinerCard(4, value['home/signUp']['wine'])}
                {dinerCard(5, value['home/signUp']['wine'])}
                {dinerCard(6, value['home/signUp']['wine'])}
                {fullTable && (
                  <React.Fragment>
                    {dinerCard(7, value['home/signUp']['wine'])}
                    {dinerCard(8, value['home/signUp']['wine'])}
                    {dinerCard(9, value['home/signUp']['wine'])}
                    {dinerCard(10, value['home/signUp']['wine'])}
                    {dinerCard(11, value['home/signUp']['wine'])}
                    {dinerCard(12, value['home/signUp']['wine'])}
                  </React.Fragment>
                )}
              </form>
            </React.Fragment>
          )}
        </React.Fragment>
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
