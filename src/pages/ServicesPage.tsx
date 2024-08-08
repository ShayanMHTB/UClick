// UClick/src/pages/ServicesPage.tsx

import React, { useState } from 'react';
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { add, star, locationOutline } from 'ionicons/icons';

const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 1,
      title: 'Professional House Cleaning',
      provider: 'Sarah M.',
      rating: 4.9,
      price: '$30/hr',
      category: 'home',
      distance: '0.5 mi',
      verified: true,
    },
    {
      id: 2,
      title: 'Dog Walking & Pet Sitting',
      provider: 'Mike T.',
      rating: 4.8,
      price: '$25/walk',
      category: 'pets',
      distance: '1.2 mi',
      verified: true,
    },
    {
      id: 3,
      title: 'Math Tutoring',
      provider: 'Dr. Lisa K.',
      rating: 5.0,
      price: '$45/hr',
      category: 'education',
      distance: '2.1 mi',
      verified: true,
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeTab === 'all' || service.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Services</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
            onIonChange={(e) => setActiveTab(e.detail.value as string)}
            scrollable
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="home">
              <IonLabel>Home</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="pets">
              <IonLabel>Pets</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="education">
              <IonLabel>Education</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Service Listings */}
        <div className="px-4">
          {filteredServices.map((service) => (
            <IonCard key={service.id} className="mb-4">
              <IonCardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <IonCardTitle className="text-lg">
                      {service.title}
                    </IonCardTitle>
                    <IonCardSubtitle className="flex items-center mt-1">
                      <span>{service.provider}</span>
                      {service.verified && (
                        <IonBadge color="success" className="ml-2">
                          Verified
                        </IonBadge>
                      )}
                    </IonCardSubtitle>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-semibold text-lg">
                      {service.price}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <IonIcon icon={locationOutline} className="mr-1" />
                      {service.distance}
                    </div>
                  </div>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid className="p-0">
                  <IonRow className="ion-align-items-center">
                    <IonCol size="auto">
                      <div className="flex items-center">
                        <IonIcon icon={star} className="text-yellow-500 mr-1" />
                        <span className="font-medium">{service.rating}</span>
                        <IonChip className="ml-2" color="medium">
                          {service.category}
                        </IonChip>
                      </div>
                    </IonCol>
                    <IonCol className="text-right">
                      <IonButton fill="outline" size="small">
                        View Details
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

export default ServicesPage;
