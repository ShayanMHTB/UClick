// UClick/src/types/index.ts

// Base types
export type UUID = string;
export type Timestamp = string; // ISO string format

// User related types
export interface User {
  id: UUID;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  location: Location | null;
  address: Address | null;
  is_verified: boolean;
  privacy_settings: PrivacySettings;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface PrivacySettings {
  profile_visibility: 'public' | 'private' | 'friends_only';
  show_location: boolean;
  show_contact_info: boolean;
  allow_messages_from: 'everyone' | 'verified_only' | 'none';
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

// Service related types
export type ServiceCategory =
  | 'childcare'
  | 'home_services'
  | 'professional'
  | 'personal'
  | 'pet_services'
  | 'other';

export type PriceType = 'hourly' | 'fixed' | 'package';

export interface Service {
  id: UUID;
  user_id: UUID;
  title: string;
  description: string | null;
  category: ServiceCategory;
  subcategory: string | null;
  price_type: PriceType;
  price: number;
  currency: string;
  location: Location | null;
  service_area_radius: number | null; // in kilometers
  images: string[];
  availability: ServiceAvailability;
  is_active: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  // Populated fields
  provider?: User;
  reviews?: Review[];
  average_rating?: number;
  total_reviews?: number;
}

export interface ServiceAvailability {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

export interface TimeSlot {
  start: string; // "09:00"
  end: string; // "17:00"
}

// Item marketplace types
export type ItemCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';

export interface Item {
  id: UUID;
  user_id: UUID;
  title: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  condition: ItemCondition;
  price: number;
  currency: string;
  images: string[];
  location: Location | null;
  is_available: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  // Populated fields
  seller?: User;
}

// Event related types
export interface Event {
  id: UUID;
  organizer_id: UUID;
  title: string;
  description: string | null;
  category: string | null;
  event_date: Timestamp;
  end_date: Timestamp | null;
  location: Location | null;
  address: Address | null;
  max_attendees: number | null;
  current_attendees: number;
  images: string[];
  is_public: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  // Populated fields
  organizer?: User;
  attendees?: EventAttendee[];
  user_rsvp_status?: RSVPStatus;
}

export type RSVPStatus = 'going' | 'interested' | 'not_going';

export interface EventAttendee {
  id: UUID;
  event_id: UUID;
  user_id: UUID;
  rsvp_status: RSVPStatus;
  created_at: Timestamp;
  // Populated fields
  user?: User;
}

// Booking related types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: UUID;
  service_id: UUID;
  client_id: UUID;
  provider_id: UUID;
  booking_date: Timestamp;
  end_date: Timestamp | null;
  status: BookingStatus;
  total_amount: number;
  currency: string;
  notes: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
  // Populated fields
  service?: Service;
  client?: User;
  provider?: User;
}

// Messaging types
export type MessageType = 'text' | 'image' | 'file';

export interface Message {
  id: UUID;
  conversation_id: UUID;
  sender_id: UUID;
  recipient_id: UUID;
  content: string;
  message_type: MessageType;
  file_url: string | null;
  is_read: boolean;
  created_at: Timestamp;
  // Populated fields
  sender?: User;
  recipient?: User;
}

export interface Conversation {
  id: UUID;
  participants: User[];
  last_message: Message | null;
  unread_count: number;
  updated_at: Timestamp;
}

// Review types
export interface Review {
  id: UUID;
  booking_id: UUID;
  reviewer_id: UUID;
  reviewee_id: UUID;
  rating: number; // 1-5
  comment: string | null;
  images: string[];
  created_at: Timestamp;
  // Populated fields
  reviewer?: User;
  reviewee?: User;
  booking?: Booking;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Search and filter types
export interface ServiceFilters {
  category?: ServiceCategory;
  subcategory?: string;
  min_price?: number;
  max_price?: number;
  location?: Location;
  radius?: number; // in km
  min_rating?: number;
  availability?: {
    date?: string;
    time_start?: string;
    time_end?: string;
  };
}

export interface ItemFilters {
  category?: string;
  subcategory?: string;
  condition?: ItemCondition;
  min_price?: number;
  max_price?: number;
  location?: Location;
  radius?: number;
}

export interface EventFilters {
  category?: string;
  date_from?: string;
  date_to?: string;
  location?: Location;
  radius?: number;
  organizer_id?: UUID;
}

// Form types
export interface CreateServiceForm {
  title: string;
  description: string;
  category: ServiceCategory;
  subcategory?: string;
  price_type: PriceType;
  price: number;
  location?: Location;
  service_area_radius?: number;
  images: File[];
  availability: ServiceAvailability;
}

export interface CreateEventForm {
  title: string;
  description: string;
  category: string;
  event_date: string;
  end_date?: string;
  location?: Location;
  address?: Address;
  max_attendees?: number;
  images: File[];
  is_public: boolean;
}

export interface CreateItemForm {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  condition: ItemCondition;
  price: number;
  location?: Location;
  images: File[];
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Utility types for forms
export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export type FormState<T> = {
  data: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  isValid: boolean;
};
