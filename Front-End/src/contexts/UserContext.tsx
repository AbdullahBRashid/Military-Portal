import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { auth, firestore } from '../firebase';
import { User } from '@firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface CustomUser extends User {
  role: string;
}

interface UserContextProps {
  children: ReactNode;
}

const UserContext = createContext<CustomUser | null>(null);
const LoadingContext = createContext<boolean>(true);

export const useUser = () => {
  return useContext(UserContext);
};

export const useLoading = () => {
  return useContext(LoadingContext);
}


export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        let data = authUser as unknown as CustomUser;
        data.role = (await getDoc(doc(firestore, "users", data.uid))).get("role");
        setUser(data);
      } else {
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
