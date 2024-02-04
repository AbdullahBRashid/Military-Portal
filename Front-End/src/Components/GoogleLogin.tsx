import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from '@firebase/auth';
import { Button } from './Button';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Button variant={'outline'} onClick={signInWithGoogle}>
      <p className='mr-2'>Sign in with Google</p> <FcGoogle size="20" />
    </Button>
  );
};

export default GoogleLogin;
