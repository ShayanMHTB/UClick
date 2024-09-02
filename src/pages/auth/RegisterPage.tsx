// UClick/src/pages/auth/RegisterPage.tsx

import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useForm } from '@/hooks/useForm';
import { validators, combineValidators } from '@/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const history = useHistory();

  const initialValues: RegisterFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validateForm = (values: RegisterFormData) => {
    const errors: any = {};

    const nameError = combineValidators(
      validators.required,
      validators.minLength(2),
    )(values.fullName);
    if (nameError) errors.fullName = nameError;

    const emailError = combineValidators(
      validators.required,
      validators.email,
    )(values.email);
    if (emailError) errors.email = emailError;

    const passwordError = combineValidators(
      validators.required,
      validators.minLength(8),
    )(values.password);
    if (passwordError) errors.password = passwordError;

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const { values, errors, isSubmitting, submitError, setValue, handleSubmit } =
    useForm({
      initialValues,
      validate: validateForm,
      onSubmit: async (data) => {
        // Mock registration - in real app this would call authentication API
        console.log('Registration attempt:', data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demo, redirect to app after registration
        history.replace('/app/home');
      },
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="min-h-full flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Logo/Brand */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                UClick
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Join your local community
              </p>
            </div>

            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onInput={(value) => setValue('fullName', value)}
                  error={errors.fullName}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onInput={(value) => setValue('email', value)}
                  error={errors.email}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password (min 8 characters)"
                  value={values.password}
                  onInput={(value) => setValue('password', value)}
                  error={errors.password}
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onInput={(value) => setValue('confirmPassword', value)}
                  error={errors.confirmPassword}
                  required
                />

                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3">
                    <p className="text-red-600 dark:text-red-200 text-sm">
                      {submitError}
                    </p>
                  </div>
                )}

                <Button
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Create Account
                </Button>

                {/* Terms */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By creating an account, you agree to our{' '}
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </p>
                </div>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                      to="/auth/login"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
