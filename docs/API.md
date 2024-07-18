# API Documentation

## Overview

UClick uses Supabase as the primary backend service, providing auto-generated REST APIs, real-time subscriptions, and authentication. This document outlines the database schema, API endpoints, and integration patterns.

## Database Schema

### Core Tables

#### users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  phone VARCHAR(20),
  location POINT,
  address JSONB,
  is_verified BOOLEAN DEFAULT false,
  privacy_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### services

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category service_category NOT NULL,
  subcategory VARCHAR(100),
  price_type VARCHAR(20) CHECK (price_type IN ('hourly', 'fixed', 'package')),
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  location POINT,
  service_area_radius INTEGER, -- in kilometers
  images TEXT[],
  availability JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### items

```sql
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  condition VARCHAR(50) CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  images TEXT[],
  location POINT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### events

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location POINT,
  address JSONB,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  images TEXT[],
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### bookings

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES users(id) ON DELETE CASCADE,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  status booking_status DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### messages

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  file_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### reviews

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### event_attendees

```sql
CREATE TABLE event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rsvp_status VARCHAR(20) DEFAULT 'going' CHECK (rsvp_status IN ('going', 'interested', 'not_going')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);
```

## API Endpoints

### Authentication

Supabase provides built-in authentication endpoints:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Social login
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});
```

### User Management

#### Get Current User Profile

```typescript
const { data: profile, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', user.id)
  .single();
```

#### Update User Profile

```typescript
const { data, error } = await supabase
  .from('users')
  .update({
    full_name: 'John Doe',
    bio: 'Updated bio',
    avatar_url: 'https://example.com/avatar.jpg',
  })
  .eq('id', user.id);
```

### Service Management

#### Create Service Listing

```typescript
const { data, error } = await supabase.from('services').insert({
  user_id: user.id,
  title: 'Dog Walking Service',
  description: 'Professional dog walking in your neighborhood',
  category: 'pet_services',
  price_type: 'hourly',
  price: 25.0,
  location: `POINT(${longitude} ${latitude})`,
  service_area_radius: 5,
});
```

#### Get Services Near Location

```typescript
const { data, error } = await supabase
  .rpc('get_nearby_services', {
    lat: userLatitude,
    lng: userLongitude,
    radius_km: 10
  });

// Custom function in Supabase:
CREATE OR REPLACE FUNCTION get_nearby_services(lat float, lng float, radius_km int)
RETURNS TABLE (
  id uuid,
  title varchar,
  description text,
  category service_category,
  price decimal,
  distance_km float
) AS $
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.title,
    s.description,
    s.category,
    s.price,
    ST_Distance(
      ST_GeogFromText('POINT(' || lng || ' ' || lat || ')'),
      ST_GeogFromText('POINT(' || ST_X(s.location) || ' ' || ST_Y(s.location) || ')')
    ) / 1000 as distance_km
  FROM services s
  WHERE ST_DWithin(
    s.location,
    ST_GeogFromText('POINT(' || lng || ' ' || lat || ')'),
    radius_km * 1000
  )
  AND s.is_active = true
  ORDER BY distance_km;
END;
$ LANGUAGE plpgsql;
```

#### Search Services

```typescript
const { data, error } = await supabase
  .from('services')
  .select(
    `
    *,
    users!services_user_id_fkey (
      full_name,
      avatar_url,
      is_verified
    )
  `,
  )
  .textSearch('title,description', searchQuery)
  .eq('category', selectedCategory)
  .gte('price', minPrice)
  .lte('price', maxPrice)
  .eq('is_active', true)
  .order('created_at', { ascending: false });
```

### Booking System

#### Create Booking

```typescript
const { data, error } = await supabase.from('bookings').insert({
  service_id: serviceId,
  client_id: user.id,
  provider_id: providerId,
  booking_date: bookingDateTime,
  end_date: endDateTime,
  total_amount: calculatedAmount,
  notes: bookingNotes,
});
```

#### Get User Bookings

```typescript
const { data, error } = await supabase
  .from('bookings')
  .select(
    `
    *,
    services (
      title,
      category,
      images
    ),
    provider:users!bookings_provider_id_fkey (
      full_name,
      avatar_url
    ),
    client:users!bookings_client_id_fkey (
      full_name,
      avatar_url
    )
  `,
  )
  .or(`client_id.eq.${user.id},provider_id.eq.${user.id}`)
  .order('booking_date', { ascending: false });
```

#### Update Booking Status

```typescript
const { data, error } = await supabase
  .from('bookings')
  .update({ status: 'confirmed' })
  .eq('id', bookingId)
  .eq('provider_id', user.id); // Ensure only provider can confirm
```

### Messaging System

#### Send Message

```typescript
const { data, error } = await supabase.from('messages').insert({
  conversation_id: conversationId,
  sender_id: user.id,
  recipient_id: recipientId,
  content: messageContent,
  message_type: 'text',
});
```

#### Get Conversation Messages

```typescript
const { data, error } = await supabase
  .from('messages')
  .select(
    `
    *,
    sender:users!messages_sender_id_fkey (
      full_name,
      avatar_url
    )
  `,
  )
  .eq('conversation_id', conversationId)
  .order('created_at', { ascending: true });
```

#### Mark Messages as Read

```typescript
const { data, error } = await supabase
  .from('messages')
  .update({ is_read: true })
  .eq('conversation_id', conversationId)
  .eq('recipient_id', user.id)
  .eq('is_read', false);
```

### Event Management

#### Create Event

```typescript
const { data, error } = await supabase.from('events').insert({
  organizer_id: user.id,
  title: 'Community Meetup',
  description: 'Join us for a local community gathering',
  category: 'social',
  event_date: eventDateTime,
  location: `POINT(${longitude} ${latitude})`,
  address: addressObject,
  max_attendees: 50,
});
```

