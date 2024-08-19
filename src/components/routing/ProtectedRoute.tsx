// UClick/src/components/routing/ProtectedRoute.tsx

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path }) => {
  const { data: user, isLoading } = useCurrentUser();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  return <Route path={path}>{children}</Route>;
};

export default ProtectedRoute;
