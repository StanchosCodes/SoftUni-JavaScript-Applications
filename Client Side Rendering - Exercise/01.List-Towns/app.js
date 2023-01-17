import {html, render} from '../node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const divElement = document.getElementById('root');

function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const {towns} = Object.fromEntries(formData);

    if (towns === '') {
        return;
    }
    form.reset();

    let townsArr = towns.split(', ');
    renderTowns(townsArr);
}

function renderTowns(townsData) {
    const resultHtml = createTownsList(townsData);
    render(resultHtml, divElement);
}

function createTownsList(towns) {
    const ul = html`
    <ul>
        ${towns.map(t => html`<li>${t}</li>`)}
    </ul>
    `;

    return ul;
}