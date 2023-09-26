import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-realestate-b3d40.firebaseapp.com',
  projectId: 'mern-realestate-b3d40',
  storageBucket: 'mern-realestate-b3d40.appspot.com',
  messagingSenderId: '793985272860',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
