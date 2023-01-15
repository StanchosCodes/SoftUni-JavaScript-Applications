import * as api from './api.js' // the '*' means that we import everything from api (exported)

const endPoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout'
}

export async function login(email, password) {
    const user = await api.post(endPoints.login, {email, password});
    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function register(email, password) {
    const user = await api.post(endPoints.register, {email, password});
    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
    api.get(endPoints.logout);
    sessionStorage.removeItem('user');
}