import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNl7VAUV1PhxlmxIcMEvYkvLnLFo2KqOU",
  authDomain: "restaurant-finder-dt.firebaseapp.com",
  projectId: "restaurant-finder-dt",
  storageBucket: "restaurant-finder-dt.appspot.com",
  messagingSenderId: "945691542189",
  appId: "1:945691542189:web:db42abae35691818bbbc24"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const firestore = firebase.firestore;
const db = firebase.firestore();

export {db, auth, firestore};
export default firebase;