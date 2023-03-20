/**
 * Create and configure the Firebase App instance and Google Auth provider
 * * to control how my app interfaces with Googles external service
 */

// ****************************
// Import Firebase methods
// ****************************

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {  
  getFirestore,
  doc,     // get a document instance
  getDoc,  // get the document's data
  setDoc,  // set the document's data
} from 'firebase/firestore';

// ****************************
// Firebase configuration
// ****************************

// Firebase project configuration; 
  // learn more: // See: https://firebase.google.com/docs/web/ learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAk8kXjspfzTC6IRLBGAWHBdPYcpKn2KhQ",
  authDomain: "crwn-clothing-db-2df22.firebaseapp.com",
  projectId: "crwn-clothing-db-2df22",
  storageBucket: "crwn-clothing-db-2df22.appspot.com",
  messagingSenderId: "684077222197",
  appId: "1:684077222197:web:93c0fe1213e0f2528be47c"
};

// ****************************
// Initialize Firebase
// ****************************

const firebaseApp = initializeApp(firebaseConfig);

// ******************************************************
// Create Google Auth Provider and set its parameters
// ******************************************************
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

// ******************************************************
// 
// ******************************************************
// TODO: At this link (https://firebase.google.com/docs/auth/web/start#add-initialize-sdk), it shows that getAuth takes the firebaseApp as an argument, like this: const auth = getAuth(app);   Should that be the case here also?
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// ******************************************************
// Create a user document in the database
// ******************************************************

// additionalInformation is an object
export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log("USERDOCREF: ", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("USER SNAPSHOT: ", userSnapshot);
  console.log("USER SNAPSHOT EXISTS: ", userSnapshot.exists());

  // if user data does not exist
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        // if displayName above is null, then the displayName from additionalInformation will overwrite it
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // if user data exists
  return userDocRef;
};

// ******************************************************
// 
// ******************************************************

// export this function so that the function USAGE in other files will not need to change in the future EVEN IF Google Auth changes how we have to call the returned function; we could just make that change right here
// this fcn creates an authenticated user and returns an auth object
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}