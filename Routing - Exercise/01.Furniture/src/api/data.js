import * as api from './api.js';

const urls = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': 'users/logout',
    'create': 'data/catalog',
    'getAll': 'data/catalog',
    'getItemById': 'data/catalog/',
    'myItem': '/data/catalog?where=_ownerId%3D%22'
}

export async function login(email, password) {
    const response = await api.post(urls.login, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(response));
    return response;
}

export async function register(email, password) {
    const response = await api.post(urls.register, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(response));
    return response;
}

export async function logout() {
    const response = await api.get(urls.logout);
    sessionStorage.removeItem('userData');
    return response;
}

export async function createItem(data) {
    const response = await api.post(urls.create, data);
    return response;
}

export async function getAllItem() {
    const response = await api.get(urls.getAll);
    return response;
}

export async function details(id) {
    const response = await api.get(urls.getItemById + id);
    return response;
}

export async function updateById(id, data) {
    const response = await api.put(urls.getItemById + id, data);
    return response;
}

export async function deleteItemById(id) {
    const response = await api.del(urls.getItemById + id);
    return response;
}

export async function getMyItems() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData && userData._id;
    let id = `${userId}%22`;

    const response = await api.get(urls.myItem + id);
    return response;
}