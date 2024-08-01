// firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2ETCpfgC8QCggQ6EylMvxG-0SfIdnp7U",
  authDomain: "myecommerceapp-4fae5.firebaseapp.com",
  projectId: "myecommerceapp-4fae5",
  storageBucket: "myecommerceapp-4fae5.appspot.com",
  messagingSenderId: "451642168620",
  appId: "1:451642168620:web:c76f83b9f07e24857ac889",
  measurementId: "G-1XNEM9SK0M"
};

let app;
let auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

export { auth };
