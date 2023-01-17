import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const sectionElement = document.getElementById('allCats');

const template = html`
    <ul>
        ${cats.map(c => createCard(c))}
    </ul>
`;

render(template, sectionElement);

function createCard(cat) {
    return html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button @click=${showMore} class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
    `
}

function showMore(event) {
    const div = event.target.parentElement.querySelector('div');

    if (div.style.display === 'none') {
        event.target.textContent = 'Hide status code';
        div.style.display = 'block';
    }
    else {
        event.target.textContent = 'Show status code';
        div.style.display = 'none';
    }
    
}