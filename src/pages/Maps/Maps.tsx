import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonImg,
  IonItem,
  IonLabel
} from '@ionic/react';
import React from 'react';
import {
  pizza,
  beer,
  exit,
  medkit,
  baseball,
  helpBuoy,
  basket,
  flame,
  cloudyNight,
  camera,
  iceCream,
  thunderstorm,
  film,
  restaurant
} from 'ionicons/icons';
import './map.css';

/**
 * Clear popups
 */
function clearText() {
  [
    'food',
    'bar',
    'wc1',
    'wc2',
    'exit1',
    'exit2',
    'portersLodge',
    'playroom',
    'shipwreck',
    'pirateship',
    'kitchen',
    'mermaids',
    'photo',
    'hideout',
    'dining',
    'creek',
    'pa'
  ].forEach(t => {
    const el = document.getElementById('map-' + t);
    if (el) {
      el.classList.add('hide');
    }
  });
}
/**
 * Set status of a popup
 * @param {string} t id of popup to toggle
 */
function toggleText(t: string) {
  clearText();
  const el = document.getElementById('map-' + t);
  if (el) {
    el.classList.toggle('hide');
  }
}

const Maps: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg
          src="/assets/map/map.png"
          alt=""
          onClick={() => clearText()}
        ></IonImg>

        <IonButton class="map-button map-wc1" onClick={() => toggleText('wc1')}>
          <IonLabel class="map-text-icon">
            <b>WC</b>
          </IonLabel>
        </IonButton>
        <IonItem id="map-wc1" class="map-label map-wc1 hide" color="light">
          <IonLabel>Toilets</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-exit1"
          onClick={() => toggleText('exit1')}
        >
          <IonIcon icon={exit} class="map-icon" />
        </IonButton>
        <IonItem id="map-exit1" class="map-label map-exit1 hide" color="light">
          <IonLabel>Emergency Exit</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-shipwreck"
          onClick={() => toggleText('shipwreck')}
        >
          <IonIcon icon={helpBuoy} class="map-icon" />
        </IonButton>
        <IonItem
          id="map-shipwreck"
          class="map-label map-shipwreck hide"
          color="light"
        >
          <IonLabel>Shipwreck</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-kitchen"
          onClick={() => toggleText('kitchen')}
        >
          <IonIcon icon={flame} class="map-icon" />
        </IonButton>
        <IonItem
          id="map-kitchen"
          class="map-label map-kitchen hide"
          color="light"
        >
          <IonLabel>Kitchen (Welfare)</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-mermaids"
          onClick={() => toggleText('mermaids')}
        >
          <IonIcon icon={cloudyNight} class="map-icon" />
        </IonButton>
        <IonItem
          id="map-mermaids"
          class="map-label map-mermaids hide"
          color="light"
        >
          <IonLabel>Mermaid Lagoon (toasties)</IonLabel>
        </IonItem>

        <IonButton class="map-button map-bar" onClick={() => toggleText('bar')}>
          <IonIcon icon={beer} class="map-icon" />
        </IonButton>
        <IonItem id="map-bar" class="map-label map-bar hide" color="light">
          <IonLabel>Bar (glitter)</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-photo"
          onClick={() => toggleText('photo')}
        >
          <IonIcon icon={camera} class="map-icon" />
        </IonButton>
        <IonItem id="map-photo" class="map-label map-photo hide" color="light">
          <IonLabel>Photography</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-hideout"
          onClick={() => toggleText('hideout')}
        >
          <IonIcon icon={film} class="map-icon" />
        </IonButton>

        <IonButton class="map-button map-pa" onClick={() => toggleText('pa')}>
          <IonIcon icon={iceCream} class="map-icon" />
        </IonButton>
        <IonItem id="map-pa" class="map-label map-pa hide" color="light">
          <IonLabel>Pirates Arcade</IonLabel>
        </IonItem>

        <IonItem
          id="map-hideout"
          class="map-label map-hideout hide"
          color="light"
        >
          <IonLabel>Hideout (movies/snacks)</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-dining"
          onClick={() => toggleText('dining')}
        >
          <IonIcon icon={restaurant} class="map-icon" />
        </IonButton>
        <IonItem
          id="map-dining"
          class="map-label map-dining hide"
          color="light"
        >
          <IonLabel>
            Dining (Casino,
            <p />
            Mini Golf)
          </IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-portersLodge"
          onClick={() => toggleText('portersLodge')}
        >
          <IonIcon icon={medkit} class="map-icon" />
        </IonButton>
        <IonItem
          id="map-portersLodge"
          class="map-label map-portersLodge hide"
          color="light"
        >
          <IonLabel>Porters' Lodge & First Aid</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-food"
          onClick={() => toggleText('food')}
        >
          <IonIcon icon={pizza} class="map-icon" />
        </IonButton>
        <IonItem id="map-food" class="map-label map-food hide" color="light">
          <IonLabel>Food</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-creek"
          onClick={() => toggleText('creek')}
        >
          <IonIcon icon={thunderstorm} class="map-icon" />
        </IonButton>
        <IonItem id="map-creek" class="map-label map-creek hide" color="light">
          <IonLabel>Crocodile Creek</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-pirateship"
          onClick={() => toggleText('pirateship')}
        >
          <IonIcon icon={basket} class="map-icon" />
        </IonButton>
        <IonItem
          id="map-pirateship"
          class="map-label map-pirateship hide"
          color="light"
        >
          <IonLabel>Pirate Ship (main marquee)</IonLabel>
        </IonItem>

        <IonButton class="map-button map-wc2" onClick={() => toggleText('wc2')}>
          <IonLabel class="map-text-icon">
            <b>WC</b>
          </IonLabel>
        </IonButton>
        <IonItem id="map-wc2" class="map-label map-wc2 hide" color="light">
          <IonLabel>Toilets</IonLabel>
        </IonItem>

        <IonButton
          class="map-button map-playroom"
          onClick={() => toggleText('playroom')}
        >
          <IonIcon icon={baseball} class="map-icon" />
        </IonButton>

        <IonButton
          class="map-button map-exit2"
          onClick={() => toggleText('exit2')}
        >
          <IonIcon icon={exit} class="map-icon" />
        </IonButton>
        <IonItem id="map-exit2" class="map-label map-exit2 hide" color="light">
          <IonLabel>Emergency Exit</IonLabel>
        </IonItem>

        <IonItem
          id="map-playroom"
          class="map-label map-playroom hide"
          color="light"
        >
          <IonLabel>
            Playroom (Bouncy Castle,
            <p />
            Ball pit, Space hoppers)
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
