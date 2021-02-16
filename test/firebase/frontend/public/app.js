const backend = {
  protocol: 'http',
  host: '127.0.0.1',
  port: 3000,
};

// http://localhost:3000
const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}`;

const endpoint = {
  singles: backendUrl + '/singles',
  login: backendUrl + '/login',
};

const translate = {
  'Failed to fetch': 'Szerver oldali hiba történt :(',
};

if (localStorage.getItem('loggedIn') === 'true') {
  document
    .querySelectorAll('.logged-out')
    .forEach((elem) => elem.classList.add('d-none'));
}

// http://localhost:3000/singles
fetch(endpoint.singles)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    const mainElement = document.querySelector('main');
    const h2Element = document.createElement('h2');
    h2Element.textContent = 'Egyedülállók listája';
    const singlesList = document.createElement('ul');

    res.forEach((single) => {
      if (
        typeof single.lastName === 'string' &&
        typeof single.firstName === 'string'
      ) {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${single.lastName} ${single.firstName} (${single.birthDate})`;
        singlesList.appendChild(itemElement);
      }
    });

    mainElement.prepend(singlesList);
    mainElement.prepend(h2Element);
  })
  .catch((reason) => {
    const alertContainer = document.getElementById('alert-container');
    let message = reason.message;
    // reason.message = Failed to fetch
    // translate.hasOwnProperty(reason.message);
    if (translate[message] !== undefined) {
      message = translate[message];
    }
    alertContainer.textContent = message;
    alertContainer.classList.remove('d-none');
  });

const formElement = document.getElementById('regForm');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  // http://localhost:3000/singles
  fetch(endpoint.singles, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
});

const loginFormElement = document.getElementById('loginForm');

loginFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const password = document.getElementById('loginPassword').value;
  const email = document.getElementById('loginEmail').value;

  // /login
  fetch(endpoint.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      document
        .querySelectorAll('.logged-out')
        .forEach((elem) => elem.classList.add('d-none'));
      localStorage.setItem('loggedIn', 'true');
    });
});

document.getElementById('reg-link').addEventListener('click', () => {
  document
    .querySelectorAll('.menu-container')
    .forEach((elem) => elem.classList.add('d-none'));
  document.getElementById('reg-form').classList.remove('d-none');
});

document.getElementById('login-link').addEventListener('click', () => {
  document
    .querySelectorAll('.menu-container')
    .forEach((elem) => elem.classList.add('d-none'));
  document.getElementById('login-form').classList.remove('d-none');
});
