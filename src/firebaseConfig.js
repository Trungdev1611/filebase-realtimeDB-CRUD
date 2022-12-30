// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaW-b8exKcIDSM2hMfB0LSURtKuufGr2s",
  authDomain: "chat-realtime-deced.firebaseapp.com",
  projectId: "chat-realtime-deced",
  storageBucket: "chat-realtime-deced.appspot.com",
  messagingSenderId: "881280564326",
  appId: "1:881280564326:web:88be2057788690b0e641a7",
};

//function write data in database realtimeDatabase
export function writeDataRealtimeDataBase(path, data) {
  const db = getDatabase();
  set(ref(db, path), data); //data là một object
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
