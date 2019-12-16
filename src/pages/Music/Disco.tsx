import React, { useState, useEffect } from 'react';
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
import { add } from 'ionicons/icons';

// @ts-ignore
import { SpotifyApiContext, Search } from 'react-spotify-api';

import fb from '../../Firebase';
import spotifyKeys from '../../SpotifyConfig';

import { Plugins, KeyboardResize } from '@capacitor/core';
const { Keyboard, Storage } = Plugins;
Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });

/**
 * Saves selected tract to storage and FS
 * @param {any} trackInfo
 */
async function saveTrack(trackInfo: any) {
  Storage.set({
    key: 'savedTrack',
    value: JSON.stringify(trackInfo)
  });
  if (fb.auth().currentUser) {
    fb.firestore()
      .collection('songs')
      .doc(fb.auth().currentUser!.uid)
      .set({
        name: trackInfo.name,
        artist: trackInfo.artists[0].name,
        url: trackInfo.external_urls.spotify
      });
  }
}

let loadedTrack: any = {};
/**
 * Sets loadedTrack global constant to stored track
 */
async function getTrack() {
  await Storage.get({ key: 'savedTrack' }).then(ret => {
    loadedTrack = JSON.parse(ret.value || '{}');
  });
}
// code in the main page is one once on app startup
// this has to be run before the component mounts
getTrack();

/**
 * Saves selected token to storage
 * @param {any} token
 */
async function savePToken(token: any) {
  console.log('setting pToken', token);
  Storage.set({
    key: 'savedToken',
    value: JSON.stringify(token)
  });
}
// a token instance which is persistent
let pToken = '';
/**
 * Sets the pToken global constant to stored token value
 */
async function getPToken() {
  await Storage.get({ key: 'savedToken' }).then(ret => {
    pToken = JSON.parse(ret.value || '""');
    console.log('getting pToken', pToken);
  });
}

const Disco: React.FC = () => {
  const [search, setSearch] = useState('');
  // selected track
  const [savedTrack, setSavedTrack] = useState(loadedTrack);
  // track selection currently being processed
  const [choiceTrack, setChoiceTrack] = useState(loadedTrack);
  // confirmation toast
  const [showAlert, setShowAlert] = useState(false);

  // spotify api token
  const [token, setToken] = useState(pToken);
  // refresh guard
  const [currentlyFetching, setCurrentlyFetching] = useState(false);

  /**
   * Gets spotify access token
   */
  function getToken() {
    if (!currentlyFetching) {
      setCurrentlyFetching(true);
      fetch(
        'https://cors-anywhere.herokuapp.com/' +
          'https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Basic ' +
              btoa(spotifyKeys.clientId + ':' + spotifyKeys.clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body:
            encodeURIComponent('grant_type') +
            '=' +
            encodeURIComponent('client_credentials')
        }
      ).then(r => {
        console.log('fetching token:', r.status, r);
        if (r.status === 200) {
          r.text().then(s => {
            const at = JSON.parse(s).access_token;
            setToken(at);
            savePToken(at);
          });
        }
        // timeout to protect against repeated rapid calls
        setTimeout(() => {
          setCurrentlyFetching(false);
        }, 1000);
      });
    } else {
      console.log('bypassed fetch, was already fetching');
    }
  }

  useEffect(() => {
    // runs once on component mount (due to empty array second arg)

    // get any cached token and then set (if empty it gets a new token)
    getPToken().then(() => {
      setToken(pToken);
      // if pToken was null get a new token
      if (pToken === '') getToken();
    });
    // some warnings about not passing the functions to useEffect?
    // eslint-disable-next-line
  }, []);

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
          color="light"
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
            color="light"
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
            color="light"
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
              {(data: any, loading: any, error: any) => {
                if (error) {
                  if (
                    // cases where tokens are invalid or not provided
                    error.status === 401 ||
                    (error.status === 400 &&
                      error.message ===
                        'Only valid bearer authentication supported')
                  ) {
                    getToken();
                    return <React.Fragment />;
                  }
                  return (
                    <React.Fragment>
                      {error && <h1>{JSON.stringify(error)}</h1>}
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment>
                    {data && (
                      <React.Fragment>
                        {data.tracks.items.map((track: any) => (
                          <IonCard
                            class="card-white-header"
                            key={track.id}
                            style={{ margin: '5px 6px 5px 6px' }}
                          >
                            <IonItem>
                              {track.album.images[
                                track.album.images.length - 1
                              ] && (
                                <IonThumbnail slot="start">
                                  <img
                                    src={
                                      track.album.images[
                                        track.album.images.length - 1
                                      ].url
                                    }
                                    alt="album artwork"
                                  />
                                </IonThumbnail>
                              )}
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
                );
              }}
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
                loadedTrack = choiceTrack;
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
