import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAu5JwxQcET8QD6kopOeANlrfezbFHJaQg",
    authDomain: "chatapp-76031.firebaseapp.com",
    projectId: "chatapp-76031",
    storageBucket: "chatapp-76031.appspot.com",
    messagingSenderId: "450296697322",
    appId: "1:450296697322:web:08c44393154cd46595a293",
    measurementId: "G-V6VG72P3L9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
