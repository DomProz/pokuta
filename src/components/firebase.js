import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvhImnunYkcO3oz0GBwFNzzNZwdjdQkBY",
  authDomain: "mechanizmy-88b59.firebaseapp.com",
  projectId: "mechanizmy-88b59",
  storageBucket: "mechanizmy-88b59.appspot.com",
  messagingSenderId: "620256377570",
  appId: "1:620256377570:web:6471cb08b72f2d819dfcbb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
