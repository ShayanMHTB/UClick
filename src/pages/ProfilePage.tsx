// UClick/src/pages/ProfilePage.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {
  personOutline,
  listOutline,
  bookmarkOutline,
  cardOutline,
  shieldCheckmarkOutline,
  helpCircleOutline,
  settingsOutline,
  logOutOutline,
  chevronForwardOutline,
} from 'ionicons/icons';

const ProfilePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Profile Header */}
        <IonCard className="mx-4 mt-4">
          <IonCardContent>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                JD
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                John Doe
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Community Member
              </p>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        4.9
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Rating
                      </div>
                    </div>
                  </IonCol>
                  <IonCol>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        23
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Bookings
                      </div>
                    </div>
                  </IonCol>
                  <IonCol>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        5
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Services
                      </div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Menu Options */}
        <IonList className="mt-4">
          <IonItem button>
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={listOutline} slot="start" />
            <IonLabel>My Services</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={bookmarkOutline} slot="start" />
            <IonLabel>My Bookings</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={cardOutline} slot="start" />
            <IonLabel>Payment Methods</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={shieldCheckmarkOutline} slot="start" />
            <IonLabel>Privacy Settings</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>Help & Support</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </IonList>

        {/* Sign Out Button */}
        <div className="px-4 mt-6 mb-20">
          <IonButton
            expand="block"
            fill="outline"
            color="danger"
            className="border-red-500"
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Sign Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
