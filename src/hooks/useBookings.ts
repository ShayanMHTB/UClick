// UClick/src/hooks/useBookings.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking } from '@/types';
import { mockApi } from '@/services/mockData';
import { queryKeys } from '@/services/queryClient';

export const useBookings = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.bookings(userId),
    queryFn: () => mockApi.getBookings(userId),
  });
};

export const useBooking = (id?: string) => {
  return useQuery({
    queryKey: queryKeys.booking(id || ''),
    queryFn: () => mockApi.getBooking(id!),
    enabled: !!id,
  });
};
