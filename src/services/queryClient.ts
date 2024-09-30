// UClick/src/services/queryClient.ts

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: false,
    },
  },
});

// Query keys for consistent caching
export const queryKeys = {
  // Users
  currentUser: ['users', 'current'] as const,
  user: (id: string) => ['users', id] as const,

  // Services
  services: (filters?: any) => ['services', filters] as const,
  service: (id: string) => ['services', id] as const,
  nearbyServices: (lat: number, lng: number, radius: number) =>
    ['services', 'nearby', lat, lng, radius] as const,

  // Events
  events: (filters?: any) => ['events', filters] as const,
  event: (id: string) => ['events', id] as const,
  upcomingEvents: ['events', 'upcoming'] as const,

  // Items
  items: (filters?: any) => ['items', filters] as const,
  item: (id: string) => ['items', id] as const,

  // Messages
  conversations: ['conversations'] as const,
  conversation: (id: string) => ['conversations', id] as const,
  messages: (conversationId: string) => ['messages', conversationId] as const,

  // Bookings
  bookings: (userId?: string) => ['bookings', userId] as const,
  booking: (id: string) => ['bookings', id] as const,
} as const;
