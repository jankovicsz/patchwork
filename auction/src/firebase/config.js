import firebase from "firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD9JOk6nrt9eOHQiEkVJRVp9FLsPpfJ4Ys",
    authDomain: "auction-exam-app.firebaseapp.com",
    projectId: "auction-exam-app",
    storageBucket: "auction-exam-app.appspot.com",
    messagingSenderId: "314850089171",
    appId: "1:314850089171:web:c0b8af4ed263f6df689c26"
}; 

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const firestore = firebase.firestore;
const db = firebase.firestore();

export { auth, firestore, db };

export default firebase;