// frontend
// npm init -y
// npm i express
import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server runs at port ${port} ...`);
  });

// backend
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
// JSON BODY-parser (application/json)
app.use(express.json());
// Form Data BODY-parser (application/www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    res.json({
        "users":
            [
                {
                    "id": 1,
                    "name": "Egg"
                },
                {
                    "id": 2,
                    "name": "Tom"
                }
            ]
    });
});

app.post('/test', (req, res) => {
    const reqBodyObj = req.body;
    reqBodyObj.helloWho = 'Valaki'
    res.json(reqBodyObj);
});

app.listen(port, () => {
    console.log(`App listens at port ${port} ...`);
});
