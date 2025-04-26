import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';
//clean loading state ,easily extensible , reusable
export const ProtectedRoute = ({ children,requireOnboarding=false }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // or a better loading spinner
  }
{/*what does replace mean here? */}
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;  
  }


  /*const hasCompletedOnboarding = user?.['https://yourapp.com/metadata']?.onboarded;

  if (requireOnboarding && !hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }*/

  return children;
};
