import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAlert
} from '@ionic/react';

import NotifyChip from './notify';
import { NProps } from './notify';

const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

interface GCProps {
  title?: string;
  subtitle?: string;
  img?: string;
  body?: string;
  router?: string;
  href?: string;
  notify?: NProps;
  popup?: string;
  smallTitle?: Boolean;
  class?: string;
}

const Card: React.FC<GCProps> = props => {
  const item = props;
  const [showAlert, setShowAlert] = useState(false);
  return (
    <React.Fragment>
      {item['popup'] && (
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={item['title'] || ''}
          message={item['popup']}
          cssClass="align-alert-left"
        />
      )}
      <IonCard
        class={item['class'] ?? ''}
        color="light"
        button={'router' in item || 'href' in item}
        routerLink={item['router']}
        href={item['href']}
        onClick={() => {
          setShowAlert(true);
        }}
      >
        {item['img'] && <img src={item['img']} alt="" />}
        {(item['title'] || item['subtitle']) && (
          <IonCardHeader>
            {item['subtitle'] && (
              <IonCardSubtitle>
                {htmlToReactParser.parse(item['subtitle'])}
              </IonCardSubtitle>
            )}
            {item['title'] && (
              <IonCardTitle class={item['smallTitle'] ? 'grid-med-title' : ''}>
                {htmlToReactParser.parse(item['title'])}
              </IonCardTitle>
            )}
          </IonCardHeader>
        )}
        {/* {item['body'] && <IonCardContent>{item['body']}</IonCardContent>} */}
        {item['body'] && !(item['title'] || item['subtitle']) && (
          <IonCardContent>
            {htmlToReactParser.parse(item['body'])}
          </IonCardContent>
        )}
        {item['body'] && (item['title'] || item['subtitle']) && (
          <IonCardContent style={{ paddingTop: '0px' }}>
            {htmlToReactParser.parse(item['body'])}
          </IonCardContent>
        )}
        {item['notify'] &&
          new Date(item['notify']['datetime']) >= new Date() && (
            <NotifyChip {...item['notify']} />
          )}
        {props.children}
      </IonCard>
    </React.Fragment>
  );
};

Card.defaultProps = {
  smallTitle: false
};

export default Card;
