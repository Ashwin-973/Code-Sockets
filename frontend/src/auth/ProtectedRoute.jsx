import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserState } from '../context/userContext';
import {Spinner} from "@heroui/react";
export const ProtectedRoute = ({ children, requireOnboarding = false }) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();
  const { isOnboarded, isLoading: isStateLoading } = useUserState();
  const location = useLocation();

  // Show loading state while checking auth/onboarding
  if (isAuthLoading || isStateLoading) {
    return <Spinner />;
  }

  // Not logged in - redirect to home 
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Needs onboarding but trying to access protected route
  if (requireOnboarding && !isOnboarded) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  // Already onboarded but trying to access onboarding
  if (!requireOnboarding && isOnboarded && location.pathname === '/onboarding') {
    return <Navigate to="/collaborate" replace />;
  }


  return children;
}
