import { html } from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../api/data.js";

let context = null;

export async function createView(ctx) {
    context = ctx;
    ctx.render(createProductTemplate(onSubmit));
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { make, model, year, description, price, img, material } = Object.fromEntries(formData);

    let hasError = false;

    let isValidForm = {
        make: 'is-valid',
        model: 'is-valid',
        year: 'is-valid',
        description: 'is-valid',
        price: 'is-valid',
        img: 'is-valid'
    }

    if (!make || make.length < 4) {
        isValidForm.make = 'is-invalid';
        hasError = true;
    }
    if (!model || model.length < 4) {
        isValidForm.model = 'is-invalid';
        hasError = true;
    }

    if (!year || Number(year) < 1500 || Number(year) > 2050) {
        isValidForm.year = 'is-invalid';
        hasError = true;
    }

    if (!description || description.length < 10) {
        isValidForm.description = 'is-invalid';
        hasError = true;
    }

    if (!price || Number(price) < 0) {
        isValidForm.price = 'is-invalid';
        hasError = true;
    }

    if (!img) {
        isValidForm.img = 'is-invalid';
        hasError = true;
    }

    if (hasError) {
        return context.render(createProductTemplate(onSubmit, isValidForm));
    }

    await createItem({ make, model, year, description, price, img, material });
    context.page.redirect('/');
}

function createProductTemplate(handler, stateForm = {}) {
    return html`
    <div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit = ${handler}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${stateForm.make}" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${stateForm.model}" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${stateForm.year}" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${stateForm.description}" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${stateForm.price}" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${stateForm.img}" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
    `
}