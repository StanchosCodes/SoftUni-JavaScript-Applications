import { get, post } from '../api/api.js'
import { clearUserData, setUserData } from '../util.js';

export async function login(email, password) {
    const { _id, email: resultEmail, accessToken } = await post('/users/login', {email, password});

    setUserData({ // we set the userData to sessionStorage
        _id,
        email: resultEmail,
        accessToken
    });
}

export async function register(email, password) {
    const { _id, email: resultEmail, accessToken } = await post('/users/register', {email, password});

    setUserData({ // we set the userData to sessionStorage
        _id,
        email: resultEmail,
        accessToken
    });
}

export async function logout() {
    get('/users/logout');
    clearUserData(); // than we clear the sessionStorage
}