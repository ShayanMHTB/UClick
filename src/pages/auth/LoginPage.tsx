// UClick/src/pages/auth/LoginPage.tsx

import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import { logoGoogle, logoFacebook, logoApple } from 'ionicons/icons';
import { useForm } from '@/hooks/useForm';
import { validators, combineValidators } from '@/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const history = useHistory();

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  const validateForm = (values: LoginFormData) => {
    const errors: any = {};

    const emailError = combineValidators(
      validators.required,
      validators.email,
    )(values.email);
    if (emailError) errors.email = emailError;

    const passwordError = combineValidators(
      validators.required,
      validators.minLength(6),
    )(values.password);
    if (passwordError) errors.password = passwordError;

    return errors;
  };

  const { values, errors, isSubmitting, submitError, setValue, handleSubmit } =
    useForm({
      initialValues,
      validate: validateForm,
      onSubmit: async (data) => {
        // Mock login - in real app this would call authentication API
        console.log('Login attempt:', data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo, redirect to app on any credentials
        history.replace('/app/home');
      },
    });

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Mock social login - redirect to app immediately
    history.replace('/app/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to UClick</IonTitle>
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
                Connect with your local community
              </p>
            </div>

            {/* Login Form */}
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  placeholder="Enter your password"
                  value={values.password}
                  onInput={(value) => setValue('password', value)}
                  error={errors.password}
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
                  Sign In
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    icon={logoGoogle}
                    iconPosition="start"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    icon={logoFacebook}
                    iconPosition="start"
                    onClick={() => handleSocialLogin('Facebook')}
                  >
                    Continue with Facebook
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    icon={logoApple}
                    iconPosition="start"
                    onClick={() => handleSocialLogin('Apple')}
                  >
                    Continue with Apple
                  </Button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link
                      to="/auth/register"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Sign up
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

export default LoginPage;
