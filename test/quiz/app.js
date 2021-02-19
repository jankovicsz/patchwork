import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'
import firebase from 'firebase';
import '@firebase/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;



// DB
//CSERÉLD LE A SAJÁT APPOD CONFIG OBJECTJÉRE!
const firebaseConfig = {
    apiKey: "AIzaSyDvF35WW4dAXnNn52sSpMA_jRYxgXhgl_g",
    authDomain: "quiz-app-19594.firebaseapp.com",
    projectId: "quiz-app-19594",
    storageBucket: "quiz-app-19594.appspot.com",
    messagingSenderId: "158399259165",
    appId: "1:158399259165:web:2c95ef47811abef9841cf4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//---



// Frontend
app.use(express.static(getAbsolutePath('public')));

app.get('/game', (req, res, next) => {
    // res.sendFile(path.join(__dirname, 'public', 'game.html'));
    // res.sendFile('game.html', {root: path.join(__dirname, 'public')})
    res.sendFile('game.html', { root: getAbsolutePath('public') });
});
app.get('/questions', (req, res, next) => {
    res.sendFile('questions.html', { root: getAbsolutePath('public') });
});
// ---




// Backend
app.use(express.json());
app.get('/api/game', async (req, res, next) => {
    const queryRef = await db.collection('questions').get();
    const questions = [];
    queryRef.forEach((doc) => questions.push({ id: doc.id, ...doc.data() }));
    const randomIndex = Math.floor(Math.random() * questions.length);
    res.json(questions[randomIndex]);
});

app.get('/api/questions', async (req, res, next) => {
    const queryRef = await db.collection('questions').get();
    const questions = [];
    queryRef.forEach((doc) => questions.push({ id: doc.id, question: doc.data().question }));
    const randomIndex = Math.floor(Math.random() * questions.length);
    res.json(questions);
});

app.post('/api/questions', async (req, res, next) => {
    const inputData = req.body;
    if (typeof inputData.question !== 'string' || inputData.question.length < 3) {
        throw new Error('Invalid question');
    }
    if (!Array.isArray(inputData.answers) || inputData.answers.length !== 4) {}
    const doc = await db.collection('questions')
        .add(inputData);
    res.json({
        id: doc.id
    })
});
app.post('/api/questions/:id', (req, res, next) => { });
// ---


app.listen(port, () => {
    console.log(`Server run at port ${port}...`);
});

function getAbsolutePath(staticDirName) {
    return path.join(__dirname, staticDirName);
}