#### RSVP to Event

```typescript
const { data, error } = await supabase.from('event_attendees').upsert({
  event_id: eventId,
  user_id: user.id,
  rsvp_status: 'going',
});
```

#### Get Upcoming Events

```typescript
const { data, error } = await supabase
  .from('events')
  .select(
    `
    *,
    organizer:users!events_organizer_id_fkey (
      full_name,
      avatar_url
    ),
    attendee_count:event_attendees(count)
  `,
  )
  .gte('event_date', new Date().toISOString())
  .eq('is_public', true)
  .order('event_date', { ascending: true });
```

## Real-time Subscriptions

### Message Notifications

```typescript
const messageSubscription = supabase
  .channel('messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `recipient_id=eq.${user.id}`,
    },
    (payload) => {
      // Handle new message
      handleNewMessage(payload.new);
    },
  )
  .subscribe();
```

### Booking Updates

```typescript
const bookingSubscription = supabase
  .channel('bookings')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'bookings',
      filter: `client_id=eq.${user.id}`,
    },
    (payload) => {
      // Handle booking status change
      handleBookingUpdate(payload.new);
    },
  )
  .subscribe();
```

### Event Updates

```typescript
const eventSubscription = supabase
  .channel('events')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'events',
    },
    (payload) => {
      // Handle event updates
      handleEventUpdate(payload.new);
    },
  )
  .subscribe();
```

## Row Level Security (RLS) Policies

### User Profiles

```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Public profiles can be viewed by anyone
CREATE POLICY "Public profiles viewable" ON users
  FOR SELECT USING (
    privacy_settings->>'profile_visibility' = 'public'
  );
```

### Service Listings

```sql
-- Anyone can view active services
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

-- Service owners can manage their services
CREATE POLICY "Service owners can manage services" ON services
  FOR ALL USING (auth.uid() = user_id);
```

### Bookings

```sql
-- Users can view bookings they're involved in
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    auth.uid() = client_id OR auth.uid() = provider_id
  );

-- Clients can create bookings
CREATE POLICY "Clients can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Providers can update booking status
CREATE POLICY "Providers can update bookings" ON bookings
  FOR UPDATE USING (auth.uid() = provider_id);
```

### Messages

```sql
-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
  );

-- Users can send messages
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
```

## API Client Integration

### Supabase Client Setup

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from './types/database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### TypeScript Types

```typescript
// Generated from Supabase CLI
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        };
      };
      // ... other table types
    };
  };
}
```

### Service Layer Implementation

```typescript
// services/api.service.ts
export class ApiService {
  private supabase = supabase;

  async getCurrentUser() {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    return user;
  }

  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async getNearbyServices(lat: number, lng: number, radius: number = 10) {
    const { data, error } = await this.supabase.rpc('get_nearby_services', {
      lat,
      lng,
      radius_km: radius,
    });

    if (error) throw error;
    return data;
  }

  async createBooking(bookingData: BookingInsert) {
    const { data, error } = await this.supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
```

## Error Handling

### Common Error Patterns

```typescript
interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export const handleApiError = (error: any): ApiError => {
  if (error.code === 'PGRST116') {
    return { message: 'Resource not found' };
  }

  if (error.code === '23505') {
    return { message: 'This item already exists' };
  }

  return {
    message: error.message || 'An unexpected error occurred',
    code: error.code,
    details: error.details,
  };
};
```

### Rate Limiting

```sql
-- Implement rate limiting with custom functions
CREATE OR REPLACE FUNCTION check_rate_limit(
  user_id uuid,
  action_type text,
  max_requests int,
  time_window_minutes int
)
RETURNS boolean AS $
DECLARE
  current_count int;
BEGIN
  SELECT COUNT(*)
  INTO current_count
  FROM user_actions
  WHERE user_id = user_id
    AND action_type = action_type
    AND created_at > NOW() - INTERVAL '1 minute' * time_window_minutes;

  RETURN current_count < max_requests;
END;
$ LANGUAGE plpgsql;
```

## Performance Optimization

### Database Indexes

```sql
-- Location-based queries
CREATE INDEX idx_services_location ON services USING GIST (location);
CREATE INDEX idx_events_location ON events USING GIST (location);

-- Text search
CREATE INDEX idx_services_search ON services USING GIN (to_tsvector('english', title || ' ' || description));

-- Common queries
CREATE INDEX idx_services_user_active ON services (user_id, is_active);
CREATE INDEX idx_bookings_client_date ON bookings (client_id, booking_date);
CREATE INDEX idx_messages_conversation ON messages (conversation_id, created_at);
```

### Query Optimization

```typescript
// Use select() to limit returned columns
const { data } = await supabase
  .from('services')
  .select('id, title, price, location')
  .limit(20);

// Use range() for pagination
const { data } = await supabase.from('services').select('*').range(0, 19); // First 20 items
```

## API Testing

### Unit Tests

```typescript
import { ApiService } from '../services/api.service';

describe('ApiService', () => {
  const apiService = new ApiService();

  it('should get user profile', async () => {
    const profile = await apiService.getUserProfile('test-user-id');
    expect(profile).toHaveProperty('id');
    expect(profile).toHaveProperty('email');
  });

  it('should handle API errors', async () => {
    try {
      await apiService.getUserProfile('invalid-id');
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });
});
```

### Integration Tests

```typescript
describe('Service Integration', () => {
  it('should create and retrieve service', async () => {
    const serviceData = {
      title: 'Test Service',
      description: 'Test Description',
      category: 'home_services',
      price: 50.0,
    };

    const created = await apiService.createService(serviceData);
    const retrieved = await apiService.getService(created.id);

    expect(retrieved.title).toBe(serviceData.title);
  });
});
```
