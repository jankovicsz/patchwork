import firebase from 'firebase';
import fs from 'fs';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNl7VAUV1PhxlmxIcMEvYkvLnLFo2KqOU',
  authDomain: 'restaurant-finder-dt.firebaseapp.com',
  projectId: 'restaurant-finder-dt',
  storageBucket: 'restaurant-finder-dt.appspot.com',
  messagingSenderId: '945691542189',
  appId: '1:945691542189:web:db42abae35691818bbbc24',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const restaurantCollection = db.collection('restaurant');

const firstFive = await restaurantCollection
  .where('borough', '==', 'Bronx')
  .orderBy(firebase.firestore.FieldPath.documentId())
  .limit(5)
  .get();

const secondFive = await restaurantCollection
  .where('borough', '==', 'Bronx')
  .orderBy(firebase.firestore.FieldPath.documentId())
  .startAfter(firstFive.docs[firstFive.docs.length - 1].id)
  // .startAt(firstFive.docs[firstFive.docs.length - 1].id)
  // .endAt('40364296')
  // .endBefore('40364296')
  .limit(5)
  // .offset(5000)
  // .limitToLast(5)
  .get();

console.log('second 5:');
secondFive.forEach((doc) => {
  const restaurant = doc.data();
  console.log(doc.id, restaurant.name);
});

const first10 = await restaurantCollection
  .where('borough', '==', 'Bronx')
  //  .orderBy('name') - a where-rek nem működik együtt
  .orderBy(firebase.firestore.FieldPath.documentId())
  .limit(10)
  .get();

console.log('first 10:');
first10.forEach((doc) => {
  console.log(doc.data().name);
});

const first3Chars = await restaurantCollection
  // .where('name', '>=', 'Wil')
  // .where('name', '<', 'Wim')
  .orderBy('name')
  .startAt('Wil')
  .endBefore('Wim')
  .get();

console.log('first 3 chars = Wil');
first3Chars.forEach((doc) => {
  const restaurant = doc.data();
  console.log(doc.id, restaurant.name);
});

db.terminate();
