// UClick/src/components/ui/Avatar.tsx

import React from 'react';
import { IonImg, IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string; // Initials or emoji
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'medium',
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
  };

  const baseClasses = `
    rounded-full 
    flex 
    items-center 
    justify-center 
    overflow-hidden 
    bg-gray-200 
    dark:bg-gray-700 
    ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const handleClick = () => {
    if (onClick) onClick();
  };

  // If we have a source image, use it
  if (src) {
    return (
      <div className={baseClasses} onClick={handleClick}>
        <IonImg src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  // If we have fallback text (initials/emoji), use it
  if (fallback) {
    return (
      <div
        className={`${baseClasses} bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold`}
        onClick={handleClick}
      >
        {fallback}
      </div>
    );
  }

  // Default to person icon
  return (
    <div
      className={`${baseClasses} text-gray-500 dark:text-gray-400`}
      onClick={handleClick}
    >
      <IonIcon icon={personOutline} className="w-1/2 h-1/2" />
    </div>
  );
};
