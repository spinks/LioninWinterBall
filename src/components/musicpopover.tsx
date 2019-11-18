import React from 'react';
import { IonItem } from '@ionic/react';

interface MusicPopoverProps {
  dismiss: () => void;
}

const MusicPopover: React.FC<MusicPopoverProps> = () => {
  return (
    <IonItem lines="none">
      <p>This is some simple information</p>
    </IonItem>
  );
};

export default MusicPopover;
