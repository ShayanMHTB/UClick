// UClick/src/pages/services/ServiceDetailPage.tsx

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonSkeletonText,
} from '@ionic/react';
import {
  locationOutline,
  timeOutline,
  callOutline,
  chatbubbleOutline,
  bookmarkOutline,
  shareOutline,
} from 'ionicons/icons';
import { useService } from '@/hooks/useServices';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardSubtitle,
} from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { data: service, isLoading, isError } = useService(id);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleContact = () => {
    // Navigate to messages with this provider
    console.log('Contact provider');
  };

  const handleBookNow = () => {
    // Navigate to booking page
    history.push(`/services/${id}/book`);
  };

  const handleSaveService = () => {
    // Add to saved services
    console.log('Save service');
  };

  const handleShare = () => {
    // Share service
    console.log('Share service');
  };

  const formatAvailability = () => {
    if (!service?.availability) return 'No availability set';

    const days = Object.keys(service.availability);
    if (days.length === 0) return 'No availability set';

    return `Available ${days.length} days per week`;
  };

  // Loading state
  if (isLoading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Service Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="px-4 py-6">
            <Card>
              <CardContent>
                <IonSkeletonText
                  animated
                  style={{ width: '100%', height: '200px' }}
                />
                <IonSkeletonText
                  animated
                  style={{ width: '70%', height: '24px' }}
                  className="mt-4"
                />
                <IonSkeletonText
                  animated
                  style={{ width: '50%', height: '16px' }}
                  className="mt-2"
                />
                <IonSkeletonText
                  animated
                  style={{ width: '100%', height: '80px' }}
                  className="mt-4"
                />
              </CardContent>
            </Card>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Error or not found
  if (isError || !service) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Service Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Service Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This service may no longer be available
            </p>
            <Button variant="primary" onClick={() => history.goBack()}>
              Go Back
            </Button>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{service.title}</IonTitle>
          <IonButtons slot="end">
            <Button variant="ghost" onClick={handleSaveService}>
              <IonIcon icon={bookmarkOutline} />
            </Button>
            <Button variant="ghost" onClick={handleShare}>
              <IonIcon icon={shareOutline} />
            </Button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Service Images */}
        {service.images && service.images.length > 0 ? (
          <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {/* TODO: Add image carousel */}
            <span className="text-gray-500">Service Images</span>
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {service.category.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        )}

        <div className="px-4 py-6">
          {/* Service Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle size="large">{service.title}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Avatar
                      src={service.provider?.avatar_url}
                      fallback={
                        service.provider?.full_name
                          ? getInitials(service.provider.full_name)
                          : 'U'
                      }
                      size="medium"
                      className="mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">
                          {service.provider?.full_name || 'Unknown Provider'}
                        </span>
                        {service.provider?.is_verified && (
                          <Badge
                            variant="success"
                            size="small"
                            className="ml-2"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      {service.average_rating && (
                        <Rating
                          value={service.average_rating}
                          size="small"
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${service.price}
                    <span className="text-sm font-normal text-gray-500">
                      {service.price_type === 'hourly'
                        ? '/hr'
                        : service.price_type === 'fixed'
                        ? ''
                        : '/pkg'}
                    </span>
                  </div>
                  <Badge variant="default" size="small" className="mt-1">
                    {service.category.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle size="medium">About This Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {service.description || 'No description available'}
              </p>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle size="medium">Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <IonIcon
                    icon={locationOutline}
                    className="mr-3 text-gray-500"
                  />
                  <span className="text-sm">
                    Service area:{' '}
                    {service.service_area_radius || 'Not specified'} km radius
                  </span>
                </div>
                <div className="flex items-center">
                  <IonIcon icon={timeOutline} className="mr-3 text-gray-500" />
                  <span className="text-sm">{formatAvailability()}</span>
                </div>
                {service.subcategory && (
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                      Specialty:
                    </span>
                    <span className="text-sm">{service.subcategory}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          {service.total_reviews && service.total_reviews > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle size="medium">Reviews</CardTitle>
                  <Button variant="ghost" size="small">
                    See All ({service.total_reviews})
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {service.average_rating?.toFixed(1)}
                  </div>
                  <Rating
                    value={service.average_rating || 0}
                    size="large"
                    showValue={false}
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Based on {service.total_reviews} review
                    {service.total_reviews !== 1 ? 's' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <Button
                    variant="outline"
                    children
                    fullWidth
                    icon={callOutline}
                    iconPosition="icon-only"
                    onClick={handleContact}
                  />
                </IonCol>
                <IonCol size="4">
                  <Button
                    variant="outline"
                    children
                    fullWidth
                    icon={chatbubbleOutline}
                    iconPosition="icon-only"
                    onClick={handleContact}
                  />
                </IonCol>
                <IonCol size="4">
                  <Button variant="primary" fullWidth onClick={handleBookNow}>
                    Book Now
                  </Button>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ServiceDetailPage;
