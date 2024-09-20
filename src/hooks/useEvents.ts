// UClick/src/hooks/useEvents.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Event, EventFilters } from '@/types';
import { mockApi } from '@/services/mockData';
import { queryKeys } from '@/services/queryClient';

export const useEvents = (filters?: EventFilters) => {
  return useQuery({
    queryKey: queryKeys.events(filters),
    queryFn: () => mockApi.getEvents(filters),
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => mockApi.getEvent(id),
    enabled: !!id,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: queryKeys.upcomingEvents,
    queryFn: () => mockApi.getUpcomingEvents(),
  });
};
