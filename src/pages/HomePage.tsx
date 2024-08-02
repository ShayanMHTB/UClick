// UClick/src/pages/HomePage.tsx

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
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {
  searchOutline,
  calendarOutline,
  bagOutline,
  addOutline,
  homeOutline,
  checkmarkCircleOutline,
  starOutline,
  locationOutline,
} from 'ionicons/icons';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UClick</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-gray-50 dark:bg-gray-900">
        {/* Welcome Section */}
        <div className="px-4 py-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome to UClick</h1>
          <p className="text-blue-100">
            Your local community connection platform
          </p>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Quick Actions
          </h2>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonCard button className="h-full text-center">
                  <IonCardContent className="py-6">
                    <IonIcon
                      icon={searchOutline}
                      size="large"
                      className="text-blue-500 mb-3"
                    />
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Find Services
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard button className="h-full text-center">
                  <IonCardContent className="py-6">
                    <IonIcon
                      icon={calendarOutline}
                      size="large"
                      className="text-blue-500 mb-3"
                    />
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Local Events
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <IonCard button className="h-full text-center">
                  <IonCardContent className="py-6">
                    <IonIcon
                      icon={bagOutline}
                      size="large"
                      className="text-blue-500 mb-3"
                    />
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Marketplace
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard button className="h-full text-center">
                  <IonCardContent className="py-6">
                    <IonIcon
                      icon={addOutline}
                      size="large"
                      className="text-blue-500 mb-3"
                    />
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Post Service
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Recent Activity */}
        <div className="px-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Recent Activity
          </h2>
          <IonCard>
            <IonCardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <IonIcon
                      icon={homeOutline}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      New service available nearby
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Dog walking service
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <IonIcon
                      icon={calendarOutline}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Community meetup tomorrow
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Coffee and networking
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <IonIcon
                      icon={checkmarkCircleOutline}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Item sold successfully
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Vintage camera
                    </p>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Featured Services */}
        <div className="px-4 pb-20">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Featured Services
          </h2>
          <IonCard>
            <IonCardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <IonCardTitle className="text-lg">
                    House Cleaning
                  </IonCardTitle>
                  <div className="flex items-center mt-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
                      SM
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Sarah M.
                    </span>
                    <IonBadge color="primary" className="ml-2">
                      Verified
                    </IonBadge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    $30
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    /hour
                  </div>
                </div>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Professional house cleaning service in your neighborhood.
                Trusted provider with 5-star ratings.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <IonIcon
                      icon={starOutline}
                      className="text-yellow-500 mr-1"
                    />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <div className="flex items-center">
                    <IonIcon
                      icon={locationOutline}
                      className="text-gray-400 mr-1"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      0.5 mi
                    </span>
                  </div>
                </div>
                <IonButton fill="solid" size="small">
                  View Details
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
