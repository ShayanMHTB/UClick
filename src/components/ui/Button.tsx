// UClick/src/components/ui/Button.tsx

import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'start' | 'end' | 'icon-only';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = 'medium',
  variant = 'primary',
  fullWidth = false,
  icon,
  iconPosition = 'start',
  className = '',
  type = 'button',
}) => {
  // Map our variants to Ionic button props
  const getIonicProps = (): {
    fill: 'solid' | 'outline' | 'clear';
    color: string;
  } => {
    switch (variant) {
      case 'primary':
        return { fill: 'solid', color: 'primary' };
      case 'secondary':
        return { fill: 'solid', color: 'medium' };
      case 'outline':
        return { fill: 'outline', color: 'primary' };
      case 'ghost':
        return { fill: 'clear', color: 'primary' };
      case 'danger':
        return { fill: 'solid', color: 'danger' };
      default:
        return { fill: 'solid', color: 'primary' };
    }
  };

  const ionicProps = getIonicProps();

  // Custom styling classes
  const baseClasses = 'transition-all duration-200 font-medium';

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const variantClasses = {
    primary: 'shadow-sm hover:shadow-md active:shadow-sm',
    secondary: 'shadow-sm hover:shadow-md active:shadow-sm',
    outline: 'border-2 hover:shadow-sm',
    ghost: 'hover:bg-opacity-10',
    danger: 'shadow-sm hover:shadow-md active:shadow-sm',
  };

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${loading ? 'opacity-75 pointer-events-none' : ''}
    ${className}
  `.trim();

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <IonButton
      {...ionicProps}
      size={size === 'medium' ? 'default' : size}
      expand={fullWidth ? 'block' : undefined}
      disabled={disabled || loading}
      onClick={handleClick}
      className={combinedClasses}
      type={type}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      )}

      {/* Icon at start */}
      {icon && iconPosition === 'start' && !loading && (
        <IonIcon icon={icon} slot="start" />
      )}

      {/* Icon only */}
      {icon && iconPosition === 'icon-only' && !loading && (
        <IonIcon icon={icon} slot="icon-only" />
      )}

      {/* Button text */}
      {iconPosition !== 'icon-only' && children}

      {/* Icon at end */}
      {icon && iconPosition === 'end' && !loading && (
        <IonIcon icon={icon} slot="end" />
      )}
    </IonButton>
  );
};
