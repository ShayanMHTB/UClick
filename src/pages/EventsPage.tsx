// UClick/src/pages/EventsPage.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {
  add,
  calendarOutline,
  locationOutline,
  peopleOutline,
} from 'ionicons/icons';

const EventsPage: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Community Coffee Meetup',
      date: 'Tomorrow, 10:00 AM',
      location: 'Central Park Cafe',
      attendees: 15,
      maxAttendees: 20,
      category: 'Social',
    },
    {
      id: 2,
      title: 'Neighborhood Cleanup',
      date: 'Saturday, 9:00 AM',
      location: 'Main Street',
      attendees: 8,
      maxAttendees: 30,
      category: 'Community',
    },
    {
      id: 3,
      title: 'Local Business Networking',
      date: 'Next Tuesday, 6:00 PM',
      location: 'Community Center',
      attendees: 25,
      maxAttendees: 50,
      category: 'Business',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Upcoming Events
          </h2>

          {events.map((event) => (
            <IonCard key={event.id} className="mb-4">
              <IonCardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <IonCardTitle className="text-lg">
                      {event.title}
                    </IonCardTitle>
                    <IonCardSubtitle className="flex items-center mt-2">
                      <IonIcon icon={calendarOutline} className="mr-2" />
                      {event.date}
                    </IonCardSubtitle>
                    <IonCardSubtitle className="flex items-center mt-1">
                      <IonIcon icon={locationOutline} className="mr-2" />
                      {event.location}
                    </IonCardSubtitle>
                  </div>
                  <div className="text-right">
                    <IonBadge color="primary" className="mb-2">
                      {event.category}
                    </IonBadge>
                    <div className="flex items-center text-sm text-gray-500">
                      <IonIcon icon={peopleOutline} className="mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </div>
                  </div>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid className="p-0">
                  <IonRow className="ion-align-items-center">
                    <IonCol>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (event.attendees / event.maxAttendees) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {event.maxAttendees - event.attendees} spots remaining
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow className="mt-3">
                    <IonCol size="6">
                      <IonButton expand="block" fill="solid" size="small">
                        RSVP
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <IonButton expand="block" fill="outline" size="small">
                        Details
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Floating Action Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default EventsPage;
