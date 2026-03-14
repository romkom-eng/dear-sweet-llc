import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBZZrrQk1j3HWaB4CDnBE_-7MK08Z3moMc",
    authDomain: "bakery-inventory-9019b.firebaseapp.com",
    databaseURL: "https://bakery-inventory-9019b-default-rtdb.firebaseio.com",
    projectId: "bakery-inventory-9019b",
    storageBucket: "bakery-inventory-9019b.firebasestorage.app",
    messagingSenderId: "870930956747",
    appId: "1:870930956747:web:f036fdc816adb3e2d4364e",
    measurementId: "G-Y9P2VQT5KN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const isMockMode = false;

export default app;
