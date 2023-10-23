// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyChnlr3twPIFdWJ64cRsNcsQYdKFxpuBEg",
  authDomain: "clone-2b72f.firebaseapp.com",
  projectId: "clone-2b72f",
  storageBucket: "clone-2b72f.appspot.com",
  messagingSenderId: "89599729213",
  appId: "1:89599729213:web:887146209332148da81454",
  measurementId: "G-GNXS359Z1W"
};
const firebaseApp= firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth = firebase.auth();
export   {auth ,db};