import {html, render} from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const optionsField = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', submit);

loadOptions();

async function loadOptions() {
    const response = await fetch(url);
    const data = await response.json();

    const optionsArr = Object.values(data).map(o => createOptionTemplate(o));

    render(optionsArr, optionsField);
}

function createOptionTemplate(option) {
    return html `
        <option value = '${option._id}'>${option.text}</option> 
    `;
}

function submit(event) {
    event.preventDefault();

    const inputValue = document.getElementById('itemText').value;

    if (inputValue) 
    {
        addItem(inputValue);
    }

    loadOptions();
    form.reset();
}

async function addItem(data) {
    return await fetch(url, {
        method: 'Post',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({text: data})
    });
}