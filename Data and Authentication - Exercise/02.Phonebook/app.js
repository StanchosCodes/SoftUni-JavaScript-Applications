const ulPhoneBook = document.getElementById('phonebook');
const personField = document.getElementById('person');
const phoneField = document.getElementById('phone');

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadPhoneBook);
    document.getElementById('btnCreate').addEventListener('click', createEntry);
}

async function loadPhoneBook() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const response = await fetch(url);
    const data = await response.json();

    return createPhoneBookHtml(data);
}

function createPhoneBookHtml(data) {
    ulPhoneBook.innerHTML = '';
    Object.values(data).forEach(entry => {
        const liItem = document.createElement('li');
        liItem.textContent = `${entry.person}: ${entry.phone}`;
        liItem.setAttribute('entry-id', entry._id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteEntry);

        liItem.appendChild(deleteBtn);
        ulPhoneBook.appendChild(liItem);
    });
}

async function deleteEntry(event) {
    let id = event.target.parentElement.getAttribute('entry-id');

    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;

    const response = await fetch(url, {
        method: 'Delete',
        headers: {
            'content-type': 'application/json'
        }
    });
    const data = await response.json();

    event.target.parentElement.remove();

    return data;
}

async function createEntry() {
    let person = personField.value;
    let phone = phoneField.value;

    personField.value = '';
    phoneField.value = '';

    const url = 'http://localhost:3030/jsonstore/phonebook';
    const body = {
        person: person,
        phone: phone
    };

    await fetch(url, {
        method: 'Post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    
    loadPhoneBook();
}

attachEvents();