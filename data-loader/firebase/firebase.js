import firebase from 'firebase';
import firebaseConfig from './config.js';
// ha egy fájlban inicializálok mindent:
import '@firebase/firestore';
import '@firebase/auth';
// a config beállítások is jöhetnek ide
/* const firebaseConfig = {
    apiKey: "AIzaSyDrb8Vl7H6aqpkQJBe6gCvK4b8Uxt3PmAA",
    authDomain: "testing-firebase-dt.firebaseapp.com",
    projectId: "testing-firebase-dt",
    storageBucket: "testing-firebase-dt.appspot.com",
    messagingSenderId: "96574127415",
    appId: "1:96574127415:web:247f7e6bd468708588aeb2",
  }; */

firebase.initializeApp(firebaseConfig);

// ha egy fájlban inicializálom a az adatbázist és az authentikációt
// const db = firebase.firestore();
// const auth = firebase.auth;
// export {db, auth};

export default firebase;
