import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../services/firebase';

const AuthContext = createContext();

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Save user to Firestore when they log in
    const saveUserToDb = async (firebaseUser) => {
        try {
            await setDoc(
                doc(db, 'users', firebaseUser.uid),
                {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || '',
                    photoURL: firebaseUser.photoURL || '',
                    lastLogin: serverTimestamp(),
                    marketingOptIn: true,
                },
                { merge: true } // don't overwrite createdAt on subsequent logins
            );
        } catch (err) {
            console.error('Error saving user:', err);
        }
    };

    useEffect(() => {
        // Safety timeout: if Firebase doesn't respond in 3s, unblock the app
        const timeout = setTimeout(() => setLoading(false), 3000);

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            clearTimeout(timeout);
            setUser(firebaseUser);
            if (firebaseUser) await saveUserToDb(firebaseUser);
            setLoading(false);
        });
        return () => { unsubscribe(); clearTimeout(timeout); };
    }, []);

    const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

    const signInWithEmail = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signUpWithEmail = async (name, email, password) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await setDoc(doc(db, 'users', cred.user.uid), {
            uid: cred.user.uid,
            email,
            name,
            photoURL: '',
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            marketingOptIn: true,
        });
        return cred;
    };

    const signOut = () => firebaseSignOut(auth);

    const isAdmin = user?.email === ADMIN_EMAIL;

    // Render children immediately — don't block on auth loading
    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
