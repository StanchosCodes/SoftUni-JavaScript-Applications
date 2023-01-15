const textArea = document.getElementById('messages');
const authorField = document.querySelector('input[name="author"]');
const contentField = document.querySelector('input[name="content"]');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', handleSendMessage);
    document.getElementById('refresh').addEventListener('click', viewAllMessages);
}

function handleSendMessage() {
    let author = authorField.value;
    let content = contentField.value;

    authorField.value = '';
    contentField.value = '';

    let result = `${author}: ${content}`;

    textArea.textContent += result + '\n';

    let body = {
        author: author,
        content: content
    }

    sendMessage(body);
}

async function sendMessage(body) {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const response = await fetch(url, {
        method: 'Post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();
    return data;
}

async function viewAllMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();
    handleViewMessages(data);
}

function handleViewMessages(messages) {
    textArea.textContent = '';
    let messagesArray = [];

    Object.values(messages).forEach(m => {
        messagesArray.push(`${m.author}: ${m.content}`);
    });

    textArea.textContent = messagesArray.join('\n');
}

attachEvents();