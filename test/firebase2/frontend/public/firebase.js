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
// const auth = firebase.auth();

const regForm = document.getElementById('reg-form');
regForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = regForm['reg-email'].value;
  const password = regForm['reg-password'].value;
  
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    user.updateProfile({
      displayName: document.getElementById('reg-name').value
    });
    regForm.reset();
    toggleLoginAndReg();
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
  });
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    user.updateProfile({
      displayName: document.getElementById('reg-name').value
    });
    loginForm.reset();
    toggleLoggedIn();
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
  });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;
    const name = document.querySelector('#greeting span');
    name.textContent = user.displayName;
    const email = document.querySelector('#greet-email span');
    email.textContent = user.email;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const logOut = document.getElementById('logout-button');
logOut.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    toggleLogOut();
  }).catch((error) => {
    // An error happened.
  });
});

/* firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
}); */
