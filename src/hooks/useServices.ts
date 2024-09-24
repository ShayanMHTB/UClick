// UClick/src/hooks/useServices.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Service, ServiceFilters } from '@/types';
import { mockApi } from '@/services/mockData';
import { queryKeys } from '@/services/queryClient';

export const useServices = (filters?: ServiceFilters) => {
  return useQuery({
    queryKey: queryKeys.services(filters),
    queryFn: () => mockApi.getServices(filters),
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: queryKeys.service(id),
    queryFn: () => mockApi.getService(id),
    enabled: !!id,
  });
};

export const useNearbyServices = (
  lat?: number,
  lng?: number,
  radius: number = 10,
) => {
  return useQuery({
    queryKey: queryKeys.nearbyServices(lat || 0, lng || 0, radius),
    queryFn: () => mockApi.getNearbyServices(lat!, lng!, radius),
    enabled: lat !== undefined && lng !== undefined,
  });
};
