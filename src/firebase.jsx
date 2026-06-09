import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "phishingsimulation-15f99.firebaseapp.com",
  projectId: "phishingsimulation-15f99",
  storageBucket: "phishingsimulation-15f99.firebasestorage.app",
  messagingSenderId: "1070383825962",
  appId: "1:1070383825962:web:b04c00eeaecedbc8d62f53"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);