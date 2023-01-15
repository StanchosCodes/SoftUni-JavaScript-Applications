document.getElementById('login-form').addEventListener('submit', loginHandler);
document.getElementById('user').style.display = 'none';
document.querySelectorAll('a').forEach(e => e.classList.remove('active'));
document.getElementById('login').classList.add('active');

function loginHandler(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData);

    login(email, password);
}

async function login(email, password) {
    const url = 'http://localhost:3030/users/login';
    const body = {
        email,
        password
    };
    const header = getHeader('Post', body);
    const response = await fetch(url, header);
    const data = await response.json();

    sessionStorage.setItem('userData', JSON.stringify({
        email: data.email,
        accessToken: data.accessToken,
        id: data._id
    }));

    window.location = './index.html';
    return data;
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}