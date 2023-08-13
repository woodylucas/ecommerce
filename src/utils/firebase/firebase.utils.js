import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdfU0omFO621Ip-W6Acm8wQi-pgXJJYIg",
  authDomain: "crwn-clothing-db-v2-342a1.firebaseapp.com",
  projectId: "crwn-clothing-db-v2-342a1",
  storageBucket: "crwn-clothing-db-v2-342a1.appspot.com",
  messagingSenderId: "528272581350",
  appId: "1:528272581350:web:655b712a93bb7956cc5127",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
