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
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonAlert,
  IonToast,
  IonSearchbar
} from '@ionic/react';
import { add } from 'ionicons/icons';

// @ts-ignore
import { SpotifyApiContext, Search } from 'react-spotify-api';

import fb from '../../Firebase';

import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
import { Keyboard } from '@capacitor/keyboard';

let deviceInfo = {};
Device.getInfo().then((r) => {
  deviceInfo = r;
});

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

let savedTrack: any = {};
/**
 * Sets loadedTrack global constant to stored track
 * @return {Promise<Object>} saved track
 */
async function getSavedTrack() {
  let t;
  await Storage.get({ key: 'savedTrack' }).then((ret) => {
    t = JSON.parse(ret.value || '{}');
  });
  return t;
}

/**
 * Saves selected token to storage
 * @param {any} token
 */
async function saveToken(token: any) {
  console.log('setting saved Token', token);
  Storage.set({
    key: 'savedToken',
    value: JSON.stringify(token)
  });
}

/**
 * Gets token from storage
 * @return {Promise<string>} token
 */
async function getSavedToken(): Promise<string> {
  let token = '';
  await Storage.get({ key: 'savedToken' }).then((ret) => {
    token = JSON.parse(ret.value || '""');
    console.log('getting saved Token', token);
  });
  return token;
}

const Disco: React.FC = () => {
  const [search, setSearch] = useState('');
  // selected track
  const [selectedTrack, setSelectedTrack] = useState(savedTrack);
  // track selection currently being processed
  const [choiceTrack, setChoiceTrack] = useState(savedTrack);
  // error getting tokens div
  const [errorTokens, setErrorTokens] = useState(false);
  // selection confirmation alert
  const [showAlert, setShowAlert] = useState(false);

  // spotify api token
  const [token, setToken] = useState('');
  // refresh guard
  const [currentlyFetching, setCurrentlyFetching] = useState(false);

  const [showToastKeyboard, setShowToastKeyboard] = useState(false);

  /**
   * Gets spotify access token sets values within this component
   * Also stores to cache
   */
  function getAPIToken() {
    if (!currentlyFetching) {
      setCurrentlyFetching(true);
      fetch('https://lioninwinterball.now.sh/api/token').then((r) => {
        console.log('fetching token:', r.status, r);
        if (r.status === 200) {
          r.text().then((resp) => {
            setToken(resp);
            saveToken(resp);
            setCurrentlyFetching(false);
            if (errorTokens) setErrorTokens(false);
          });
        } else {
          console.log('error fetching token', r);
          if (!errorTokens) setErrorTokens(true);
          setTimeout(() => {
            setCurrentlyFetching(false);
          }, 10000);
        }
      });
    } else {
      console.log('bypassed fetch, was already fetching');
    }
  }

  useEffect(() => {
    // runs once on component mount (due to empty array second arg)
    // get any cached token and then set (if empty it gets a new token)
    getSavedToken().then((t) => {
      if (t) {
        setToken(t);
      } else {
        getAPIToken();
      }
    });
    getSavedTrack().then((t) => {
      if (t) {
        setSelectedTrack(t);
      }
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
      <IonContent fullscreen style={{ background: 'rgb(18, 39, 78)' }}>
        <IonToast
          isOpen={showToastKeyboard}
          onDidDismiss={() => {
            setShowToastKeyboard(false);
          }}
          message={''}
          duration={1}
          position="bottom"
          animated={false}
          keyboardClose={true}
        />
        <IonCard style={{ margin: '5px 6px 5px 6px' }} color="light">
          <IonCardContent
            style={{
              paddingTop: '0px',
              paddingBottom: '0px',
              paddingLeft: '0px',
              paddingRight: '0px'
            }}
          >
            <IonSearchbar
              placeholder="Search"
              inputmode="search"
              type="search"
              showCancelButton="always"
              onKeyPress={(e) => {
                if (
                  e.key === 'Enter' &&
                  'platform' in deviceInfo &&
                  deviceInfo['platform'] !== 'web'
                ) {
                  if (deviceInfo['platform'] === 'ios') {
                    setShowToastKeyboard(true);
                  } else {
                    Keyboard.hide();
                  }
                }
              }}
              onIonChange={(e) => {
                if (e.detail.value) {
                  setSearch(e.detail.value);
                } else {
                  setSearch('');
                }
              }}
            ></IonSearchbar>
          </IonCardContent>
        </IonCard>
        {search === '' && selectedTrack['name'] && (
          <IonCard style={{ margin: '5px 6px 5px 6px' }} color="light">
            <IonCardHeader>
              <IonCardSubtitle>Currently selected song</IonCardSubtitle>
              <IonCardTitle>
                {selectedTrack['name'] + '     '}
                <h5 style={{ display: 'inline' }}>
                  {selectedTrack['artists'][0]['name']}
                </h5>
              </IonCardTitle>
            </IonCardHeader>
            <img
              src={selectedTrack['album']['images'][0]['url']}
              alt="album artwork"
              style={{ bottom: '-6px', position: 'relative' }}
            />
          </IonCard>
        )}
        {search === '' && !selectedTrack['name'] && (
          <IonCard color="light" style={{ margin: '5px 6px 5px 6px' }}>
            <IonCardHeader>
              <IonCardSubtitle>
                No song currently selected, search
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        )}
        {errorTokens && (
          <IonCard color="light" style={{ margin: '5px 6px 5px 6px' }}>
            <IonCardContent>
              Error getting tokens. Try again later, if this issue persists
              contact the LiWB team.
            </IonCardContent>
          </IonCard>
        )}
        {search && !currentlyFetching && (
          <SpotifyApiContext.Provider value={token}>
            <Search query={search} track options={{ limit: 10 }}>
              {({ data, loading, error }: any) => {
                if (error) {
                  if (
                    // cases where tokens are invalid or not provided
                    error.status === 401 ||
                    (error.status === 400 &&
                      error.message ===
                        'Only valid bearer authentication supported')
                  ) {
                    getAPIToken();
                    return <React.Fragment />;
                  } else {
                    return (
                      <React.Fragment>
                        {error && <h1>{JSON.stringify(error)}</h1>}
                      </React.Fragment>
                    );
                  }
                }
                return (
                  <React.Fragment>
                    {data && (
                      <React.Fragment>
                        {data.tracks.items.map((track: any) => (
                          <IonCard
                            key={track.id}
                            style={{ margin: '5px 6px 5px 6px' }}
                            color="light"
                          >
                            <IonItem lines="none">
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
                setSelectedTrack(choiceTrack);
                saveTrack(choiceTrack);
                savedTrack = choiceTrack;
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
