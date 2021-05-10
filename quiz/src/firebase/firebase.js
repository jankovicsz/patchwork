import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDvF35WW4dAXnNn52sSpMA_jRYxgXhgl_g",
  authDomain: "quiz-app-19594.firebaseapp.com",
  projectId: "quiz-app-19594",
  storageBucket: "quiz-app-19594.appspot.com",
  messagingSenderId: "158399259165",
  appId: "1:158399259165:web:2c95ef47811abef9841cf4"
  }; 

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore;
const db = firestore();
const auth = firebase.auth;

export {firestore, db, auth};
export default firebase;