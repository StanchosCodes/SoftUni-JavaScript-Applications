import { html } from '../lib.js';

const homeTemplate = () => html`
    <section id="home">
        <img src="./images/landing.png" alt="home" />

        <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
            here!</span></h2>
    </section>
`;

export function showHome(ctx) { // calls homeTemplate through the ctx.render function (2 action)
    ctx.render(homeTemplate());
}