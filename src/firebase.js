import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWhYvIKGHfDO4NrH0G5N692FljzD_wmZc",
  authDomain: "misti-am.firebaseapp.com",
  databaseURL: "https://misti-am-default-rtdb.firebaseio.com",
  projectId: "misti-am",
  storageBucket: "misti-am.firebasestorage.app",
  messagingSenderId: "335857181187",
  appId: "1:335857181187:web:eee24712600f7018262436",
  measurementId: "G-B9X24VCET5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const db = getFirestore(app);
export const storage = getStorage(app);
