import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBYS5Jtgba0HQpRWHWvHNOAl3uan3bmdNw",
    authDomain: "military-portal.firebaseapp.com",
    projectId: "military-portal",
    storageBucket: "military-portal.appspot.com",
    messagingSenderId: "358727876776",
    appId: "1:358727876776:web:2ba5629392d5a20ad4029d",
    measurementId: "G-GJHWX7LET4"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;

export default app;