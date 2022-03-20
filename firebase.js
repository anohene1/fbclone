import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAz4kElogHfWN9HmLnVXC8KMhCc2Kls_3k",
  authDomain: "fbclone-5f972.firebaseapp.com",
  projectId: "fbclone-5f972",
  storageBucket: "fbclone-5f972.appspot.com",
  messagingSenderId: "945693161029",
  appId: "1:945693161029:web:f1370a3990d7a2651ed52c",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();

export { db, storage };
