// Firebase configuration for QuickCoWork Chatbot
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeTDoXe7st-jOKJMxk6FKafDjdRunKzMk",
  authDomain: "quickcowork.firebaseapp.com",
  databaseURL: "https://quickcowork-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quickcowork",
  storageBucket: "quickcowork.firebasestorage.app",
  messagingSenderId: "398391447585",
  appId: "1:398391447585:web:7a49022e1914579bff9360",
  measurementId: "G-Y3VWN9K1B2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics not available:', error);
  }
}
export { analytics };

export default app; 