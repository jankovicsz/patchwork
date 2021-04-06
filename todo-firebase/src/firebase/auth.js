// import firebase from 'firebase';
import firebase from './config';
import '@firebase/auth';

// firebase.initializeApp(firebaseConfig);

const AuthenticationProvider = new firebase.auth.GoogleAuthProvider();

export default firebase.auth;

export {AuthenticationProvider};