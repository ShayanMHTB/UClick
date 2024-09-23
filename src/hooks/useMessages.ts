// UClick/src/hooks/useMessages.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Conversation, Message } from '@/types';
import { mockApi } from '@/services/mockData';
import { queryKeys } from '@/services/queryClient';

export const useConversations = () => {
  return useQuery({
    queryKey: queryKeys.conversations,
    queryFn: () => mockApi.getConversations(),
  });
};

export const useMessages = (conversationId?: string) => {
  return useQuery({
    queryKey: queryKeys.messages(conversationId || ''),
    queryFn: () => mockApi.getMessages(conversationId!),
    enabled: !!conversationId,
  });
};
