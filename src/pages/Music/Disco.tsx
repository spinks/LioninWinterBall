import React, { useState, useRef } from 'react';
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
  IonCardContent
} from '@ionic/react';

// @ts-ignore
import { SpotifyApiContext, Search } from 'react-spotify-api';
import config from '../../SpotifyConfig';

import { Plugins, KeyboardResize } from '@capacitor/core';
const { Keyboard } = Plugins;
Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });

declare let cordova: any;

const options = {
  method: 'post',
  data: { grant_type: 'client_credentials' },
  headers: {
    Authorization: 'Basic ' + btoa(config.clientId + ':' + config.clientSecret)
  }
};

let token = '';
/**
 * Gets spotify acess token
 */
function getToken() {
  cordova.plugin.http.sendRequest(
    'https://accounts.spotify.com/api/token',
    options,
    function(response: any) {
      // prints 200
      response.data = JSON.parse(response.data);
      console.log(response.data, Object.keys(response.data));
      console.log(response.data.access_token);
      token = response.data.access_token;
    },
    function(response: any) {
      // prints 403
      console.log(response.status);

      // prints Permission denied
      console.log(response.error);
    }
  );
}
getToken();

const Disco: React.FC = () => {
  const [search, setSearch] = useState('');
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
                console.log(e.key);
                if (e.key == 'Enter') {
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
        <SpotifyApiContext.Provider value={token}>
          {search && (
            <Search query={search} track>
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
                          </IonItem>
                        </IonCard>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Search>
          )}
        </SpotifyApiContext.Provider>
      </IonContent>
    </IonPage>
  );
};

export default Disco;
