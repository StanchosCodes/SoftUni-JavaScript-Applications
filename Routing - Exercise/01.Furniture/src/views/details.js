import { html } from "../../node_modules/lit-html/lit-html.js";
import { details, deleteItemById } from '../api/data.js'

let context = null;

export async function detailsView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const item = await details(id);

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    ctx.render(detailsTemplate(item, userData._id === item._ownerId, deleteById));
}

async function deleteById(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    await deleteItemById(id);
    context.page.redirect('/');
}

function renderOwnerBtns(isOwner, id) {
    return isOwner ? html `
    <div>
        <a href='/edit/${id}' class="btn btn-info">Edit</a>
        <a @click = ${deleteById} data-id = ${id} href=”javascript:void(0)” class="btn btn-red">Delete</a>
    </div>
    ` : '';
}

function detailsTemplate(item, isOwner) {
    // const itemImgData = item.img.split('/');
    // <img src="${'/images/' + itemImgData[itemImgData.length - 1]}" />
    let itemImgPath = item.img;
    itemImgPath = itemImgPath.substring(1, itemImgPath.length);
    return html `
    <div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${itemImgPath}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${renderOwnerBtns(isOwner, item._id)}
    </div>
</div>
    `
}