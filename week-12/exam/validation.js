// Email:

const emailField = document.querySelector('input[type=email]');

emailField.addEventListener('invalid', (e) => {
    e.preventDefault();
    const emailElement = e.target;
    if(emailElement.validity.valueMissing) {
        emailElement.setCustomValidity('Ne hagyd üresen!');
        showError(emailElement)
    } else if (emailElement.validity.typeMismatch) {
        emailElement.setCustomValidity('Érvénytelen email formátum!');
        showError(emailElement)
    } else {
        emailElement.setCustomValidity('Valami hiba történt');
        showError(emailElement);
    }
});
emailField.addEventListener('input', (e) => {
    const emailElement = e.target;
    emailElement.setCustomValidity('');
});

function showError(inputElement) {
    const parentElement = inputElement.parentElement;
    const feedbackElement = parentElement.querySelector('.invalid-feedback');
    feedbackElement.textContent = inputElement.validationMessage;
    parentElement.classList.add('was-validated');
}


// Password 

const regFormElement = document.getElementById('regForm');

regFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = e.target.checkValidity();
    // e.target.reportValidity();

    const passwordElement = document.getElementById('password');
    const passwordAgainElement = document.getElementById('password-again');

    if (passwordElement.value !== passwordAgainElement.value) {
        isValid = false;
        passwordElement.setCustomValidity('Két jelszó értéke különbözik');
        showError(passwordElement);
        passwordAgainElement.setCustomValidity('Két jelszó értéke különbözik');
        showError(passwordAgainElement);
    } else {
        passwordElement.setCustomValidity('');
        passwordAgainElement.setCustomValidity('');
    }

    e.target.classList.add('was-validated');

    if (isValid) {
        e.target.submit();
    }
});