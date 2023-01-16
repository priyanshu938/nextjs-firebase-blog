import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJE6PJuYk0HSfXWoqhDo5ub3jHy9doLYk",
  authDomain: "nextjsblog-751b9.firebaseapp.com",
  projectId: "nextjsblog-751b9",
  storageBucket: "nextjsblog-751b9.appspot.com",
  messagingSenderId: "865419349247",
  appId: "1:865419349247:web:4a8b691dce0c3c75dad0ca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
