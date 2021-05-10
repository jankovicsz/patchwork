import firebase from "firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDapESfqjMtgcs9iqGZTjQtT7WZjPnFnZI",
  authDomain: "tourist-information-62024.firebaseapp.com",
  projectId: "tourist-information-62024",
  storageBucket: "tourist-information-62024.appspot.com",
  messagingSenderId: "615854261046",
  appId: "1:615854261046:web:d651de7eb6b941304ca997"
}; 

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const firestore = firebase.firestore;
const db = firebase.firestore();

export { auth, firestore, db };

export default firebase;
