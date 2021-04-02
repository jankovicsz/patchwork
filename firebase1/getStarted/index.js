// import firebase from 'firebase';
// import fs from 'fs';
// import '@firebase/firestore';
/*
const firebaseConfig = {
  apiKey: 'AIzaSyB1VIu1KzwLUKgDkb832ahfJ5y9y8ijVG0',
  authDomain: 'get-started-387da.firebaseapp.com',
  projectId: 'get-started-387da',
  storageBucket: 'get-started-387da.appspot.com',
  messagingSenderId: '12196471319',
  appId: '1:12196471319:web:0a61887e2b8e2add7bb252',
};
*/
const firebaseConfig = {
    apiKey: 'AIzaSyD_finqjyvaY46_UHluoC49-G5l3HgQ_mg',
    authDomain: 'reddit-project-dt.firebaseapp.com',
    projectId: 'reddit-project-dt',
    storageBucket: 'reddit-project-dt.appspot.com',
    messagingSenderId: '788752213665',
    appId: '1:788752213665:web:f727b889a8bb482a2cf2e0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function readData(document) {
  db.collection(document)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        console.log(doc.data());
      });
    })
    .catch((err) => console.error(err));
}

function setData(collection, doc) {
  db.collection(collection)
    .doc(doc)
    .set({
      firstName: 'Nagy',
      lastName: 'Lajos',
      password: '1357',
      username: 'napolyi',
    })
    .then((docRef) => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
}

function addData(collection) {
  db.collection(collection)
    .add({
      firstName: 'Nagy',
      lastName: 'Károly',
      password: '12345678',
      username: 'charlemagne',
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}

// setData('users', '57');
readData('posts');

db.collection('users')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        const tbody = document.querySelector('.container tbody');
        const user = doc.data();
        const tr = document.createElement('tr');
        const tdUserName = document.createElement('td');
        tdUserName.textContent = user.username;
        const tdFirstName = document.createElement('td');
        tdFirstName.textContent = user.firstName;
        const tdLastName = document.createElement('td');
        tdLastName.textContent = user.lastName;
        const tdPassword = document.createElement('td');
        tdPassword.textContent = user.password;
        tr.appendChild(tdLastName);
        tr.appendChild(tdFirstName);
        tr.appendChild(tdUserName);
        tr.appendChild(tdPassword);
        tbody.appendChild(tr);
      });
    })
    .catch((err) => console.error(err));

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
  return result;
}

// request('./data.json').then(console.log)

