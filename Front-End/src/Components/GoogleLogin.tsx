import { signInWithPopup, getAdditionalUserInfo, UserCredential } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, googleAuthProvider, firestore } from '../firebase';
import { FcGoogle } from "react-icons/fc"
import { FormEvent, useEffect, useState } from 'react';

const GoogleLogin = () => {
  let usersCollection = firestore.collection("users");

  let [role, setRole] = useState("");
  let [chiefExists, setChiefExists] = useState(false);

  const handleNewUser = async (data: UserCredential) => {
    let size = await (await usersCollection.where("role", "==", "Army Chief").get()).size;
    if (size > 0) setChiefExists(true);
    setDoc(doc(firestore, "users", data.user.uid), {
      role: "General"
    })
  }

  const signInWithGoogle = async () => {
    try {
      let data = await signInWithPopup(auth, googleAuthProvider);
      let addData = getAdditionalUserInfo(data);
      if (addData?.isNewUser) {
        handleNewUser(data);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let role = e;
  }

  useEffect(() => {
    
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select name="role" id="role" hidden>
          {
            (chiefExists) ?
            <>
              <option value="Colonel" selected>Colonel</option>
              <option value="General">General</option>
            </>
              :
              <option value="Army Chief" selected></option>
          }
        </select>
        <input className="bg-white hover:bg-gray-200 p-2 rounded-lg drop-shadow flex justify-center items-center" type="submit"><FcGoogle className='inline' /> <p className='inline px-1'>Sign in with Google</p></input>
      </form>
    </>
  );
};

export default GoogleLogin;
