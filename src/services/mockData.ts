// UClick/src/services/mockData.ts

import {
  User,
  Service,
  Event,
  Item,
  Booking,
  Message,
  Conversation,
  Review,
  ServiceCategory,
  ItemCondition,
  BookingStatus,
  RSVPStatus,
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'sarah.m@example.com',
    full_name: 'Sarah Mitchell',
    avatar_url: null,
    bio: 'Professional cleaner with 5+ years experience. I take pride in making your home spotless!',
    phone: '+1234567890',
    location: { latitude: 37.7749, longitude: -122.4194 },
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postal_code: '94105',
    },
    is_verified: true,
    privacy_settings: {
      profile_visibility: 'public',
      show_location: true,
      show_contact_info: true,
      allow_messages_from: 'everyone',
    },
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user-2',
    email: 'mike.t@example.com',
    full_name: 'Mike Thompson',
    avatar_url: null,
    bio: 'Dog lover and certified pet sitter. Your furry friends are in great hands!',
    phone: '+1234567891',
    location: { latitude: 37.7849, longitude: -122.4094 },
    address: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postal_code: '94107',
    },
    is_verified: true,
    privacy_settings: {
      profile_visibility: 'public',
      show_location: true,
      show_contact_info: true,
      allow_messages_from: 'verified_only',
    },
    created_at: '2024-01-10T14:20:00Z',
    updated_at: '2024-01-10T14:20:00Z',
  },
  {
    id: 'user-3',
    email: 'lisa.k@example.com',
    full_name: 'Dr. Lisa Kim',
    avatar_url: null,
    bio: 'PhD in Mathematics. Specialized in helping students excel in math and science.',
    phone: '+1234567892',
    location: { latitude: 37.7649, longitude: -122.4294 },
    address: {
      street: '789 Pine St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postal_code: '94108',
    },
    is_verified: true,
    privacy_settings: {
      profile_visibility: 'public',
      show_location: false,
      show_contact_info: false,
      allow_messages_from: 'verified_only',
    },
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-05T09:15:00Z',
  },
  {
    id: 'user-current',
    email: 'john.doe@example.com',
    full_name: 'John Doe',
    avatar_url: null,
    bio: 'Community member looking for local services and connections.',
    phone: '+1234567893',
    location: { latitude: 37.7549, longitude: -122.4394 },
    address: {
      street: '321 Cedar Blvd',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postal_code: '94109',
    },
    is_verified: false,
    privacy_settings: {
      profile_visibility: 'public',
      show_location: true,
      show_contact_info: true,
      allow_messages_from: 'everyone',
    },
    created_at: '2024-02-01T16:45:00Z',
    updated_at: '2024-02-01T16:45:00Z',
  },
];

// Mock Services
export const mockServices: Service[] = [
  {
    id: 'service-1',
    user_id: 'user-1',
    title: 'Professional House Cleaning',
    description:
      'Comprehensive house cleaning service including all rooms, kitchen, and bathrooms. I use eco-friendly products and bring all supplies. Available weekdays and weekends.',
    category: 'home_services',
    subcategory: 'cleaning',
    price_type: 'hourly',
    price: 30.0,
    currency: 'USD',
    location: { latitude: 37.7749, longitude: -122.4194 },
    service_area_radius: 10,
    images: [],
    availability: {
      monday: [{ start: '09:00', end: '17:00' }],
      tuesday: [{ start: '09:00', end: '17:00' }],
      wednesday: [{ start: '09:00', end: '17:00' }],
      thursday: [{ start: '09:00', end: '17:00' }],
      friday: [{ start: '09:00', end: '15:00' }],
      saturday: [{ start: '10:00', end: '14:00' }],
    },
    is_active: true,
    created_at: '2024-01-15T11:00:00Z',
    updated_at: '2024-01-15T11:00:00Z',
    provider: mockUsers[0],
    average_rating: 4.9,
    total_reviews: 23,
  },
  {
    id: 'service-2',
    user_id: 'user-2',
    title: 'Dog Walking & Pet Sitting',
    description:
      "Reliable dog walking and pet sitting services. I can walk your dog, feed them, and provide companionship while you're away. Flexible scheduling available.",
    category: 'pet_services',
    subcategory: 'pet_care',
    price_type: 'fixed',
    price: 25.0,
    currency: 'USD',
    location: { latitude: 37.7849, longitude: -122.4094 },
    service_area_radius: 5,
    images: [],
    availability: {
      monday: [{ start: '08:00', end: '18:00' }],
      tuesday: [{ start: '08:00', end: '18:00' }],
      wednesday: [{ start: '08:00', end: '18:00' }],
      thursday: [{ start: '08:00', end: '18:00' }],
      friday: [{ start: '08:00', end: '18:00' }],
      saturday: [{ start: '09:00', end: '17:00' }],
      sunday: [{ start: '10:00', end: '16:00' }],
    },
    is_active: true,
    created_at: '2024-01-10T15:00:00Z',
    updated_at: '2024-01-10T15:00:00Z',
    provider: mockUsers[1],
    average_rating: 4.8,
    total_reviews: 15,
  },
  {
    id: 'service-3',
    user_id: 'user-3',
    title: 'Math Tutoring - All Levels',
    description:
      'Expert math tutoring for students of all ages. From basic arithmetic to advanced calculus. I specialize in making complex concepts easy to understand.',
    category: 'professional',
    subcategory: 'education',
    price_type: 'hourly',
    price: 45.0,
    currency: 'USD',
    location: { latitude: 37.7649, longitude: -122.4294 },
    service_area_radius: 15,
    images: [],
    availability: {
      monday: [{ start: '16:00', end: '20:00' }],
      tuesday: [{ start: '16:00', end: '20:00' }],
      wednesday: [{ start: '16:00', end: '20:00' }],
      thursday: [{ start: '16:00', end: '20:00' }],
      saturday: [{ start: '10:00', end: '16:00' }],
      sunday: [{ start: '14:00', end: '18:00' }],
    },
    is_active: true,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z',
    provider: mockUsers[2],
    average_rating: 5.0,
    total_reviews: 8,
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event-1',
    organizer_id: 'user-1',
    title: 'Community Coffee Meetup',
    description:
      'Join us for a casual coffee meetup to connect with neighbors and discuss community initiatives. All are welcome!',
    category: 'Social',
    event_date: '2024-02-15T10:00:00Z',
    end_date: '2024-02-15T12:00:00Z',
    location: { latitude: 37.7749, longitude: -122.4194 },
    address: {
      street: '100 Coffee St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postal_code: '94105',
    },
    max_attendees: 20,
    current_attendees: 15,
    images: [],
    is_public: true,
    created_at: '2024-02-01T09:00:00Z',
    updated_at: '2024-02-01T09:00:00Z',
    organizer: mockUsers[0],
  },
  {
    id: 'event-2',
    organizer_id: 'user-2',
    title: 'Neighborhood Cleanup',
    description:
      "Help keep our neighborhood clean and beautiful! We'll provide supplies and refreshments. Bring your friends and family.",
    category: 'Community',
    event_date: '2024-02-17T09:00:00Z',
    end_date: '2024-02-17T12:00:00Z',
    location: { latitude: 37.7849, longitude: -122.4094 },
    address: {
      street: 'Main Street Park',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postal_code: '94107',
    },
    max_attendees: 30,
    current_attendees: 8,
    images: [],
    is_public: true,
    created_at: '2024-02-05T14:00:00Z',
    updated_at: '2024-02-05T14:00:00Z',
    organizer: mockUsers[1],
  },
];

