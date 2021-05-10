import firebase from './firebase.js';
import '@firebase/firestore';

// ha nem akarok külön inicializálni a db-t
// const db = firebase.firestore();

export default firebase.firestore;

// export {db};
