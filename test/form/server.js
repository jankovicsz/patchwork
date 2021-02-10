import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
res.send('ok');
})

app.post('/', (req, res) => {
  res.send('okok');
})

app.listen(port, () => {
  console.log(`Server run at port ${port} ...`);
})
