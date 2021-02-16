// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC2iH0bQjkBz4ZczfOxtiWypMfKlBatrpM',
  authDomain: 'test-authentication-a7fe6.firebaseapp.com',
  projectId: 'test-authentication-a7fe6',
  storageBucket: 'test-authentication-a7fe6.appspot.com',
  messagingSenderId: '54933162623',
  appId: '1:54933162623:web:37ae2d18d9e07110f5cd4a',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set an authentication state observer and get user data
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(user);
    localStorage.setItem('loggedIn', 'true');
    document
      .querySelectorAll('.logged-out .logged-in')
      .forEach((elem) => elem.classList.toggle('d-none'));
    Application.getSingles();
    // ...
  } else {
    // User is signed out
    localStorage.setItem('loggedIn', 'false');
    document
      .querySelectorAll('.logged-out .logged-in')
      .forEach((elem) => elem.classList.toggle('d-none'));
    // ...
  }
});

// Handle the sign-in flow with the Firebase SDK
// Create an instance of the Google provider object:
const provider = new firebase.auth.GoogleAuthProvider();

// Authenticate with Firebase using the Google provider object.
// To sign in with a pop-up window, call signInWithPopup:

document.querySelectorAll('button.google-login').forEach((button) => {
  button.addEventListener('click', () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      //   .then((result) => {
      //     /** @type {firebase.auth.OAuthCredential} */
      //     // var credential = result.credential;
      //     // // This gives you a Google Access Token. You can use it to access the Google API.
      //     // var token = credential.accessToken;
      //     // // The signed-in user info.
      //     // var user = result.user;
      //     // ...
      //     console.log(result);
      //   })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
        console.error(error);
      });
  });
});

document.getElementById('logout-link').addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
})