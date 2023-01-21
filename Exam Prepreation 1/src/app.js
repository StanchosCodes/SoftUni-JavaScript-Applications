import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';

const main = document.getElementById('content');

page(decorateContext) // it will call this function before every other function passed to the page
// it will call it before showHome, then it will call showHome, etc. (1 action)
page('/', showHome); // (4 action) in fact this becomes page('/', decorateContext, showHome)
// where decorateContext is called first and then next() calls showHome
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain; // (3 action) makes ctx.render to be renderMain
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user) {
        ctx.user = user;
    }

    next(); // calls the next function passed to the page
}

function renderMain(content) {
    render(content, main); // (renders to given content to the main section we took by id) (5 action)
}