import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsaXbY0e2Tzhf1PREAXuzXWMv9tX4tkCs",
  authDomain: "fastfoodshop-c2821.firebaseapp.com",
  projectId: "fastfoodshop-c2821",
  storageBucket: "fastfoodshop-c2821.firebasestorage.app",
  messagingSenderId: "834571264439",
  appId: "1:834571264439:web:4d54f1cb9cc48a3a638832"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);