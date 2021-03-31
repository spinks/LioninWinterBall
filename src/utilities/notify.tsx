import React, { useState, useEffect } from 'react';
import { IonChip, IonIcon, IonToast } from '@ionic/react';
import { notificationsOff, notifications } from 'ionicons/icons';

import { LocalNotifications } from '@capacitor/local-notifications';

/**
 * Checks permissions, if prompt then asks
 * @return {Boolean} if permissions are allowed
 */
async function permissionCheck() {
  const permissions = await LocalNotifications.checkPermissions().then((permission) => {
    if (permission.display === 'prompt' || permission.display === 'prompt-with-rationale') {
      return LocalNotifications.requestPermissions();
    } else {
      return permission;
    }
  });
  return permissions.display === 'granted';
}

/**
 * Toggles the status of a notification, either creates notification or cancels if it exists
 * @param {NProps} notificationContent the information for the notification
 * @return {Boolean} enabled (the status of that notification)
 */
async function notifyHandler(notificationContent: NProps): Promise<any> {
  let existing = await notifyExists(notificationContent['id']);
  if (!existing) {
    notify(notificationContent);
  } else {
    LocalNotifications.cancel({ notifications: [{ id: notificationContent.id }] });
  }
  existing = await notifyExists(notificationContent['id']);
  return existing;
}

/**
 * Check if an notification exists, either returns undefined or the notification
 * @param {number} nid notification ID
 * @return {Boolean} either undefined if it doesn't exist, or the notification id object
 */
async function notifyExists(
    nid: number
): Promise<Boolean> {
  const pending = await LocalNotifications.getPending().then( (res) => {
    const ids = res.notifications.map((x) => {
      return x['id'];
    });
    return ids;
  });
  console.log(pending);
  return pending.includes(nid);
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

/**
 * Notification properties
 */
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

const NotifyChip: React.FC<NProps> = (props) => {
  const [showToast1, setShowToast1] = useState(false);
  const [toastString, setToastString] = useState('');
  const [notifyOn, setNotifyOn] = useState(false);
  useEffect(() => {
    notifyExists(props.id).then((b) => {
      console.log(b); setNotifyOn(b ? true : false);
    });
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
        onClick={async (e) => {
          e.stopPropagation();
          const permissions = await permissionCheck();
          if (!permissions) {
            setToastString('Please enable notifications in settings to use this feature');
            setShowToast1(true);
            return;
          } else {
            const set = await notifyHandler(props);
            setNotifyOn(set);
            setToastString(set ? 'You will be notified':
                  'Notification cancelled'
            );
            setShowToast1(true);
            return;
          }
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
