import { html } from '../../../node_modules/lit-html/lit-html.js';

export function getItemTemplate(itemData) {
    return html `
    <div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src="${itemData.img}" />
                <p>${itemData.description}</p>
                <footer>
                    <p>Price: <span>${itemData.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${itemData._id}" class="btn btn-info">Details</a>
                </div>
        </div>
    </div>
</div>
    `;
}