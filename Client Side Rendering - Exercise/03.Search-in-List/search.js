import { towns } from './towns.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const townsListField = document.getElementById('towns');
const resultElement = document.getElementById('result');
const inputField = document.getElementById('searchText');
document.querySelector('button').addEventListener('click', search);

updateTownsList();

function searchTemplate(towns, matchTown) {
   const resultUl = html`
   <ul>
      ${towns.map(town => createLiElement(town, matchTown))}
   </ul>
   `;

   return resultUl;
}

function createLiElement(town, matchTown) {
   return html`
   <li class = '${(matchTown && town.includes(matchTown)) ? 'active' : ''}'>${town}</li>
   `;  // case-sensitive!

   // return html`
   // <li class = '${(matchTown && town.toLowerCase().includes(matchTown)) ? 'active' : ''}'>${town}</li>
   // `; case-insensitive!
}

function updateTownsList(searchText) {
   const ulElement = searchTemplate(towns, searchText);
   render(ulElement, townsListField);
}

function search() {
   const searchText = inputField.value; // case-sensitive!
   // const searchText = inputField.value.toLowerCase(); // case-insensitive!
   inputField.value = '';

   updateTownsList(searchText);
   renderMatchesCount();
}

function renderMatchesCount() {
   let matchedTownsCount = document.querySelectorAll('.active').length;
   const result = html`<p>${matchedTownsCount} matches found</p>`;
   render(result, resultElement);
}
