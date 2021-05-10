import firebase from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export default firebase.firestore;