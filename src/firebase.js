// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEegdGKxVhW_SgbGyGb99JSuUPZUhaNB8",
  authDomain: "recent-movies-app.firebaseapp.com",
  projectId: "recent-movies-app",
  storageBucket: "recent-movies-app.appspot.com",
  messagingSenderId: "483012509224",
  appId: "1:483012509224:web:2ff4f5667b103e629d3f1d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

