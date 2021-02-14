const backendUrl = 'http://localhost:8080';
const endPoint = {
    users: backendUrl + '/users',
    tickets: backendUrl + '/tickets',
}

document.getElementById('ticket-form').onload = fetch(endPoint.users)
    .then(response => response.json())
    .then((data) => {
        const selectUser = document.getElementById('user-select');
        data.users.forEach(user => {
            const userName = document.createElement('option');
            userName.textContent = user.name;
            selectUser.appendChild(userName);
        });
    });

/* selectedElement.addEventListener('click', (event) => {
    const i = selectedElement.selectedIndex
    selectedReporter = selectedElement.options[i].text;
    console.log(selectedReporter);
}) */

/* selectedElement.onclick = () => {
    const i = selectedElement.selectedIndex
    selectedReporter = selectedElement.options[i].text;
    console.log(selectedReporter);
} */

document.getElementById('ticket-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const manufacturer = document.getElementById('manufacturer');
    const serialNumber = document.getElementById('serial-number');
    const description = document.getElementById('description');
    const selectedElement = document.querySelector('#user-select');
    const i = selectedElement.selectedIndex
    const selectedReporter = selectedElement.options[i].text;
    console.log(selectedReporter);
    console.log(manufacturer.value);
    console.log(serialNumber.value);
    console.log(description.value);
})