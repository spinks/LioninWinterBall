import React, { useState } from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonCard,
  IonInput,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonAlert
} from '@ionic/react';

// @ts-ignore
import { SpotifyApiContext, Search } from 'react-spotify-api';
import config from '../../SpotifyConfig';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Plugins, KeyboardResize } from '@capacitor/core';
import { add } from 'ionicons/icons';
const { Keyboard, Storage } = Plugins;
Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });

let token = '';
/**
 * Gets spotify acess token
 */
function getToken() {
  // const options = {
  //   method: 'post',
  //   data: { grant_type: 'client_credentials' },
  //   headers: {
  //     Authorization: 'Basic ' + btoa(config.clientId + ':' + config.clientSecret)
  //   }
  // };
  // cordova.plugin.http.sendRequest(
  //   'https://accounts.spotify.com/api/token',
  //   options,
  //   function(response: any) {
  //     // prints 200
  //     response.data = JSON.parse(response.data);
  //     console.log(response.data, Object.keys(response.data));
  //     console.log(response.data.access_token);
  //     token = response.data.access_token;
  //   },
  //   function(response: any) {
  //     // prints 403
  //     console.log(response.status);

  //     // prints Permission denied
  //     console.log(response.error);
  //   }
  // );
  fetch(
    'https://cors-anywhere.herokuapp.com/' +
      'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + btoa(config.clientId + ':' + config.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
        encodeURIComponent('grant_type') +
        '=' +
        encodeURIComponent('client_credentials')
    }
  ).then(r => {
    console.log('test', r, r.status, r.body);
    r.text().then(s => (token = JSON.parse(s).access_token));
  });
}
getToken();

/**
 * Saves selected tract to storage and FS
 * @param {any} trackInfo
 */
async function saveTrack(trackInfo: any) {
  await Storage.set({
    key: 'savedTrack',
    value: JSON.stringify(trackInfo)
  });
  if (firebase.auth().currentUser) {
    firebase
      .firestore()
      .collection('songs')
      .doc(firebase.auth().currentUser!.uid)
      .set({
        name: trackInfo.name,
        artist: trackInfo.artists[0].name,
        url: trackInfo.external_urls.spotify
      });
  }
}

let loadedTrack: any = {};
/**
 * Saves selected tract to storage and FS
 * @return {any} trackInfo or null if not found
 */
function getTrack(): any {
  const r = Storage.get({ key: 'savedTrack' }).then(ret => {
    loadedTrack = JSON.parse(ret.value || '{}');
  });
  console.log(r);
  return r;
}
getTrack();

const Disco: React.FC = () => {
  const [search, setSearch] = useState('');
  const [savedTrack, setSavedTrack] = useState(loadedTrack);
  const [choiceTrack, setChoiceTrack] = useState(loadedTrack);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Silent Disco</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        style={{ background: 'rgb(33, 94, 85)' }}
        // onIonScrollStart={() => Keyboard.hide()}
      >
        <IonCard
          class="card-white-header"
          style={{ margin: '5px 6px 5px 6px' }}
          id="carder"
        >
          <IonCardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <IonInput
              clearInput
              placeholder="Search"
              inputmode="search"
              type="search"
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  Keyboard.hide();
                  // console.log(e.currentTarget.innerHTML);
                  console.log(document.activeElement);
                }
              }}
              onIonChange={e => {
                if (e.detail.value) {
                  setSearch(e.detail.value);
                } else {
                  setSearch('');
                }
              }}
            ></IonInput>
          </IonCardContent>
        </IonCard>
        {search === '' && savedTrack['name'] && (
          <IonCard
            class="card-white-header"
            style={{ margin: '5px 6px 5px 6px' }}
          >
            <IonCardHeader>
              <IonCardSubtitle>Currently selected song</IonCardSubtitle>
              <IonCardTitle>
                {savedTrack['name'] + '     '}
                <h5 style={{ display: 'inline' }}>
                  {savedTrack['artists'][0]['name']}
                </h5>
              </IonCardTitle>
            </IonCardHeader>
            <img
              src={savedTrack['album']['images'][0]['url']}
              alt="album artwork"
            />
          </IonCard>
        )}
        {search === '' && !savedTrack['name'] && (
          <IonCard
            class="card-white-header"
            style={{ margin: '5px 6px 5px 6px' }}
          >
            <IonCardHeader>
              <IonCardSubtitle>
                No song currently selected, search
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        )}
        {search && (
          <SpotifyApiContext.Provider value={token}>
            <Search query={search} track options={{ limit: 10 }}>
              {(data: any, loading: any, error: any) => (
                <React.Fragment>
                  {error && <h1>{JSON.stringify(error)}</h1>}
                  {data && (
                    <React.Fragment>
                      {data.tracks.items.map((track: any) => (
                        <IonCard
                          class="card-white-header"
                          key={track.id}
                          style={{ margin: '5px 6px 5px 6px' }}
                        >
                          <IonItem>
                            <IonThumbnail slot="start">
                              <img
                                src={track.album.images[2].url}
                                alt="album artwork"
                              />
                            </IonThumbnail>
                            <IonLabel>
                              <h3>{track.name}</h3>
                              <p>{track.artists[0].name}</p>
                            </IonLabel>
                            <IonIcon
                              icon={add}
                              slot="end"
                              onClick={() => {
                                setChoiceTrack(track);
                                setShowAlert(true);
                              }}
                            />
                          </IonItem>
                        </IonCard>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Search>
          </SpotifyApiContext.Provider>
        )}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirm song choice?'}
          message={
            'Select <b>' + choiceTrack.name + '</b> for the silent disco'
          }
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {}
            },
            {
              text: 'Confirm',
              handler: () => {
                setSavedTrack(choiceTrack);
                saveTrack(choiceTrack);
                setSearch('');
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Disco;
