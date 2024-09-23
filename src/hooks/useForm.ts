// UClick/src/hooks/useForm.ts

import { useState, useCallback } from 'react';
import { FormState, FormErrors } from '@/types';

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit?: (values: T) => Promise<void> | void;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setValue = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setSubmitError(null);
  }, []);

  const validateForm = useCallback(() => {
    if (!validate) return true;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  const handleSubmit = useCallback(async () => {
    if (!onSubmit) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const isValid = validateForm();
      if (!isValid) return;

      await onSubmit(values);

      // Reset form on successful submission
      setValues(initialValues);
      clearErrors();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An error occurred',
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit, initialValues, clearErrors]);

  const reset = useCallback(() => {
    setValues(initialValues);
    clearErrors();
    setIsSubmitting(false);
  }, [initialValues, clearErrors]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    isValid,
    setValue,
    setFieldError,
    clearErrors,
    validateForm,
    handleSubmit,
    reset,
  };
};

// UClick/src/utils/validation.ts

export const validators = {
  required: (value: any) => {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }
    return undefined;
  },

  email: (value: string) => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  },

  minLength: (min: number) => (value: string) => {
    if (!value) return undefined;
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return undefined;
  },

  maxLength: (max: number) => (value: string) => {
    if (!value) return undefined;
    if (value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return undefined;
  },

  number: (value: any) => {
    if (!value) return undefined;
    if (isNaN(Number(value))) {
      return 'Must be a valid number';
    }
    return undefined;
  },

  positiveNumber: (value: any) => {
    if (!value) return undefined;
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      return 'Must be a positive number';
    }
    return undefined;
  },

  phone: (value: string) => {
    if (!value) return undefined;
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return undefined;
  },
};

// Utility function to combine multiple validators
export const combineValidators = (
  ...validatorFns: Array<(value: any) => string | undefined>
) => {
  return (value: any) => {
    for (const validator of validatorFns) {
      const error = validator(value);
      if (error) return error;
    }
    return undefined;
  };
};
