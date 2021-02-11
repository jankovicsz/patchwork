import express from 'express';
// import fs from 'fs';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
import SinglesRepository from './SinglesRepository.js';

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const app = express();
const port = 3001;
// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.get('/singles', (req, res) => {
  const singlesRepo = new SinglesRepository();
  const singles = singlesRepo.getSingles();
  // const data = fs.readFileSync(__dirname + '/data/singles.json');
  // const singles = JSON.parse(data);
  res.json(singles);
});

app.post('/singles', (req, res) => {
  const single = req.body;
  const repository = new SinglesRepository();
  const createdSingle = repository.create(single);
  if (createdSingle === false) {
    res.status(500).send();
    return;
  }
  res.json(createdSingle);
});

app.listen(port, () => {
  console.log(`server listens at port ${port} ...`);
});
