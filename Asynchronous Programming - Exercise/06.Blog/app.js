// function attachEvents() {
//     document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
//     document.getElementById('btnViewPost').addEventListener('click', viewPost);
// }

// async function loadPosts() {
//     let postsField = document.getElementById('posts');
//     postsField.innerHTML = '';

//     let url = 'http://localhost:3030/jsonstore/blog/posts';

//     const response = await fetch(url);
//     const data = await response.json();

//     Object.values(data).forEach(post => {
//         let optionElement = document.createElement('option');

//         optionElement.value = post.id;
//         optionElement.textContent = post.title;

//         postsField.appendChild(optionElement);
//     })
// }

// async function viewPost() {
//     let selectedPostId = document.getElementById('posts').selectedOptions[0].value;

//     let postTitle = document.getElementById('post-title');
//     let postContent = document.getElementById('post-body');
//     let postComments = document.getElementById('post-comments');

//     postComments.innerHTML = '';

//     const seletedPostUrl = `http://localhost:3030/jsonstore/blog/posts/${selectedPostId}`;
//     const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

//     const postResponse = await fetch(seletedPostUrl);
//     const postData = await postResponse.json();

//     const commentsResponse = await fetch(commentsUrl);
//     const commentsData = await commentsResponse.json();

//     postTitle.textContent = postData.title;
//     postContent.textContent = postData.body;

//     let comments = Object.values(commentsData).filter(comment => comment.postId === selectedPostId);

//     comments.forEach(comment => {
//         let liItem = document.createElement('li');

//         liItem.textContent = comment.text;

//         postComments.appendChild(liItem);
//     });
// }

// attachEvents();

function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost);
}

async function loadPosts() {
    let postsField = document.getElementById('posts');
    postsField.innerHTML = '';

    let url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(post => {
        let optionElement = document.createElement('option');

        optionElement.value = post.id;
        optionElement.textContent = post.title;

        postsField.appendChild(optionElement);
    })
}

async function viewPost() {
    //     let selectedPostId = document.getElementById('posts').selectedOptions[0].value;

    //     let postTitle = document.getElementById('post-title');
    //     let postContent = document.getElementById('post-body');
    //     let postComments = document.getElementById('post-comments');

    //     postComments.innerHTML = '';

    //     const seletedPostUrl = `http://localhost:3030/jsonstore/blog/posts/${selectedPostId}`;
    //     const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    //     const postResponse = await fetch(seletedPostUrl);
    //     const postData = await postResponse.json();

    let postTitle = document.getElementById('post-title');
    let postContent = document.getElementById('post-body');
    let postComments = document.getElementById('post-comments');

    postComments.textContent = '';

    let selectedPostId = document.getElementById('posts').selectedOptions[0].value;

    const postsFieldUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const postsResponse = await fetch(postsFieldUrl);
    const postsData = await postsResponse.json();

    const commentsResponse = await fetch(commentsUrl);
    const commentsData = await commentsResponse.json();

    let selectedPost = Object.values(postsData).find(post => post.id === selectedPostId);

    postTitle.textContent = selectedPost.title;
    postContent.textContent = selectedPost.body;

    let comments = Object.values(commentsData).filter(comment => comment.postId === selectedPostId);

    comments.forEach(comment => {
        let liItem = document.createElement('li');
        liItem.textContent = comment.text;

        postComments.appendChild(liItem);
    });
}

attachEvents();