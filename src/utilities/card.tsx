import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/react';

import NotifyChip from './notify';
import { NProps } from './notify';

interface GCProps {
  title?: string;
  subtitle?: string;
  img?: string;
  body?: string;
  router?: string;
  href?: string;
  notify?: NProps;
}

const GridCard: React.FC<GCProps> = props => {
  const item = props;
  if (item['notify']) {
    // remove notifiers for events that have passed
    if (new Date(item['notify']['datetime']) < new Date()) {
      delete item['notify'];
    }
  }
  return (
    <React.Fragment>
      <IonCard
        class="grid-card card-white-header"
        button={'router' in item || 'href' in item}
        routerLink={item['router']}
        href={item['href']}
      >
        {item['img'] && <img src={item['img']} alt="" />}
        {(item['title'] || item['subtitle']) && (
          <IonCardHeader>
            {item['subtitle'] && (
              <IonCardSubtitle>{item['subtitle']}</IonCardSubtitle>
            )}
            {item['title'] && <IonCardTitle>{item['title']}</IonCardTitle>}
          </IonCardHeader>
        )}
        {item['body'] && !item['title'] && (
          <IonCardContent>{item['body']}</IonCardContent>
        )}
        {item['body'] && item['title'] && (
          <IonCardContent style={{ paddingTop: '0px' }}>
            {item['body']}
          </IonCardContent>
        )}
        {item['notify'] && <NotifyChip {...item['notify']} />}
      </IonCard>
    </React.Fragment>
  );
};

export default GridCard;
