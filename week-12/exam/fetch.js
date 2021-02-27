// A

const backend = {
  protocol: 'http',
  host: '127.0.0.1',
  port: 8080
};

const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}`;

const endpoint = {
    singles: backendUrl + '/singles',
    login: backendUrl + '/login'
};

// B
const backendUrl = 'http://localhost:8080';
const endPoint = {
  users: backendUrl + '/users',
  tickets: backendUrl + '/tickets',
  test: backendUrl + '/test'
}

// get
fetch(endPoint.users)
  .then(response => response.json())
  .then((data) => console.log(data))
  .catch(err => console.log(err));

// post
let _data = {
  title: "foo",
  body: "bar",
  userId: 1
}

fetch(endPoint.test, {
  method: "POST",
  mode: 'cors',
  body: JSON.stringify(_data),
  headers: { "Content-type": "application/json; charset=UTF-8" }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));

const searchParamValues = {};
if (licensePlate.length > 0) {
  searchParamValues.q = licensePlate;
}
if (selectedElement !== null && selectedElement !== '') {
  searchParamValues[selectedElement] = 1;
}
const queryUrl = new URLSearchParams(searchParamValues).toString();
const tbody = document.querySelector('#license-plates-table tbody');
tbody.innerHTML = '';
fetch(endPoint + '?' + queryUrl)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  })
  .then(handleResponse)
  .catch(err => {
    const errorElement = document.getElementById('form-error');
    errorElement.textContent = err.message;
    errorElement.classList.remove('d-none');
  });


const url = endPoint.tickets;

const postMethod = {
  method: 'POST',
  mode: 'cors',
  headers: {
    "Content-Type": "application/json"
  }
};

postMethod['body'] = JSON.stringify(data);

fetch(url, postMethod)
  .then(response => {

    if (response.status !== 200) {
      throw new Error('Hiba van!');
    } else {
      return response.json();
    }

  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });

  // Viktor
  fetch(endpoint.singles, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
    })
});


// date = new Date('2013-03-10T02:00:00Z');
// date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.

// const datetime = new Date(message.datetime);
// tdDatetime.textContent = `${ datetime.getFullYear() }.${ datetime.getMonth() + 1 }.${ datetime.getDate() }. ${ datetime.getHours() }:${ datetime.getMinutes() }`;