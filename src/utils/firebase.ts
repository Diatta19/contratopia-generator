
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzrl776YTzDmcpvqu1B0CEm6DwMytsKD8",
  authDomain: "contratpro-5520e.firebaseapp.com",
  projectId: "contratpro-5520e",
  storageBucket: "contratpro-5520e.firebasestorage.app",
  messagingSenderId: "994085611628",
  appId: "1:994085611628:web:fda6ddbd8b11b0748d9049",
  measurementId: "G-FK50K6LGK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication utilities
export const registerUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };
