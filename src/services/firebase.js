// Importiere Firebase-Funktionen
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyDiKwih-bMteAXX45eOgLzRoF2GnUfV2G0",
  authDomain: "e-learning-platform-a371e.firebaseapp.com",
  projectId: "e-learning-platform-a371e",
  storageBucket: "e-learning-platform-a371e.appspot.com", // Achte darauf, dass hier ".appspot.com" steht
  messagingSenderId: "870560848558",
  appId: "1:870560848558:web:a804e164045e163e046b3f",
  measurementId: "G-5PP3P6G1PG"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Authentifizierung und Firestore exportieren
export const auth = getAuth(app); // Authentifizierung
export const db = getFirestore(app); // Firestore-Datenbank
