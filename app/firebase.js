import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwxkAbqJ168UjhoUYkWPugf4ybZ7xXXTk",
  authDomain: "channagiri-labour-platform.firebaseapp.com",
  projectId: "channagiri-labour-platform",
  storageBucket: "channagiri-labour-platform.firebasestorage.app",
  messagingSenderId: "534300835463",
  appId: "1:534300835463:web:8f90650c97941111da8222",
  measurementId: "G-FCEZZXJ691",
};

const app = initializeApp(firebaseConfig);

export default app;
export { app };

export { getFirestore };
