export { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
export { default as page } from '../node_modules/page/page.mjs';

// exporting directives that we will need just because that way we wont have to write long roots
// example: instead of '../node_modules/lit-html/lit-html.js', we write './lib.js' when we import
// this is a helper file for easer import of directives