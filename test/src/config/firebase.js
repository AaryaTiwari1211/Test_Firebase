import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDssRyb2QcJOtw6jIOcYwsU1p1K8V9EEjI",
    authDomain: "fir-course-3d4de.firebaseapp.com",
    projectId: "fir-course-3d4de",
    storageBucket: "fir-course-3d4de.appspot.com",
    messagingSenderId: "602538177215",
    appId: "1:602538177215:web:463326c98a61acd7a18c0a",
    measurementId: "G-126P7JPKL4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleauth = new GoogleAuthProvider()

// Disable persistence
const db = getFirestore(app);
enableIndexedDbPersistence(db, { synchronizeTabs: true }).catch((err) => {
    console.error('Error enabling Firestore persistence:', err);
});
export { db };

export const storage = getStorage(app)
