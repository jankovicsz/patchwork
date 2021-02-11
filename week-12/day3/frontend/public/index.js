const div = document.querySelector('div');
div.textContent = 'Helló Ráckeve!'

const backend = {
  protocol: 'http',
  host: '127.0.0.1',
  port: 3001
}

const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}`;
const endpoint = {
  singles: backendUrl + '/singles'
}

//fetch('http://localhost:3001/singles');
fetch(endpoint.singles)
