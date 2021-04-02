import firebase from 'firebase';
import fs from 'fs';

//A reddit apphoz optimalizálva!
const firebaseConfig = {
  apiKey: "AIzaSyCaCjldvdjrrIB0eo6pqaUv7T_VhJKUqpg",
  authDomain: "starwars-finder.firebaseapp.com",
  projectId: "starwars-finder",
  storageBucket: "starwars-finder.appspot.com",
  messagingSenderId: "373156359641",
  appId: "1:373156359641:web:e4c4f19123ef79520abdc8",
  measurementId: "G-MT8L9Q4E8C"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    console.log('signed in');
  })
  .catch((error) => {
    console.error(error);
  });

const fileName = './reddit_test.json';
let content = [];

fs.readFile(fileName, function read(err, data) {
  if (err) {
    throw err;
  }

  content = JSON.parse(data);
});

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    const restaurants = Object.keys(content);

    for (let i = 0; i < restaurants.length; i++) {
      db.collection('test-posts')
        // .doc(restaurants[i])
        // .set(content[restaurants[i]])
        .add(content[restaurants[i]])
        .then(() => {
          console.log('Document written');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  } else {
    console.log('no user');
  }
});

// -----------------------
// A Fenti kódhoz ne nyúlj!
// -----------------------
