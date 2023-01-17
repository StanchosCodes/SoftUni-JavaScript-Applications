import page from '../../node_modules/page/page.mjs';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { myFurnitureView } from './views/myFurniture.js';
import { registerView } from './views/register.js';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

const root = document.querySelector('.container');

page('/', renderMiddleWare, catalogView); // for those functions we have to call next()
page('/catalog', renderMiddleWare, catalogView); // -//-
page('/create', renderMiddleWare, createView); // -//-
page('/details/:id', renderMiddleWare, detailsView); // -//-
page('/edit/:id', renderMiddleWare, editView); // -//-
page('/login', renderMiddleWare, loginView); // -//-
page('/register', renderMiddleWare, registerView); // -//-
page('/my-furniture', renderMiddleWare, myFurnitureView); // -//-
page('*', catalogView);
page.start();
updateNavigation();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNavigation();
    page.redirect('/');
});

function updateNavigation() {
    const userSection = document.getElementById('user');
    const guestSection = document.getElementById('guest');

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        userSection.style.display = 'inline-block';
        guestSection.style.display = 'none';
    }
    else {
        guestSection.style.display = 'inline-block';
        userSection.style.display = 'none';
    }
}

function renderMiddleWare(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNavigation = updateNavigation;
    next(); // calls the next function atached to page
}