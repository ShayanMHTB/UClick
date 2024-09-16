// UClick/src/hooks/useAuth.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types';
import { mockApi } from '@/services/mockData';
import { queryKeys } from '@/services/queryClient';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => mockApi.getCurrentUser(),
  });
};

export const useUser = (id?: string) => {
  return useQuery({
    queryKey: queryKeys.user(id || ''),
    queryFn: () => mockApi.getUser(id!),
    enabled: !!id,
  });
};
