const switchToRegLink = document.querySelector('.new-user a');
switchToRegLink.addEventListener('click', () => toggleLoginAndReg());

const switchToLoginLink = document.querySelector('.registrated-user a');
switchToLoginLink.addEventListener('click', () => toggleLoginAndReg());

function toggleLoginAndReg() {
  const loginForm = document.getElementById('login-container');
  const regForm = document.getElementById('reg-container');
  loginForm.classList.toggle('d-none');
  regForm.classList.toggle('d-none');
}
