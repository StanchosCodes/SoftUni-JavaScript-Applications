import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

let context = null;

export async function loginView(ctx) {
    ctx.render(createLoginTemplate(onSubmit));
    context = ctx;
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    await login(email, password);

    context.updateNavigation();
    context.page.redirect('/');
}

function createLoginTemplate(handler) {
    return html`
    <div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit = ${handler}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
    `;
}