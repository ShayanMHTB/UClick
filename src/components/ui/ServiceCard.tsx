// UClick/src/components/ui/ServiceCard.tsx

import React from 'react';
import { IonIcon } from '@ionic/react';
import { locationOutline, starOutline } from 'ionicons/icons';
import { Service } from '@/types';
import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from './Card';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Rating } from './Rating';
import { Button } from './Button';

interface ServiceCardProps {
  service: Service;
  onViewDetails?: (service: Service) => void;
  onContact?: (service: Service) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onViewDetails,
  onContact,
  className = '',
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(service);
  };

  const handleContact = () => {
    if (onContact) onContact(service);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDistance = (distance?: number) => {
    if (!distance) return '';
    return distance < 1
      ? `${(distance * 1000).toFixed(0)}m`
      : `${distance.toFixed(1)}km`;
  };

  return (
    <Card
      className={`mb-4 ${className}`}
      clickable={!!onViewDetails}
      onClick={onViewDetails ? handleViewDetails : undefined}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle size="medium">{service.title}</CardTitle>
            <CardSubtitle className="flex items-center mt-2">
              <Avatar
                src={service.provider?.avatar_url}
                fallback={
                  service.provider?.full_name
                    ? getInitials(service.provider.full_name)
                    : 'U'
                }
                size="small"
                className="mr-2"
              />
              <span>{service.provider?.full_name || 'Unknown Provider'}</span>
              {service.provider?.is_verified && (
                <Badge variant="success" size="small" className="ml-2">
                  Verified
                </Badge>
              )}
            </CardSubtitle>
          </div>
          <div className="text-right ml-4">
            <div className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              ${service.price}
              <span className="text-sm font-normal text-gray-500">
                {service.price_type === 'hourly'
                  ? '/hr'
                  : service.price_type === 'fixed'
                  ? ''
                  : '/pkg'}
              </span>
            </div>
            {service.location && (
              <div className="text-sm text-gray-500 flex items-center justify-end mt-1">
                <IonIcon icon={locationOutline} className="mr-1" />
                {formatDistance(service.service_area_radius || undefined)}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {service.description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {service.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {service.average_rating && (
              <Rating
                value={service.average_rating}
                size="small"
                showValue={true}
              />
            )}
            <Badge variant="default" size="small">
              {service.category.replace('_', ' ')}
            </Badge>
          </div>

          <div className="flex gap-2">
            {onContact && (
              <Button
                variant="outline"
                size="small"
                onClick={() => {
                  if (onContact) onContact(service);
                }}
              >
                Contact
              </Button>
            )}
            {onViewDetails && (
              <Button
                variant="primary"
                size="small"
                onClick={() => {
                  if (onViewDetails) onViewDetails(service);
                }}
              >
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
