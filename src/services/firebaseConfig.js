import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBx8PQP-KWSOa2HUqqvemQ-ZFeKezldQ_o",
  authDomain: "money-wise-c3a6f.firebaseapp.com",
  projectId: "money-wise-c3a6f",
  storageBucket: "money-wise-c3a6f.appspot.com",
  messagingSenderId: "426248897234",
  appId: "1:426248897234:web:5e30b98e4cddd3dc20a30b",
  measurementId: "G-34PC7H71C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});