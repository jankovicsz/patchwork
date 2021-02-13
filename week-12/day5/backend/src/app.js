import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get(['/search', '/search/:brand'], (req, res) => {
  res.json({
    result: 'ok',
    data: [
      {
        license: 'HMZ-140',
        brand: 'Audi',
        model: 'A8',
        year: 2016,
        color: 'red',
      },
      {
        license: 'HMZ-555',
        brand: 'BMZ',
        model: 'Z4',
        year: 2011,
        color: 'pink',
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`App listens at port ${port} ...`);
});
