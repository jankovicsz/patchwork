import firebase from './config';
import 'firebase/auth';

const AuthenticationProvider = new firebase.auth.GoogleAuthProvider();

export default firebase.auth;

export {AuthenticationProvider};