import { useEffect, useState } from 'react'
import './App.css'

import GoogleLogin from './Components/GoogleLogin'
import {auth} from './firebase'
import { User } from '@firebase/auth';

function App() {

  // useEffect(() => {

  // })

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged((user) => {
    console.log("Hi");
    setUser(user);
    setLoading(false);
  })

  useEffect(() => {
    if (!loading) {
      // auth.signOut();
      // console.log("here")
      // console.log(auth.currentUser?.displayName)
    }
  }, [user])

  if (loading) {
    return <>Loading...</>
  }


  return (
    <>
      <h1>Hello World</h1>
      <GoogleLogin></GoogleLogin>
    </>
  )
}

export default App
