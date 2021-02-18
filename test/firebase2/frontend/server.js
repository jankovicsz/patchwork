import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + '/public')));

app.listen(port, () => {
    console.log(`Server runs at port ${port}...`);
});