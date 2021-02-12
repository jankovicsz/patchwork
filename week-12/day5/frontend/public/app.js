const backendUrl = 'http://localhost:5000';
const endPoint = `${backendUrl}/search`;
const queryTableMapping = ['license', 'brand', 'model', 'color', 'year'];

document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const licensePlate = document.getElementById('license-plate').value;
  const selectedElement = document.querySelector('[name=filter]:checked').value;

  const searchParamValues = {};
  if (licensePlate.length > 0) {
    searchParamValues.q = licensePlate;
  }
  if (selectedElement !== null) {
    searchParamValues[selectedElement] = 1;
  }

  const queryUrl = new URLSearchParams(searchParamValues).toString();

  const tbody = document.querySelector('#license-plates-table tbody');
  tbody.innerHTML = '';
  fetch(endPoint + '?' + queryUrl)
    .then((res) => res.json())
    .then((data) => {
      const dataObj = data.data;
      dataObj.forEach((obj) => {
        const row = document.createElement('tr');
        queryTableMapping.forEach((key) => {
          const element = document.createElement('td');
          element.textContent = '';
          if (obj[key] !== undefined) {
            element.textContent = obj[key];
          }
          row.appendChild(element);
        });
        tbody.appendChild(row);
        console.log(obj);
      });
    });
});
