// npm init -y, "type": "module", npm i firebase
// létrehozni egy firebase mappát és abban a config, firebase, firestore stb fájlokat
// import {db} from './firebase/firestore.js';
import db from "./firebase/db.js";
import auth from "./firebase/auth.js";
import fs from "fs";
import auctionItems from "./auctions.js";

/* 
//CSERÉLD LE A SAJÁT APPOD CONFIG OBJECTJÉRE!
const firebaseConfig = {
  apiKey: "AIzaSyCuFDBRauv1wYt2IjjrsYFfIbjuw7CDZrQ",
  authDomain: "reddit-test-pr.firebaseapp.com",
  projectId: "reddit-test-pr",
  storageBucket: "reddit-test-pr.appspot.com",
  messagingSenderId: "542954828354",
  appId: "1:542954828354:web:26fb9b03c26dcebda4b3db"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); */

auth()
  .signInAnonymously()
  .then(() => {
    console.log("signed in");
  })
  .catch((error) => {
    console.error(error);
  });

const fileName = "./quiz.json";
let content = [];

fs.readFile(fileName, function read(err, data) {
  if (err) {
    throw err;
  }

  content = JSON.parse(data);
});

auth().onAuthStateChanged(async (user) => {
  const promises = [];
  if (user) {
    auctionItems.forEach((attraction) => {
      const writePromise = db
        .collection("auctions")
        .add(attraction)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      promises.push(writePromise);
    });
    Promise.all(promises).then(() => {
      process.exit(0);
    });
  }
});

/* auth().onAuthStateChanged(async (user) => {
  if (user) {
      const quizDoc = Object.keys(content)[0];
      const quizArr = content[quizDoc];

    for (let i = 0; i < quizArr.length; i++) {
      quizArr[i].hit = false;
      quizArr[i].is_played = false;
      db.collection(quizDoc)
        .add(quizArr[i])
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
});  */

/* auth().onAuthStateChanged(async (user) => {
  if (user) {
    // const restaurants = Object.keys(content);

    for (let i = 0; i < restaurants.length; i++) {
      db.collection('quiz')
        .doc(restaurants[i])
        .set(content[restaurants[i]])
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
}); */

db.terminate;

// -----------------------
// A Fenti kódhoz ne nyúlj!
// -----------------------
