import React, { useState, useEffect } from 'react';
import { IonChip, IonIcon, IonToast } from '@ionic/react';
import { notificationsOff, notifications } from 'ionicons/icons';

import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

/**
 * Toggles the status of a notification, either creates notification or cancels if it exists
 * @param {NProps} notificationContent the information for the notification
 * @return {any} object with enabled (the status of that notification) and permissions (if they are allowed)
 */
async function notifyHandler(notificationContent: NProps): Promise<any> {
  const permissions = await LocalNotifications.areEnabled();
  if (!permissions.value) {
    return { enabled: false, permissions: false };
  }
  let existing = await notifyExists(notificationContent['id']);
  if (!existing) {
    notify(notificationContent);
  } else {
    LocalNotifications.cancel({ notifications: [existing] });
  }
  existing = await notifyExists(notificationContent['id']);
  return { enabled: existing, permissions: true };
}

/**
 * Check if an notification exists, either returns undefined or the notification
 * @param {number} nid notification ID
 * @return {any} either undefined if it doesn't exist, or the notification id object
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
        sound: notificationContent['silent'] ? undefined : '/assets/note.mp3',
        extra: null
      }
    ]
  });
}

export interface NProps {
  /**
   * id: unique numeric ID for notification
   */
  id: number;
  title: string;
  body: string;
  /**
   * datetime: string parsable by Date() method for time of notification
   */
  datetime: string;
  /**
   * silent: if passed and true then sound will be disabled for notification
   */
  silent?: boolean;
}

const NotifyChip: React.FC<NProps> = props => {
  const [showToast1, setShowToast1] = useState(false);
  const [toastString, setToastString] = useState('');
  const [notifyOn, setNotifyOn] = useState(false);
  useEffect(() => {
    notifyExists(props.id).then(b => setNotifyOn(b ? true : false));
  }, [props.id]);
  return (
    <React.Fragment>
      <IonChip
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1px',
          right: '1px',
          opacity: '0.9',
          background: 'var(--ion-color-light)'
        }}
        color={notifyOn ? 'primary' : 'dark'}
        onClick={e => {
          e.stopPropagation();
          notifyHandler(props).then(b => {
            setNotifyOn(b.enabled);
            setToastString(
              b.permissions
                ? b.enabled
                  ? 'You will be notified'
                  : 'Notification cancelled'
                : 'Please enable notification in settings to use this feature'
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
