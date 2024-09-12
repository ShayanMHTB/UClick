// UClick/src/pages/MessagesPage.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  RefresherEventDetail,
} from '@ionic/react';
import { useConversations } from '@/hooks/useMessages';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Conversation } from '@/types';

const MessagesPage: React.FC = () => {
  const {
    data: conversations = [],
    isLoading,
    isError,
    refetch,
  } = useConversations();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };

  const handleConversationClick = (conversation: Conversation) => {
    // TODO: Navigate to conversation detail page
    console.log('Open conversation:', conversation.id);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${
        Math.floor(diffInHours) !== 1 ? 's' : ''
      } ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} day${
        Math.floor(diffInDays) !== 1 ? 's' : ''
      } ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get the other participant in the conversation
  const getOtherParticipant = (conversation: Conversation) => {
    // Assuming current user is not the first participant, or find logic to determine current user
    return (
      conversation.participants.find((p) => p.id !== 'user-current') ||
      conversation.participants[0]
    );
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <IonList>
      {Array.from({ length: 5 }).map((_, index) => (
        <IonItem key={index}>
          <div
            className="w-10 h-10 rounded-full bg-gray-300 mr-3"
            slot="start"
          />
          <IonLabel>
            <IonSkeletonText animated style={{ width: '40%' }} />
            <IonSkeletonText animated style={{ width: '80%' }} />
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );

  // Error state
  const renderError = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Unable to load messages
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Please check your connection and try again
      </p>
      <button
        onClick={() => refetch()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );

  // Empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="text-6xl mb-4">💬</div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No Messages Yet
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Start a conversation by contacting a service provider or joining an
        event
      </p>
    </div>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {isLoading ? (
          renderSkeleton()
        ) : isError ? (
          renderError()
        ) : conversations.length === 0 ? (
          renderEmptyState()
        ) : (
          <IonList>
            {conversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation);

              return (
                <IonItem
                  key={conversation.id}
                  button
                  onClick={() => handleConversationClick(conversation)}
                >
                  <Avatar
                    src={otherParticipant.avatar_url}
                    fallback={
                      otherParticipant.full_name
                        ? getInitials(otherParticipant.full_name)
                        : '?'
                    }
                    size="medium"
                    className="mr-3"
                  />

                  <IonLabel>
                    <div className="flex items-center justify-between">
                      <h2 className="font-medium flex items-center">
                        {otherParticipant.full_name || 'Unknown User'}
                        {otherParticipant.is_verified && (
                          <Badge
                            variant="success"
                            size="small"
                            className="ml-2"
                          >
                            Verified
                          </Badge>
                        )}
                      </h2>
                      <IonNote className="text-xs">
                        {conversation.last_message
                          ? formatTime(conversation.last_message.created_at)
                          : ''}
                      </IonNote>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                      {conversation.last_message
                        ? conversation.last_message.content
                        : 'No messages yet'}
                    </p>
                  </IonLabel>

                  {conversation.unread_count > 0 && (
                    <Badge variant="danger" size="small">
                      {conversation.unread_count}
                    </Badge>
                  )}
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MessagesPage;
