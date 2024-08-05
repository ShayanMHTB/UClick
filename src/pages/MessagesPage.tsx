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
  IonAvatar,
  IonLabel,
  IonNote,
  IonBadge,
} from '@ionic/react';

const MessagesPage: React.FC = () => {
  const conversations = [
    {
      id: 1,
      name: 'Sarah M.',
      lastMessage: 'Thanks for booking my cleaning service!',
      time: '2 min ago',
      unread: 1,
      avatar: '👩‍💼',
    },
    {
      id: 2,
      name: 'Mike T.',
      lastMessage: 'What time works best for dog walking?',
      time: '1 hour ago',
      unread: 0,
      avatar: '👨‍🦱',
    },
    {
      id: 3,
      name: 'Dr. Lisa K.',
      lastMessage: 'Looking forward to our tutoring session',
      time: '3 hours ago',
      unread: 2,
      avatar: '👩‍🏫',
    },
    {
      id: 4,
      name: 'Community Group',
      lastMessage: 'Event reminder: Cleanup tomorrow at 9am',
      time: '1 day ago',
      unread: 0,
      avatar: '👥',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {conversations.map((conv) => (
            <IonItem key={conv.id} button>
              <IonAvatar slot="start">
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-2xl">
                  {conv.avatar}
                </div>
              </IonAvatar>

              <IonLabel>
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">{conv.name}</h2>
                  <IonNote className="text-xs">{conv.time}</IonNote>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {conv.lastMessage}
                </p>
              </IonLabel>

              {conv.unread > 0 && (
                <IonBadge color="danger" slot="end">
                  {conv.unread}
                </IonBadge>
              )}
            </IonItem>
          ))}
        </IonList>

        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              No Messages Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start a conversation by contacting a service provider or joining
              an event
            </p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MessagesPage;
