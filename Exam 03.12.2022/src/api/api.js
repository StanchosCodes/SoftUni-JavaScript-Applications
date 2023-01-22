import { getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) { // if we have data we should create body and add headers type
        options.headers['Content-Type'] = 'Application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) { // if there is a user we have to add authorization token to the headers
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status == 204) { // we check if we have data
            return response; // 204 means no data but the ok status is OK so we return the response
        }

        const data = await response.json(); // if not 204 this means the status is 200 because 
        // of server logic, so we have to await the promise

        if (response.ok == false) { // if the ok status is not OK it means that there is an Error
            throw new Error(data.message); // we return the Error 
        }

        // if not, it means that the ok status is OK (true) and the status is 200 so we return the
        // awaitted data
        return data;
    }
    catch (error) {
        alert(error.message);
        throw error;
    }


}
 // making an export functions for request, that way when we call get the first argument
 // (the method) will allways be 'get' etc. and than we have to pass the other args (url, data)
export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');