// UClick/src/components/ui/ThemeToggle.tsx

import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  size?: 'small' | 'default' | 'large';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'default',
  className = '',
}) => {
  const { actualTheme, toggleTheme } = useTheme();

  return (
    <IonButton
      fill="clear"
      size={size}
      onClick={toggleTheme}
      className={`${className}`}
      aria-label={`Switch to ${
        actualTheme === 'light' ? 'dark' : 'light'
      } mode`}
    >
      <IonIcon
        icon={actualTheme === 'light' ? moonOutline : sunnyOutline}
        slot="icon-only"
      />
    </IonButton>
  );
};

export default ThemeToggle;
