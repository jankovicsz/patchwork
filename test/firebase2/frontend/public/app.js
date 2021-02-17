const switchToRegLink = document.querySelector('.new-user a');
switchToRegLink.addEventListener('click', () => toggleLoginAndReg());

const switchToLoginLink = document.querySelector('.registrated-user a');
switchToLoginLink.addEventListener('click', () => toggleLoginAndReg());

function toggleLoginAndReg() {
  const loginFormDiv = document.getElementById('login-container');
  const regFormDiv = document.getElementById('reg-container');
  loginFormDiv.classList.toggle('d-none');
  regFormDiv.classList.toggle('d-none');
}

function toggleLoggedIn() {
  const loginFormDiv = document.getElementById('login-container');
  const regFormDiv = document.getElementById('reg-container');
  const loggedinDiv = document.getElementById('loggedin-container');
  loggedinDiv.classList.remove('d-none');
  loginFormDiv.classList.add('d-none');
  regFormDiv.classList.add('d-none');
}

function toggleLogOut() {
  const loginFormDiv = document.getElementById('login-container');
  const regFormDiv = document.getElementById('reg-container');
  const loggedinDiv = document.getElementById('loggedin-container');
  loggedinDiv.classList.add('d-none');
  loginFormDiv.classList.remove('d-none');
  regFormDiv.classList.add('d-none');
}