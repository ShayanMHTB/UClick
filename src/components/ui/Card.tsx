// UClick/src/components/ui/Card.tsx

import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

// Main Card Component
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  clickable = false,
  onClick,
  variant = 'default',
}) => {
  const baseClasses = 'transition-all duration-200';

  const variantClasses = {
    default: 'shadow-sm',
    elevated: 'shadow-lg hover:shadow-xl',
    outlined: 'border border-gray-200 dark:border-gray-700 shadow-none',
  };

  const clickableClasses = clickable
    ? 'cursor-pointer hover:shadow-md active:scale-[0.98] hover:-translate-y-0.5'
    : '';

  const combinedClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${clickableClasses} 
    ${className}
  `.trim();

  return (
    <IonCard button={clickable} onClick={onClick} className={combinedClasses}>
      {children}
    </IonCard>
  );
};

// Card Header Component
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <IonCardHeader className={`pb-2 ${className}`}>{children}</IonCardHeader>
  );
};

// Card Content Component
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  padding = 'medium',
}) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  return (
    <IonCardContent className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </IonCardContent>
  );
};

// Card Title Component
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  size = 'medium',
}) => {
  const sizeClasses = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl',
  };

  return (
    <IonCardTitle
      className={`${sizeClasses[size]} font-semibold text-gray-900 dark:text-gray-100 ${className}`}
    >
      {children}
    </IonCardTitle>
  );
};

// Card Subtitle Component
export const CardSubtitle: React.FC<CardSubtitleProps> = ({
  children,
  className = '',
}) => {
  return (
    <IonCardSubtitle
      className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}
    >
      {children}
    </IonCardSubtitle>
  );
};
