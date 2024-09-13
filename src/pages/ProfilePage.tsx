// UClick/src/pages/ProfilePage.tsx

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
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  RefresherEventDetail,
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
import { useCurrentUser } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import ThemeToggle from '@/components/ui/ThemeToggle';

const ProfilePage: React.FC = () => {
  const {
    data: currentUser,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUser,
  } = useCurrentUser();

  const { data: bookings = [], isLoading: bookingsLoading } = useBookings(
    currentUser?.id,
  );

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetchUser();
    event.detail.complete();
  };

  const handleMenuClick = (item: string) => {
    // TODO: Navigate to respective pages
    console.log('Navigate to:', item);
  };

  const handleSignOut = () => {
    // TODO: Implement sign out logic
    console.log('Sign out');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getCompletedBookings = () => {
    return bookings.filter((booking) => booking.status === 'completed').length;
  };

  const getAverageRating = () => {
    // Mock rating calculation - would come from reviews
    return 4.9;
  };

  const getActiveServices = () => {
    // Mock services count - would come from user's services
    return 5;
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="px-4 py-4">
      <Card>
        <CardContent className="text-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4" />
          <IonSkeletonText
            animated
            style={{ width: '60%', height: '24px' }}
            className="mx-auto mb-2"
          />
          <IonSkeletonText
            animated
            style={{ width: '40%', height: '16px' }}
            className="mx-auto mb-4"
          />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <IonSkeletonText
                  animated
                  style={{ width: '100%', height: '24px' }}
                  className="mb-1"
                />
                <IonSkeletonText
                  animated
                  style={{ width: '100%', height: '16px' }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Error state
  const renderError = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Unable to load profile
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Please check your connection and try again
      </p>
      <Button variant="primary" onClick={() => refetchUser()}>
        Try Again
      </Button>
    </div>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <ThemeToggle />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {userLoading ? (
          renderSkeleton()
        ) : userError || !currentUser ? (
          renderError()
        ) : (
          <>
            {/* Profile Header */}
            <div className="px-4 py-4">
              <Card>
                <CardContent>
                  <div className="text-center">
                    <Avatar
                      src={currentUser.avatar_url}
                      fallback={
                        currentUser.full_name
                          ? getInitials(currentUser.full_name)
                          : 'U'
                      }
                      size="xl"
                      className="mx-auto mb-4"
                    />

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
                      {currentUser.full_name || 'Unknown User'}
                      {currentUser.is_verified && (
                        <Badge variant="success" size="small">
                          Verified
                        </Badge>
                      )}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Community Member
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {getAverageRating()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Rating
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {getCompletedBookings()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Bookings
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {getActiveServices()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Services
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Menu Options */}
            <IonList className="mt-4">
              <IonItem button onClick={() => handleMenuClick('edit-profile')}>
                <IonIcon icon={personOutline} slot="start" />
                <IonLabel>Edit Profile</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>

              <IonItem button onClick={() => handleMenuClick('my-services')}>
                <IonIcon icon={listOutline} slot="start" />
                <IonLabel>My Services</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>

              <IonItem button onClick={() => handleMenuClick('my-bookings')}>
                <IonIcon icon={bookmarkOutline} slot="start" />
                <IonLabel>My Bookings</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>

              <IonItem
                button
                onClick={() => handleMenuClick('payment-methods')}
              >
                <IonIcon icon={cardOutline} slot="start" />
                <IonLabel>Payment Methods</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>

              <IonItem
                button
                onClick={() => handleMenuClick('privacy-settings')}
              >
                <IonIcon icon={shieldCheckmarkOutline} slot="start" />
                <IonLabel>Privacy Settings</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>

              <IonItem button onClick={() => handleMenuClick('help-support')}>
                <IonIcon icon={helpCircleOutline} slot="start" />
                <IonLabel>Help & Support</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>

              <IonItem button onClick={() => handleMenuClick('settings')}>
                <IonIcon icon={settingsOutline} slot="start" />
                <IonLabel>Settings</IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>
            </IonList>

            {/* Sign Out Button */}
            <div className="px-4 mt-6 mb-20">
              <Button
                variant="outline"
                fullWidth
                icon={logOutOutline}
                iconPosition="start"
                onClick={handleSignOut}
                className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
              >
                Sign Out
              </Button>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
