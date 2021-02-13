const backendUrl = 'http://localhost:8080';
const endPoint = backendUrl + '/search';
const queryTableMapping = ['license', 'brand', 'model', 'color', 'year'];

document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const tbody = document.querySelector('#license-plates-table tbody');
  tbody.innerHTML = '';
  const form = event.target;
  if (form.checkValidity()) {
    form.classList.remove('was-validated');
    const licensePlate = document.getElementById('license-plate').value;
    const selectedElement = document.querySelector('[name=filter]:checked').value; 
    //const selectedElement = document.querySelector('#filter :checked').value;

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
  } else {
    form.classList.add('was-validated');
  }
});

function handleResponse(data) {
  const errorElement = document.getElementById('form-error');
  errorElement.classList.add('d-none');
  const tbody = document.querySelector('#license-plates-table tbody');
  tbody.innerHTML = '';
  const dataObj = data.data;
  dataObj.forEach((obj) => {
    const row = document.createElement('tr');
    queryTableMapping.forEach((key) => {
      const element = document.createElement('td');
      element.textContent = '';
      if (obj[key] !== undefined) {
        if (key === 'brand') {
          const brandLink = document.createElement('a');
          brandLink.textContent = obj[key];
          brandLink.setAttribute('href', '#');
          brandLink.addEventListener('click', (event) => {
            const brandUrl = endPoint + '/' + event.target.textContent;
            fetch(brandUrl).then((res) => res.json()).then(handleResponse)
          })
          element.appendChild(brandLink);
        } else {
          element.textContent = obj[key];
        }
      }
      row.appendChild(element);
    });
    tbody.appendChild(row);
  });
}
