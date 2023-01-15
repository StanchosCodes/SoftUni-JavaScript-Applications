async function solution() {
    const sectionElement = document.querySelector('#main');

    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    let response = await fetch(url);
    let data = await response.json();

    for (const key in data) {
        let articleElement = document.createElement('div');
        articleElement.className = 'accordion';

        articleElement.innerHTML = `
            <div class="head">
                <span>${data[key].title}</span>
                <button class="button" id="${data[key]._id}">More</button>
            </div>
            <div class="extra"></div>
            `
        let moreButton = articleElement.querySelector('button');
        moreButton.addEventListener('click', onMoreClick);

        sectionElement.appendChild(articleElement);
    }
}
async function onMoreClick(e) {
    let currentArticle = e.currentTarget.parentNode.parentNode;
    let id = e.target.id;
    let extraInfo = currentArticle.querySelector('div.extra');

    let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

    let response = await fetch(url);
    let data = await response.json();

    extraInfo.innerHTML = `<p>${data.content}</p>`;

    if (e.target.textContent == 'More') {
        e.target.textContent = 'Less';
        extraInfo.style.display = 'block';
    } else {
        e.target.textContent = 'More';
        extraInfo.style.display = 'none';
    }
}

solution();