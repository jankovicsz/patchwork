// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdj8pC9hyYAkawqJJG-j3k0YYBFqGvC0M",
    authDomain: "fire-test-hosting-dt.firebaseapp.com",
    projectId: "fire-test-hosting-dt",
    storageBucket: "fire-test-hosting-dt.appspot.com",
    messagingSenderId: "693581704377",
    appId: "1:693581704377:web:bfef3e812d4efd02b4ff68"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log('Ok');

db.collection("test_id").doc('questions').get().then((doc) => {
    /* querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    }); */
    console.log(doc.data());
});