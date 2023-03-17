/**
 * Create and configure the Firebase App instance and Google Auth provider
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
} from 'firebase/auth';
import {  
  getFirestore,
  doc,     // get a document instance
  getDoc,  // get the document's data
  setDoc,  // set the document's data
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAk8kXjspfzTC6IRLBGAWHBdPYcpKn2KhQ",
  authDomain: "crwn-clothing-db-2df22.firebaseapp.com",
  projectId: "crwn-clothing-db-2df22",
  storageBucket: "crwn-clothing-db-2df22.appspot.com",
  messagingSenderId: "684077222197",
  appId: "1:684077222197:web:93c0fe1213e0f2528be47c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log("USERDOCREF: ", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("USER SNAPSHOT: ", userSnapshot);
  console.log("USER SNAPSHOT EXISTS: ", userSnapshot.exists());
}