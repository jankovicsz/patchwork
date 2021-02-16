const firebaseConfig = {
    apiKey: "AIzaSyC2iH0bQjkBz4ZczfOxtiWypMfKlBatrpM",
    authDomain: "test-authentication-a7fe6.firebaseapp.com",
    projectId: "test-authentication-a7fe6",
    storageBucket: "test-authentication-a7fe6.appspot.com",
    messagingSenderId: "54933162623",
    appId: "1:54933162623:web:37ae2d18d9e07110f5cd4a"
  };

  /* firebase.auth().createUserWithEmailAndPassword(email, password)
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

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  }); 

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
  */