// Mock Items
export const mockItems: Item[] = [
  {
    id: 'item-1',
    user_id: 'user-current',
    title: 'Vintage Film Camera',
    description:
      'Beautiful vintage 35mm film camera in excellent working condition. Includes original leather case and manual.',
    category: 'Electronics',
    subcategory: 'Cameras',
    condition: 'good',
    price: 150.0,
    currency: 'USD',
    images: [],
    location: { latitude: 37.7549, longitude: -122.4394 },
    is_available: false, // Recently sold
    created_at: '2024-01-20T12:00:00Z',
    updated_at: '2024-02-10T15:00:00Z',
    seller: mockUsers[3],
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversation_id: 'conv-1',
    sender_id: 'user-1',
    recipient_id: 'user-current',
    content: 'Thanks for booking my cleaning service!',
    message_type: 'text',
    file_url: null,
    is_read: false,
    created_at: '2024-02-14T14:30:00Z',
    sender: mockUsers[0],
  },
  {
    id: 'msg-2',
    conversation_id: 'conv-2',
    sender_id: 'user-2',
    recipient_id: 'user-current',
    content: 'What time works best for dog walking?',
    message_type: 'text',
    file_url: null,
    is_read: true,
    created_at: '2024-02-14T13:00:00Z',
    sender: mockUsers[1],
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [mockUsers[0], mockUsers[3]],
    last_message: mockMessages[0],
    unread_count: 1,
    updated_at: '2024-02-14T14:30:00Z',
  },
  {
    id: 'conv-2',
    participants: [mockUsers[1], mockUsers[3]],
    last_message: mockMessages[1],
    unread_count: 0,
    updated_at: '2024-02-14T13:00:00Z',
  },
];

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    service_id: 'service-1',
    client_id: 'user-current',
    provider_id: 'user-1',
    booking_date: '2024-02-16T10:00:00Z',
    end_date: '2024-02-16T13:00:00Z',
    status: 'confirmed',
    total_amount: 90.0,
    currency: 'USD',
    notes: 'Please focus on the kitchen and living room areas.',
    created_at: '2024-02-14T09:00:00Z',
    updated_at: '2024-02-14T09:00:00Z',
    service: mockServices[0],
    client: mockUsers[3],
    provider: mockUsers[0],
  },
];

// Helper functions for mock API calls
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiCall = async <T>(
  data: T,
  delayMs: number = 500,
): Promise<T> => {
  await delay(delayMs);
  return data;
};

// Mock API functions
export const mockApi = {
  // Users
  getCurrentUser: () => mockApiCall(mockUsers[3]), // John Doe as current user
  getUser: (id: string) =>
    mockApiCall(mockUsers.find((u) => u.id === id) || null),

  // Services
  getServices: (filters?: any) => mockApiCall(mockServices),
  getService: (id: string) =>
    mockApiCall(mockServices.find((s) => s.id === id) || null),
  getNearbyServices: (lat: number, lng: number, radius: number = 10) =>
    mockApiCall(mockServices.filter((s) => s.location !== null)),

  // Events
  getEvents: (filters?: any) => mockApiCall(mockEvents),
  getEvent: (id: string) =>
    mockApiCall(mockEvents.find((e) => e.id === id) || null),
  getUpcomingEvents: () => mockApiCall(mockEvents),

  // Items
  getItems: (filters?: any) => mockApiCall(mockItems),
  getItem: (id: string) =>
    mockApiCall(mockItems.find((i) => i.id === id) || null),

  // Messages
  getConversations: () => mockApiCall(mockConversations),
  getMessages: (conversationId: string) =>
    mockApiCall(
      mockMessages.filter((m) => m.conversation_id === conversationId),
    ),

  // Bookings
  getBookings: (userId?: string) => mockApiCall(mockBookings),
  getBooking: (id: string) =>
    mockApiCall(mockBookings.find((b) => b.id === id) || null),
};

// Export current user for easy access
export const currentUser = mockUsers[3];
