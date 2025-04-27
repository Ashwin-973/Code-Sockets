import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUser } from '../services/userService';

const AuthStateContext = createContext(undefined);

export function AuthStateProvider({ children }) {
  const { user, isLoading: isAuthLoading } = useAuth0();
  const [authState, setAuthState] = useState({
    isLoading: true,
    isOnboarded: false,
    userData: null,
    error: null
  });

  useEffect(() => {
    if (!user?.sub) return;

    const initializeUser = async () => {
      try {
        const userData = await fetchUser(user.sub);
        setAuthState({
          isLoading: false,
          isOnboarded: userData?.[0]?.onboarded ?? false,
          userData: userData?.[0] || null,
          error: null
        });
      } catch (err) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch user data'
        }));
      }
    };

    initializeUser();
  }, [user?.sub]);

  // Expose methods to update auth state
  const updateAuthState = (newData) => {
    setAuthState(prev => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <AuthStateContext.Provider value={{ 
      ...authState,
      isAuthLoading,
      updateAuthState 
    }}>
      {children}
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthStateProvider');
  }
  return context;
}
