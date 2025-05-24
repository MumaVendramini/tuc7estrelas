// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIBvR9PK0aDGXcZJ0r3D9jnp3WQeTyL5M",
  authDomain: "tuc7estrelas-e1bb0.firebaseapp.com",
  projectId: "tuc7estrelas-e1bb0",
  storageBucket: "tuc7estrelas-e1bb0.firebasestorage.app",
  messagingSenderId: "597978722293",
  appId: "1:597978722293:web:016401edc98e51af523abc",
  measurementId: "G-QDSTHGFNHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
