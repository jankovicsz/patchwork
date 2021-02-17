// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDlXwXOFgbdLdD3xW0RSR3nis746gGNcDc',
  authDomain: 'fire-test-auth-dt.firebaseapp.com',
  projectId: 'fire-test-auth-dt',
  storageBucket: 'fire-test-auth-dt.appspot.com',
  messagingSenderId: '1081010618037',
  appId: '1:1081010618037:web:3ad09fc41a3f5ad2b248fc',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/* 
firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
 */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
