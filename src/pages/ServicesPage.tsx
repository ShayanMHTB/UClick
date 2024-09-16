// UClick/src/pages/ServicesPage.tsx - Updated with proper navigation

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSkeletonText,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useServices } from '@/hooks/useServices';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Service, ServiceCategory } from '@/types';

const ServicesPage: React.FC = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Use React Query to fetch services
  const { data: services = [], isLoading, isError, refetch } = useServices();

  // Filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.provider?.full_name || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (service.description || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeTab === 'all' || service.category === activeTab;

    return matchesSearch && matchesCategory && service.is_active;
  });

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };

  const handleViewDetails = (service: Service) => {
    // Navigate to service detail page
    history.push(`/app/services/${service.id}`);
  };

  const handleContact = (service: Service) => {
    // Navigate to messages with this provider (mock implementation)
    console.log('Contact provider for:', service.id);
    // In a real app, this might create a conversation or navigate to existing one
    history.push('/app/messages');
  };

  const handleAddService = () => {
    // Navigate to create service page
    console.log('Add new service');
    // For now just log - you could create a CreateServicePage later
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="px-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <IonCard key={index} className="mb-4">
          <IonCardContent>
            <IonSkeletonText
              animated
              style={{ width: '70%', height: '20px' }}
              className="mb-2"
            />
            <IonSkeletonText
              animated
              style={{ width: '50%', height: '16px' }}
              className="mb-3"
            />
            <IonSkeletonText
              animated
              style={{ width: '100%', height: '40px' }}
            />
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );

  // Error state
  const renderError = () => (
    <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Unable to load services
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
    <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No services found
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        {searchQuery || activeTab !== 'all'
          ? 'Try adjusting your search or filters'
          : 'Be the first to offer a service in your area!'}
      </p>
    </div>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Services</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Search */}
        <div className="p-4">
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value!)}
            placeholder="Search services..."
            showClearButton="focus"
          />
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-4">
          <IonSegment
            value={activeTab}
            onIonChange={(e) =>
              setActiveTab(e.detail.value as ServiceCategory | 'all')
            }
            scrollable
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="home_services">
              <IonLabel>Home</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="pet_services">
              <IonLabel>Pets</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="professional">
              <IonLabel>Professional</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="childcare">
              <IonLabel>Childcare</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="personal">
              <IonLabel>Personal</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Service Listings */}
        {isLoading ? (
          renderSkeleton()
        ) : isError ? (
          renderError()
        ) : filteredServices.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="px-4 pb-20">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={handleViewDetails}
                onContact={handleContact}
              />
            ))}
          </div>
        )}

        {/* Floating Action Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleAddService}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ServicesPage;
