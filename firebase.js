import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhWLwY1MiezaZy8xZSwYG1g7_J2Fm6SxU",
  authDomain: "task-edc9d.firebaseapp.com",
  projectId: "task-edc9d",
  storageBucket: "task-edc9d.appspot.com",
  messagingSenderId: "922436591785",
  appId: "1:922436591785:web:932a5d97eebfe8d892c9b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firebase utility functions

// Function for signing in with email and password
export const signinAuthUserWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function for creating a new user with email and password
export const createAuthUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Function for signing in with Google
export const signInWithGooglePopup = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Function for creating a user document in Firestore
export const createUserDocFromAuth = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;

  // Check if user document exists in Firestore
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await userDocRef.get();

  if (!userSnapshot.exists()) {
    try {
      // Create user document if it does not exist
      await setDoc(userDocRef, {
        displayName: userAuth.displayName,
        email: userAuth.email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  return userDocRef;
};

export default app;
