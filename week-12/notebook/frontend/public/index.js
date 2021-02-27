const backendUrl = 'http://localhost:8080';
const endPoint = {
    users: backendUrl + '/users',
    tickets: backendUrl + '/tickets',
    test: backendUrl + '/test'
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
const reportObj = {};
document.getElementById('ticket-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedElement = document.querySelector('#user-select');
    const i = selectedElement.selectedIndex
    reportObj.reporter = selectedElement.options[i].text;
    reportObj.manufacturer = document.getElementById('manufacturer').value;
    reportObj.serial_number = document.getElementById('serial-number').value;
    reportObj.description = document.getElementById('description').value;
    fetch(endPoint.test, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportObj),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
