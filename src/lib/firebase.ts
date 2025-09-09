
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2AJDevhB98d-Gz6rC8N1FNyw_ISgWEZo",
  authDomain: "leadbylead-b79ea.firebaseapp.com",
  projectId: "leadbylead-b79ea",
  storageBucket: "leadbylead-b79ea.appspot.com",
  messagingSenderId: "432273508285",
  appId: "1:432273508285:web:c19faae0c1af31639934d4",
  measurementId: "G-0NMPCGWQ2F"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
