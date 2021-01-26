/* const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(`<h1>${text}<\h1>`);
}

const port = 8080;
const text = 'Ez most egy ujabb szoveg';

const server = http.createServer(requestListener);
server.listen(port); */

import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// app.use(express.static('public'));
// app.use('/static', express.static('public'));
app.use('/static', express.static(path.resolve(__dirname + '/public')));

app.get('/praga', (req, res) => {
  res.sendFile(`${__dirname}/praga.html`);
})

app.get('/myFirstEndpoint', (req, res) => {
  res.send('MyFirstEndPoint válaszolt!');
})

app.get('/EndpointWithQueryString', (req, res) => {
  let html = '<ul>';

  for (let key in req.query) {
    html += `<li>${key}: ${req.query[key]}</li>`;
  }

  html += '</ul>';

  res.send(html);
})

app.get('/greet/:name', (req, res) => {
  let html = `<h1>Helló ${req.params.name}!</h1>`;

  res.send(html);
})

const port = 3000;
app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
});

app.set('view engine', 'ejs');

/* app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('home', {user: {name: 'Green Fox'}});
});

app.use('/public', express.static('public'));

const port = 3000;
app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
}); */