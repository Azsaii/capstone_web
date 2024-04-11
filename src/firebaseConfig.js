import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfK64E-XJLQAd1MsczhbXGS_gNzXgQdXA",
  authDomain: "capstone-ac206.firebaseapp.com",
  databaseURL: "https://capstone-ac206-default-rtdb.firebaseio.com",
  projectId: "capstone-ac206",
  storageBucket: "capstone-ac206.appspot.com",
  messagingSenderId: "1005177753804",
  appId: "1:1005177753804:web:9e8e94a4fcce1231c1f269",
  measurementId: "G-VCJKJZ13NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {app, auth, firestore}