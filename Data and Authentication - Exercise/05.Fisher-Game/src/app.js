window.addEventListener('DOMContentLoaded', onLoad);
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('addForm').addEventListener('submit', addCatchHandler);
const catchesDiv = document.getElementById('catches');
catchesDiv.innerHTML = '';
document.querySelector('.load').addEventListener('click', loadAllCatches);

async function logout() {
    const url = 'http://localhost:3030/users/logout';

    const header = getHeader('Get', '');
    await fetch(url, header);

    sessionStorage.removeItem('userData');
    onLoad();
}

function onLoad() {
    let storageObjectData = undefined;
    let accessToken = undefined;

    if (sessionStorage.userData) {
        storageObjectData = JSON.parse(sessionStorage.userData);
        accessToken = storageObjectData['accessToken'];
    }

    const addBtn = document.querySelector('.add');
    const greetings = document.querySelector('p.email span');

    if (accessToken) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline';
        greetings.innerHTML = storageObjectData['email'];
        addBtn.disabled = false;
    }
    else {
        document.getElementById('guest').style.display = 'inline';
        document.getElementById('user').style.display = 'none';
        greetings.innerHTML = 'guest';
        addBtn.disabled = true;
    }
}

async function addCatchHandler(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);

    const data = await addCatch(body);
    const catchCard = createCatchCard(data);

    catchesDiv.appendChild(catchCard);
}

async function addCatch(body) {
    const url = 'http://localhost:3030/data/catches';
    const header = getHeader('Post', body);

    const response = await fetch(url, header);
    const data = await response.json();
    return data;
}

function getHeader(method, body) {
    const storageObjectData = JSON.parse(sessionStorage.userData);
    const accessToken = storageObjectData['accessToken'];

    const header = {
        method: `${method}`,
        headers: {
            'content-type': 'application/json',
            'X-Authorization': accessToken
        }
    }

    if (body) {
        header.body = JSON.stringify(body);
    }
    return header;
}

function createCatchCard(data) {
    let div = document.createElement('div');
    div.classList.add('catch');

    div.innerHTML = `<label>Angler</label>
    <input type="text" class="angler" value=${data.angler} disabled>
    <label>Weight</label>
    <input type="text" class="weight" value=${data.weight} disabled>
    <label>Species</label>
    <input type="text" class="species" value=${data.species} disabled>
    <label>Location</label>
    <input type="text" class="location" value=${data.location} disabled>
    <label>Bait</label>
    <input type="text" class="bait" value=${data.bait} disabled>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value=${data.captureTime} disabled>`;

    let updateBtn = document.createElement('button')
    updateBtn.classList.add('update')
    updateBtn.setAttribute('data-id', `${data._id}`);
    updateBtn.setAttribute('owner-id', `${data._ownerId}`);
    updateBtn.innerText = 'Update';
    updateBtn.addEventListener('click', updateCatch);

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.setAttribute('data-id', `${data._id}`);
    deleteBtn.setAttribute('owner-id', `${data._ownerId}`);
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', deleteCatch);

    let ownerId = '';

    if (sessionStorage.userData) {
        ownerId = JSON.parse(sessionStorage.userData)['id'];
    }

    if (ownerId !== data._ownerId) {
        updateBtn.disabled = true;
        deleteBtn.disabled = true;
    }

    div.appendChild(updateBtn);
    div.appendChild(deleteBtn);

    return div;
}

async function updateCatch(event) {
    let inputs = Array.from(event.target.parentElement.querySelectorAll('input'));
    let values = [];

    inputs.forEach(input => {
        values.push(input.value);
    });

    const catchId = event.target.getAttribute('data-id');
    const url = `http://localhost:3030/data/catches/${catchId}`;
    const body = {
        "angler": values[0],
        "weight":values[1],
        "species":values[2],
        "location":values[3],
        "bait":values[4],
        "captureTime":values[5]
    }

    const header = getHeader('Put', body);

    await fetch(url, header);
}

async function deleteCatch(event) {
    const catchId = event.target.getAttribute('data-id');
    const url = `http://localhost:3030/data/catches/${catchId}`;

    const header = getHeader('Delete', '');

    await fetch(url, header);

    event.target.parentElement.remove();
}

async function loadAllCatches() {
    catchesDiv.innerHTML = '';
    const url = 'http://localhost:3030/data/catches';

    const response = await fetch(url);
    const data = await response.json();

    data.forEach(entry => {
        let currCard = createCatchCard(entry);
        catchesDiv.appendChild(currCard);
    });
}