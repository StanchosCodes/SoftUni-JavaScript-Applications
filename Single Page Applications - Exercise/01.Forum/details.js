const section = document.getElementById('detailsView');
const main = document.getElementsByTagName('main')[0];
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
const themeContentWrapper = document.getElementById('theme-content-wrapper');

section.remove();

let id;

export async function showDetails(event) {
    if (!event) {
        return;
    }


    if (event.target.tagName === 'H2') {
        id = event.target.parentElement.id;
    }
    else if (event.target.tagName == "A") {
        id = event.target.id;
    }

    const topic = await loadTopic(id);
    const comments = await loadComments(id);

    const result = topicTemplate(topic, comments);

    themeContentWrapper.replaceChildren(result);
    main.replaceChildren(section);
}

function topicTemplate(topic, comments) {
    const topicContainer = document.createElement('div');
    topicContainer.classList.add('theme-title');
    topicContainer.innerHTML = `
        <div class="theme-name-wrapper">
            <div class="theme-name">
                <h2>${topic.topicName}</h2>
            </div>
        </div>`;

    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comment');
    commentsContainer.innerHTML = `
                <div class="header">
                    <img src="./static/profile.png" alt="avatar">
                    <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>
                    <p class="post-content">${topic.postText}</p>
                </div>`;

    Object.values(comments).forEach(c => {
        const comment = createComment(c);
        commentsContainer.appendChild(comment);
    });

    return commentsContainer;
}

function createComment(data) {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('user-comment');
    commentContainer.innerHTML = `
                            <div class="topic-name-wrapper">
                                <div class="topic-name">
                                    <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
                                    <div class="post-content">
                                        <p>${data.postText}</p>
                                    </div>
                                </div>
                            </div>`;

    return commentContainer;
}

async function loadComments(id) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
    const response = await fetch(url);
    const data = await response.json();

    const fillteredData = Object.values(data).filter(c => c.id === id);
    return fillteredData;
}

function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.id = id;
    data.date = new Date();
    createPost(data);
    showDetails();
}

async function createPost(body) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    const response = await fetch(url, {
        method: 'Post',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    clearForm();
}

function clearForm() {
    form.reset();
}

async function loadTopic(id) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}