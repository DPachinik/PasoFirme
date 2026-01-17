import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDdoiggV5EQX51_Wu1ZMDtJDyys7TcwrLg",
  authDomain: "pasofirme.firebaseapp.com",
  projectId: "pasofirme",
  storageBucket: "pasofirme.firebasestorage.app",
  messagingSenderId: "70013520935",
  appId: "1:70013520935:web:4febfc875e17c0259e9202",
  measurementId: "G-QSZV2JFWED"
};

//const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {auth,db,storage}