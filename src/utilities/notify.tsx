import React, { useState } from 'react';
import { IonChip, IonIcon, IonToast } from '@ionic/react';
import { notificationsOff, notifications } from 'ionicons/icons';

import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

/**
 * Toggles the status of a notification, either creates notifcation or cancels if it exists
 * @param {NProps} notificationContent the information for the notification
 */
async function notifyHandler(notificationContent: NProps): Promise<boolean> {
  const existing = await notifyExists(notificationContent['id']);
  if (!existing) {
    notify(notificationContent);
    return true;
  } else {
    LocalNotifications.cancel({ notifications: [existing] });
    return false;
  }
}

/**
 * Check if an notification exists, either returns undefined or the notification
 * @param {number} nid notification ID
 * @return {any} either undefined if it doesnt exist, or the notification id object
 */
async function notifyExists(nid: number): Promise<any> {
  const pending = await LocalNotifications.getPending();
  return pending['notifications'].find(e => e['id'] === nid.toString());
}

/**
 * Schedules a notification
 * @param {NProps} notificationContent the information for the notification
 */
function notify(notificationContent: NProps) {
  LocalNotifications.schedule({
    notifications: [
      {
        title: notificationContent['title'],
        body: notificationContent['body'],
        id: notificationContent['id'],
        schedule: { at: new Date(notificationContent['datetime']) },
        actionTypeId: '',
        extra: null
      }
    ]
  });
}

interface NProps {
  id: number;
  title: string;
  body: string;
  datetime: string;
}

const NotifyChip: React.FC<NProps> = props => {
  const [showToast1, setShowToast1] = useState(false);
  const [toastString, setToastString] = useState('');
  const [notifyOn, setNotifyOn] = useState(false);

  notifyExists(props.id).then(b => setNotifyOn(b ? true : false));
  return (
    <React.Fragment>
      <IonChip
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1px',
          right: '1px',
          background: 'rgba(255, 255, 255, 0.85)'
        }}
        color={notifyOn ? 'primary' : 'dark'}
        onClick={() => {
          notifyHandler(props).then(b => {
            setNotifyOn(b);
            setToastString(
              b ? 'You will be notified' : 'Notification cancelled'
            );
            setShowToast1(true);
          });
        }}
      >
        <IonIcon
          style={{ margin: '0px' }}
          icon={notifyOn ? notifications : notificationsOff}
        />
      </IonChip>
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => {
          setShowToast1(false);
        }}
        message={toastString}
        duration={500}
        position="top"
        // translucent={true}
      />
    </React.Fragment>
  );
};

export default NotifyChip;
