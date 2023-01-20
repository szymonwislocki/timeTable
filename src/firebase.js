import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "timetable-962ba.firebaseapp.com",
  projectId: "timetable-962ba",
  storageBucket: "timetable-962ba.appspot.com",
  messagingSenderId: "1019441972704",
  appId: "1:1019441972704:web:8c1934e5fe44e7fad71785",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
