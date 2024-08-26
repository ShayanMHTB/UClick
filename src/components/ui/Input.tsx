// UClick/src/components/ui/Input.tsx

import React from 'react';
import { IonInput, IonTextarea, IonItem, IonLabel } from '@ionic/react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onInput,
  error,
  type = 'text',
  required = false,
  disabled = false,
  multiline = false,
  rows = 3,
  className = '',
}) => {
  const handleInput = (e: any) => {
    if (onInput) {
      const inputValue = e.detail.value || '';
      onInput(inputValue);
    }
  };

  const inputClasses = `
    ${error ? 'ion-color-danger' : ''}
    ${className}
  `.trim();

  if (multiline) {
    return (
      <div className="w-full">
        {label && (
          <IonLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </IonLabel>
        )}
        <IonItem className={`${error ? 'ion-color-danger' : ''}`}>
          <IonTextarea
            placeholder={placeholder}
            value={value}
            onIonInput={handleInput}
            rows={rows}
            disabled={disabled}
            className={inputClasses}
          />
        </IonItem>
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <IonLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </IonLabel>
      )}
      <IonItem className={`${error ? 'ion-color-danger' : ''}`}>
        <IonInput
          type={type}
          placeholder={placeholder}
          value={value}
          onIonInput={handleInput}
          disabled={disabled}
          className={inputClasses}
        />
      </IonItem>
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
};
