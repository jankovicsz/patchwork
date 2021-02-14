const backendUrl = 'http://localhost:8080';
const endPoint = {
    users: backendUrl + '/users',
    tickets: backendUrl + '/tickets',
}

const queryTableMapping = ['id', 'reporter', 'manufacturer', 'serial_number', 'description', 'reported_at'];

document.onload = fetch(endPoint.tickets)
.then(response => response.json())
.then((data) => {
    const tbody = document.querySelector('#ticket-table tbody');
    const ticketObj = data.tickets;
    console.log(ticketObj);
    ticketObj.forEach(ticketRow => {
        const row = document.createElement('tr');
        queryTableMapping.forEach((key) => {
            const element = document.createElement('td');
            element.textContent = ticketRow[key];
            row.appendChild(element);
        });
        const element = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = 'delete';
        button.classList.add('btn');
        button.classList.add('btn-secondary');
        element.appendChild(button);
        row.appendChild(element);
        tbody.appendChild(row);
    });

});

