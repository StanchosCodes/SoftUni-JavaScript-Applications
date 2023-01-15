document.getElementById('register-form').addEventListener('submit', registerHandler);
document.getElementById('user').style.display = 'none';
document.querySelectorAll('a').forEach(e => e.classList.remove('active'));
document.getElementById('register').classList.add('active');
const errorField = document.querySelector('p.notification');

function registerHandler(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const { email, password, rePass } = Object.fromEntries(formData);
    if (password !== rePass) {
        errorField.textContent = 'Error';
        setTimeout(() => {
            errorField.textContent = '';
        }, 1000);
    }
    else{
        register(email, password);
    }
}

async function register(email, password) {
    const url = 'http://localhost:3030/users/register';
    const body = {
        email,
        password
    };
    const header = getHeader('Post', body);
    try {
    const response = await fetch(url, header);
    const data = await response.json();

    if (data.code && data.code !== 200) {
        throw new Error(data.message);
    }

    sessionStorage.setItem('userData', JSON.stringify({
        email: data.email,
        accessToken: data.accessToken,
        id: data._id
    }));

    window.location = './index.html';
    return data;
    }
    catch (error){
        errorField.textContent = error;

        setTimeout(() => {
            errorField.textContent = '';
        }, 1000);
    }
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