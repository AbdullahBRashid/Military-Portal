import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from '@firebase/auth';

const YourComponent: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <h1>Your Component</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default YourComponent;
