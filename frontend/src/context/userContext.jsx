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

  const currentUser={id:authState?.currentUserData?.id}
  console.log("user",authState)


  const getUserInfo=async(userId)=>
    {
        // setIsLoading(true);
        // setError(null);
        try{
            return await fetchUser(userId)  //auth0 user Id
        }
        catch(err)
        {
            // setError(err)
            console.log(err)  //why does it show unnecessary try-catch clause when I remove the console log??
            throw err
        }
    }

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
      updateAuthState,
      getUserInfo,
      currentUser 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthStateProvider');
  }
  return context;
}

