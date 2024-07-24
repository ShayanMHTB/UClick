export interface Environment {
  production: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublicKey: string;
  googleMapsApiKey: string;
  oneSignalAppId?: string;
  apiBaseUrl: string;
  gaTrackingId?: string;
  sentryDsn?: string;
  enablePayments: boolean;
  enablePushNotifications: boolean;
  enableAnalytics: boolean;
  debugMode: boolean;
}

export const environment: Environment = {
  production: import.meta.env.PROD,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  oneSignalAppId: import.meta.env.VITE_ONESIGNAL_APP_ID,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  enablePayments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
  enablePushNotifications:
    import.meta.env.VITE_ENABLE_PUSH_NOTIFICATIONS === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
};
