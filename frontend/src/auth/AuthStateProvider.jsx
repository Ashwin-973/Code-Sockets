import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUser } from '../services/userService';

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const {user, isLoading: isAuthLoading } = useAuth0();
  const [authState, setAuthState] = useState({
    isLoading: true,
    isOnboarded: false,
    currentUserData: null,
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
          currentUserData: userData?.[0] || null,
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


  console.log("user",authState)

  // Expose methods to update auth state
  const updateAuthState = (newData) => {
    setAuthState(prev => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <UserContext.Provider value={{ 
      ...authState,
      isAuthLoading,
      updateAuthState 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an UserProvider');
  }
  return context;
}
