// UClick/src/components/forms/CreateServiceForm.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {
  CreateServiceForm as CreateServiceFormData,
  ServiceCategory,
  PriceType,
} from '@/types';
import { useForm } from '@/hooks/useForm';
import { validators, combineValidators } from '@/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';

interface CreateServiceFormProps {
  onSubmit?: (data: CreateServiceFormData) => Promise<void>;
  onCancel?: () => void;
}

export const CreateServiceForm: React.FC<CreateServiceFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const initialValues: CreateServiceFormData = {
    title: '',
    description: '',
    category: 'home_services',
    subcategory: '',
    price_type: 'hourly',
    price: 0,
    location: undefined,
    service_area_radius: 10,
    images: [],
    availability: {},
  };

  const validateForm = (values: CreateServiceFormData) => {
    const errors: any = {};

    // Title validation
    const titleError = combineValidators(
      validators.required,
      validators.minLength(5),
      validators.maxLength(100),
    )(values.title);
    if (titleError) errors.title = titleError;

    // Description validation
    const descriptionError = combineValidators(
      validators.required,
      validators.minLength(20),
      validators.maxLength(500),
    )(values.description);
    if (descriptionError) errors.description = descriptionError;

    // Price validation
    const priceError = combineValidators(
      validators.required,
      validators.positiveNumber,
    )(values.price);
    if (priceError) errors.price = priceError;

    // Service area radius validation
    if (values.service_area_radius !== undefined) {
      const radiusError = combineValidators(
        validators.number,
        validators.positiveNumber,
      )(values.service_area_radius);
      if (radiusError) errors.service_area_radius = radiusError;
    }

    return errors;
  };

  const {
    values,
    errors,
    isSubmitting,
    submitError,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    initialValues,
    validate: validateForm,
    onSubmit: async (data) => {
      if (onSubmit) {
        await onSubmit(data);
      }
    },
  });

  const serviceCategories: Array<{ value: ServiceCategory; label: string }> = [
    { value: 'home_services', label: 'Home Services' },
    { value: 'pet_services', label: 'Pet Services' },
    { value: 'childcare', label: 'Childcare' },
    { value: 'professional', label: 'Professional' },
    { value: 'personal', label: 'Personal' },
    { value: 'other', label: 'Other' },
  ];

  const priceTypes: Array<{ value: PriceType; label: string }> = [
    { value: 'hourly', label: 'Per Hour' },
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'package', label: 'Package Deal' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Service</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="px-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <Input
                label="Service Title"
                placeholder="e.g., Professional House Cleaning"
                value={values.title}
                onInput={(value) => setValue('title', value)}
                error={errors.title}
                required
              />

              {/* Description */}
              <Input
                label="Description"
                placeholder="Describe your service in detail..."
                value={values.description}
                onInput={(value) => setValue('description', value)}
                error={errors.description}
                multiline
                rows={4}
                required
              />

              {/* Category and Subcategory */}
              <IonGrid className="p-0">
                <IonRow>
                  <IonCol size="6">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <IonSelect
                        value={values.category}
                        placeholder="Select category"
                        onIonChange={(e) =>
                          setValue('category', e.detail.value)
                        }
                      >
                        {serviceCategories.map((cat) => (
                          <IonSelectOption key={cat.value} value={cat.value}>
                            {cat.label}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <Input
                      label="Subcategory"
                      placeholder="e.g., Deep Cleaning"
                      value={values.subcategory}
                      onInput={(value) => setValue('subcategory', value)}
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>

              {/* Price Type and Price */}
              <IonGrid className="p-0">
                <IonRow>
                  <IonCol size="6">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pricing <span className="text-red-500">*</span>
                      </label>
                      <IonSelect
                        value={values.price_type}
                        placeholder="Select pricing"
                        onIonChange={(e) =>
                          setValue('price_type', e.detail.value)
                        }
                      >
                        {priceTypes.map((type) => (
                          <IonSelectOption key={type.value} value={type.value}>
                            {type.label}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <Input
                      label="Price ($)"
                      placeholder="0.00"
                      type="number"
                      value={values.price.toString()}
                      onInput={(value) =>
                        setValue('price', parseFloat(value) || 0)
                      }
                      error={errors.price}
                      required
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>

              {/* Service Area */}
              <Input
                label="Service Area Radius (km)"
                placeholder="How far are you willing to travel?"
                type="number"
                value={values.service_area_radius?.toString() || ''}
                onInput={(value) =>
                  setValue('service_area_radius', parseInt(value) || undefined)
                }
                error={errors.service_area_radius}
              />

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-200 text-sm">
                    {submitError}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                {onCancel && (
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Create Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </IonContent>
    </IonPage>
  );
};
