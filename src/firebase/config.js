import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Replace with actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDummyKey1234567890",
    authDomain: "moodpop-bakery.firebaseapp.com",
    projectId: "moodpop-bakery",
    storageBucket: "moodpop-bakery.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const isMockMode = true; // Flag for components to use mock data if needed
