# Setup Documentation

## Prerequisites

### Development Environment

- **Node.js**: Version 18.x or later
- **npm**: Version 9.x or later (or yarn/pnpm)
- **Git**: Latest stable version
- **IDE**: VS Code recommended with Ionic and React extensions

### Mobile Development (Optional for initial development)

- **Android Studio**: For Android development and emulation
- **Xcode**: For iOS development (macOS only)
- **Java JDK**: Version 11 or later for Android builds

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/uclick.git
cd uclick
```

### 2. Install Dependencies

```bash
# Install npm dependencies
npm install

# Install Ionic CLI globally (if not already installed)
npm install -g @ionic/cli

# Install Capacitor CLI globally (if not already installed)
npm install -g @capacitor/cli
```

### 3. Environment Configuration

Create environment files for different stages:

```bash
# Development environment
cp src/environments/environment.example.ts src/environments/environment.ts

# Production environment
cp src/environments/environment.example.ts src/environments/environment.prod.ts
```

Update the environment files with your configuration:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  supabaseUrl: 'YOUR_SUPABASE_PROJECT_URL',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
  stripePublicKey: 'YOUR_STRIPE_PUBLIC_KEY',
  oneSignalAppId: 'YOUR_ONESIGNAL_APP_ID',
  googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
};
```

## Supabase Setup

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Note your Project URL and API Key (anon/public)

### 2. Database Schema Setup

```sql
-- Run these commands in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types
CREATE TYPE service_category AS ENUM (
  'childcare', 'home_services', 'professional',
  'personal', 'pet_services', 'other'
);

CREATE TYPE booking_status AS ENUM (
  'pending', 'confirmed', 'completed', 'cancelled'
);

-- Create tables (see API.md for full schema)
```

### 3. Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- Add other tables...

-- Create basic policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### 4. Authentication Setup

1. Navigate to Authentication → Settings in Supabase dashboard
2. Configure redirect URLs for your app
3. Enable desired auth providers (Google, Facebook, etc.)

## Development Server

### Web Development

```bash
# Start development server
ionic serve

# Start with specific port
ionic serve --port=8100

# Open in browser automatically
ionic serve --open
```

### Mobile Development

#### Android

```bash
# Build for Android
ionic capacitor build android

# Open in Android Studio
ionic capacitor open android

# Run on device/emulator
ionic capacitor run android --livereload
```

#### iOS (macOS only)

```bash
# Build for iOS
ionic capacitor build ios

# Open in Xcode
ionic capacitor open ios

# Run on device/simulator
ionic capacitor run ios --livereload
```

## Testing Setup

### Unit Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### End-to-End Testing

```bash
# Install E2E testing dependencies
npm install --save-dev cypress

# Run E2E tests
npm run e2e

# Open Cypress GUI
npm run e2e:open
```

## Build & Deployment

### Web Build

```bash
# Build for production
ionic build --prod

# Build with specific environment
ionic build --configuration=production
```

### Mobile Build

#### Android

```bash
# Generate Android build
ionic capacitor build android --prod

# Generate signed APK (requires keystore setup)
cd android
./gradlew assembleRelease
```

#### iOS

```bash
# Generate iOS build
ionic capacitor build ios --prod

# Open in Xcode for App Store submission
ionic capacitor open ios
```

## Environment Variables

### Required Environment Variables

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_test_your-stripe-key

# OneSignal Configuration
ONESIGNAL_APP_ID=your-onesignal-app-id

# Google Maps Configuration
GOOGLE_MAPS_API_KEY=your-google-maps-key
```

### Optional Environment Variables

```bash
# Sentry Configuration (Error Tracking)
SENTRY_DSN=https://your-sentry-dsn

# Analytics Configuration
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

## Development Tools Setup

### VS Code Extensions

```json
{
  "recommendations": [
    "ionic.ionic",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json"
  ]
}
```

### Git Hooks Setup

```bash
# Install Husky for Git hooks
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "npm run test"
```

## Troubleshooting

### Common Issues

#### Node.js Version Issues

```bash
# Use Node Version Manager
nvm install 18
nvm use 18
```

#### iOS Build Issues

```bash
# Clean iOS build
ionic capacitor clean ios
ionic capacitor build ios
```

#### Android Build Issues

```bash
# Clean Android build
ionic capacitor clean android
ionic capacitor build android

# Check Java version
java -version
```

#### Dependency Conflicts

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Performance Issues

```bash
# Analyze bundle size
npm run build:analyze

# Check for memory leaks
npm run test -- --detectOpenHandles
```

## Database Migration

### Schema Updates

```bash
# Create migration file
supabase migration new add_new_table

# Apply migrations
supabase db push

# Reset database (development only)
supabase db reset
```

## Monitoring & Analytics Setup

### Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/capacitor @sentry/react

# Configure in main.tsx
import * as Sentry from "@sentry/react";
```

### Performance Monitoring

```bash
# Install performance monitoring
npm install @ionic/react-hooks

# Configure performance tracking
import { useIonViewDidEnter } from '@ionic/react';
```

## Security Checklist

### Pre-deployment Security

- [ ] All API keys are environment variables
- [ ] No hardcoded secrets in code
- [ ] HTTPS enforced in production
- [ ] Input validation implemented
- [ ] SQL injection protection enabled
- [ ] XSS protection implemented
- [ ] CSRF tokens configured

### Ongoing Security

- [ ] Regular dependency updates
- [ ] Security audit reports
- [ ] Penetration testing
- [ ] User data encryption
- [ ] Backup and recovery procedures

## Deployment Strategies

### Staging Environment

```bash
# Deploy to staging
ionic build --configuration=staging
# Deploy to staging server
```

### Production Environment

```bash
# Build for production
ionic build --prod

# Deploy to production server
# Configure CI/CD pipeline
```

### App Store Deployment

```bash
# iOS App Store
# Follow Apple's guidelines for submission

# Google Play Store
# Follow Google's guidelines for submission
```

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Update Ionic
npm install @ionic/cli@latest -g

# Update Capacitor
npm install @capacitor/cli@latest -g
```

### Database Maintenance

```sql
-- Regular database cleanup
-- Performance optimization
-- Backup procedures
```
