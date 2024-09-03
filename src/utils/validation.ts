// UClick/src/utils/validation.ts

export const validators = {
  required: (value: any) => {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
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

  positiveNumber: (value: any) => {
    if (!value) return undefined;
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      return 'Must be a positive number';
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
};

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
