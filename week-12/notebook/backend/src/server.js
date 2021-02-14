import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

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
                },
                {
                    "id": 3,
                    "name": "Mary"
                },
                {
                    "id": 4,
                    "name": "Brian"
                },
                {
                    "id": 5,
                    "name": "Daisy"
                }
            ]
    });
});

app.get('/tickets', (req, res) => {
    res.json({
        "tickets":
        [
            {
                "id" : 21,
                "reporter" : "Egg",
                "manufacturer" : "dell",
                "serial_number" : 123456789,
                "description" : "screen pixel error",
                "reported_at" : "2018-01-12T23:00:00.000Z"
            },
            {
                "id" : 27,
                "reporter" : "Brian",
                "manufacturer" : "dell",
                "serial_number" : 987654321,
                "description" : "touchpad is not working",
                "reported_at" : "2018-01-27T23:00:00.000Z"
            },
            {
                "id" : 21,
                "reporter" : "Tom",
                "manufacturer" : "lenovo",
                "serial_number" : 123456779,
                "description" : "screen pixel error",
                "reported_at" : "2018-01-11T23:00:00.000Z"
            },
            {
                "id" : 27,
                "reporter" : "Mary",
                "manufacturer" : "dell",
                "serial_number" : 987654311,
                "description" : "touchpad is not working",
                "reported_at" : "2018-01-16T23:00:00.000Z"
            },
            {
                "id" : 21,
                "reporter" : "Daisy",
                "manufacturer" : "lenovo",
                "serial_number" : 123556789,
                "description" : "screen pixel error",
                "reported_at" : "2018-01-10T23:00:00.000Z"
            }
        ]
    })
});

app.post('/test', (req, res) => {
    const reqBodyObj = req.body;
    reqBodyObj.helloWho = 'Valaki'
    res.json(reqBodyObj);
});

app.listen(port, () => {
    console.log(`App listens at port ${port} ...`);
});
