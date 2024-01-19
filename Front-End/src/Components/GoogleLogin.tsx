import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from '@firebase/auth';

const YourComponent = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default YourComponent;
