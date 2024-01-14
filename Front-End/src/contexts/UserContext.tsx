// UserContext.js
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import { User } from '@firebase/auth';

interface UserContextProps {
  children: ReactNode;
}

const UserContext = createContext<User | null>(null);
const LoadingContext = createContext<boolean>(true);

export const useUser = () => {
  return useContext(UserContext);
};

export const useLoading = () => {
  return useContext(LoadingContext);
}

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <LoadingContext.Provider value={loading}>
        {children}
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
};
